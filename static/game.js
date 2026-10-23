"use strict";

(() => {
  const ROUND_SECONDS = 20;
  const BEAT_SECONDS = 25;
  const rounds = [
    { id: "rhyme", name: "FIND THE RHYME", timerSeconds: ROUND_SECONDS },
    {
      id: "beat",
      name: "BEAT THE BOT",
      prompt: "Listen to the four-beat groove, then tap the same pads in order.",
      timerSeconds: BEAT_SECONDS,
      pass: "BEAT MATCHED — BAR APPROVED!",
      fail: "OFF BEAT — TRY AGAIN!"
    },
    { id: "odd", name: "ODD BAR OUT", timerSeconds: ROUND_SECONDS }
  ];
  const rhymeQuestions = [
    { id: "flow", target: "FLOW", options: ["glow", "brick", "drum", "mic"], correct: "glow" },
    { id: "night", target: "NIGHT", options: ["light", "bars", "boom", "mic"], correct: "light" },
    { id: "beat", target: "BEAT", options: ["street", "glow", "paint", "bass"], correct: "street" },
    { id: "flame", target: "FLAME", options: ["name", "crew", "kick", "mic"], correct: "name" },
    { id: "sound", target: "SOUND", options: ["ground", "flow", "paint", "night"], correct: "ground" },
    { id: "rhyme", target: "RHYME", options: ["time", "block", "kick", "bass"], correct: "time" },
    { id: "bass", target: "BASS", options: ["space", "light", "rhyme", "crew"], correct: "space" },
    { id: "mic", target: "MIC", options: ["slick", "paint", "drum", "low"], correct: "slick" },
    { id: "stage", target: "STAGE", options: ["page", "beat", "sound", "crown"], correct: "page" },
    { id: "crowd", target: "CROWD", options: ["loud", "flow", "kick", "rhyme"], correct: "loud" },
    { id: "track", target: "TRACK", options: ["back", "high", "mic", "beat"], correct: "back" },
    { id: "bars", target: "BARS", options: ["stars", "deep", "gold", "kick"], correct: "stars" },
    { id: "green", target: "GREEN", options: ["seen", "flow", "boom", "bass"], correct: "seen" },
    { id: "move", target: "MOVE", options: ["groove", "beat", "mic", "night"], correct: "groove" },
    { id: "fire", target: "FIRE", options: ["higher", "paper", "rhythm", "bass"], correct: "higher" },
    { id: "chain", target: "CHAIN", options: ["rain", "vibe", "drum", "flow"], correct: "rain" },
    { id: "drum", target: "DRUM", options: ["sum", "streets", "mic", "gold"], correct: "sum" },
    { id: "city", target: "CITY", options: ["gritty", "rhyme", "beat", "bars"], correct: "gritty" },
    { id: "crew", target: "CREW", options: ["blue", "stage", "mic", "bass"], correct: "blue" },
    { id: "art", target: "ART", options: ["heart", "crowd", "flow", "beat"], correct: "heart" }
  ];
  const oddBarQuestions = [
    { id: "ight", rule: "Three bars share the “-ight” rhyme sound; pick the break.", bars: ["Street lamps stitch the night", "New soles flash in the light", "The crew takes flight at night", "Kick drums shake the ground"], odd: "Kick drums shake the ground" },
    { id: "ow", rule: "Three bars share the “-ow” rhyme sound; pick the break.", bars: ["Fresh paint starts to glow", "Bass rolls smooth and low", "Watch the whole block show", "Handclaps cut the beat"], odd: "Handclaps cut the beat" },
    { id: "ay", rule: "Three bars share the “-ay” rhyme sound; pick the break.", bars: ["We bring a new day", "Two-step, then we play", "Let the good words stay", "Snare taps mark the time"], odd: "Snare taps mark the time" },
    { id: "ore", rule: "Three bars share the “-ore” rhyme sound; pick the break.", bars: ["One more verse, then more", "Posters line the corner store", "Good ideas reach the shore", "The bassline feels warm"], odd: "The bassline feels warm" },
    { id: "ame", rule: "Three bars share the “-ame” rhyme sound; pick the break.", bars: ["Bright chalk writes a name", "Small sparks feed the flame", "Every crew brings a game", "The kick lands on time"], odd: "The kick lands on time" },
    { id: "ound", rule: "Three bars share the “-ound” rhyme sound; pick the break.", bars: ["Hear that handclap sound", "Good feet find the ground", "New friends gather round", "The mic feels warm"], odd: "The mic feels warm" },
    { id: "ime", rule: "Three bars share the “-ime” rhyme sound; pick the break.", bars: ["We make room for rhyme", "Take the beat in time", "Each bright thought can climb", "The crowd nods along"], odd: "The crowd nods along" },
    { id: "ack", rule: "Three bars share the “-ack” rhyme sound; pick the break.", bars: ["Bring that rhythm back", "Fresh ideas on track", "Kind words in the pack", "The street mural shines"], odd: "The street mural shines" },
    { id: "ar", rule: "Three bars share the “-ar” rhyme sound; pick the break.", bars: ["One bright rooftop star", "Each mural leaves a scar", "Good vibes travel far", "The snare snaps clean"], odd: "The snare snaps clean" },
    { id: "eep", rule: "Three bars share the “-eep” rhyme sound; pick the break.", bars: ["Promises we keep", "Old city lanes sleep", "Good ideas run deep", "The bass has a bounce"], odd: "The bass has a bounce" },
    { id: "ice", rule: "Three bars share the “-ice” rhyme sound; pick the break.", bars: ["Share one good device", "Trade a kind word twice", "Fresh ideas feel nice", "The beat rolls slow"], odd: "The beat rolls slow" },
    { id: "ick", rule: "Three bars share the “-ick” rhyme sound; pick the break.", bars: ["Quick feet find the kick", "Four pads, one slick trick", "Bright marker moves quick", "Good friends hold the line"], odd: "Good friends hold the line" },
    { id: "ain", rule: "Three bars share the “-ain” rhyme sound; pick the break.", bars: ["Monsoon taps the lane", "Paper boats ride rain", "We meet and make a chain", "The speakers glow red"], odd: "The speakers glow red" },
    { id: "oom", rule: "Three bars share the “-oom” rhyme sound; pick the break.", bars: ["Small crew fills the room", "Bass notes bloom and boom", "Good words chase the gloom", "The kick keeps it steady"], odd: "The kick keeps it steady" },
    { id: "ate", rule: "Three bars share the “-ate” rhyme sound; pick the break.", bars: ["We never show up late", "Good ideas open the gate", "Four friends make it great", "The hi-hat ticks fast"], odd: "The hi-hat ticks fast" },
    { id: "ell", rule: "Three bars share the “-ell” rhyme sound; pick the break.", bars: ["Hear the handclap swell", "Kind words travel well", "Every voice can tell", "The kick is deep"], odd: "The kick is deep" },
    { id: "ash", rule: "Three bars share the “-ash” rhyme sound; pick the break.", bars: ["Paint strokes make a flash", "Fast feet dash past trash", "Good crews splash some cash", "The bass hums down low"], odd: "The bass hums down low" },
    { id: "ake", rule: "Three bars share the “-ake” rhyme sound; pick the break.", bars: ["One more move to make", "Fresh ideas awake", "Good beats shake the lake", "The crew brings warm tea"], odd: "The crew brings warm tea" },
    { id: "ide", rule: "Three bars share the “-ide” rhyme sound; pick the break.", bars: ["Friends walk side by side", "Let the good beat ride", "Bright kites catch the tide", "The bass is low"], odd: "The bass is low" },
    { id: "ook", rule: "Three bars share the “-ook” rhyme sound; pick the break.", bars: ["Turn one page in the book", "Find a fresh mural to look", "We share a recipe to cook", "The bass stays deep"], odd: "The bass stays deep" }
  ];
  const pads = [
    { name: "KICK", className: "kick" },
    { name: "SNARE / CLAP", className: "snare" },
    { name: "HI-HAT", className: "hihat" },
    { name: "BASS", className: "bass" }
  ];
  const content = document.querySelector("#game-content");
  const counter = document.querySelector("#round-counter b");
  const progress = document.querySelector("#progress-fill");
  const scoreElement = document.querySelector("#score");
  const musicToggle = document.querySelector("#music-toggle");
  const musicVolume = document.querySelector("#music-volume");
  const musicPlayerHost = document.querySelector("#music-player-host");
  const musicStatus = document.querySelector("#music-status");
  const victoryScreen = document.querySelector("#victory-screen");
  const YOUTUBE_VIDEO_ID = "jzkYSITK_H4";
  const GAME_MUSIC_LEVEL = 0.3;
  const BEAT_MUSIC_LEVEL = 0.04;
  const questionPools = {
    rhyme: { questions: rhymeQuestions, remaining: [] },
    odd: { questions: oddBarQuestions, remaining: [] }
  };

  let roundIndex = -1;
  let score = 0;
  let victoryShown = false;
  let remaining = ROUND_SECONDS;
  let timerId = null;
  let sequenceTimeouts = [];
  let roundLocked = true;
  let beatPhase = "idle";
  let playerSequence = [];
  let beatInputLocked = false;
  let activeQuestion = null;
  let activeQuestionIds = {};
  let previousGameQuestionIds = {};
  let audioContext = null;
  let youtubePlayer = null;
  let youtubeApiPromise = null;
  let gameEntered = false;
  let musicEnabled = false;
  let musicDucked = false;
  const activeAudioSources = new Set();

  function shuffled(items) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function takeQuestion(poolName, avoidId) {
    const pool = questionPools[poolName];
    if (pool.remaining.length === 0) pool.remaining = shuffled(pool.questions);
    if (pool.remaining.length > 1 && pool.remaining[0].id === avoidId) {
      const alternative = pool.remaining.findIndex((question) => question.id !== avoidId);
      [pool.remaining[0], pool.remaining[alternative]] = [pool.remaining[alternative], pool.remaining[0]];
    }
    const question = pool.remaining.shift();
    activeQuestionIds[poolName] = question.id;
    return question;
  }

  function clearScheduledWork() {
    window.clearInterval(timerId);
    timerId = null;
    sequenceTimeouts.forEach(window.clearTimeout);
    sequenceTimeouts = [];
    content.querySelectorAll(".pad.lit").forEach((pad) => pad.classList.remove("lit"));
    stopAudioSources();
  }

  function updateProgress() {
    const completed = Math.max(0, roundIndex);
    counter.textContent = `${Math.min(completed + 1, rounds.length)} / ${rounds.length}`;
    progress.style.width = `${(completed / rounds.length) * 100}%`;
    scoreElement.textContent = String(score);
  }

  function startGame() {
    clearScheduledWork();
    victoryShown = false;
    victoryScreen.hidden = true;
    document.body.classList.remove("victory-mode");
    previousGameQuestionIds = { ...activeQuestionIds };
    activeQuestionIds = {};
    roundIndex = 0;
    score = 0;
    gameEntered = true;
    syncMusicPlayback();
    void unlockAudio();
    updateProgress();
    startRound();
  }

  function startRound() {
    clearScheduledWork();
    roundLocked = false;
    beatPhase = "idle";
    beatInputLocked = false;
    remaining = rounds[roundIndex].timerSeconds;
    updateProgress();
    const round = rounds[roundIndex];
    musicDucked = round.id === "beat";
    syncMusicPlayback();
    if (round.id === "rhyme") renderRhyme(round, takeQuestion("rhyme", previousGameQuestionIds.rhyme));
    else if (round.id === "beat") renderBeat(round);
    else renderOdd(round, takeQuestion("odd", previousGameQuestionIds.odd));
    beginTimer();
  }

  function renderHeader(round) {
    return `<div class="round-heading">
      <div><p class="game-kicker">ROUND 0${roundIndex + 1} <span aria-hidden="true">/</span> 03</p>
      <h2>${round.name}</h2></div>
      <div class="timer" aria-label="${remaining} seconds remaining">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor"/><path d="M10 5.5v4.8l3 1.8" stroke="currentColor" stroke-linecap="round"/></svg>
        <span class="timer-value">${remaining}s</span>
      </div>
    </div>`;
  }

  function renderRhyme(round, question) {
    activeQuestion = question;
    const options = shuffled(question.options);
    content.innerHTML = `${renderHeader(round)}
      <p class="prompt">Choose the word that rhymes with</p>
      <p class="word-target">${question.target}<span>?</span></p>
      <div class="choice-grid" role="group" aria-label="Choose a word that rhymes with ${question.target}">
        ${options.map((answer, index) => `<button class="choice-button" type="button" data-answer="${index}">${answer}</button>`).join("")}
      </div>
      <p class="feedback" id="feedback" aria-live="polite"></p>
      <button class="action-button continue-button hidden" data-action="continue" type="button">NEXT ROUND <span aria-hidden="true">↗</span></button>`;
    activeQuestion.options = options;
  }

  function renderBeat(round) {
    round.sequence = createBeatSequence();
    playerSequence = [];
    beatPhase = "playback";
    content.innerHTML = `${renderHeader(round)}
      <p class="prompt">${round.prompt}</p>
      <div class="beat-area">
        <p class="beat-status" id="beat-status" aria-live="polite">Listen close — the beat is coming…</p>
        <div class="pad-grid" role="group" aria-label="Four beat pads">
          ${pads.map((pad, index) => `<button class="pad pad-${pad.className}" data-pad="${index}" type="button" aria-label="${pad.name}" disabled>${pad.name}</button>`).join("")}
        </div>
        <p class="beat-hint">YOUR RUN <strong id="beat-count">0/4</strong></p>
      </div>
      <p class="feedback" id="feedback" aria-live="polite"></p>
      <button class="action-button continue-button hidden" data-action="continue" type="button">NEXT ROUND <span aria-hidden="true">↗</span></button>`;

    const padButtons = [...content.querySelectorAll("[data-pad]")];
    const status = content.querySelector("#beat-status");
    unlockAudio().then((audioReady) => {
      if (roundLocked || beatPhase !== "playback") return;
      const delay = 350;
      const beatLength = 620;
      const startAt = audioReady ? audioContext.currentTime + delay / 1000 : null;
      if (!audioReady) status.textContent = "Audio unavailable — follow the lights.";
      round.sequence.forEach((padIndex, index) => {
        const offset = delay + index * beatLength;
        if (startAt !== null) playPadSound(padIndex, startAt + index * beatLength / 1000);
        sequenceTimeouts.push(window.setTimeout(() => {
          if (!roundLocked && beatPhase === "playback") flashPad(padButtons[padIndex]);
        }, offset));
      });
      sequenceTimeouts.push(window.setTimeout(() => {
        if (roundLocked || beatPhase !== "playback") return;
        beatPhase = "input";
        status.textContent = "Your turn — repeat the beat.";
        padButtons.forEach((pad) => { pad.disabled = false; });
      }, delay + round.sequence.length * beatLength));
    });
  }

  function createBeatSequence() {
    const sequence = [];
    while (sequence.length < 4) {
      const nextPad = Math.floor(Math.random() * pads.length);
      if (nextPad !== sequence[sequence.length - 1]) sequence.push(nextPad);
    }
    return sequence;
  }

  function renderOdd(round, question) {
    activeQuestion = question;
    const bars = shuffled(question.bars);
    content.innerHTML = `${renderHeader(round)}
      <p class="prompt">${question.rule}</p>
      <div class="bar-list" role="group" aria-label="${question.rule}">
        ${bars.map((bar, index) => `<div class="bar-choice"><span class="choice-index">0${index + 1}</span><button class="choice-button" type="button" data-answer="${index}">${bar}</button></div>`).join("")}
      </div>
      <p class="feedback" id="feedback" aria-live="polite"></p>
      <button class="action-button continue-button hidden" data-action="continue" type="button">SEE YOUR SCORE <span aria-hidden="true">↗</span></button>`;
    activeQuestion.bars = bars;
  }

  function onContentClick(event) {
    const button = event.target.closest("button");
    if (!button || !content.contains(button)) return;
    if (button.dataset.action === "start" || button.id === "start-button") {
      startGame();
      return;
    }
    if (button.dataset.action === "replay") {
      startGame();
      return;
    }
    if (button.dataset.action === "continue") {
      advanceRound();
      return;
    }
    if (button.hasAttribute("data-answer")) {
      const round = rounds[roundIndex];
      const answerIndex = Number(button.dataset.answer);
      const passed = round.id === "rhyme"
        ? activeQuestion.options[answerIndex] === activeQuestion.correct
        : activeQuestion.bars[answerIndex] === activeQuestion.odd;
      const message = round.id === "rhyme"
        ? (passed ? `Clean rhyme — ${activeQuestion.target} / ${activeQuestion.correct}.` : `Not that rhyme — ${activeQuestion.target} rhymes with ${activeQuestion.correct}.`)
        : (passed ? "Good ear — that line breaks the rhyme." : "That line fits the rhyme scheme. Find the odd bar.");
      resolveRound(passed, round, button, false, message);
      return;
    }
    if (button.hasAttribute("data-pad")) handlePadInput(button);
  }

  function handlePadInput(button) {
    if (roundLocked || beatPhase !== "input" || beatInputLocked) return;
    beatInputLocked = true;
    sequenceTimeouts.push(window.setTimeout(() => { beatInputLocked = false; }, 120));
    const round = rounds[roundIndex];
    const padIndex = Number(button.dataset.pad);
    playerSequence.push(padIndex);
    content.querySelector("#beat-count").textContent = `${playerSequence.length}/4`;
    if (playerSequence[playerSequence.length - 1] !== round.sequence[playerSequence.length - 1]) {
      flashPad(button);
      playPadSound(padIndex);
      resolveRound(false, round, button);
      return;
    }
    stopAudioSources();
    playPadSound(padIndex);
    flashPad(button);
    if (playerSequence.length === round.sequence.length) resolveRound(true, round, button);
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

  function resolveRound(passed, round, selectedButton, timedOut = false, customMessage = "") {
    if (roundLocked) return;
    roundLocked = true;
    beatPhase = "resolved";
    clearScheduledWork();
    if (passed) score += 1;
    updateProgress();
    progress.style.width = `${((roundIndex + 1) / rounds.length) * 100}%`;
    if (selectedButton) selectedButton.classList.add(passed ? "correct" : "wrong");
    content.querySelectorAll("button.choice-button, button.pad").forEach((button) => { button.disabled = true; });
    const feedback = content.querySelector("#feedback");
    const timeoutMessage = round.id === "rhyme"
      ? `TIME’S UP — ${activeQuestion.target} rhymes with ${activeQuestion.correct}.`
      : round.id === "odd" ? "TIME’S UP — Find the line that breaks the rhyme." : `TIME’S UP — ${round.fail}`;
    feedback.textContent = timedOut ? timeoutMessage : (customMessage || (passed ? round.pass : round.fail));
    feedback.classList.add(passed ? "pass" : "fail");
    musicDucked = false;
    syncMusicPlayback();
    if (passed && score === rounds.length && roundIndex === rounds.length - 1) {
      showVictory();
      return;
    }
    const nextButton = content.querySelector('[data-action="continue"]');
    nextButton.classList.remove("hidden");
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
    previousGameQuestionIds = { ...activeQuestionIds };
    counter.textContent = `${rounds.length} / ${rounds.length}`;
    progress.style.width = "100%";
    scoreElement.textContent = String(score);
    const message = score === rounds.length ? "ALL BARS CLEARED." : score > 0 ? "YOU HELD YOUR OWN." : "RUN IT BACK.";
    content.innerHTML = `<div class="result-mark ${score > 0 ? "pass" : "fail"}" aria-hidden="true">${score === rounds.length ? "✳" : "♪"}</div>
      <p class="game-kicker">CYPHER COMPLETE</p>
      <h2>${message}</h2>
      <p class="prompt">Your score:</p>
      <p class="final-score">${score}<span> / 3</span></p>
      <button class="action-button" data-action="replay" type="button">RUN IT BACK <span aria-hidden="true">↻</span></button>
      <p class="micro-copy">NEW QUESTIONS. SAME GOOD ENERGY.</p>`;
    content.querySelector('[data-action="replay"]').focus();
  }

  function showVictory() {
    if (victoryShown || score !== rounds.length || roundIndex !== rounds.length - 1) return;
    victoryShown = true;
    clearScheduledWork();
    roundLocked = true;
    previousGameQuestionIds = { ...activeQuestionIds };
    counter.textContent = `${rounds.length} / ${rounds.length}`;
    progress.style.width = "100%";
    scoreElement.textContent = String(score);
    document.body.classList.add("victory-mode");
    victoryScreen.hidden = false;
    victoryScreen.focus();
  }

  function returnToCypher() {
    clearScheduledWork();
    victoryShown = false;
    victoryScreen.hidden = true;
    document.body.classList.remove("victory-mode");
    roundLocked = true;
    beatPhase = "idle";
    roundIndex = -1;
    score = 0;
    remaining = ROUND_SECONDS;
    activeQuestion = null;
    musicDucked = false;
    syncMusicPlayback();
    counter.textContent = "— / 3";
    progress.style.width = "0%";
    scoreElement.textContent = "0";
    content.innerHTML = `<div class="boombox" aria-hidden="true"><span></span><i></i><i></i><b>BC</b></div>
      <p class="game-kicker">THREE ROUNDS. ONE MIC.</p>
      <h2>Can you<br><span>catch the vibe?</span></h2>
      <p class="welcome-copy">Find a rhyme. Remember a beat. Spot the bar that breaks the pattern. No rush—just bring your ears.</p>
      <button class="action-button" id="start-button" type="button">ENTER THE CYPHER <span aria-hidden="true">↗</span></button>
      <p class="micro-copy">THIS IS A GAME, NOT REAL SECURITY.</p>`;
    content.querySelector("#start-button").focus();
  }

  function onVictoryClick(event) {
    const button = event.target.closest("[data-victory-action]");
    if (!button || !victoryScreen.contains(button)) return;
    if (button.dataset.victoryAction === "replay") startGame();
    else if (button.dataset.victoryAction === "back") returnToCypher();
  }

  function loadYouTubeApi() {
    if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
    if (youtubeApiPromise) return youtubeApiPromise;
    youtubeApiPromise = new Promise((resolve, reject) => {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousCallback === "function") previousCallback();
        resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        youtubeApiPromise = null;
        musicStatus.textContent = "Music player unavailable. The game still works without it.";
        reject(new Error("Could not load the YouTube player."));
      };
      document.head.append(script);
    });
    return youtubeApiPromise;
  }

  function createYouTubePlayer() {
    if (!gameEntered || !musicEnabled || youtubePlayer) return;
    musicStatus.textContent = "Loading authorized YouTube player…";
    musicPlayerHost.hidden = false;
    loadYouTubeApi().then((youtube) => {
      if (!gameEntered || !musicEnabled || youtubePlayer) return;
      youtubePlayer = new youtube.Player("youtube-player", {
        width: "200",
        height: "200",
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: { autoplay: 0, controls: 1, playsinline: 1, rel: 0, origin: window.location.origin },
        events: {
          onReady: () => {
            musicStatus.textContent = "YouTube player ready.";
            applyMusicVolume();
            syncMusicPlayback();
          },
          onAutoplayBlocked: () => {
            musicStatus.textContent = "Playback was blocked. Use the YouTube player’s play button to start music.";
          },
          onError: (event) => {
            musicStatus.textContent = `YouTube could not play this track (error ${event.data}). The game still works without music.`;
          },
          onStateChange: (event) => {
            if (event.data === youtube.PlayerState.ENDED && musicEnabled) youtubePlayer.playVideo();
          }
        }
      });
    }).catch(() => {
      musicPlayerHost.hidden = true;
    });
  }

  function applyMusicVolume() {
    if (!youtubePlayer || typeof youtubePlayer.setVolume !== "function") return;
    const level = musicDucked ? BEAT_MUSIC_LEVEL : GAME_MUSIC_LEVEL;
    youtubePlayer.setVolume(Math.round(Number(musicVolume.value) * level));
  }

  function syncMusicPlayback() {
    if (!gameEntered || !musicEnabled) {
      if (youtubePlayer && typeof youtubePlayer.pauseVideo === "function") youtubePlayer.pauseVideo();
      if (!musicEnabled) musicPlayerHost.hidden = true;
      return;
    }
    musicPlayerHost.hidden = false;
    if (!youtubePlayer) {
      createYouTubePlayer();
      return;
    }
    applyMusicVolume();
    if (youtubePlayer.getPlayerState() !== window.YT.PlayerState.PLAYING) youtubePlayer.playVideo();
  }

  function updateMusicToggle() {
    musicToggle.setAttribute("aria-pressed", String(musicEnabled));
    musicToggle.setAttribute("aria-label", `Turn background music ${musicEnabled ? "off" : "on"}`);
    musicToggle.textContent = musicEnabled ? "MUSIC ON" : "MUSIC OFF";
  }

  function unlockAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return Promise.resolve(false);
    try {
      if (!audioContext) audioContext = new AudioContextClass();
    } catch {
      return Promise.resolve(false);
    }
    if (audioContext.state === "running") return Promise.resolve(true);
    return audioContext.resume().then(
      () => audioContext.state === "running",
      () => false
    ).catch(() => false);
  }

  function trackAudioSource(source) {
    activeAudioSources.add(source);
    source.addEventListener("ended", () => {
      activeAudioSources.delete(source);
      source.disconnect();
    }, { once: true });
  }

  function stopAudioSources() {
    activeAudioSources.forEach((source) => {
      try {
        source.stop();
      } catch (error) {
        if (error.name !== "InvalidStateError") throw error;
      }
    });
    activeAudioSources.clear();
  }

  function playPadSound(padIndex, scheduledTime) {
    if (!audioContext || audioContext.state !== "running") return;
    const when = scheduledTime === undefined ? audioContext.currentTime : scheduledTime;
    const makeTone = (frequency, endFrequency, type, duration, volume) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, when);
      if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, when + duration);
      gain.gain.setValueAtTime(volume, when);
      gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      trackAudioSource(oscillator);
      oscillator.start(when);
      oscillator.stop(when + duration);
    };
    const makeNoise = (duration, filterType, cutoff, volume) => {
      const buffer = audioContext.createBuffer(1, Math.ceil(audioContext.sampleRate * duration), audioContext.sampleRate);
      const channel = buffer.getChannelData(0);
      for (let index = 0; index < channel.length; index += 1) channel[index] = Math.random() * 2 - 1;
      const source = audioContext.createBufferSource();
      const filter = audioContext.createBiquadFilter();
      const gain = audioContext.createGain();
      source.buffer = buffer;
      filter.type = filterType;
      filter.frequency.setValueAtTime(cutoff, when);
      gain.gain.setValueAtTime(volume, when);
      gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
      source.connect(filter).connect(gain).connect(audioContext.destination);
      trackAudioSource(source);
      source.start(when);
      source.stop(when + duration);
    };
    if (padIndex === 0) makeTone(145, 48, "sine", 0.22, 0.8);
    else if (padIndex === 1) {
      makeNoise(0.16, "bandpass", 1900, 0.45);
      makeTone(185, 0, "triangle", 0.11, 0.2);
    } else if (padIndex === 2) makeNoise(0.075, "highpass", 6500, 0.28);
    else makeTone(82, 0, "triangle", 0.28, 0.55);
  }

  function flashPad(pad) {
    pad.classList.add("lit");
    sequenceTimeouts.push(window.setTimeout(() => pad.classList.remove("lit"), 230));
  }

  content.addEventListener("click", onContentClick);
  victoryScreen.addEventListener("click", onVictoryClick);
  musicToggle.addEventListener("click", () => {
    musicEnabled = !musicEnabled;
    updateMusicToggle();
    if (musicEnabled) syncMusicPlayback();
    else {
      if (youtubePlayer && typeof youtubePlayer.pauseVideo === "function") youtubePlayer.pauseVideo();
      musicPlayerHost.hidden = true;
      musicStatus.textContent = "Background music off.";
    }
  });
  musicVolume.addEventListener("input", applyMusicVolume);
})();
