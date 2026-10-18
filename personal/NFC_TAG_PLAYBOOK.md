# 🏷️ Five Taps v2: iPhone 17 Edition

> 5 NTAG213 stickers, and each one has **its own trick**. No two tags do the same job.
> Goals: **meet more people** · **date better** · **make life run itself**.

## What your stickers can do (from your screenshot)

| NFC Tools showed | What it means |
|---|---|
| NXP NTAG213, signature **valid** | A genuine NXP chip, so it has the **built-in tap counter** that Tags 1 and 4 use. Cheap clones often don't have it. |
| 180 bytes (45 pages) | 144 bytes are yours to use; the rest stores chip settings. That's room for one link of about 130 characters. Tags 1 and 4 use roughly 60. |
| Writable, no password | Ready to use. |
| Serial `04:D1:F5:FA:AC:1E:90` | Every sticker has a different one. Your iPhone recognises the private tags (2, 3, 5) by this number, so **those can stay blank**. |

## The five tags

| # | Tag | What it does | How it works | Who taps | Where |
|---|---|---|---|---|---|
| 1 | **The Living Card** 🤝 | Tells each person *"you're the 37th person to tap this"*, then gets their number | The chip's own tap counter. No server, no app on their phone | Anyone | Plastic card in your wallet |
| 2 | **Keychain Brain** 🧠 | Turns a 15-second voice note into a saved memory and a follow-up reminder at the right time | Apple Intelligence model inside Shortcuts | You | Acrylic anime charm on your keys |
| 3 | **Launch Pad** 🚪 | Knows whether you're leaving or coming back, and whether it's date night | Saves its state between taps and reads your calendar | You | Wall beside your front door |
| 4 | **Chemistry Deck** 🎴 | The chip picks the question **and** whose turn it is | Uses the tap counter like a dice | Anyone | Bookmark or coaster |
| 5 | **The Mirror** 🪥 | An alarm you can only cancel by getting out of bed | You have to be at the sticker. The alarm time comes from tomorrow's calendar and traffic | You | Tile beside the bathroom mirror |

**The tags share one memory**
- 🧠 writes everyone you meet to `people.txt`. 🚪 reads it before a date to suggest topics, and saves the date debrief back into it.
- 🤝 puts the tap number in the WhatsApp message, so "card #37" in a chat tells you who that is.
- 🪥 saves tomorrow's "one thing" at night and reads it back to you in the morning.

---

## 0. One-time setup (20 min)

1. **Apps**
   - **NFC Tools** (free): reads and writes tags.
   - **NFC.cool Tools**: needed only for the tap counter on Tags 1 and 4, which is a paid Pro feature. Subscribe for one month, write both tags, then cancel. The chip keeps counting forever after that.
2. **Apple Intelligence:** turn it on in Settings → Apple Intelligence & Siri. Every iPhone 17 model supports it.
3. **Alarm deletion:** turn on Settings → Apps → Shortcuts → Advanced → **Allow Deleting Without Confirmation**. The Mirror needs this to delete its own alarms.
4. **Date Focus:** create it in Settings → Focus → **+** → Custom, and name it "Date". Let through only your wingman and family.
5. **Each private tag (2, 3, 5):** Shortcuts → Automation → **+** → NFC → Scan. Hold the sticker to the **top edge of the iPhone**, then choose **Run Immediately** → New Blank Automation and add the actions below. Turn off *Notify When Run* if you want it silent.
6. **Unlock first:** automations only run when the iPhone is unlocked. Glancing at it (Face ID) is enough.
7. **Placement rules**
   - **Never put a tag on metal:** keys, laptops, steel doors, the back of a mirror.
   - Don't stack tags on top of each other.
   - Cover tags with clear tape in wet places.
   - Put a small anime sticker over each tag so people know where to tap.

The shortcuts store their data as text files in **iCloud Drive › Shortcuts** (`people.txt`, `door.txt`, `tomorrow.txt`, `good-things.txt`). Open them in the Files app any time.

---

## Tag 1: The Living Card 🤝 (meet people)

