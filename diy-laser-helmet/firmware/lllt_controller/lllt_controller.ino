/*
  DIY LLLT helmet controller
  Board: Arduino Nano / Uno (ATmega328P, 5 V, 16 MHz)

  What it does
  - Lasers are OFF at power-up and after any reset (gate pulled low, watchdog).
  - HOLD the button 2 s to start a session. The helmet must be on your head
    (interlock micro switch closed), otherwise it refuses and beeps twice.
  - Session time is a preset (10/15/20/25 min). SHORT press while idle cycles
    the preset; the number of beeps = preset number (1 = 10 min ... 4 = 25 min).
  - Taking the helmet off switches the lasers off instantly and pauses.
    Lasers never turn back on by themselves: put it back on and HOLD 1 s.
  - SHORT press during a session pauses; HOLD 3 s stops the session.
  - Hard ceiling of 30 min per session, whatever the settings.
  - Optional current sense (shunt on A1): learns the normal current on the
    first session, then stops on over-current (short circuit) and warns on
    under-current (a rib came loose). Alarms if current flows while the lasers
    should be OFF (shorted MOSFET).
  - Optional supply sense (divider on A2): warns when the 5 V rail sags (dim
    lasers) and stops below a safe minimum.
  - Keeps a session log in EEPROM. Serial monitor at 115200 baud: h = help.

  Wiring (see electronics/schematic.svg)
    D9  -> 100R -> MOSFET gate (IRLZ44N), 10k gate->GND
    D2  -> push button -> GND
    D3  -> HEAD wire -> interlock micro switch COM; switch NO -> helmet +5V bus.
           10k from D3 to GND on the controller board.  HIGH = helmet worn.
           (No GND wire ever goes into the helmet: a chafed wire can then
           never switch the lasers on by itself.)
    D4  -> active buzzer module IN  (or passive piezo, set BUZZER_PASSIVE 1)
    D5  -> 1k -> LED -> GND
    A1  -> 1k -> shunt top (MOSFET source side), 100nF A1->GND
    A2  -> divider middle: 5V rail -> 10k -> A2 -> 2.2k -> GND, 100nF A2->GND

  This is a hobby project, not a medical device. Read the safety section of
  the guide before use.
*/

#include <EEPROM.h>
#include <avr/wdt.h>

// ----------------------------- options ------------------------------
#define USE_INTERLOCK     1   // 1 = head switch fitted (strongly recommended)
#define USE_CURRENT_SENSE 1   // 1 = shunt + filter fitted on A1 (set 0 if you skip it!)
#define USE_VCC_SENSE     1   // 1 = divider fitted on A2 (set 0 if you skip it)
#define BUZZER_PASSIVE    0   // 0 = active buzzer / buzzer module, 1 = bare piezo
#define USE_WATCHDOG      1   // set 0 only if an old-bootloader Nano clone reboot-loops

// ------------------------------- pins -------------------------------
const uint8_t PIN_LASER  = 9;
const uint8_t PIN_BUTTON = 2;
const uint8_t PIN_HEAD   = 3;
const uint8_t PIN_BUZZER = 4;
const uint8_t PIN_LED    = 5;
const uint8_t PIN_ISENSE = A1;
const uint8_t PIN_VSENSE = A2;

// ----------------------------- session ------------------------------
const uint8_t  PRESET_MIN[]      = {10, 15, 20, 25};
const uint8_t  N_PRESETS         = sizeof(PRESET_MIN);
const uint8_t  DEFAULT_PRESET    = 2;          // index -> 20 min (see guide: dose)
const uint8_t  HARD_MAX_MIN      = 30;         // absolute ceiling
const uint32_t PAUSE_TIMEOUT_MS  = 5UL * 60UL * 1000UL;
const uint32_t HOLD_START_MS     = 2000;
const uint32_t HOLD_RESUME_MS    = 1000;
const uint32_t HOLD_STOP_MS      = 3000;
const uint32_t SHORT_PRESS_MS    = 800;

