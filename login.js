const roleTabs = document.querySelectorAll('.role-tab');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const emailInput = document.getElementById('login-email');

let currentLoginRole = 'student';

const demoAccounts = {
  student: { email: 'student@unispot.com', password: 'student123' },
  admin: { email: 'admin@unispot.com', password: 'admin123' },
};

// Switch role tab
roleTabs.forEach((btn) => {
  btn.addEventListener('click', () => {
    roleTabs.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentLoginRole = btn.getAttribute('data-role');

    if (currentLoginRole === 'admin') {
      emailInput.placeholder = 'admin@unispot.com';
    } else {
      emailInput.placeholder = 'student@unispot.com';
    }

    loginError.textContent = '';
  });
});

// Handle form submit
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const demo = demoAccounts[currentLoginRole];

  if (email === demo.email && password === demo.password) {
    loginError.textContent = '';

    if (currentLoginRole === 'student') {
      window.location.href = 'student-studysheets.html';
    } else {
      window.location.href = 'admin-studysheets.html';
    }
  } else {
    loginError.textContent = 'Incorrect email or password.';
  }
});