**How it works:** the NTAG213 has a counter that goes up by one every time the tag is read. It can't be reset. NFC.cool sets the chip to add that count and its serial number to the link, so every tap opens a **slightly different URL**. The counting happens inside the sticker, with no server involved.

**What the other person sees** (this needs a small `/hi` page on your portfolio):

> **You're person #37 to tap this card.** ✅ *Genuine Purvam card*
> Purvam Prajapati · Software Engineer @ TCS · AI/ML
> *Currently:* rewatching ___ · reading ___ · on repeat: ___
> [ 💬 Say hi on WhatsApp ] [ 📇 Save my contact ] [ LinkedIn ]

- **Milestones:** every 25th person sees *"🎉 You're #50. Coffee's on me. Show Purvam this screen."* People will want to know their number.
- **Changes with the time of day:** on weekdays from 9 to 7 the big button is LinkedIn. In the evenings and at weekends it's WhatsApp.
- **A pre-filled WhatsApp message** arrives on your phone looking like this: *"Hey Purvam! It's ___ (card #37), we met at ___."* You get their number, their name and where you met.
- **The "Currently" line** changes whenever you want, and gives people an easy question to ask you.

**How to write it:** NFC.cool → NFC Tap Counter → URL `https://YOUR-SITE/hi/` → turn on **Tap Counter** and **Tag ID** → Write.
On every tap the chip sends `https://YOUR-SITE/hi/?nfc=04D1F5FAAC1E90x000025`. The count is in hex: `0x25` = 37.

**Calibrate:** your own test taps count too. When you've finished testing, note the current count; the page subtracts it so the first real person is #1.

**Before the page exists (free version):** use NFC Tools to write
`https://wa.me/91XXXXXXXXXX?text=Hey%20Purvam!%20%F0%9F%91%8B%20It%27s%20____%20-%20we%20met%20at%20____`

**Where:** stick it on the back of an old plastic card (a metro or gift card). Keep it away from your bank and metro cards, because a wallet full of contactless cards confuses phones. Take it out and hand it over.
**What to say:** *"This card counts everyone it's met. Want to see your number?"*

---

## Tag 2: Keychain Brain 🧠 (remember people)

**Where:** on the back of a flat **acrylic anime keychain charm**, not on a key (keys are metal).

People remember **that you remembered**. Tapping your keys shows a menu:

- **🆕 Just met someone:** say whatever comes to mind as you walk away: *"That was Riya, PM at Zomato, met at the GDG meetup, moving to Bangalore in December, loves Jujutsu Kaisen."* Apple Intelligence sorts it into a note and decides **when** you should follow up.
- **🔎 Who's this again?:** say a name and it reads back into your AirPods: *"Riya, a PM at Zomato you met at GDG in October. Ask how the Bangalore move went."*
- **📊 Weekly report** (Sundays): who you met this week, plus 3 people to message, each with a suggested first line.

```
Choose from Menu: 🆕 Just met · 🔎 Who's this? · 📊 Weekly report

🆕 Just met
  Dictate Text
  Use Model (On-Device):
    "Voice note about someone I just met: «[Dictated Text]».
     Reply with raw JSON only, no code fences:
     {"name":"","where":"","facts":"","ask_about":"","days":3,"type":"work|friend|date"}
     days = days until a natural follow-up, between 2 and 14."
  Get Dictionary from Input
  Get Current Location
  Text: "[Current Date] | [type] | [name] | [where], [Location: City] | [facts] | ask: [ask_about]"
  Append to Text File: people.txt   (Make New Line: on)
  Adjust Date: add [days] days to Current Date
  Add New Reminder: "Message [name] - ask about [ask_about]"   alert: [Adjusted Date] 7:00 PM
  Show Notification: "🧠 Got [name]. I'll nudge you in [days] days."

🔎 Who's this?
  Dictate Text → Name
  Get File: people.txt   (Error If Not Found: off)
  Match Text: (?i).*[Name].*
  If Matches has any value
    Use Model (On-Device): "In 2 short sentences, brief me on [Name] from these notes:
      [Matches]. Say how we met and the best thing to ask about."
    Speak Text
  Otherwise
    Speak Text: "No memory of [Name] yet. Tap me after you talk."

📊 Weekly report
  Get File: people.txt
  Use Model (Private Cloud Compute):
    "Today is [Current Date]. From these notes, list who I met in the last 7 days.
     Then pick 3 people I should message this week, each with a one-line opener
     based on what they told me: [File]"
  Show Result
```

