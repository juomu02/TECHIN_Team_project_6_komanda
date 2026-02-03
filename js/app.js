/* ============= HAMBURGER MENU =============== */

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
    burger: "5",
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

    setTimeout(() => {
      document.body.classList.remove("menu-active");

      headerCircle.style.zIndex = defaultZ.circle;
      nav.style.zIndex = defaultZ.background;
      navLinks.style.zIndex = defaultZ.links;
      hamburgerClosed.style.zIndex = defaultZ.burger;
      hamburgerOpen.style.zIndex = defaultZ.burger;
    }, 300);
  };

  hamburgerClosed.addEventListener("click", openMenu);
  hamburgerOpen.addEventListener("click", closeMenu);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) closeMenu();
  });
}
/* ============= INPUT VALIDATION =============== */
/* ============= CONTACTS FORM =============== */

const form = document.getElementById("contact-form");

const fieldInvalid = (element, elementErr) => {
  const errColor = "#FF000080";
  element.style.color = errColor;
  element.style.borderColor = errColor;
  elementErr.style.marginBottom = "-12px";
};

const disableDefaultAlerts = (formElement) => {
  formElement.noValidate = true;
};

const validateForm = (e) => {
  e.preventDefault();
  const name = document.getElementById("form_input_name");
  const email = document.getElementById("form_input_email");
  const company = document.getElementById("form_input_company");
  const title = document.getElementById("form_input_title");
  const message = document.getElementById("form_input_message");

  const nameErr = document.getElementById("form_input_name-error");
  const emailErr = document.getElementById("form_input_email-error");
  const companyErr = document.getElementById("form_input_company-error");
  const titleErr = document.getElementById("form_input_title-error");
  const messageErr = document.getElementById("form_input_message-error");

  nameErr.textContent = "";
  emailErr.textContent = "";
  companyErr.textContent = "";
  titleErr.textContent = "";
  messageErr.textContent = "";

  let isValid = true;

  const resetFields = () => {
    const elementArray = [
      name,
      nameErr,
      email,
      emailErr,
      company,
      companyErr,
      title,
      titleErr,
      message,
      messageErr,
    ];
    elementArray.forEach((element) => {
      element.style.color = "";
      element.style.borderColor = "";
      element.value = "";
    });
  };

  //checking Name field
  const nameRegex =
    /^(?=[^ ]+ +[^ ]+)(?=.{1,50}$)[a-zA-Zà-ÿÀ-ß]+(?: [a-zA-Zà-ÿÀ-ß]+)*$/;
  const nameNotAllowedRegex = /[0-9_!@#$%^&*()=+[\]{};:"\\|,.<>/?~`]/;

  switch (true) {
    case name.value === "":
      nameErr.textContent = "This field cannot be empty.";
      fieldInvalid(name, nameErr);
      isValid = false;
      break;
    case nameNotAllowedRegex.test(name.value):
      nameErr.textContent = "Invalid symbols used.";
      fieldInvalid(name, nameErr);
      isValid = false;
      break;
    case !nameRegex.test(name.value):
      nameErr.textContent = "Please write your full name.";
      fieldInvalid(name, nameErr);
      isValid = false;
      break;
  }

  //checking Email field
  const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;

  switch (true) {
    case email.value === "":
      emailErr.textContent = "This field cannot be empty.";
      fieldInvalid(email, emailErr);
      isValid = false;
      break;
    case !emailRegex.test(email.value):
      emailErr.textContent = "Invalid email address.";
      fieldInvalid(email, emailErr);
      isValid = false;
      break;
  }

  //checking company field
  if (company.value === "") {
    companyErr.textContent = "This field cannot be empty.";
    fieldInvalid(company, companyErr);
    isValid = false;
  }

  //checking title field
  if (title.value === "") {
    titleErr.textContent = "This field cannot be empty.";
    fieldInvalid(title, titleErr);
    isValid = false;
  }

  //checking message field
  if (message.value === "") {
    messageErr.textContent = "This field cannot be empty.";
    fieldInvalid(message, messageErr);
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
    resetFields();
    return true;
  } else {
    return false;
  }
};

disableDefaultAlerts(form);

form.addEventListener("submit", validateForm);
