# BAR CHECK

BAR CHECK is a small, responsive Flask game with three CAPTCHA-style mini-games: **Find the Rhyme**, **Beat the Bot**, and **Odd Bar Out**. Each round has a 20-second countdown, clear pass/fail feedback, and contributes to a score out of three.

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

The app serves its HTML, CSS, and vanilla JavaScript locally. It uses no database, Node.js, or external APIs; system-font fallbacks are used throughout.

## Play

Start the check, complete all three rounds, and use **Next Round** to continue after each result. Choose a rhyme, watch and repeat the four-pad sequence, then pick the line that breaks the rhyme. The final screen shows your score and lets you replay without reloading the page.
