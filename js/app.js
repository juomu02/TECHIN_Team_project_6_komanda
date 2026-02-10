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
    hamburgerClosed.setAttribute("aria-expanded", "true");
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
    if (window.innerWidth > 767) closeMenu();
  });

  document.addEventListener("keydown", (x) => {
    if (x.key === "Escape" && !nav.hidden) {
      closeMenu();
    }
  });
}

/* ============= INPUT VALIDATION =============== */
/* ============= CONTACTS FORM =============== */

const form = document.getElementById("contact-form");

//first input field with error, used for both contact and cta forms
let firstErrorField = "";

const fieldInvalid = (element, elementErr) => {
  const errColor = "#FF000080";
  //input field is colored red only if something wrong is entered
  if (element.value !== "") {
    element.style.color = errColor;
  }

  element.style.borderColor = errColor;
  elementErr.style.marginBottom = "-12px";

  //first field with error message is set if there is none yet, this is later used for focus() command
  if (firstErrorField === "") {
    firstErrorField = element;
  }

  //aria-describedby is created and connected to error element
  element.setAttribute("aria-describedby", elementErr.id);
};

const disableDefaultAlerts = (formElement) => {
  formElement.noValidate = true;
};

const resetErrorFields = (error) => {
  error.textContent = "";
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

  //reset textContent of error fields
  resetErrorFields(nameErr);
  resetErrorFields(emailErr);
  resetErrorFields(companyErr);
  resetErrorFields(titleErr);
  resetErrorFields(messageErr);

  firstErrorField = "";

  let isValid = true;

  //element array used for full reset after successfull form submit
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

  //function used for full reset after successfull form submit
  const resetFieldValues = () => {
    elementArray.forEach((element) => {
      element.value = "";
    });
  };

  //function that removes color, bordercolor and margin style elements from all array fields
  const resetFieldColors = () => {
    elementArray.forEach((element) => {
      element.removeAttribute("style");
      element.removeAttribute("aria-describedby");
    });
  };

  resetFieldColors();

  //regex that requires at least two words foor full name, limited to 50 symbols
  const nameRegex =
    /^(?=[^ ]+ +[^ ]+)(?=.{1,50}$)[a-zA-Zà-ÿÀ-ß]+(?: [a-zA-Zà-ÿÀ-ß]+)*$/;

  //regex that prevents use of listed symbols
  const nameNotAllowedRegex = /[0-9_!@#$%^&*()=+[\]{};:"\\|,.<>/?~`]/;

  //checking Full Name field
  switch (true) {
    case name.value === "":
      nameErr.textContent = "This field can't be empty";
      fieldInvalid(name, nameErr);
      isValid = false;
      break;
    case nameNotAllowedRegex.test(name.value):
      nameErr.textContent = "Invalid symbols used";
      fieldInvalid(name, nameErr);
      isValid = false;
      break;
    case !nameRegex.test(name.value):
      nameErr.textContent =
        "Please write your full name. It must be two or more words.";
      fieldInvalid(name, nameErr);
      isValid = false;
      break;
  }

  //checking Email field
  const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;

  switch (true) {
    case email.value === "":
      emailErr.textContent = "This field can't be empty";
      fieldInvalid(email, emailErr);
      isValid = false;
      break;
    case !emailRegex.test(email.value):
      emailErr.textContent = "Invalid email address";
      fieldInvalid(email, emailErr);
      isValid = false;
      break;
  }

  //checking company field
  if (company.value === "") {
    companyErr.textContent = "This field can't be empty";
    fieldInvalid(company, companyErr);
    isValid = false;
  }

  //checking title field
  if (title.value === "") {
    titleErr.textContent = "This field can't be empty";
    fieldInvalid(title, titleErr);
    isValid = false;
  }

  //checking message field
  if (message.value === "") {
    messageErr.textContent = "This field can't be empty.";
    fieldInvalid(message, messageErr);
    isValid = false;
  }

  //final evaluation if form is valid
  if (isValid) {
    resetFieldValues();
    return confirm("Do you really want to submit the form?");
  } else {
    alert("Please correct the errors in the form!");
    firstErrorField.focus();
    return true;
  }
};

if (form) {
  disableDefaultAlerts(form);
  form.addEventListener("submit", validateForm);
}

/* ============= SCHEDULE A DEMO INPUTS =============== */

const validateScheduleDemoInput = (buttonId) => {
  var demoIdArray = [
    {
      buttonId: "cta_home_hero_btn",
      inputId: "cta_home_hero_input",
      errId: "cta_home_hero_err",
    },

    {
      buttonId: "cta_home_cta_btn",
      inputId: "cta_home_cta_input",
      errId: "cta_home_cta_err",
    },

    {
      buttonId: "cta_pricing_cta_btn",
      inputId: "cta_pricing_cta_input",
      errId: "cta_pricing_cta_err",
    },

    {
      buttonId: "cta_about_cta_btn",
      inputId: "cta_about_cta_input",
      errId: "cta_about_cta_err",
    },

    {
      buttonId: "cta_contact_cta_btn",
      inputId: "cta_contact_cta_input",
      errId: "cta_contact_cta_err",
    },
  ];

  const resetDemoInputErrors = (demoIdArray) => {
    demoIdArray.forEach((value) => {
      const error = document.getElementById(value.errId);

      if (error) {
        error.textContent = "";
        error.removeAttribute("style");
      }
    });
  };

  const resetDemoInputValues = (demoIdArray) => {
    demoIdArray.forEach((value) => {
      const input = document.getElementById(value.inputId);

      if (input) {
        input.value = "";
        input.removeAttribute("style");
      }
    });
  };

  const validateInput = (inputId, errId) => {
    const email = document.getElementById(inputId);
    const emailErr = document.getElementById(errId);

    //checking Email field
    const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;

    resetDemoInputErrors(demoIdArray);
    firstErrorField = "";

    let isValid = true;
    switch (true) {
      case email.value === "":
        emailErr.textContent = "This field can't be empty";
        fieldInvalid(email, emailErr);
        isValid = false;
        break;
      case !emailRegex.test(email.value):
        emailErr.textContent = "Invalid email address";
        fieldInvalid(email, emailErr);
        isValid = false;
        break;
    }
    
    //final evaluation if form is valid
    if (isValid) {
      resetDemoInputValues(demoIdArray);
      return confirm("Do you really want to submit the form?");
    } else {
      alert("Please correct the errors in the form!");
      firstErrorField.focus();
      return true;
    }
  };

  demoIdArray.forEach((value) => {
    if (value.buttonId === buttonId) {
      validateInput(value.inputId, value.errId);
    }
  });
};

document.addEventListener("click", (event) => {
  if (event.target.matches(".btn-prime")) {
    const clickedId = event.target.id;
    validateScheduleDemoInput(clickedId);
  }
});