// ---------------------------- electrical ----------------------------
// Internal reference: measure the AREF pin with a multimeter and enter it.
const uint16_t VREF_MV          = 1100;
const float    SHUNT_OHMS       = 0.05f;      // 2 x 0.1 R in parallel
const float    VDIV_RATIO       = (10.0f + 2.2f) / 2.2f;
const uint16_t VCC_WARN_MV      = 4650;
const uint16_t VCC_STOP_MV      = 4300;
const uint16_t I_ABS_MAX_MA     = 3600;       // stop above this, always
const uint16_t I_OFF_LEAK_MA    = 150;        // current while OFF -> shorted MOSFET alarm
const uint16_t I_MIN_ON_MA      = 60;         // less than this while ON -> harness open
const uint8_t  I_HIGH_PCT       = 25;         // stop if > baseline + 25 %
const uint8_t  I_LOW_PCT        = 10;         // warn if < baseline - 10 %
const uint32_t BASELINE_AT_MS   = 20000;      // learn baseline 20 s into first session

// ------------------------------ EEPROM ------------------------------
struct Store {
  uint16_t magic;
  uint8_t  version;
  uint8_t  preset;
  uint16_t sessions;
  uint32_t minutes;
  uint16_t baseline_mA;
};
const uint16_t STORE_MAGIC = 0x4C4C;   // "LL"
Store store;

// ------------------------------- state ------------------------------
enum State : uint8_t { IDLE, RUNNING, PAUSED, FAULT };
// (declared up here so Arduino's auto-generated prototypes can see it)
enum BtnEvent : uint8_t { EV_NONE, EV_SHORT, EV_HOLD };
State state = IDLE;
bool laserIsOn = false;
uint32_t litMs = 0, targetMs = 0, lastTick = 0, pausedAt = 0;
uint32_t nextChirpMs = 0, lastSense = 0, lastReport = 0, lastLowWarn = 0;
bool baselineTaken = false;
const char *faultMsg = "";

// Turn the watchdog off as early as possible after a watchdog reset
// (runs before main(); keeps old bootloaders from reboot-looping).
#ifdef __AVR__
void wdt_early_off(void) __attribute__((naked, used, section(".init3")));
void wdt_early_off(void) { MCUSR = 0; wdt_disable(); }
#endif

// ============================ small helpers =========================
void laserOff() {
  digitalWrite(PIN_LASER, LOW);
  laserIsOn = false;
}

// --- non-blocking beeper: pattern of on/off durations (ms) ---
uint16_t bpat[12];
uint8_t bn = 0, bi = 0;
uint32_t bt = 0;
void buzz(bool on) {
#if BUZZER_PASSIVE
  if (on) tone(PIN_BUZZER, 2700); else noTone(PIN_BUZZER);
#else
  digitalWrite(PIN_BUZZER, on ? HIGH : LOW);
#endif
}
void beeps(uint8_t n, uint16_t on = 90, uint16_t off = 140) {
  if (n > 6) n = 6;
  bn = 0;
  for (uint8_t i = 0; i < n; i++) { bpat[bn++] = on; bpat[bn++] = off; }
  bi = 0; bt = millis(); buzz(bn > 0);
}
void updateBeeper() {
  if (bi >= bn) return;
  if (millis() - bt >= bpat[bi]) {
    bt = millis(); bi++;
    buzz(bi < bn && (bi % 2 == 0));
  }
}

// --- LED patterns ---
void updateLed() {
  uint32_t t = millis();
  bool on = false;
  switch (state) {
    case IDLE:    on = (t % 2000) < 60; break;
    case RUNNING: on = true; break;
    case PAUSED:  on = (t % 400) < 200; break;
    case FAULT:   { uint16_t p = t % 1000; on = (p < 450) && ((p / 75) % 2 == 0); } break;
  }
  digitalWrite(PIN_LED, on ? HIGH : LOW);
}

// --- inputs ---
bool headOn() {
#if USE_INTERLOCK
  static bool stable = false, last = false;
  static uint32_t tc = 0;
  bool r = digitalRead(PIN_HEAD) == HIGH;   // switch pulls D3 up to +5 V when worn
  if (r != last) { last = r; tc = millis(); }
  // removing the helmet must act at once; putting it on needs 150 ms stable
  if (!r) stable = false;
  else if (millis() - tc > 150) stable = true;
  return stable;
#else
  return true;
#endif
}

