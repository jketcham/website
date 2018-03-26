window.onload = init;

initTheme();

function init() {
  initThemeToggle();
}

function initTheme() {
  const themeElement = document.body;
  const themePreference = window.sessionStorage.getItem('theme-preference');

  if (themePreference === 'night') {
    themeElement.classList.add('night');
  }
}

function initThemeToggle() {
  const nightToggleElement = document.getElementById('theme-toggle');
  const themeElement = document.body;

  const nightToggleListener = nightToggleElement.addEventListener('click', (event) => {
    if (themeElement.classList.contains('night')) {
      themeElement.classList.remove('night');
      window.sessionStorage.setItem('theme-preference', 'day');
    } else {
      themeElement.classList.add('night');
      window.sessionStorage.setItem('theme-preference', 'night');
    }
  });
}
