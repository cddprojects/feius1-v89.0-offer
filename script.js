(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var header = document.querySelector(".site-header");

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    }
  });

  document.addEventListener("click", function (event) {
    if (!header.contains(event.target)) setOpen(false);
  });
})();

(function () {
  var form = document.getElementById("interest-form");
  if (!form) return;
  var confirmation = document.getElementById("form-confirmation");
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var phoneInput = document.getElementById("phone");
  var nameError = document.getElementById("name-error");
  var emailError = document.getElementById("email-error");
  var phoneError = document.getElementById("phone-error");
  var contactError = document.getElementById("contact-error");
  var consentInput = document.getElementById("consent");
  var consentError = document.getElementById("consent-error");

  function setFieldError(input, errorEl, message) {
    errorEl.textContent = message;
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function isValidPhone(value) {
    if (/[^\d\s().+\-]/.test(value)) return false;
    var digits = value.replace(/\D/g, "");
    if (digits.length === 10) return true;
    if (digits.length === 11 && digits.charAt(0) === "1") return true;
    return false;
  }

  nameInput.addEventListener("input", function () {
    setFieldError(nameInput, nameError, "");
  });
  emailInput.addEventListener("input", function () {
    setFieldError(emailInput, emailError, "");
    contactError.textContent = "";
  });
  phoneInput.addEventListener("input", function () {
    setFieldError(phoneInput, phoneError, "");
    contactError.textContent = "";
  });
  consentInput.addEventListener("change", function () {
    setFieldError(consentInput, consentError, "");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (form.getAttribute("data-lock") === "1") return;

    confirmation.hidden = true;

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var phone = phoneInput.value.trim();

    var nameMsg = name.length < 2 ? "Enter your name." : "";
    var emailMsg = email && !isValidEmail(email) ? "Enter a valid email address." : "";
    var phoneMsg = phone && !isValidPhone(phone) ? "Enter a valid 10-digit mobile number." : "";
    var hasValidContact = (email && !emailMsg) || (phone && !phoneMsg);
    var contactMsg = !email && !phone ? "Enter an email address or a mobile number. You can provide both." : "";

    var consentMsg = consentInput.checked ? "" : "Please agree before sending.";

    setFieldError(nameInput, nameError, nameMsg);
    setFieldError(emailInput, emailError, emailMsg);
    setFieldError(phoneInput, phoneError, phoneMsg);
    setFieldError(consentInput, consentError, consentMsg);
    contactError.textContent = contactMsg;

    if (nameMsg || emailMsg || phoneMsg || contactMsg || consentMsg || !hasValidContact) {
      if (nameMsg) nameInput.focus();
      else if (emailMsg || contactMsg) emailInput.focus();
      else if (phoneMsg) phoneInput.focus();
      else consentInput.focus();
      return;
    }

    form.reset();
    setFieldError(nameInput, nameError, "");
    setFieldError(emailInput, emailError, "");
    setFieldError(phoneInput, phoneError, "");
    setFieldError(consentInput, consentError, "");
    contactError.textContent = "";
    confirmation.hidden = false;
    confirmation.focus();
    form.setAttribute("data-lock", "1");
    window.setTimeout(function () {
      form.removeAttribute("data-lock");
    }, 800);
  });
})();
