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
      // fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setStatus("Copied site link.");
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", copyLink);
  }
})();
