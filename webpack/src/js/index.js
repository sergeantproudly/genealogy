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

