const nav = document.getElementById("myNavHeader");
const hamburgerClosed = document.querySelector(".hamburgerMenuClosed");
const hamburgerOpen = document.querySelector(".hamburgerMenuOpen");
const headerCircle = document.querySelector(".header-circle");
const navLinks = document.querySelector(".nav-links");

if (nav && hamburgerClosed && hamburgerOpen && headerCircle && navLinks) {

  const defaultZ = {
    circle: "-1",  
    background: "2", 
    links: "3",
    burger: "4",
  };

  const openZ = {
    circle: "3",   
    background: "2",
    links: "4",
    burger: "5"
  };

  const openMenu = () => {
    nav.style.width = "300px";
    nav.hidden = false;
    document.body.classList.add("menu-active");

    // z-index, kai menu open:
    headerCircle.style.zIndex = openZ.circle;
    nav.style.zIndex = openZ.background;
    navLinks.style.zIndex = openZ.links;
    hamburgerClosed.style.zIndex = openZ.burger;
    hamburgerOpen.style.zIndex = openZ.burger;

    // Fokusas
    nav.focus();
    hamburgerClosed.setAttribute("aria-expanded", "true")
  };

  const closeMenu = () => {
  nav.style.width = "0";

  setTimeout(() => {
    document.body.classList.remove("menu-active");

    headerCircle.style.zIndex = defaultZ.circle;
    nav.style.zIndex = defaultZ.background;
    navLinks.style.zIndex = defaultZ.links;
    hamburgerClosed.style.zIndex = defaultZ.burger;
    hamburgerOpen.style.zIndex = defaultZ.burger;

    nav.hidden = true;
    hamburgerClosed.setAttribute("aria-expanded", "false");
    hamburgerClosed.focus();
  }, 300);
};

  hamburgerClosed.addEventListener("click", openMenu);
  hamburgerOpen.addEventListener("click", closeMenu);

  window.addEventListener("resize", () => {
    if(window.innerWidth > 767) closeMenu();
  });

document.addEventListener("keydown", (x) => {
  if (x.key === "Escape" && !nav.hidden) {
    closeMenu();
  }
});

}