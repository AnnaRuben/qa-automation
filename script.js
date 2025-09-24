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

  // שינוי מחלקות עיצוב (w3)
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    navbar.className = "w3-bar w3-card w3-animate-top w3-white";
  } else {
    navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
  }

  // שינוי צבע לסרגל קאמל
  if (window.pageYOffset > 100) {
    navbar.classList.add("camel-navbar");
  } else {
    navbar.classList.remove("camel-navbar");
  }
};

// Toggle Menu on small screens
function toggleFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// פונקציית חיפוש
function searchSite() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const bodyText = document.body.innerText.toLowerCase();

  if (query && bodyText.includes(query)) {
    alert(`נמצא טקסט: "${query}" בדף`);
  } else {
    alert(`לא נמצא "${query}" בדף זה`);
  }

  return false; // כדי למנוע רענון של הדף
}