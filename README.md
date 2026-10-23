# BAR CHECK

BAR CHECK is a responsive Flask game with three rounds: **Find the Rhyme**, **Beat the Bot**, and **Odd Bar Out**. Each round has a countdown, clear pass/fail feedback, and contributes to a score out of three. Find the Rhyme and Odd Bar Out each have 20 seconds; Beat the Bot has 25 seconds.

> **This is a game, not real security.** It does not verify users or protect a website.

## Run locally

1. Install Python 3.9 or newer.
2. From this project folder, create and activate a virtual environment:

   ```powershell
   py -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. Install Flask:

   ```powershell
   python -m pip install -r requirements.txt
   ```

4. Start the app:

   ```powershell
   python app.py
   ```

5. Open <http://127.0.0.1:5000> in your browser.

The app serves its HTML, CSS, and vanilla JavaScript locally. It uses no database or Node.js. The optional music feature uses YouTube’s authorized player; gameplay itself works without that connection. System-font fallbacks are used throughout.

## Optional background music

Use **MUSIC OFF / MUSIC ON** to opt in, adjust the volume slider, then click **ENTER THE CYPHER**. Playback never starts before that click. The track is played by the authorized YouTube embed for “Buss Down” by KR$NA and Raftaar; it is not downloaded or bundled. YouTube may block playback according to browser settings, but the game remains playable and the embedded player provides its own play control. Music is kept quiet during gameplay, ducked further during **Beat the Bot**, and restored when that round ends.

## Play

Click **ENTER THE CYPHER**, complete all three rounds, and use **Next Round** to continue after each result. Rounds 1 and 3 draw from separate pools of 20 original questions; a question is not repeated until its pool is exhausted, and replay avoids the prior run's questions where possible. Answer choices and the odd-bar position are shuffled. Listen to and repeat the four-pad rhythm in Round 2. Passing all three challenges opens the **HUMAN DETECTED** victory screen; **RUN IT BACK** starts a fresh run, while **BACK TO THE CYPHER** returns to the opening screen. A failed round shows the score and retry option instead. Both flows work without reloading the page.
