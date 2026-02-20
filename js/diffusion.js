// Stable Diffusion style text generation animation
(function () {
  const chars =
    "▇";
  const chineseChars = "▇";

  // const chars ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  // const chineseChars = "的一是不了在人有我他这个们中来上大为和国地到以说时要就出会可也你对生能而子那得于着下自之年过发后作里如家多成回去然学";

  function isChineseChar(char) {
    return /[\u4e00-\u9fa5]/.test(char);
  }

  function getRandomChar(original) {
    if (original === " " || original === "\n") return original;
    if (isChineseChar(original)) {
      return chineseChars[Math.floor(Math.random() * chineseChars.length)];
    }
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function wrapTextNodes(element) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    while (walker.nextNode()) {
      if (walker.currentNode.textContent.trim()) {
        textNodes.push(walker.currentNode);
      }
    }

    textNodes.forEach((node) => {
      // Normalize whitespace: collapse multiple spaces/newlines into single space
      const text = node.textContent.replace(/\s+/g, " ");
      const span = document.createElement("span");
      span.className = "diffusion-text";

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === " ") {
          // Use text node for spaces to preserve normal word spacing
          span.appendChild(document.createTextNode(" "));
        } else {
          const charSpan = document.createElement("span");
          charSpan.className = "diffusion-char";
          charSpan.textContent = char;
          charSpan.dataset.original = char;
          span.appendChild(charSpan);
        }
      }

      node.parentNode.replaceChild(span, node);
    });
  }

  function animateElement(element, delay = 0) {
    const charSpans = element.querySelectorAll(".diffusion-char");
    if (charSpans.length === 0) return;

    const totalDuration = 800;
    const noisePhase = 400;

    charSpans.forEach((span, index) => {
      const original = span.dataset.original;
      if (original === " " || original === "\n") return;

      span.style.opacity = "0";

      setTimeout(() => {
        span.style.opacity = "1";
        span.classList.add("generating");

        // Noise phase - rapid random changes
        const noiseInterval = setInterval(() => {
          span.textContent = getRandomChar(original);
        }, 30);

        // Calculate when this character should resolve
        const charDelay = (index / charSpans.length) * (totalDuration - noisePhase);

        setTimeout(() => {
          clearInterval(noiseInterval);

          // Convergence phase - gradually settle to final character
          let convergenceSteps = 5;
          let step = 0;

          const convergeInterval = setInterval(() => {
            step++;
            if (step >= convergenceSteps || Math.random() > 0.3) {
              clearInterval(convergeInterval);
              span.textContent = original;
              span.classList.remove("generating");
              span.classList.add("resolved");
            } else {
              span.textContent = getRandomChar(original);
            }
          }, 50);
        }, noisePhase + charDelay);
      }, delay + index * 5);
    });
  }

  function initDiffusionEffect() {
    // Elements to animate
    const selectors = [
      ".content-header h2",
      ".content-text h3",
      ".content-text p",
      ".content-text li",
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        wrapTextNodes(el);
      });
    });

    // Animate on page load with staggered delays
    const allElements = document.querySelectorAll(
      ".content-header h2, .content-text h3, .content-text p, .content-text li"
    );

    allElements.forEach((el, index) => {
      animateElement(el, index * 150);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDiffusionEffect);
  } else {
    initDiffusionEffect();
  }
})();
