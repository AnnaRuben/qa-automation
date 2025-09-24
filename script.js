// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

// שינוי עיצוב ה־Navbar בגלילה (מחלקות W3 + צבע קאמל)
window.onscroll = function () {
  var navbar = document.getElementById("myNavbar");

  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    navbar.className = "w3-bar w3-card w3-animate-top w3-white";
  } else {
    navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
  }

  if (window.pageYOffset > 100) {
    navbar.classList.add("camel-navbar");
  } else {
    navbar.classList.remove("camel-navbar");
  }
};

// Toggle Menu on small screens
function toggleFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") === -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

/* ==== 🔥 חיפוש בזמן אמת + מונה תוצאות + ניווט ==== */
let highlights = [];       // כל הספאנים שנמצאו
let currentIndex = -1;     // מיקום נוכחי בניווט

const input    = document.getElementById("searchInput");
const countBox = document.getElementById("searchCount");

// הדגשה ומונה תוך כדי הקלדה
input.addEventListener("input", liveSearch);

// ניווט בין תוצאות עם Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    jumpToNext();
  }
});

// פונקציה עזר: אסקפ לרג׳אקס (כדי ש־. ? * וכד' לא ישברו את החיפוש)
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// חיפוש בזמן אמת + ספירת תוצאות (מדגיש רק Text Nodes)
function liveSearch() {
  const query = input.value.trim();
  clearHighlights();

  if (!query) {
    countBox.textContent = "";
    return;
  }

  const regex = new RegExp(escapeRegExp(query), "gi");
  let found = 0;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        // דילוג על צמתים לא רלוונטיים / ריקים
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;

        // אל תדגיש בתוך קומפוננטת החיפוש עצמה
        if (node.parentElement && node.parentElement.closest("#searchContainer")) {
          return NodeFilter.FILTER_REJECT;
        }

        // אל תדגיש בתוך script/style או בתוך ספאנים שכבר הודגשו
        if (node.parentElement &&
            (node.parentElement.closest("script,style") ||
             node.parentElement.closest(".highlighted-search"))) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    },
    false
  );

  let node;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue;
    if (!regex.test(text)) { regex.lastIndex = 0; continue; }

    // מחליפים את הטקסט בפרגמנט עם ספאנים צהובים – בלי לגעת ב־innerHTML
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

// מעבר בין התאמות בלחיצה על Enter
function jumpToNext() {
  if (!highlights.length) return;
  currentIndex = (currentIndex + 1) % highlights.length;
  const target = highlights[currentIndex];
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  highlights.forEach(h => (h.style.outline = ""));
  target.style.outline = "2px solid orange";
}

// ניקוי כל ההדגשות הקודמות
function clearHighlights() {
  const current = document.querySelectorAll(".highlighted-search");
  current.forEach(span => {
    const parent = span.parentNode;
    parent.replaceChild(document.createTextNode(span.textContent), span);
    parent.normalize();
  });
}

// כפתור זכוכית מגדלת – פתיחה/סגירה של הקופסה
function toggleSearch() {
  const searchContainer = document.getElementById("searchContainer");
  searchContainer.classList.toggle("open");

  if (searchContainer.classList.contains("open")) {
    input.focus();
  } else {
    input.value = "";
    clearHighlights();
    countBox.textContent = "";
  }
}

// תאימות לאחור: אם מישהו יקרא searchSite() – פשוט הרץ את liveSearch()
function searchSite() {
  liveSearch();
}