## 🌿 Working Title: “Recollect”

_(just a placeholder name, but captures the idea of remembering your own good ideas)_

### ✨ Core idea

A personal “idea surfacer” for how you want to spend your free time.

You capture things you’d like to do — big or small — and when the weekend hits, it intelligently reminds or suggests them based on your context (time, mood, weather, etc.).

---

### 🧠 Core MVP Features (Web)

**1. Quick Capture**

- A super-fast way to add ideas: “new restaurant,” “watch _Spirited Away_,” “visit the farmer’s market.”
- Add optional tags: _outdoors_, _solo_, _friends_, _low energy_, _foodie_, etc.
- (Stretch goal: add location or link support.)

**2. Surfacing / Discovery**

- A “Weekend” or “What should I do?” button that shows a small curated set of ideas.
- Filtering by mood, time, or category (or even random shuffle).
- Optionally, it can prioritize ideas you haven’t done in a while.

**3. Mark as Done / Archive**

- When you do something, you can mark it as done — keeps the interface clean and gives you a nice “life log” view later.

**4. Light Reminder System**

- At a configurable time (like Friday afternoon or Saturday morning), it can email or notify you with a few curated suggestions — a gentle nudge to be intentional.

---

### 🧭 Nice-to-have Later (Phase 2)

- Weather or location-based recommendations (“It’s sunny — remember you wanted to go kayaking!”).
- Integration with your calendar (so it only suggests things when you’re actually free).
- Mobile version with quick capture from anywhere.
- “Serendipity” mode — random combo generator (“Try a new cafe + read for an hour”).
- Analytics on how you actually spend your weekends (e.g. “You did 3 outdoorsy things last month”).

---

### ⚙️ Tech Stack Possibilities

Since you’re a software engineer, you probably have preferences here — but a natural stack might be:

- **Frontend:** React (with Next.js if you want SSR / API routes).
- **Backend:** Node/Express or Next’s built-in API routes.
- **Database:** Supabase or Firebase (fast to prototype).
- **Auth:** Clerk, Supabase Auth, or next-auth.
- **Optional:** OpenWeatherMap API (for weather-based suggestions).

---

### 💭 A few design philosophies to keep it compelling

- **Low friction:** Adding an idea should take <5 seconds.
- **No guilt:** It’s not about productivity — more like a “menu for your free time.”
- **Playful tone:** Maybe the UI feels warm and calm, not like a dashboard.
- **Personal data stays private:** No social feed, no likes, just your own archive.
