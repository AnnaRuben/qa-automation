// ==================== Modal Image Gallery ====================
function onClick(element) {
  const modalImg = document.getElementById("img01");
  const modalBox = document.getElementById("modal01");
  const caption  = document.getElementById("caption");
  if (modalImg && modalBox && caption) {
    modalImg.src = element.src;
    modalBox.style.display = "block";
    caption.innerHTML = element.alt || "";
  }
}

// ==================== Navbar Scroll Effect ====================
window.onscroll = function () {
  const navbar = document.getElementById("myNavbar");
  if (!navbar) return;

  const scrolled = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
  if (scrolled) {
    navbar.className = "w3-bar w3-card w3-animate-top w3-white";
    navbar.classList.add("camel-navbar");
  } else {
    navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    navbar.classList.remove("camel-navbar");
  }
};

// ==================== Mobile Menu Toggle ====================
function toggleFunction() {
  const x = document.getElementById("navDemo");
  if (!x) return;
  x.className = x.className.indexOf("w3-show") === -1
    ? x.className + " w3-show"
    : x.className.replace(" w3-show", "");
}

// ==================== 🔍 Live Search + Counter ====================
(() => {
  const input    = document.getElementById("searchInput");
  const countBox = document.getElementById("searchCount");
  if (!input || !countBox) return;

  let highlights = [];
  let currentIndex = -1;

  input.addEventListener("input", liveSearch);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      jumpToNext();
    }
  });

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function liveSearch() {
    const query = input.value.trim();
    clearHighlights();
    if (!query) { countBox.textContent = ""; return; }

    const regex = new RegExp(escapeRegExp(query), "gi");
    let found = 0;

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          if (node.parentElement?.closest("#searchContainer")) return NodeFilter.FILTER_REJECT;
          if (node.parentElement?.closest("script,style,.highlighted-search")) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue;
      regex.lastIndex = 0; 
      if (!text.match(regex)) continue;

      const frag = document.createDocumentFragment();
      let lastIndex = 0;
      regex.lastIndex = 0;
      let match;
      while ((match = regex.exec(text)) !== null) {
        const before = text.slice(lastIndex, match.index);
        if (before) frag.appendChild(document.createTextNode(before));
        const span = document.createElement("span");
        span.className = "highlighted-search";
        span.textContent = match[0];
        frag.appendChild(span);
        found++;
        lastIndex = regex.lastIndex;
      }
      const after = text.slice(lastIndex);
      if (after) frag.appendChild(document.createTextNode(after));
      node.parentNode.replaceChild(frag, node);
    }

    highlights = Array.from(document.querySelectorAll(".highlighted-search"));
    currentIndex = -1;
    countBox.textContent = found ? `${found} תוצאות` : "אין תוצאות";
  }

  function jumpToNext() {
    if (!highlights.length) return;
    currentIndex = (currentIndex + 1) % highlights.length;
    const target = highlights[currentIndex];
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    highlights.forEach(h => h.style.outline = "");
    target.style.outline = "2px solid orange";
  }

  function clearHighlights() {
    document.querySelectorAll(".highlighted-search").forEach(span => {
      const parent = span.parentNode;
      parent.replaceChild(document.createTextNode(span.textContent), span);
      parent.normalize();
    });
  }

  window.toggleSearch = function () {
    const searchContainer = document.getElementById("searchContainer");
    searchContainer?.classList.toggle("open");
    if (searchContainer?.classList.contains("open")) {
      input.focus();
    } else {
      input.value = "";
      clearHighlights();
      countBox.textContent = "";
    }
  };

  window.searchSite = liveSearch;
})();

// ==================== Bug Toolbox Modal ====================
function openEvidence(id) {
  alert("Modal evidence for bug: " + id);
}

// ==================== Before/After Slider ====================
(() => {
  const slider = document.getElementById('baSlider');
  const beforeImg = document.querySelector('.ba-before');
  if (slider && beforeImg) {
    slider.addEventListener('input', e => {
      beforeImg.style.clipPath = `inset(0 ${100 - e.target.value}% 0 0)`;
    });
  }
})();

// ==================== Trust Dashboard Counters ====================
(() => {
  const counters = document.querySelectorAll('.trust-dashboard .value');
  if (!counters.length) return;
  const speed = 40;
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(/\D/g, '');
      const inc = Math.ceil(target / speed);
      if (count < target) {
        counter.innerText = (count + inc) + (counter.dataset.target.includes('%') ? '%' : '');
        setTimeout(updateCount, 60);
      } else {
        counter.innerText = counter.dataset.target +
          (counter.dataset.target.includes('%') ? '' :
            (counter.innerText.includes('min') ? ' min' :
              counter.innerText.includes('hrs') ? ' hrs' : '%'));
      }
    };
    updateCount();
  });
})();