The **On-Device** model keeps your notes on your phone. Only the weekly report uses Private Cloud Compute, because it needs to read the whole file.

---

## Tag 3: Launch Pad 🚪 (easier days and dates)

**Where:** on the wall beside the front door at shoulder height. If your door is steel, it **must** go on the wall.

It saves `out`, `date` or `home` in `door.txt` each time you tap. That's how the same sticker knows whether you're **leaving or coming back**. Your calendar tells it whether it's **date night**: put ❤️ in the event title, for example `❤️ Ananya · Blue Tokai`.

| | 🚀 Leaving | 🏠 Coming back |
|---|---|---|
| **Normal day** | ☔ Warns you if rain is likely · tells you your next event and travel time · gives you a 🎲 **Commute Mission** | Sends "Reached home ✅" to family |
| **Date night** (❤️ event within 4 h) | Date Focus on · 3 AI conversation topics **based on your notes about her** · checklist · sends your location to your wingman · hype playlist | Focus off · "Home ✅" to wingman · 30-second spoken debrief → AI suggests **a callback text for tomorrow** + reminder at 10 am |

**🎲 Commute Mission:** picks a random friend and opens WhatsApp with *"Hey ___, randomly thought of you. How's everything going?"* already typed. Once every working day, that's about 250 people a year you get back in touch with. Research on "weak ties" (Granovetter) found that new opportunities often come from acquaintances rather than close friends.

**Callback text:** instead of "had fun", send something that refers back to the date: a song, an anime, a book or a reel linked to something she said.

```
Get File: door.txt (Error If Not Found: off) → State
If State contains "out" or "date" → ARRIVING
Otherwise → LEAVING

── LEAVING ──
Find Calendar Events: Start Date is in the next 4 hours AND Title contains ❤️, Limit 1
If Calendar Events has any value                                   ── DATE ──
  Replace Text "❤️ " with "" in [Event Title] → Split Text by " · " → First Item → Her
  Save File: "date|[Her]" → door.txt (Ask Where: off, Overwrite: on)
  Set Focus: Date → On until turned off
  Get File: people.txt → Match Text (?i).*[Her].*
  Use Model (On-Device): "I'm going on a date with [Her]. My notes: [Matches].
    Give 3 light, specific conversation threads and 1 thing to avoid. Max 60 words."
  Show Result
  Choose from List (Select Multiple): Wallet · Keys · Phone > 50% · Perfume · Mints · Backup cash
  Get Current Location → Get Maps URL
  Send Message to [Wingman]: "Date mode ON 🫡 [Event Location] · I'm here: [Maps URL]"
  Play Music: Hype playlist
Otherwise                                                          ── DAY ──
  Save File: "out" → door.txt (Overwrite: on)
  Get Weather Forecast (Daily) → First Item → Precipitation Chance
  If Precipitation Chance > 50 → Speak Text "Rain likely. Grab an umbrella."
  Find Calendar Events: Start Date is after Current Date, today, Limit 1
  Get Travel Time to [Event Location] → Speak Text "[Event Title] at [Start Date], [Travel Time] away"
  Text:  Aarav|91XXXXXXXXXX
         Neha|91XXXXXXXXXX        ← your 20-50 friends
  Split Text by New Lines → Get Item from List: Random Item
  Split Text by "|" → First Item → Name, Last Item → Number
  URL Encode "Hey [Name]! Randomly thought of you - how's everything going?"
  Open URLs: https://wa.me/[Number]?text=[URL Encoded Text]

── ARRIVING ──
Save File: "home" → door.txt (Overwrite: on)
If State contains "date"
  Split State by "|" → Last Item → Her
  Set Focus: Date → Off
  Send Message to [Wingman]: "Home ✅"
  Dictate Text   ("How was it? What did she say that you want to remember?")
  Use Model (On-Device): "Date debrief: «[Dictated Text]». Reply with raw JSON only:
    {"rating":0,"remember":"","callback":""}. callback = one specific song, anime,
    book, place or reel tied to something she said, to send her tomorrow."
  Get Dictionary from Input
  Append to Text File: people.txt → "[Current Date] | date | [Her] | [rating]/10 | [remember]"
  Add New Reminder: "Text [Her]: [callback]"   alert: tomorrow 10:00 AM
Otherwise
  Send Message to [Family]: "Reached home ✅"
```

