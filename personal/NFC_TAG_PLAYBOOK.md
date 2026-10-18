# 🏷️ Five Taps: Purvam's NFC Sticker Playbook

> 5 stickers, 3 goals: **meet more people**, **date better**, **make life easier**.
> This is v1, the general version. Answer the questions at the bottom and v2 will be built around your actual routine.

## The 5 tags at a glance

| # | Name | Goal | Where it goes | Who taps it | What's on the tag |
|---|------|------|---------------|-------------|-------------------|
| 1 | **The Reverse Business Card** | People | A card in your wallet | Anyone you meet | A URL (WhatsApp or your own page) |
| 2 | **The Keychain Brain** | People + Dating | Your keychain | You (and anyone who finds your keys) | Blank, or a "found my keys" URL |
| 3 | **Date Mode** | Dating | The wall by your door | You | Blank |
| 4 | **Tap for a Question** | Dating + People | A bookmark or small card | Your date, friends, your team | A URL to a question deck |
| 5 | **Bedside Life OS** | Easy life + People | The side of your nightstand or bed frame | You | Blank |

**There are two kinds of tags:**
- **Public tags (1, 4)** store a URL. Any modern phone opens it on tap, with no app needed.
- **Private tags (2, 3, 5)** run automations on *your* phone only. On iPhone they can be completely blank, because Shortcuts recognises the tag by its unique ID.

The recipes below use iPhone Shortcuts. If you're on Android, say so and v2 will have the Android steps.

---

## 0. One-time setup (15 min)

**Check your stickers.** The pack will say NTAG213, 215 or 216. Any of these is fine. NTAG213 holds about 144 bytes, which is plenty for a URL.

| | iPhone (XS or newer) | Android |
|---|---|---|
| Writing URLs to tags | **NFC Tools** app | **NFC Tools** app |
| Running automations | **Shortcuts** (built in) | **MacroDroid** (NFC trigger) or NFC Tools + NFC Tasks |

- **Writing a public tag (NFC Tools):** Write → Add a record → URL/URI → paste the link → OK → Write → hold the sticker to the phone. On iPhone that's the **top edge**; on most Androids it's the **middle of the back**.
- **Setting up a private tag (iPhone):** Shortcuts → Automation → **+** → NFC → Scan → hold the tag → name it → **Run Immediately** → add the actions.

**Rules to follow**
1. **Point public tags at a URL you control**, like `your-portfolio/hi`. Then you can change where the tag sends people without rewriting it. Your portfolio is already on Cloudflare Pages, so this is easy.
2. **Test with one iPhone and one Android, then lock the tag** (NFC Tools → Other → Lock tag) so nobody else can overwrite it. ⚠️ Locking is permanent, so test first.
3. **Keep tags off metal.** Normal stickers don't work on laptop lids, fridges, MagSafe rings or metal cases. For those spots, use an *anti-metal* tag or put 3–5 mm of foam tape underneath.
4. **Don't stack two tags**, and **don't put one on your office access card**, because readers get confused.
5. **Mark each tag**, for example with a small anime sticker on top. You'll know which tag is which, people will know where to tap, and they'll ask about it.
6. Cover tags in high-touch spots with clear tape.

---

## Tag 1: The Reverse Business Card 🤝
**Goal:** meet more people and actually stay in touch.

**What's different:** a normal NFC business card *sends* your details to someone, and then you usually never hear from them. This tag gets **their** details instead. When they tap it, WhatsApp opens on *their* phone with a message to *you* already typed:

> Hey Purvam! 👋 It's ____ - we met at ____

They fill in two blanks and press send. You get their number, their name and *where you met*, and the conversation has already started. Nobody has to remember to "add you later".

**Write this URL** (your number with country code, no `+` and no spaces):
```
https://wa.me/91XXXXXXXXXX?text=Hey%20Purvam!%20%F0%9F%91%8B%20It%27s%20____%20-%20we%20met%20at%20____
```

**Upgrade (can be added to your portfolio):** point the tag at `your-site/hi` instead. That would be a one-screen page with:
- Your photo and one line: *Software Engineer @ TCS · AI/ML · anime, music, art & books*
- **Save my contact**: a `.vcf` file, so their phone offers "Create New Contact"
- **Say hi on WhatsApp**: the pre-filled message above
- **LinkedIn / Instagram**
- **A switch based on time of day:** on weekdays from 9 to 7 the top button is LinkedIn; in the evenings and at weekends it's WhatsApp or Instagram.

**Where to stick it:** on the back of an old plastic card (an expired metro or gift card) that lives in your wallet. Take it out and say "tap here". You could put it on your phone case instead, but test that first: your own phone may keep picking it up, and MagSafe or metal will block it.

**What to say:** *"I got tired of typing numbers, so I built this. Tap here."* People usually ask how it works, which gets you talking.

