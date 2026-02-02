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
    burger: "4"
  };

  const openZ = {
    circle: "3",   // apskritimas vizualiai virš overlay
    background: "2",
    links: "4",
    burger: "5"
  };

  const openMenu = () => {
    nav.style.width = "300px";
    document.body.classList.add("menu-active");

    // z-index, kai menu open:
    headerCircle.style.zIndex = openZ.circle;
    nav.style.zIndex = openZ.background;
    navLinks.style.zIndex = openZ.links;
    hamburgerClosed.style.zIndex = openZ.burger;
    hamburgerOpen.style.zIndex = openZ.burger;
  };

  const closeMenu = () => {
    nav.style.width = "0";
    document.body.classList.remove("menu-active");

    // z-index, kai menu closed:
    headerCircle.style.zIndex = defaultZ.circle;
    nav.style.zIndex = defaultZ.background;
    navLinks.style.zIndex = defaultZ.links;
    hamburgerClosed.style.zIndex = defaultZ.burger;
    hamburgerOpen.style.zIndex = defaultZ.burger;
  };

  hamburgerClosed.addEventListener("click", openMenu);
  hamburgerOpen.addEventListener("click", closeMenu);

  window.addEventListener("resize", () => {
    if(window.innerWidth > 767) closeMenu();
  });
}
