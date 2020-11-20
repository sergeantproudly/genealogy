import "../sass/main.sass";

(function() {
  var throttle = function(type, name, obj) {
      obj = obj || window;
      var running = false;
      var func = function() {
          if (running) { return; }
          running = true;
          requestAnimationFrame(function() {
              obj.dispatchEvent(new CustomEvent(name));
              running = false;
          });
      };
      obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle("resize", "optimizedResize");
})();


// START DEMO
let registrationForm = document.querySelector(".login-and-registration__form__bottom_registration")
if (registrationForm) {
  let lastNameInput = registrationForm.querySelector('[name="lastname"]')
  let sendForm = registrationForm.querySelector('.default-button')
  lastNameInput.addEventListener('input', (event)=>{
    if (lastNameInput.value != "") {
      sendForm.removeAttribute('disabled')
    } else {
      sendForm.setAttribute('disabled', "")
    }
  })
  registrationForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    lastNameInput.parentNode.classList.add('default-field_error');
    sendForm.classList.add('default-button_loader');
  })
  
  let loginForm = document.querySelector(".login-and-registration__form__bottom_login")
  let mailInput = loginForm.querySelector('[name="mail"]')
  let passwordInput = loginForm.querySelector('[name="password"]')
  let sendFormReg = loginForm.querySelector('.default-button')
  mailInput.addEventListener('input', (event)=>{
    if (mailInput.value != "") {
      sendFormReg.removeAttribute('disabled')
    } else {
      sendFormReg.setAttribute('disabled', "")
    }
  })
  loginForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    mailInput.parentNode.parentNode.classList.add('field-with-icon_error');
    passwordInput.parentNode.parentNode.classList.add('field-with-icon_error');
    sendFormReg.classList.add('default-button_loader');
  })
}
// END DEMO

// временная постраничная навигация
window.openNavigationPages = function() {
  document
    .querySelector(".navigation-pages__shell")
    .classList.toggle("navigation-pages__shell_active");
}

let responsiveWidth = {
  lg: 1100,
  md: 760
}

let languageShell = document.querySelector('.header__language')

window.openLanguageDropdown = function() {
  if (languageShell.classList.contains('header__language_active-2')) {
    closeLanguageDropdown()
  } else {
    languageShell.classList.add('header__language_active-1')
    setTimeout(() => {
      languageShell.classList.add('header__language_active-2')
    }, 300);

  }
}

window.closeLanguageDropdown = function() {
  languageShell.classList.remove('header__language_active-2')
  setTimeout(() => {
    languageShell.classList.remove('header__language_active-1')
  }, 300);
}

let profileShell = document.querySelector('.header__profile')

window.openProfileDropdown = function() {
  if (profileShell.classList.contains('header__profile_active-2')) {
    closeProfileDropdown()
  } else {
    profileShell.classList.add('header__profile_active-1')
    setTimeout(() => {
      profileShell.classList.add('header__profile_active-2')
    }, 300);

  }
}

window.closeProfileDropdown = function() {
  profileShell.classList.remove('header__profile_active-2')
  setTimeout(() => {
    profileShell.classList.remove('header__profile_active-1')
  }, 300);
}

let tabsWithHeadline = document.querySelector(".tabs-with-headline__tabs")
if (tabsWithHeadline) {
  tabsWithHeadline.scrollTo(document.querySelector(".tabs-with-headline__tab_active").offsetLeft - 15, 0)
  
}

let windowMenu = document.querySelector('.menu-window')

window.openWindowMenu = function() {
  windowMenu.classList.add('menu-window_active-1')
  document.querySelector("body").style.overflow = "hidden";
  document.querySelector("html").style.overflow = "hidden";
  setTimeout(() => {
    windowMenu.classList.add('menu-window_active-2')
  }, 30);
}
window.closeWindowMenu = function() {
  windowMenu.classList.remove('menu-window_active-2')
  setTimeout(() => {
    windowMenu.classList.remove('menu-window_active-1')
    document.querySelector("body").removeAttribute('style')
    document.querySelector("html").removeAttribute('style')
  }, 350);
}

window.turnLoginRegistration = function(name) {
  let loginRegistrationForm = document.querySelector('.login-and-registration__form')
  if (name == "registration") {
    loginRegistrationForm.classList.remove('login-and-registration__form_login')
    loginRegistrationForm.classList.add('login-and-registration__form_registration')
  } else {
    loginRegistrationForm.classList.remove('login-and-registration__form_registration')
    loginRegistrationForm.classList.add('login-and-registration__form_login')
  }
}

window.addEventListener("load", function(event) {
  let dopFieldsButton = document.querySelector('.landing-order__form__dop')
  let dopFields = document.querySelector('.landing-order__dop-fields')
  let heightDopFields = dopFields.offsetHeight;
  dopFields.style.height = `0px`

  window.onToggleDopFields = function() {
    if (dopFieldsButton.classList.contains('landing-order__form__dop_active')) {
      dopFieldsButton.classList.remove('landing-order__form__dop_active')
      dopFields.classList.remove('landing-order__dop-fields_active')
      dopFields.style.height = `${0}px`
    } else {
      dopFieldsButton.classList.add('landing-order__form__dop_active')
      dopFields.classList.add('landing-order__dop-fields_active')
      dopFields.style.height = `${heightDopFields}px`

    }
    // handle event
    window.addEventListener("optimizedResize", function() {
      dopFields.style.height = `auto`
      heightDopFields = dopFields.offsetHeight;
      if (!dopFieldsButton.classList.contains('landing-order__form__dop_active')) {
        dopFields.style.height = `0px`
        return;
      }
      dopFields.style.height = `${heightDopFields}px`
    });
  }

  let questions = document.querySelectorAll('.landing-fag__question');
  function questionsInit() {
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];
  
      let answer = question.querySelector('.landing-fag__question__answer');
      let heightAnswer = answer.offsetHeight;
      answer.style.height = `0px`
      
      question.addEventListener('click', ()=>{
        if (question.classList.contains('landing-fag__question_hidden')) {
          answer.style.height = `0px`
          return question.classList.remove("landing-fag__question_hidden");
        }
        answer.style.height = `${heightAnswer}px`
        question.classList.add("landing-fag__question_hidden")
      })

      // handle event
      window.addEventListener("optimizedResize", function() {
        answer.style.height = `auto`
        heightAnswer = answer.offsetHeight;
        if (!question.classList.contains('landing-fag__question_hidden')) {
          answer.style.height = `0px`
          return;
        }
        answer.style.height = `${heightAnswer}px`
      });
    }
  }
  questionsInit()
})