**Good places to use it:** tech meetups, hackathons, conferences, weddings, cafés, the gym, new teams at work.

---

## Tag 2: The Keychain Brain 🧠
**Goal:** remember the details about people.

People don't remember what you said. They remember that *you remembered*. Messaging "How did the presentation go?" three days later does more than any networking script or pickup line. This tag makes that happen automatically.

**How it works:** after you meet someone (a new colleague, someone at a meetup, a date), tap your keys to your phone as you walk away. It takes about 20 seconds:

1. **Who?** (dictate it)
2. **Where or how did you meet?**
3. **One detail worth remembering**: their dog's name, an exam on Friday, their favourite anime, a trip next month
4. **Type:** Work, Friend or Date

The shortcut then:
- adds a line like `📅 18 Oct · Work · Riya - AI meetup - 💡 moving to Bangalore in Dec` to a note called **People I Met**, with the date and your location filled in automatically
- sets a reminder **3 days later at 7 pm**: "Message Riya - ask about the Bangalore move"
- for a **Date**, also sets a reminder for **tomorrow at 10 am**: "Send her something that ties back to ____"

**iPhone recipe** (Automation → NFC → "Keychain" → Run Immediately):
```
Dictate Text                              → Name
Ask for Input  "Where did you meet?"      → Where
Ask for Input  "One detail to remember?"  → Detail
List: Work, Friend, Date → Choose from List → Type
Get Current Location
Text: "📅 [Current Date] · [Type] · [Name] - [Where] ([Location]) - 💡 [Detail]"
Append to Note  "People I Met"
Adjust Date: Current Date + 3 days
Add New Reminder "Message [Name] - ask about [Detail]"  (alert: Adjusted Date, 7 pm)
If Type is "Date" → Add New Reminder "Send [Name] something about [Detail]" (alert: tomorrow 10 am)
```

**Optional lost-keys mode:** also write this URL to the tag: `https://wa.me/91XXXXXXXXXX?text=Hi!%20I%20found%20your%20keys%20at%20____`. Anyone who finds your keys can tap them and message you. Your iPhone still runs the automation, but it will also show a small banner for the link; just ignore it. If you don't want the banner, leave the tag blank.

**Every Sunday (5 min):** read through *People I Met*. If there's anyone you haven't followed up with, message them now. Doing this every week grows your network a lot over a year.

---

## Tag 3: Date Mode 💫
**Goal:** be relaxed and present on the date, then follow up well.

**Where:** on the wall by your door or next to the mirror, or inside your wardrobe door. Put it wherever you do your last check before leaving.

Tapping it shows a menu: **🚀 Heading out** / **🏠 Back home**

**🚀 Heading out**
- Turns on a **Date Focus**, which silences everything except a few favourites (set this up once under Settings → Focus). Your phone stays in your pocket and she gets your attention.
- Shows a **pre-flight checklist** (Choose from List → Select Multiple): wallet · keys · phone over 50% · perfume · mints · UPI working · backup cash.
- Opens a note with **3 things to ask about**, taken from her profile or her Keychain Brain entry, so you always have something to talk about.
- Starts a **hype playlist** for the ride.
- Sends a **wingman ping** to your best friend: "Date mode ON 🫡 - at [current location]". That covers safety and holds you to it.

**🏠 Back home**
- Turns the Focus off.
- Runs a 30-second **debrief**, added to *People I Met* with a #date tag: How did it go (1–10)? What did she mention that you should remember? What would you do differently?
- Sets a reminder for tomorrow at 10 am to **send a callback instead of "had fun"**: a song, an anime, a book or a reel linked to something she said. It means much more to her.
- Sends the wingman "Home ✅".

---

## Tag 4: Tap for a Question 🎴
**Goal:** get past small talk on dates and in groups.

