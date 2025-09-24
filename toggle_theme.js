const toggle = document.getElementById('toggle-theme');
const body = document.body;

toggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  toggle.classList.toggle('dark', isDark);

  const theme = isDark ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// טען את מצב התצוגה מהאחסון המקומי
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  toggle.classList.add('dark');
}