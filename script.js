(function() {
  // --- Configuration ---
  const COUNTDOWN_TARGET = new Date("Jun 16, 2026 15:00:01");
  const RICKROLL = "https://youtu.be/dQw4w9WgXcQ";

  // Fill these with Date strings or Date objects as needed
  const offDays = [
    "May 25, 2026",
    "May 27, 2026"
  ];
  const studentOnlyOffDays = [];

  const Version = "1.13.3";
  const BetaVersion = "1.13.3";

  // timer interval (ms)
  const TIMER_INTERVAL_MS = 10;
  const NEAR_END_MS = 7 * 60 * 60 * 1000; // 7 hours (used for "near end" rickroll logic)

  // --- State ---
  let state = {
    targetTime: COUNTDOWN_TARGET.getTime(),
    teacherMode: false,
    weekendsEnabled: false
  };

  // --- DOM cache ---
  const $ = id => document.getElementById(id);
  const elements = {
    betaIndicator: $('beta-indicator'),
    timer: $('timer'),
    countdownUntil: $('countdown-until'),
    periodSetting: $('period-setting-menu'),
    periodEndToggle: $('period-end-toggle'),
    weekendsCheckbox: $('weekends'),
    teacherMode: $('teachermode'),
    customColor: $('customcolor'),
    fontMenu: $('font-customization-menu'),
    settingsButton: $('settings-button'),
    settingsMenu: $('settings-menu'),
    overlay: $('overlay'),
    closeButton: $('close-button')
  };

  // --- Utilities ---
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }
  function getCookie(name) {
    const v = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(name + '='));
    return v ? v.split('=')[1] : '';
  }

  function formatRemaining(distanceMs, effectiveDays) {
    // distanceMs is raw ms to target; effectiveDays is days after removing weekends/off-days
    const dayMs = 24 * 60 * 60 * 1000;
    const hours = Math.floor((distanceMs % dayMs) / (1000 * 60 * 60));
    const minutes = Math.floor((distanceMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distanceMs % (1000 * 60)) / 1000);

    if (effectiveDays === 0 && hours === 0 && minutes === 0) return `${seconds}s`;
    if (effectiveDays === 0 && hours === 0) return `${minutes}m ${seconds}s`;
    if (effectiveDays === 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${effectiveDays}d ${hours}h ${minutes}m ${seconds}s`;
  }

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  // count weekends between two dates (inclusive start, inclusive end)
  function countWeekendsBetween(start, end) {
    // normalize to startOfDay
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    if (s > e) return 0;

    const dayMs = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor((e - s) / dayMs) + 1;
    const fullWeeks = Math.floor(totalDays / 7);
    let weekends = fullWeeks * 2;

    // remainder days
    const rem = totalDays % 7;
    for (let i = 0; i < rem; i++) {
      const weekday = (s.getDay() + i) % 7;
      if (weekday === 0 || weekday === 6) weekends++;
    }
    return weekends;
  }

  function countOffDaysBetween(list, start, end) {
    if (!list || list.length === 0) return 0;
    return list.reduce((acc, d) => {
      const date = (d instanceof Date) ? d : new Date(d);
      if (!isNaN(date) && date >= start && date <= end) return acc + 1;
      return acc;
    }, 0);
  }

  // --- YouTube loader (kept compatible with previous behavior) ---
  function loadYouTubeAPI() {
    const scriptUrl = 'https://www.youtube.com/s/player/23010b46/www-widgetapi.vflset/www-widgetapi.js';
    try { window.trustedTypes && window.trustedTypes.createPolicy('youtube-widget-api', { createScriptURL: x => x }).createScriptURL(scriptUrl); } catch (e) { }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // --- Video / prank behavior ---
  const guidingString = `\nwell that just happened\nk\n😭😭😭\nLOL\ncan you guys get markiplier to play now\nhi :3\nhewwo :3\nNEVER LET BRO COOK 🔥🔥🔥🗣️🗣️\nAND THE CROWD GOES MILD 🔥🔥🔥🔥\nBRO DOESN'T UNDERSTAND ANYTHING 💯💯💯🔥🔥🔥🗣️🗣️\nteehee ^w^\nItsThump is not a developer\nyou proud of yourself?\nLook behind you.\nwow...\nLOOL bro what are you doing\ntry again\nGG GO NEXT\ngreat job!!\nbro 💀💀\nYou have hidden talent 🔥🔥 keep it hidden 🔥🔥\ntrue\numm... yea\nSTOP 💯💯🔥🔥\nyup\napril fools! did i get you\nNot quite but we up 💯💯\nGO AGANE\n💀\n┻━┻︵ヽ(\`▯´)ﾉ︵ ┻━┻\no3o\nT_T\nStarted from bottom still there 🔥🔥🔥🗣️🗣️\n>3<\nnice one\no_o\nalright then\ngood job\nerm...\nAND THE CROUD EXCHANGES WEIRD GLANCES 🔥🔥🔥🔥\n🥺\n>w<\n<(0_0)>\nhi\n;-;\nnah... what was bro doing 😭😭😭\nbro...\nyea you just suck. sorry\nF\nwow...\nAND THE CROWD WANTS TO GO HOME 🔥🔥🔥🔥\nO_O\n;w;\nwhat?\n;_;\n`;
  const guidinglight = guidingString.split('\n');

  function doVideo(unlucky) {
    function onPlayerReady(event) {
      try { event.target.playVideo(); } catch (e) {}
      setInterval(() => { try { event.target.playVideo(); } catch (e) {} }, 1000);
    }

    const textEl = $('heheheha');
    if (textEl) textEl.innerHTML = "<b>I told you. You could have avoided this, but no. Enjoy.</b> <small>gottem</small>";
    const h3 = $('appearOnPress-h3'); if (h3) h3.innerHTML = "oh and by the way, you cant pause it lol";
    const h4 = $('appearOnPress-h4'); if (h4) h4.innerHTML = "<strong>what have you done...</strong>I TOLD YOU NOT TO ¯\\_(ツ)_/¯";
    if (unlucky && h4) h4.innerHTML += " also you got really unlucky 5% chance the rickroll happens when its not the last school day L bozo";
    const h5 = $('appearOnPress-h5'); if (h5) h5.innerHTML = "on mobile and tablet devices it doesnt autoplay :(";
    const funnystuff = $('funnystuff'); if (funnystuff) funnystuff.style.color = '#ff0000';
    const guid = $('guiding-light'); if (guid) {
      guid.style.color = '#77ABB4';
      guid.innerHTML = 'my honest reaction: ' + guidinglight[Math.floor(Math.random() * guidinglight.length)];
    }

    const videoId = RICKROLL.replace('https://youtu.be/', '');
    try {
      new YT.Player('video', {
        height: '390',
        width: '640',
        videoId,
        playerVars: { playsinline: 1, controls: 0 },
        events: { onReady: onPlayerReady },
        allow: 'autoplay'
      });
    } catch (e) {}
  }

  function triggerRickrollIfEligible() {
    const thingy = Math.floor(Math.random() * 20);
    const isNearEnd = (state.targetTime - Date.now()) <= NEAR_END_MS;
    // small delay to let UI update
    setTimeout(() => {
      if (thingy === 1 || isNearEnd) {
        const lolEl = $('lol'); if (lolEl) lolEl.style.visibility = 'hidden';
        doVideo(thingy === 1 && !isNearEnd);
      } else {
        const h4 = $('appearOnPress-h4'); if (h4) h4.innerHTML = 'you got lucky this time, but dont count on your luck for next time';
      }
    }, 5000);
  }

  // --- Main countdown logic ---
  function computeEffectiveDays(now, target) {
    const rawDays = Math.floor((target.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
    if (rawDays <= 0) return 0;

    const weekends = state.weekendsEnabled ? 0 : countWeekendsBetween(now, target);
    const daysOff = countOffDaysBetween(offDays, now, target) + (state.teacherMode ? 0 : countOffDaysBetween(studentOnlyOffDays, now, target));

    return Math.max(0, rawDays - weekends - daysOff);
  }

  function updateTimer() {
    const now = new Date();
    const target = new Date(state.targetTime);
    const distance = state.targetTime - Date.now();

    if (distance <= 0) {
      doVideo(false);
      const msg = elements.periodEndToggle && elements.periodEndToggle.checked ? 'CLASS IS OVER!!!' : 'SUMMER VACATION!!!!';
      if (elements.timer) elements.timer.innerHTML = msg;
      clearInterval(window.__countdownInterval);
      const cb = $('countdown-until'); if (cb) cb.innerHTML = '';
      const sb = $('settings-broken'); if (sb) sb.style.visibility = '';
      return;
    }

    const effectiveDays = computeEffectiveDays(now, target);
    const display = formatRemaining(distance, effectiveDays);
    if (elements.timer) elements.timer.innerHTML = display;
  }

  // --- Period selection logic ---
  const periods = [
    '16:00','9:43','10:31','11:18','12:05','12:52','13:39','14:26','15:13','16:00'
  ];

  function applyPeriodSetting(number) {
    if (isNaN(number) || number === 0) {
      state.targetTime = COUNTDOWN_TARGET.getTime();
      if (elements.countdownUntil) elements.countdownUntil.textContent = 'until summer vacation!';
      if (elements.periodEndToggle) { elements.periodEndToggle.disabled = true; elements.periodEndToggle.checked = false; }
      if (elements.weekendsCheckbox) elements.weekendsCheckbox.disabled = false;
      return;
    }

    const time = periods[number] || periods[0];
    const newTarget = new Date(COUNTDOWN_TARGET.getFullYear(), COUNTDOWN_TARGET.getMonth(), COUNTDOWN_TARGET.getDate());
    const [hh, mm] = time.split(':').map(Number);
    newTarget.setHours(hh, mm, 1, 0);
    state.targetTime = newTarget.getTime();
    if (elements.countdownUntil) elements.countdownUntil.textContent = `until summer vacation! (Period ${number})`;
    if (elements.periodEndToggle) elements.periodEndToggle.disabled = false;
  }

  // --- Initialization & event wiring ---
  function init() {
    // version indicator
    const isBeta = !(window.location.href.includes('github')) && Version !== BetaVersion;
    if (elements.betaIndicator) elements.betaIndicator.innerHTML = isBeta ? `Beta Version ${BetaVersion}` : `Version ${Version}`;

    // restore cookie settings
    const savedFont = getCookie('font'); if (elements.fontMenu) elements.fontMenu.value = savedFont === '' ? 'sans-serif' : savedFont;
    const savedColor = getCookie('color'); if (elements.customColor) elements.customColor.value = savedColor;
    if ($('body')) $('body').style.fontFamily = elements.fontMenu ? elements.fontMenu.value : 'sans-serif';
    if ($('body')) $('body').style.color = savedColor || $('#customcolor')?.value || $('body').style.color;

    if (getCookie('teachermode') === 'true') state.teacherMode = true;
    if (elements.teacherMode) elements.teacherMode.checked = state.teacherMode;

    // wire controls
    if (elements.weekendsCheckbox) elements.weekendsCheckbox.addEventListener('change', (e) => {
      state.weekendsEnabled = e.target.checked;
      if (elements.periodEndToggle) elements.periodEndToggle.disabled = e.target.checked || (elements.periodSetting && elements.periodSetting.value === '0');
      updateTimer();
    });

    if (elements.teacherMode) elements.teacherMode.addEventListener('change', (e) => {
      state.teacherMode = e.target.checked;
      setCookie('teachermode', state.teacherMode, 30);
      if (elements.timer) elements.timer.innerHTML = 'Calculating...';
    });

    if (elements.customColor) elements.customColor.addEventListener('change', (e) => {
      if (e.target.value === '#ffffff') { e.target.value = '#000000'; alert('please dont set the color to white kthx'); }
      if ($('body')) $('body').style.color = e.target.value;
      setCookie('color', e.target.value, 30);
    });

    if (elements.fontMenu) elements.fontMenu.addEventListener('change', (e) => {
      if ($('body')) $('body').style.fontFamily = e.target.value;
      setCookie('font', e.target.value, 30);
    });

    if (elements.periodSetting) elements.periodSetting.addEventListener('change', (e) => {
      const num = Number.parseInt(e.target.value);
      applyPeriodSetting(num);
      // if period end toggle is active, adjust target to today at that time
      if (elements.periodEndToggle && elements.periodEndToggle.checked) {
        const date = new Date();
        const cur = new Date(state.targetTime);
        date.setHours(cur.getHours(), cur.getMinutes(), cur.getSeconds(), 0);
        state.targetTime = date.getTime();
        if (elements.countdownUntil) elements.countdownUntil.textContent = `until class is over! (Period ${num})`;
      }
    });

    if (elements.periodEndToggle) elements.periodEndToggle.addEventListener('change', () => {
      if (elements.periodEndToggle.checked) {
        const date = new Date();
        const cur = new Date(state.targetTime);
        date.setHours(cur.getHours(), cur.getMinutes(), cur.getSeconds(), 0);
        state.targetTime = date.getTime();
        const number = Number.parseInt(elements.periodSetting ? elements.periodSetting.value : 0);
        if (elements.countdownUntil) elements.countdownUntil.textContent = `until class is over! (Period ${number})`;
      } else {
        const number = Number.parseInt(elements.periodSetting ? elements.periodSetting.value : 0);
        applyPeriodSetting(number);
        if (elements.countdownUntil) elements.countdownUntil.textContent = `until summer vacation! (For Period ${number})`;
      }
      if (elements.weekendsCheckbox) elements.weekendsCheckbox.disabled = elements.periodEndToggle.checked;
    });

    // settings menu behavior
    if (elements.settingsButton && elements.settingsMenu && elements.overlay) {
      elements.settingsButton.addEventListener('click', () => {
        elements.settingsMenu.classList.toggle('open'); elements.overlay.classList.toggle('open');
      });
      if (elements.closeButton) elements.closeButton.addEventListener('click', () => { elements.settingsMenu.classList.remove('open'); elements.overlay.classList.remove('open'); });
      document.addEventListener('click', (event) => {
        if (!elements.settingsMenu.contains(event.target) && event.target !== elements.settingsButton) {
          elements.settingsMenu.classList.remove('open'); elements.overlay.classList.remove('open');
        }
      });
    }

    // reset-settings button (keeps previous behavior)
    const resetBtn = $('reset-settings');
    if (resetBtn) resetBtn.addEventListener('click', (event) => {
      if ($('body')) $('body').style.color = event.target.value;
      setCookie('color', event.target.value, 30);
      state.teacherMode = event.target.checked;
      setCookie('teachermode', state.teacherMode, 30);
      if (elements.timer) elements.timer.innerHTML = 'Calculating...';
      setCookie('font', 'sans-serif', 30);
      if ($('body')) $('body').style.fontFamily = 'sans-serif';
    });

    // load YouTube API
    loadYouTubeAPI();

    // start interval
    window.__countdownInterval = setInterval(updateTimer, TIMER_INTERVAL_MS);
    updateTimer();
  }

  // expose a minimal API for future use (e.g. tests, adding offDays)
  window.CountdownApp = {
    setTarget(date) { state.targetTime = (date instanceof Date) ? date.getTime() : new Date(date).getTime(); },
    addOffDay(d, studentOnly = false) { (studentOnly ? studentOnlyOffDays : offDays).push(d instanceof Date ? d : new Date(d)); },
    setTeacherMode(v) { state.teacherMode = !!v; },
    setWeekendsEnabled(v) { state.weekendsEnabled = !!v; },
    triggerRickrollIfEligible
  };

  // initialize on DOM ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

})();