BtnEvent pollButton(uint32_t holdMs) {
  static bool stable = false, last = false, holdFired = false;
  static uint32_t tChange = 0, tDown = 0;
  bool r = digitalRead(PIN_BUTTON) == LOW;
  uint32_t now = millis();
  if (r != last) { last = r; tChange = now; }
  if (now - tChange > 30 && r != stable) {
    stable = r;
    if (stable) { tDown = now; holdFired = false; }
    else if (!holdFired && now - tDown < SHORT_PRESS_MS) return EV_SHORT;
  }
  if (stable && !holdFired && now - tDown >= holdMs) { holdFired = true; return EV_HOLD; }
  return EV_NONE;
}

uint16_t readMv(uint8_t pin) {
  analogRead(pin);                    // discard first after mux change
  uint32_t acc = 0;
  for (uint8_t i = 0; i < 16; i++) acc += analogRead(pin);
  return (uint16_t)((acc / 16) * (uint32_t)VREF_MV / 1023UL);
}
uint16_t readCurrent_mA() {
#if USE_CURRENT_SENSE
  return (uint16_t)(readMv(PIN_ISENSE) / SHUNT_OHMS);
#else
  return 0;
#endif
}
uint16_t readVcc_mV() {
#if USE_VCC_SENSE
  return (uint16_t)(readMv(PIN_VSENSE) * VDIV_RATIO);
#else
  return 5000;
#endif
}

void saveStore() { EEPROM.put(0, store); }
void loadStore() {
  EEPROM.get(0, store);
  if (store.magic != STORE_MAGIC || store.version != 1 || store.preset >= N_PRESETS) {
    store.magic = STORE_MAGIC; store.version = 1; store.preset = DEFAULT_PRESET;
    store.sessions = 0; store.minutes = 0; store.baseline_mA = 0;
    saveStore();
  }
}

void enterFault(const char *msg) {
  laserOff();
  state = FAULT;
  faultMsg = msg;
  beeps(6, 300, 150);
  Serial.print(F("FAULT: ")); Serial.println(msg);
  Serial.println(F("Lasers OFF. Fix the problem, then power-cycle the controller."));
}

void printStats() {
  Serial.print(F("Preset: ")); Serial.print(PRESET_MIN[store.preset]); Serial.println(F(" min"));
  Serial.print(F("Sessions completed: ")); Serial.println(store.sessions);
  Serial.print(F("Total minutes: ")); Serial.println(store.minutes);
  Serial.print(F("Learned laser current: "));
  if (store.baseline_mA) { Serial.print(store.baseline_mA); Serial.println(F(" mA")); }
  else Serial.println(F("(not learned yet)"));
  Serial.print(F("Supply now: ")); Serial.print(readVcc_mV()); Serial.println(F(" mV"));
  Serial.print(F("Current now: ")); Serial.print(readCurrent_mA()); Serial.println(F(" mA"));
  Serial.print(F("Helmet on head: ")); Serial.println(headOn() ? F("yes") : F("no"));
}

void printHelp() {
  Serial.println(F("Commands: h help | s stats | b forget learned current | z zero stats"));
  Serial.println(F("Button idle:    short = change preset, hold 2 s = start"));
  Serial.println(F("       running: short = pause, hold 3 s = stop"));
  Serial.println(F("       paused:  hold 1 s = resume, short = end session"));
}

void handleSerial() {
  if (!Serial.available()) return;
  char c = Serial.read();
  if (c == 'h' || c == '?') printHelp();
  else if (c == 's') printStats();
  else if (c == 'b' && state == IDLE) { store.baseline_mA = 0; saveStore(); Serial.println(F("Learned current cleared; re-learned next session.")); }
  else if (c == 'z' && state == IDLE) { store.sessions = 0; store.minutes = 0; saveStore(); Serial.println(F("Stats cleared.")); }
}

