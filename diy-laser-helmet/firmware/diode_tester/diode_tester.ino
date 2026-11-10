/*
  DIY LLLT helmet - laser module tester
  Board: Arduino Nano / Uno (ATmega328P, 5 V)

  Measures, for one 650 nm module at a time:
    - supply current (10 R shunt in its ground path)
    - approximate optical power (BPW34 photodiode in the printed tester_jig)
  and sorts modules into OK / REJECT, so the helmet only gets diodes that are
  close to 5 mW. Cheap "5 mW" modules vary a lot: some are 1-2 mW, some are
  well above 5 mW (Class 3B). Reject the strong ones - they are an eye hazard.

  Accuracy: current is good to ~3 %. Optical power is an ESTIMATE (+-25 %):
  BPW34 responsivity tolerance, beam slightly larger than the sensor, and the
  1.1 V reference tolerance. Use it to compare modules and find outliers.
  Calibrate VREF_MV by measuring the AREF pin with a multimeter.

  Wiring
    5V  -> module RED wire
    module BLACK wire -> MOSFET drain (IRLZ44N or 2N7000); source -> 10 R -> GND
    D9  -> 100 R -> MOSFET gate, 10k gate -> GND
    A1  -> shunt top (MOSFET source)
    5V  -> 470 R -> BPW34 cathode; BPW34 anode -> A0 and 100 R -> GND
    D2  -> push button -> GND      D4 -> active buzzer (optional)

  Use: put a module in the jig (lens down), press the button or send 't'.
  Serial 115200: t = test, m = summary, b = 10 min burn-in of the module in
  the jig, h = help. Output lines are CSV so you can paste them in a sheet.
*/

#include <avr/wdt.h>

const uint8_t PIN_LASER = 9, PIN_BUTTON = 2, PIN_BUZZER = 4;
const uint8_t PIN_PD = A0, PIN_SHUNT = A1;

const uint16_t VREF_MV = 1100;     // measure AREF and enter it here
const float R_PD = 100.0f;         // photodiode load
const float R_SHUNT = 10.0f;       // module current shunt
const float RESPONSIVITY = 0.44f;  // A/W, BPW34 at 650 nm (typ.)

// acceptance window (5 V, 650 nm, "5 mW" modules)
const float I_MIN_MA = 12, I_MAX_MA = 40;
const float P_MIN_MW = 2.5f, P_MAX_MW = 5.5f;
const float REL_MIN = 0.6f, REL_MAX = 1.4f;   // vs. median of modules tested so far

const uint8_t MAX_LOG = 200;
uint16_t log_uW[MAX_LOG];
uint8_t nLog = 0;
uint16_t testId = 0;

float readMv(uint8_t pin, uint8_t n = 64) {
  analogRead(pin);
  uint32_t acc = 0;
  for (uint8_t i = 0; i < n; i++) acc += analogRead(pin);
  return (acc / (float)n) * VREF_MV / 1023.0f;
}

void beep(uint8_t n, uint16_t on) {
  for (uint8_t i = 0; i < n; i++) {
    digitalWrite(PIN_BUZZER, HIGH); delay(on);
    digitalWrite(PIN_BUZZER, LOW); delay(120);
    wdt_reset();
  }
}

float medianPower() {
  if (nLog == 0) return 0;
  uint16_t tmp[MAX_LOG];
  for (uint8_t i = 0; i < nLog; i++) tmp[i] = log_uW[i];
  for (uint8_t i = 1; i < nLog; i++) {          // insertion sort
    uint16_t v = tmp[i]; int8_t j = i - 1;
    while (j >= 0 && tmp[j] > v) { tmp[j + 1] = tmp[j]; j--; }
    tmp[j + 1] = v;
  }
  return (nLog % 2 ? tmp[nLog / 2] : (tmp[nLog / 2 - 1] + tmp[nLog / 2]) / 2.0f) / 1000.0f;
}

bool measure(float &i_mA, float &p_mW, bool &saturated) {
  digitalWrite(PIN_LASER, LOW);
  delay(150);
  float dark = readMv(PIN_PD);
  digitalWrite(PIN_LASER, HIGH);
  delay(500);                                   // let it settle
  wdt_reset();
  float pd = readMv(PIN_PD);
  float sh = readMv(PIN_SHUNT);
  digitalWrite(PIN_LASER, LOW);
  saturated = pd > VREF_MV * 0.97f || pd > 820;  // 470R bias limits ~8 mA
  i_mA = sh / R_SHUNT;
  float ipd_mA = (pd - dark) / R_PD;
  p_mW = ipd_mA / RESPONSIVITY;                 // mA / (A/W) = mW
  return true;
}