*If your wingman or family only use WhatsApp, swap in WhatsApp's own **Send Message** action. It may ask you to confirm before sending.*

---

## Tag 4: Chemistry Deck 🎴 (dates, friends, team)

**Where:** inside the back cover of the book you carry, or on a bookmark with a "?" drawn over it. For dates at home, stick it under a coaster.

**With the `/q` page and tap counter** (works on anyone's phone):
- **The chip picks the question:** question = deck[count mod size]. The count goes up by one on every tap, so two taps in a row never give the same question.
- **The chip picks the turn:** an even count shows *"🎲 YOU answer"*, an odd count shows *"🎲 THEY answer"*. Nobody gets to argue with the chip.
- **Levels unlock as you play:** each phone remembers where tonight's session started.
  - Taps 1–6: ⚡ **Spark.** *"Which anime character would be the worst roommate?"* · *"What song plays when you walk into a room?"*
  - Taps 7–14: 💬 **Real.** *"What did you change your mind about recently?"* · *"What are you secretly proud of?"*
  - Taps 15+: 🌙 **Deep**, from Arthur Aron's *36 Questions* study on closeness: *"What would be a perfect day for you?"* · *"What's your most treasured memory?"*
- **House rule:** skipping a question means answering one from the next level up.
- **Deck switcher:** ❤️ Date · 🍕 Friends · 💼 Team (TCS lunches, new joiners).

**How to write it:** NFC.cool → NFC Tap Counter → URL `https://YOUR-SITE/q/` → turn on **Tap Counter** → Write.

**Before the page exists:** leave the tag blank and add a private automation, then hand over your phone.
```
Choose from Menu: ⚡ Spark · 💬 Real · 🌙 Deep
Use Model (On-Device): "One fresh [Chosen Item] question for two people on a date in India.
  Playful, not cringe, under 20 words."
Show Alert: [Response]
```
When `/q` is live, rewrite the tag with NFC.cool and delete this automation.

---

## Tag 5: The Mirror 🪥 (life runs itself)

**Where:** on the wall or tile **next to** the bathroom mirror at phone height. Don't stick it on the glass, because a mirror's reflective metal layer can block the signal. Cover it with clear tape against splashes.
You brush your teeth twice a day anyway, so tapping the tag becomes part of a habit you already have.

**🌙 Night tap**
- Reads tomorrow's first event and the traffic, then sets the alarm: **event time − travel time − 75 min to get ready**. It's never later than your usual time (7:30 on weekdays, 9:00 at weekends if nothing's on).
- Creates **🪥 Wake** plus 3 backup alarms at +4, +8 and +12 minutes.
- Asks *"One thing that matters tomorrow?"* and *"One good thing today?"*. By December, `good-things.txt` is a record of your whole year.
- Turns on Sleep Focus and Low Power Mode, then shows *"⏰ 7:05 · first up: standup 9:30 (25 min traffic)."*

**☀️ Morning tap**
- You can dismiss 🪥 Wake from bed, but **the backups keep ringing until you're standing at the mirror**. Tapping the tag deletes them, so you can't snooze your way back to sleep.
- While you brush, Siri reads a **30-second briefing** written by Apple Intelligence: the weather, your first meeting and when to leave, reminders, and the "one thing" you set last night.

```
Get All Alarms → Repeat with Each
  If [Repeat Item] Label contains "🪥" → Delete Alarm [Repeat Item]
End Repeat
If Current Date is before 12:00 PM → MORNING, Otherwise → NIGHT

── NIGHT ──
Format Date: "tomorrow", custom "EEE" → Day
Default = 9:00 AM tomorrow if Day is Sat/Sun, otherwise 7:30 AM tomorrow
Find Calendar Events: Start Date is between "tomorrow 12:00 AM" and "tomorrow 11:59 PM",
  Is All Day is false, Sort by Start Date (Oldest First), Limit 1
If Calendar Events has any value
  Get Travel Time to [Event Location]          (no location? use 30 min)
  Calculate: [Travel Time in minutes] + 75 → Lead
  Adjust Date: subtract [Lead] minutes from [Event Start Date] → Wake
  If Wake is after Default → Wake = Default
Otherwise → Wake = Default
Create Alarm "🪥 Wake" at [Wake]
Adjust Date +4, +8, +12 minutes → Create Alarm "🪥 Backup" (×3)
Dictate Text ("One thing that matters tomorrow?") → Save File tomorrow.txt (Overwrite: on)
Dictate Text ("One good thing today?") → Append to Text File good-things.txt: "[Current Date] - [Dictated Text]"
Set Focus: Sleep → On · Set Low Power Mode: On
Show Notification: "⏰ [Wake] · first up: [Event Title]"

── MORNING ──   (the backups were already deleted above)
Get Weather Forecast (Daily) → First Item
Find Calendar Events: Start Date is today, Is All Day is false
Find Reminders: Due Date is today, Is Not Completed
Get File: tomorrow.txt
Use Model (On-Device): "Write a spoken morning briefing for Purvam. Under 80 words, warm,
  a bit funny, no lists. Weather: [..]. Events: [..]. Reminders: [..].
  His one thing for today: [..]. End with one line of motivation."
Speak Text
Set Low Power Mode: Off
```

---

## Manners and safety
- **Ask before anyone taps:** *"Can I show you something cool?"*
- **Anything on a public tag (1, 4) is public.** The private tags are blank, so if someone else taps them, nothing happens.
- The only location these shortcuts share is **yours**, and only with your wingman. Never use them to track anyone else.
- Your notes about people stay in iCloud Drive. **Don't commit `people.txt` to this repo, because it's public.**
- The dating tags help you be present and thoughtful; they're not a script to follow. Listening still matters most.

## This weekend
- [ ] **Sat morning:** setup steps 1–4, then the free version of 🤝 Tag 1 (WhatsApp link).
- [ ] **Sat:** 🧠 Keychain Brain. Test it by logging 3 people you met this week, then try 🔎 on one of them.
- [ ] **Sat night:** 🪥 Mirror. Brush your teeth, tap, and check the alarms in the Clock app.
- [ ] **Sun:** 🚪 Launch Pad. Add your friends list and a test ❤️ event to try the date flow.
- [ ] **Sun:** 🎴 Chemistry Deck as a private automation until `/q` exists.
- [ ] **Later:** NFC.cool Pro for one month → rewrite Tags 1 and 4 with the tap counter → cancel.

## Still needed from you
1. Your portfolio's live domain, and whether you want the `/hi` and `/q` pages built (static, so they work with your Cloudflare Pages export).
2. Your wingman, and the family member who should get "Reached home ✅".
3. 20–50 friends for the Commute Mission.
4. Your "Currently" line (anime, book, song on repeat) for the Living Card.

## Sources
- Apple: [Use Apple Intelligence in Shortcuts](https://support.apple.com/en-mt/guide/shortcuts/tpg3vrvwmclv/ios), covering the Use Model action, On-Device vs Private Cloud Compute
- NFC.cool: [How to Count NFC Tag Scans Without a Server](https://nfc.cool/blog/count-nfc-tag-scans/) and [Parse NFC Tap Counter Data](https://nfc.cool/blog/ios-shortcuts-nfc-tap-counter/), covering the NTAG21x counter, the `?nfc=` format and the Pro requirement
- RoutineHub: [Don't Be Alarmed](https://routinehub.co/shortcut/21112/), covering deleting alarms without confirmation
- Aron et al. (1997), *The Experimental Generation of Interpersonal Closeness* (the 36 Questions); Granovetter (1973), *The Strength of Weak Ties*

*Content from these sources was rephrased for compliance with licensing restrictions.*
