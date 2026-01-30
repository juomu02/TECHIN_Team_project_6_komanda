const nav = document.getElementById("myNavHeader");
const hamburgerClosed = document.querySelector(".hamburgerMenuClosed");
const hamburgerOpen = document.querySelector(".hamburgerMenuOpen");
const headerCircle = document.querySelector(".header-circle");
const navLinks = document.querySelector(".nav-links");

if (nav && hamburgerClosed && hamburgerOpen && headerCircle && navLinks) {

  const defaultZ = {
    circle: "1",   // normaliai apskritimas po nav overlay
    overlay: "2",  // nav overlay virš apskritimo
    links: "3",
    burger: "4"
  };

  const openZ = {
    circle: "3",   // apskritimas vizualiai virš overlay
    overlay: "2",
    links: "4",
    burger: "5"
  };

  const openMenu = () => {
    nav.style.width = "300px";
    document.body.classList.add("menu-active");

    // Set z-index only when menu is open
    headerCircle.style.zIndex = openZ.circle;
    nav.style.zIndex = openZ.overlay;
    navLinks.style.zIndex = openZ.links;
    hamburgerClosed.style.zIndex = openZ.burger;
    hamburgerOpen.style.zIndex = openZ.burger;
  };

  const closeMenu = () => {
    nav.style.width = "0";
    document.body.classList.remove("menu-active");

    // Reset z-index when menu closed
    headerCircle.style.zIndex = defaultZ.circle;
    nav.style.zIndex = defaultZ.overlay;
    navLinks.style.zIndex = defaultZ.links;
    hamburgerClosed.style.zIndex = defaultZ.burger;
    hamburgerOpen.style.zIndex = defaultZ.burger;
  };

  hamburgerClosed.addEventListener("click", openMenu);
  hamburgerOpen.addEventListener("click", closeMenu);

  window.addEventListener("resize", () => {
    if(window.innerWidth > 768) closeMenu();
  });
}