void runTest() {
  float i, p; bool sat;
  measure(i, p, sat);
  testId++;
  const char *verdict = "OK";
  if (i < 3) verdict = "NO CURRENT (check wiring / polarity)";
  else if (sat || p > P_MAX_MW) verdict = "REJECT: too strong";
  else if (i > I_MAX_MA) verdict = "REJECT: draws too much current";
  else if (i < I_MIN_MA || p < P_MIN_MW) verdict = "REJECT: weak";
  else if (nLog >= 5) {
    float m = medianPower();
    if (p > m * REL_MAX) verdict = "REJECT: much stronger than the batch";
    else if (p < m * REL_MIN) verdict = "REJECT: much weaker than the batch";
  }
  bool ok = verdict[0] == 'O';
  if (ok && nLog < MAX_LOG) log_uW[nLog++] = (uint16_t)(p * 1000);
  // CSV: id, current_mA, power_mW, verdict
  Serial.print(testId); Serial.print(',');
  Serial.print(i, 1); Serial.print(',');
  if (sat) Serial.print(F(">15")); else Serial.print(p, 2);
  Serial.print(','); Serial.println(verdict);
  beep(ok ? 1 : 3, ok ? 80 : 250);
}

void summary() {
  Serial.print(F("Accepted modules: ")); Serial.println(nLog);
  if (!nLog) return;
  uint16_t lo = 65535, hi = 0;
  uint32_t sum = 0;
  for (uint8_t k = 0; k < nLog; k++) {
    if (log_uW[k] < lo) lo = log_uW[k];
    if (log_uW[k] > hi) hi = log_uW[k];
    sum += log_uW[k];
  }
  Serial.print(F("Power mW  min ")); Serial.print(lo / 1000.0, 2);
  Serial.print(F("  median ")); Serial.print(medianPower(), 2);
  Serial.print(F("  mean ")); Serial.print(sum / 1000.0 / nLog, 2);
  Serial.print(F("  max ")); Serial.println(hi / 1000.0, 2);
  Serial.print(F("Use the MEDIAN as 'mW per diode' in the guide's dose calculator."));
  Serial.println();
}

void burnIn() {
  Serial.println(F("Burn-in: module ON for 10 min, power logged every 30 s (s,mW,mA)"));
  float dark = readMv(PIN_PD);
  digitalWrite(PIN_LASER, HIGH);
  uint32_t t0 = millis(), next = 0;
  while (millis() - t0 < 600000UL) {
    wdt_reset();
    if (millis() - t0 >= next) {
      next += 30000UL;
      float pd = readMv(PIN_PD), sh = readMv(PIN_SHUNT);
      Serial.print((millis() - t0) / 1000); Serial.print(',');
      Serial.print((pd - dark) / R_PD / RESPONSIVITY, 2); Serial.print(',');
      Serial.println(sh / R_SHUNT, 1);
    }
    if (Serial.available() && Serial.read() == 'x') break;
  }
  digitalWrite(PIN_LASER, LOW);
  Serial.println(F("Burn-in done. A module whose power drops >20 % should be rejected."));
}

void setup() {
  pinMode(PIN_LASER, OUTPUT);
  digitalWrite(PIN_LASER, LOW);
  pinMode(PIN_BUTTON, INPUT_PULLUP);
  pinMode(PIN_BUZZER, OUTPUT);
  analogReference(INTERNAL);
  Serial.begin(115200);
  Serial.println(F("\nLLLT module tester v1.0 - t test, m summary, b burn-in, h help"));
  Serial.println(F("id,current_mA,power_mW,verdict"));
  wdt_enable(WDTO_8S);
}

void loop() {
  wdt_reset();
  static bool lastBtn = false;
  bool btn = digitalRead(PIN_BUTTON) == LOW;
  if (btn && !lastBtn) { delay(30); runTest(); }
  lastBtn = btn;
  if (Serial.available()) {
    char c = Serial.read();
    if (c == 't') runTest();
    else if (c == 'm') summary();
    else if (c == 'b') burnIn();
    else if (c == 'h') Serial.println(F("t test, m summary, b burn-in (x aborts), h help"));
  }
}
