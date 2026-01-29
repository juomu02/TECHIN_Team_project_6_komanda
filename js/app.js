const nav = document.getElementById("myNavHeader");
const hamburgerClosed = document.querySelector(".hamburgerMenuClosed");
const hamburgerOpen = document.querySelector(".hamburgerMenuOpen");

// Open menu
hamburgerClosed.addEventListener("click", () => {
  nav.style.width = "300px"; // atidarome overlay
  document.body.classList.add("menu-active");
});

// Close menu
hamburgerOpen.addEventListener("click", () => {
  nav.style.width = "0"; // uždarome overlay
  document.body.classList.remove("menu-active");
});

// Desktop resize handler 
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    nav.style.width = "0";             // uždaryti menu
    document.body.classList.remove("menu-active"); // pašalinti active klasę
  }
});