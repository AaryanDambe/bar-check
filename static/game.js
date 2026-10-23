"use strict";

(() => {
  const ROUND_SECONDS = 20;
  const rounds = [
    {
      id: "rhyme",
      name: "FIND THE RHYME",
      prompt: "Which word rhymes with",
      target: "FLOW",
      answers: ["glow", "beat", "drum", "verse"],
      correct: 0,
      pass: "Clean rhyme. You’re in the pocket.",
      fail: "Not that one. FLOW rhymes with GLOW."
    },
    {
      id: "beat",
      name: "BEAT THE BOT",
      prompt: "Watch the four-pad pattern, then repeat it in order.",
      sequence: [2, 0, 3, 1],
      pass: "Pattern matched. You’ve got rhythm.",
      fail: "Pattern missed. The bot kept the beat."
    },
    {
      id: "odd",
      name: "ODD BAR OUT",
      prompt: "Three bars rhyme together. Pick the one that breaks the pattern.",
      bars: [
        "Neon spills across the night",
        "Kick drum shakes the block tonight",
        "Fresh paint catches all the light",
        "Bassline rolls beneath the street"
      ],
      correct: 3,
      pass: "Good ear. That bar didn’t fit.",
      fail: "That bar fits the rhyme. The street bar was the odd one out."
    }
  ];
  const padNames = ["Lime", "Pink", "Orange", "Blue"];
  const content = document.querySelector("#game-content");
  const startButton = document.querySelector("#start-button");
  const counter = document.querySelector("#round-counter b");
  const progress = document.querySelector("#progress-fill");
  const scoreElement = document.querySelector("#score");

  let roundIndex = -1;
  let score = 0;
  let remaining = ROUND_SECONDS;
  let timerId = null;
  let sequenceTimeouts = [];
  let roundLocked = true;

  function clearScheduledWork() {
    window.clearInterval(timerId);
    timerId = null;
    sequenceTimeouts.forEach(window.clearTimeout);
    sequenceTimeouts = [];
  }

  function updateProgress() {
    const completed = Math.max(0, roundIndex);
    counter.textContent = `${Math.min(completed + 1, rounds.length)} / ${rounds.length}`;
    progress.style.width = `${(completed / rounds.length) * 100}%`;
    scoreElement.textContent = String(score);
  }

  function startGame() {
    clearScheduledWork();
    roundIndex = 0;
    score = 0;
    updateProgress();
    startRound();
  }

  function startRound() {
    clearScheduledWork();
    roundLocked = false;
    remaining = ROUND_SECONDS;
    updateProgress();
    const round = rounds[roundIndex];
    if (round.id === "rhyme") renderRhyme(round);
    else if (round.id === "beat") renderBeat(round);
    else renderOdd(round);
    beginTimer();
  }

  function renderHeader(round) {
    return `<div class="round-heading">
      <div><p class="game-kicker">ROUND 0${roundIndex + 1} <span aria-hidden="true">/</span> 03</p>
      <h2>${round.name}</h2></div>
      <div class="timer" aria-label="20 seconds remaining">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor"/><path d="M10 5.5v4.8l3 1.8" stroke="currentColor" stroke-linecap="round"/></svg>
        <span class="timer-value">${remaining}s</span>
      </div>
    </div>`;
  }

  function renderRhyme(round) {
    content.innerHTML = `${renderHeader(round)}
      <p class="prompt">${round.prompt} <span class="word-target">${round.target}</span>?</p>
      <div class="choice-grid" role="group" aria-label="Choose the word that rhymes with ${round.target}">
        ${round.answers.map((answer, index) => `<button class="choice-button" type="button" data-answer="${index}">${answer}</button>`).join("")}
      </div>
      <p class="feedback" id="feedback" aria-live="polite"></p>
      <button class="action-button continue-button hidden" id="continue-button" type="button">NEXT ROUND <span aria-hidden="true">↗</span></button>`;
    content.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => resolveRound(Number(button.dataset.answer) === round.correct, round, button));
    });
  }

  function renderBeat(round) {
    content.innerHTML = `${renderHeader(round)}
      <p class="prompt">${round.prompt}</p>
      <div class="beat-area">
        <p class="beat-status" id="beat-status" aria-live="polite">Get ready…</p>
        <div class="pad-grid" role="group" aria-label="Four beat pads">
          ${padNames.map((name, index) => `<button class="pad pad-${name.toLowerCase()}" data-pad="${index}" type="button" aria-label="${name} pad" disabled></button>`).join("")}
        </div>
        <p class="beat-hint">YOUR RUN <strong id="beat-count">0 / 4</strong></p>
      </div>
      <p class="feedback" id="feedback" aria-live="polite"></p>
      <button class="action-button continue-button hidden" id="continue-button" type="button">NEXT ROUND <span aria-hidden="true">↗</span></button>`;

    const pads = [...content.querySelectorAll("[data-pad]")];
    const status = content.querySelector("#beat-status");
    const beatCount = content.querySelector("#beat-count");
    pads.forEach((pad) => pad.addEventListener("click", () => {
      if (roundLocked) return;
      const expected = round.sequence[Number(beatCount.textContent.split(" / ")[0])];
      if (Number(pad.dataset.pad) !== expected) {
        resolveRound(false, round, pad);
        return;
      }
      const nextCount = Number(beatCount.textContent.split(" / ")[0]) + 1;
      beatCount.textContent = `${nextCount} / ${round.sequence.length}`;
      flashPad(pad);
      if (nextCount === round.sequence.length) resolveRound(true, round, pad);
    }));
    sequenceTimeouts.push(window.setTimeout(() => {
      if (roundLocked) return;
      status.textContent = "Your turn — repeat the pattern.";
      pads.forEach((pad) => { pad.disabled = false; });
    }, round.sequence.length * 450 + 400));

    round.sequence.forEach((padIndex, index) => {
      const timeoutId = window.setTimeout(() => {
        if (roundLocked) return;
        flashPad(pads[padIndex]);
      }, 650 + index * 450);
      sequenceTimeouts.push(timeoutId);
    });
  }

  function flashPad(pad) {
    pad.classList.add("lit");
    const timeoutId = window.setTimeout(() => pad.classList.remove("lit"), 230);
    sequenceTimeouts.push(timeoutId);
  }

  function renderOdd(round) {
    content.innerHTML = `${renderHeader(round)}
      <p class="prompt">${round.prompt}</p>
      <div class="bar-list" role="group" aria-label="Choose the bar that does not rhyme">
        ${round.bars.map((bar, index) => `<div class="bar-choice"><span class="choice-index">0${index + 1}</span><button class="choice-button" type="button" data-answer="${index}">${bar}</button></div>`).join("")}
      </div>
      <p class="feedback" id="feedback" aria-live="polite"></p>
      <button class="action-button continue-button hidden" id="continue-button" type="button">SEE YOUR SCORE <span aria-hidden="true">↗</span></button>`;
    content.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => resolveRound(Number(button.dataset.answer) === round.correct, round, button));
    });
  }

  function beginTimer() {
    timerId = window.setInterval(() => {
      remaining -= 1;
      const value = content.querySelector(".timer-value");
      const timer = content.querySelector(".timer");
      if (!value || !timer) return;
      value.textContent = `${remaining}s`;
      timer.setAttribute("aria-label", `${remaining} seconds remaining`);
      if (remaining <= 5) timer.classList.add("urgent");
      if (remaining <= 0) resolveRound(false, rounds[roundIndex], null, true);
    }, 1000);
  }

  function resolveRound(passed, round, selectedButton, timedOut = false) {
    if (roundLocked) return;
    roundLocked = true;
    clearScheduledWork();
    if (passed) score += 1;
    updateProgress();
    progress.style.width = `${((roundIndex + 1) / rounds.length) * 100}%`;

    if (selectedButton) {
      selectedButton.classList.add(passed ? "correct" : "wrong");
    }
    content.querySelectorAll("button.choice-button, button.pad").forEach((button) => {
      button.disabled = true;
    });
    const feedback = content.querySelector("#feedback");
    feedback.textContent = timedOut ? `Time’s up. ${round.fail}` : (passed ? round.pass : round.fail);
    feedback.classList.add(passed ? "pass" : "fail");
    const nextButton = content.querySelector("#continue-button");
    nextButton.classList.remove("hidden");
    nextButton.querySelector("span").textContent = "↗";
    nextButton.querySelector("span").setAttribute("aria-hidden", "true");
    nextButton.addEventListener("click", advanceRound, { once: true });
    nextButton.focus();
  }

  function advanceRound() {
    roundIndex += 1;
    if (roundIndex >= rounds.length) {
      showResults();
      return;
    }
    startRound();
  }

  function showResults() {
    clearScheduledWork();
    roundLocked = true;
    counter.textContent = `${rounds.length} / ${rounds.length}`;
    progress.style.width = "100%";
    scoreElement.textContent = String(score);
    const message = score === rounds.length ? "ALL BARS CLEARED." : score > 0 ? "YOU HELD YOUR OWN." : "RUN IT BACK.";
    content.innerHTML = `<div class="result-mark ${score > 0 ? "pass" : "fail"}" aria-hidden="true">${score === rounds.length ? "✳" : "♪"}</div>
      <p class="game-kicker">CHECK COMPLETE</p>
      <h2>${message}</h2>
      <p class="prompt">The booth remembers. Your score:</p>
      <p class="final-score">${score}<span style="color:#77766d;font-size:25px"> / 3</span></p>
      <button class="action-button" id="replay-button" type="button">PLAY AGAIN <span aria-hidden="true">↻</span></button>
      <p class="micro-copy">A GAME, NOT REAL SECURITY.</p>`;
    content.querySelector("#replay-button").addEventListener("click", startGame);
    content.querySelector("#replay-button").focus();
  }

  startButton.addEventListener("click", startGame);
})();
