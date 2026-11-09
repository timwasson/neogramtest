/**
 * Retro Effects & Interactions (90s Web Polish)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Clock in status bar
  const clockElem = document.getElementById('retro-live-clock');
  function updateClock() {
    if (!clockElem) return;
    const now = new Date();
    clockElem.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Window Minimize/Maximize Toggle
  const windowBoxes = document.querySelectorAll('.retro-window');
  windowBoxes.forEach((win) => {
    const minBtn = win.querySelector('.win-btn-min');
    const closeBtn = win.querySelector('.win-btn-close');
    const body = win.querySelector('.retro-window-body');

    if (minBtn && body) {
      minBtn.addEventListener('click', () => {
        playRetroBeep(440, 0.05);
        if (body.style.display === 'none') {
          body.style.display = 'block';
          minBtn.textContent = '_';
        } else {
          body.style.display = 'none';
          minBtn.textContent = '□';
        }
      });
    }

    if (closeBtn && body) {
      closeBtn.addEventListener('click', () => {
        playRetroBeep(220, 0.08);
        win.style.opacity = '0.5';
        setTimeout(() => {
          win.style.opacity = '1';
          alert("Windows 95 System Dialog: Cannot close the primary root application.");
        }, 150);
      });
    }
  });

  // 3. Odometer Hit Counter (Simulated local progression)
  const counterDigits = document.querySelectorAll('.retro-hit-counter .digit');
  if (counterDigits.length > 0) {
    let currentHits = parseInt(localStorage.getItem('neogramtest_hits') || '1337', 10);
    currentHits += 1;
    localStorage.setItem('neogramtest_hits', currentHits.toString());

    const padded = currentHits.toString().padStart(counterDigits.length, '0');
    counterDigits.forEach((digitEl, idx) => {
      digitEl.textContent = padded[idx] || '0';
    });
  }

  // 4. Synthesized Retro Click / Modem Beep using Web Audio API
  let audioCtx = null;
  function playRetroBeep(freq = 600, duration = 0.04) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio autoplay restrictions or no audio device
    }
  }

  // Attach sound to interactive buttons
  document.querySelectorAll('.retro-btn, .nav-btn, .widget-select-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      playRetroBeep(750, 0.03);
    });
  });
});