Put the sticker on a bookmark (you're into books, so this fits) or a small card with a little "?" drawn on it. Say "tap this" at the start, or when the conversation slows down. Their phone opens a page that shows a random question. Take turns tapping; each tap gives a new question.

**Three levels**
- **Level 1, Fun:** "Which anime or movie character would be the worst roommate?" · "What song plays when you walk into a room?" · "What's a hill you'll die on?"
- **Level 2, Real:** "What's something you changed your mind about recently?" · "What are you secretly proud of?" · "What did 15-year-old you think your life would look like?"
- **Level 3, Deep:** taken from psychologist Arthur Aron's *36 Questions* study on how people get close: "What would be a perfect day for you?" · "What's your most treasured memory?"

**Extra decks:** a **Team** deck (safe for work, for TCS team lunches and new-joiner icebreakers) and a **Friends** deck (for parties). One tag covers all of them; the page has a deck switcher.

**Why it works:** it's fun, most people have never seen anything like it, and the game takes over the job of deciding what to talk about. Aron's research found that people grow close quickly when they share a little more each time. This tag turns that into a game.

**Building it:** this needs a small page. A `/q` page can be added to your portfolio: static, no backend, and it works with your Cloudflare Pages setup. Until then, point the tag at a note or doc of questions.

**A one-time special move (later):** when you're with someone special, rewrite a sticker and hide it inside a gift, for example under a bookmark in a book you give her, or inside a card. When she taps it, it plays a voice note or a playlist you made for her. It costs nothing and she won't forget it.

---

## Tag 5: Bedside Life OS 🌙☀️
**Goal:** make your mornings and nights run themselves, and keep in touch with people.

**Where:** on the side of your nightstand or bed frame, within arm's reach. Don't put it on the charger (MagSafe magnets and metal block it) or under where your phone lies.

What it does depends on the time: `If Current Date is before 12:00 PM → Morning, Otherwise → Night`.

**🌙 Night tap (when your phone goes on the charger)**
- Sleep Focus on, brightness down, Low Power Mode on.
- **Toggle Alarm**: switches on your *Weekday 7:00* or *Weekend 9:00* alarm.
- **Tomorrow's top 3** (dictated) gets saved.
- **One good thing today** (one line) gets added to a *Good Things 2026* note. By December you'll have a record of your year without ever sitting down to journal.
- Plays rain sounds, lofi or an anime OST with a sleep timer.

**☀️ Morning tap**
- Reads out the weather, your first meeting and last night's top 3.
- **Friendship Roulette 🎲** picks one random person from your *Keep in Touch* list (school and Charusat friends, ex-colleagues, cousins, that senior who helped you) and opens a WhatsApp chat with them, already written: *"Hey ___, randomly thought of you - how's everything going?"* One message a day is **365 people back in touch each year**. Research on "weak ties" (Granovetter) found that new jobs and opportunities often come from acquaintances, not close friends, so this is worth doing.

**Friendship Roulette recipe**
```
Text:   Aarav|91XXXXXXXXXX
        Neha|91XXXXXXXXXX
        ...
Split Text by New Lines
Get Item from List: Random Item
Split Text by Custom "|"
Get Item from List: First Item  → Name
Get Item from List: Last Item   → Number
URL Encode "Hey [Name]! Randomly thought of you - how's everything going?"
Open URLs  https://wa.me/[Number]?text=[URL Encoded Text]
```

---

## Want more? Expansion pack (stickers are cheap, so get a 10-pack)

| Tag | Where | What it does |
|---|---|---|
| Deep Work | Desk or laptop stand (not on metal) | Turns on Focus, starts a 50-min timer and logs the session; tap again to end. Gives you weekly hours without any effort. |
| Door | Inside the front door | Leaving: weather, "umbrella?" and commute time. Coming back: texts family "Reached home ✅". |
| Gym bag | Bag strap | Starts your workout playlist and logs the date, so you can track streaks. |
| Meds / supplements | Bottle cap | Logs "taken at 8:42", so you never wonder whether you took it. |
| Lost & found | Laptop sleeve, luggage, earbuds case | "Found this? Tap to message the owner." |
| Event badge | Back of a conference badge | Opens your `/hi` page. |
| Guest Wi-Fi | Next to the router | One-tap Wi-Fi on most Androids (iPhones need a QR code instead). |

---

## Manners and safety
- **Ask before anyone taps:** "Can I show you something cool?"
- **Anything on a public tag is public.** Only put on it what you're happy for anyone to have, and think twice before leaving tags in public places.
- These automations log *your* memories and *your* location. Never use them to track where someone else is.
- The dating tags are there to help you be present and thoughtful, not to run a script. Listening still matters most.

---

## This weekend's plan
- [ ] **Sat morning:** write Tag 1, test it on an iPhone and an Android, then lock it.
- [ ] **Sat:** build the Keychain Brain (Tag 2) and test it by logging 3 people you met this week.
- [ ] **Sat night:** set up the Bedside Life OS (Tag 5) and start your *Keep in Touch* list with 20 names.
- [ ] **Sun:** set up Date Mode (Tag 3) and the Date Focus.
- [ ] **Sun:** decide on Tag 4: build `/q`, or save the sticker for the gift move.

## Questions for v2
1. iPhone or Android, and which model?
2. Does the portfolio have a custom domain? Do you want the `/hi` (tap page) and `/q` (question deck) pages built?
3. Where should people you meet end up: WhatsApp, Instagram or LinkedIn? Different for work and social?
4. Where do you meet people now: office, meetups, gym, college friends, dating apps (which ones)?
5. Who's your wingman for the Date Mode pings?
6. What time do you wake up and go to bed on weekdays and weekends?
7. Any smart home devices (smart bulb, Alexa, Google Home)? Date Mode could dim the lights and start music.
8. Which ideas did you love, and which didn't do much for you?