// ============================== session =============================
bool rampOn() {
  // ~0.4 s soft start, aborts at once if the helmet comes off
  for (int d = 0; d <= 255; d += 15) {
    if (!headOn()) { laserOff(); return false; }
    analogWrite(PIN_LASER, d);
    delay(25);
    wdt_reset();
  }
  digitalWrite(PIN_LASER, HIGH);   // also stops PWM on the pin
  laserIsOn = true;
  return true;
}

bool supplyOk(bool verbose) {
  uint16_t v = readVcc_mV();
  if (v < VCC_STOP_MV) {
    if (verbose) { Serial.print(F("Supply too low: ")); Serial.print(v); Serial.println(F(" mV")); }
    return false;
  }
  return true;
}

void startSession() {
  if (!headOn()) {
    Serial.println(F("Put the helmet on first (interlock open)."));
    beeps(2, 400, 200);
    return;
  }
  if (!supplyOk(true)) { beeps(3, 400, 200); return; }
  uint8_t mins = PRESET_MIN[store.preset];
  if (mins > HARD_MAX_MIN) mins = HARD_MAX_MIN;
  targetMs = (uint32_t)mins * 60000UL;
  litMs = 0;
  nextChirpMs = 5UL * 60000UL;
  baselineTaken = store.baseline_mA != 0;
  if (!rampOn()) { beeps(2, 400, 200); return; }
  state = RUNNING;
  lastTick = millis();
  beeps(1, 500, 100);
  Serial.print(F("Session started: ")); Serial.print(mins); Serial.println(F(" min"));
}

void finishSession(bool completed) {
  laserOff();
  state = IDLE;
  uint32_t mins = (litMs + 30000UL) / 60000UL;
  if (mins > 0) {
    if (completed) store.sessions++;
    store.minutes += mins;
    saveStore();
  }
  if (completed) { beeps(3, 400, 200); Serial.println(F("Session complete. Lasers OFF.")); }
  else { beeps(2, 150, 150); Serial.print(F("Session stopped after ")); Serial.print(mins); Serial.println(F(" min.")); }
}

void pauseSession(const __FlashStringHelper *why) {
  laserOff();
  state = PAUSED;
  pausedAt = millis();
  beeps(4, 120, 120);
  Serial.print(F("Paused: ")); Serial.println(why);
  Serial.println(F("Put the helmet on and HOLD the button 1 s to resume (short press ends)."));
}

void senseDuringSession() {
  uint32_t now = millis();
  if (now - lastSense < 1000) return;
  lastSense = now;
#if USE_CURRENT_SENSE
  uint16_t i = readCurrent_mA();
  if (i > I_ABS_MAX_MA) { enterFault("over-current (short circuit?)"); return; }
  if (i < I_MIN_ON_MA) { enterFault("no laser current (harness unplugged / MOSFET open)"); return; }
  if (!baselineTaken && litMs > BASELINE_AT_MS) {
    store.baseline_mA = i; saveStore(); baselineTaken = true;
    Serial.print(F("Learned normal laser current: ")); Serial.print(i); Serial.println(F(" mA"));
  }
  if (store.baseline_mA) {
    uint32_t b = store.baseline_mA;
    if ((uint32_t)i * 100UL > b * (100UL + I_HIGH_PCT)) { enterFault("current far above normal"); return; }
    if ((uint32_t)i * 100UL < b * (100UL - I_LOW_PCT) && now - lastLowWarn > 60000UL) {
      lastLowWarn = now;
      beeps(2, 60, 60);
      Serial.print(F("WARNING: current ")); Serial.print(i);
      Serial.println(F(" mA is low - a rib or diode may be disconnected."));
    }
  }
#endif
#if USE_VCC_SENSE
  uint16_t v = readVcc_mV();
  if (v < VCC_STOP_MV) { enterFault("supply voltage too low"); return; }
  if (v < VCC_WARN_MV && now - lastLowWarn > 60000UL) {
    lastLowWarn = now;
    beeps(2, 60, 60);
    Serial.print(F("WARNING: supply ")); Serial.print(v); Serial.println(F(" mV - lasers are dimmer than normal."));
  }
#endif
  if (now - lastReport >= 10000UL) {
    lastReport = now;
    uint32_t left = (targetMs > litMs) ? (targetMs - litMs) / 1000UL : 0;
    Serial.print(F("running, ")); Serial.print(left / 60); Serial.print(F(":"));
    if (left % 60 < 10) Serial.print('0');
    Serial.print(left % 60); Serial.print(F(" left"));
#if USE_CURRENT_SENSE
    Serial.print(F(", I=")); Serial.print(readCurrent_mA()); Serial.print(F(" mA"));
#endif
#if USE_VCC_SENSE
    Serial.print(F(", V=")); Serial.print(readVcc_mV()); Serial.print(F(" mV"));
#endif
    Serial.println();
  }
}