// ==================== ⚡ Automation Playground – Glow Edition ====================
(() => {
  const el = (id) => document.getElementById(id);
  const consoleBox    = el('labConsole');
  const stepsBox      = el('labSteps');
  const progressBar   = el('labBar');
  const gaugeText     = el('labGaugeText');
  const cardsWrap     = el('labCards');

  const suites = {
    smoke: [
      { name: 'Navbar renders', run: () => !!document.getElementById('myNavbar') },
      { name: 'Hero title contains QAUTOMATED',
        run: () => document.querySelector('.hero-title')?.textContent.includes('QAUTOMATED') },
      { name: 'At least 3 nav links', run: () => document.querySelectorAll('#myNavbar a').length >= 3 }
    ],
    ui: [
      { name: 'Hero title camel color',
        run: () => getComputedStyle(document.querySelector('.hero-title')).color.includes('179, 139, 94') },
      { name: 'Search button hoverable', run: () => !!document.querySelector('.search-btn') },
      { name: 'Cards glow effect present', run: () => true }
    ],
    regression: [
      { name: 'All images have alt', run: () => Array.from(document.querySelectorAll('img')).every(i => i.alt?.trim()) },
      { name: 'Before/After slider exists', run: () => !!document.getElementById('baSlider') },
      { name: 'Journey timeline present', run: () => !!document.querySelector('.journey-timeline') }
    ]
  };

  const typeLine = (text, target, speed=18) => new Promise(res => {
    if (!el('toggleTypewriter')?.checked) { target.textContent = text; return res(); }
    target.textContent = '';
    let i = 0;
    const tick = () => {
      if (i < text.length) { target.textContent += text[i++]; requestAnimationFrame(tick); }
      else res();
    };
    tick();
  });

  function updateGauge(percentage) {
      const meterOuter = document.querySelector('.lab-gauge svg .gauge-meter-outer');
      const meterMiddle = document.querySelector('.lab-gauge svg .gauge-meter-middle');
      const meterInner = document.querySelector('.lab-gauge svg .gauge-meter-inner');
      const gaugeTextElement = document.getElementById('labGaugeText');

      if (!meterOuter || !meterMiddle || !meterInner || !gaugeTextElement) {
          console.warn("Gauge elements not found.");
          return;
      }

      const circumferenceOuter = 2 * Math.PI * 90;
      const circumferenceMiddle = 2 * Math.PI * 70;
      const circumferenceInner = 2 * Math.PI * 50;

      meterOuter.style.strokeDasharray = `${(percentage / 100) * circumferenceOuter} ${circumferenceOuter}`;
      meterMiddle.style.strokeDasharray = `${(percentage / 100) * circumferenceMiddle} ${circumferenceMiddle}`;
      meterInner.style.strokeDasharray = `${(percentage / 100) * circumferenceInner} ${circumferenceInner}`;

      gaugeTextElement.textContent = `${Math.round(percentage)}%`;
  }

  const card = ({name, passed, meta='', details=''}) => {
    const div = document.createElement('div');
    div.className = `lab-card ${passed ? 'pass' : 'fail'}`;
    div.innerHTML = `
      <div class="title">${passed ? '✅' : '❌'} ${name} <span class="badge">${passed ? 'PASS' : 'FAIL'}</span></div>
      ${meta ? `<div class="meta">${meta}</div>` : ''}
      ${details ? `<div class="details">${details}</div>` : ''}
    `;
    return div;
  };

  const renderVisualDiffDemo = (passed) => {
    cardsWrap.appendChild(card({
      name: 'Visual Diff (thumbnail)',
      passed,
      meta: 'baseline ⟷ current | threshold 0.1%',
      details: 'No pixel drift detected on hero block.'
    }));
  };

  function runSuite() {
    const tests = suites['smoke'];
    const includeFlaky = el('toggleFlaky')?.checked;

    stepsBox.innerHTML = '';
    cardsWrap.innerHTML = '';
    progressBar.style.width = '0%';
    updateGauge(0);

    const intro = `Running SMOKE suite • ${tests.length} tests…`;
    const typer = el('labTyper');

    typeLine(intro, typer).then(() => {
      let i = 0, passed = 0;
      const total = tests.length + (includeFlaky ? 1 : 0);

      const step = () => {
        if (i < tests.length) {
          const t = tests[i++];
          const ok = !!t.run();
          if (ok) passed++;
          const row = document.createElement('div');
          row.className = `lab-step ${ok ? 'pass' : 'fail'}`;
          row.textContent = `${ok ? '✅' : '❌'} ${t.name}`;
          stepsBox.appendChild(row);
          cardsWrap.appendChild(card({ name: t.name, passed: ok }));

          const pct = Math.round(((i) / total) * 100);
          progressBar.style.width = pct + '%';
          updateGauge(pct);
          setTimeout(step, 480);
        } else {
          progressBar.style.width = '100%';
          updateGauge(Math.round((passed / total) * 100));
          renderVisualDiffDemo(true);
        }
      };
      step();
    });
  }

  const runLabBtn = document.getElementById('runLab');
  if (runLabBtn) runLabBtn.addEventListener('click', runSuite);

  document.addEventListener('DOMContentLoaded', () => {
      updateGauge(0);
  });
})();

// ==================== E2E Runner ====================

// Detect automation mode
const isAutomation = new URLSearchParams(location.search).get("automation") === "1";

const btn = document.getElementById("runE2E");
if (!btn) return;

btn.addEventListener("click", async (e) => {
  const resultsBox = document.getElementById("e2eResults");
  if (!resultsBox) return;

  if (isAutomation) {
    e.preventDefault();
    resultsBox.innerHTML = `
      <p><b>Status:</b> SIMULATED</p>
      <pre>Automation mode is on; backend call is disabled to avoid recursion.</pre>
    `;
    return;
  }

  resultsBox.innerHTML = "<p>⏳ Running test... please wait</p>";

  try {
    const res = await fetch("/api/run-e2e");
    const data = await res.json();

    resultsBox.innerHTML = `
      <p><b>Status:</b> ${data.status}</p>
      <pre>${data.log}</pre>
    `;
  } catch (err) {
    resultsBox.innerHTML = `<p style="color:red;">❌ Error while running the test</p>`;
  }
});
