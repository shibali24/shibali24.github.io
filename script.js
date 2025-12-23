(function () {
  const statusEl = document.getElementById("status");
  const copyBtn = document.getElementById("copySiteBtn");

  function setStatus(msg) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    window.clearTimeout(setStatus._t);
    setStatus._t = window.setTimeout(() => {
      statusEl.textContent = "";
    }, 1800);
  }

  async function copyLink() {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setStatus("Copied site link.");
    } catch (e) {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setStatus("Copied site link.");
    }
  }

  if (copyBtn) copyBtn.addEventListener("click", copyLink);

  // Typing header (kept subtle on purpose)
  const typingEl = document.getElementById("typingText");

  // Allow pages to override phrases by setting window.TYPING_PHRASES = [...]
  const lines = (Array.isArray(window.TYPING_PHRASES) && window.TYPING_PHRASES.length)
    ? window.TYPING_PHRASES
    : [
        "Distributed systems, reliability, and real users.",
        "Tough problems. Clean builds.",
        "Full stack work with production constraints."
      ];


  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function typeLoop() {
    if (!typingEl) return;

    // If someone prefers reduced motion, do not animate.
    if (reduceMotion) {
      typingEl.textContent = lines[0];
      return;
    }

    let i = 0;
    while (true) {
      const line = lines[i % lines.length];
      typingEl.textContent = "";

      for (let c = 0; c < line.length; c++) {
        typingEl.textContent += line[c];
        await sleep(26);
      }

      await sleep(900);

      for (let c = line.length; c >= 0; c--) {
        typingEl.textContent = line.slice(0, c);
        await sleep(14);
      }

      await sleep(260);
      i++;
    }
  }

  typeLoop();
})();