// =============================== setup ==============================
void setup() {
  // Lasers OFF before anything else.
  pinMode(PIN_LASER, OUTPUT);
  digitalWrite(PIN_LASER, LOW);
  MCUSR = 0;
  wdt_disable();

  pinMode(PIN_BUTTON, INPUT_PULLUP);
  pinMode(PIN_HEAD, INPUT);           // external 10k pull-down, open = not worn
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_LED, OUTPUT);
  analogReference(INTERNAL);
  Serial.begin(115200);
  loadStore();

  Serial.println(F("\nDIY LLLT helmet controller v1.0"));
#if !USE_INTERLOCK
  Serial.println(F("WARNING: interlock disabled in firmware. Never look into the helmet."));
#endif
  printStats();
  printHelp();
  beeps(store.preset + 1, 70, 160);   // tell the current preset
#if USE_WATCHDOG
  wdt_enable(WDTO_2S);
#endif
}

// ================================ loop ==============================
void loop() {
  wdt_reset();
  uint32_t now = millis();
  updateBeeper();
  updateLed();
  handleSerial();
  bool head = headOn();

  switch (state) {
    case IDLE: {
#if USE_CURRENT_SENSE
      static uint32_t lastLeak = 0;
      if (now - lastLeak > 2000) {
        lastLeak = now;
        if (readCurrent_mA() > I_OFF_LEAK_MA) {
          enterFault("current flows while lasers are OFF - MOSFET shorted! Unplug power now.");
          break;
        }
      }
#endif
      BtnEvent e = pollButton(HOLD_START_MS);
      if (e == EV_SHORT) {
        store.preset = (store.preset + 1) % N_PRESETS;
        saveStore();
        beeps(store.preset + 1, 70, 160);
        Serial.print(F("Preset: ")); Serial.print(PRESET_MIN[store.preset]); Serial.println(F(" min"));
      } else if (e == EV_HOLD) {
        startSession();
      }
    } break;

    case RUNNING: {
      if (!head) { pauseSession(F("helmet removed")); break; }
      litMs += now - lastTick;
      lastTick = now;
      BtnEvent e = pollButton(HOLD_STOP_MS);
      if (e == EV_SHORT) { pauseSession(F("button")); break; }
      if (e == EV_HOLD) { finishSession(false); break; }
      if (litMs >= targetMs || litMs >= (uint32_t)HARD_MAX_MIN * 60000UL) { finishSession(true); break; }
      if (litMs >= nextChirpMs) { nextChirpMs += 5UL * 60000UL; beeps(1, 40, 40); }
      senseDuringSession();
    } break;

    case PAUSED: {
      if (now - pausedAt > PAUSE_TIMEOUT_MS) {
        Serial.println(F("Paused too long - session ended."));
        finishSession(false);
        break;
      }
      BtnEvent e = pollButton(HOLD_RESUME_MS);
      if (e == EV_SHORT) { finishSession(false); break; }
      if (e == EV_HOLD) {
        if (!head) { beeps(2, 400, 200); Serial.println(F("Helmet not on head.")); }
        else if (rampOn()) { state = RUNNING; lastTick = millis(); beeps(1, 200, 50); Serial.println(F("Resumed.")); }
      }
    } break;

    case FAULT: {
      laserOff();   // stay off until power-cycle
      static uint32_t lastRemind = 0;
      if (now - lastRemind > 10000UL) { lastRemind = now; beeps(1, 50, 50); }
    } break;
  }
}
