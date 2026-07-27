const loginForm = document.querySelector('#managerLoginForm');
const loginSection = document.querySelector('#manager-login');
const dashboard = document.querySelector('#financeDashboard');
const loginMessage = document.querySelector('#loginMessage');
const logoutButton = document.querySelector('#managerLogout');

const showDashboard = () => {
  loginSection.classList.add('d-none');
  dashboard.classList.remove('d-none');
};

if (sessionStorage.getItem('cardinalManagerLoggedIn') === 'true') {
  showDashboard();
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.querySelector('#managerEmail').value.trim();
  const password = document.querySelector('#managerPassword').value.trim();
  const isCardinalManager = email.endsWith('@cardinalt.com') && password.length >= 4;

  if (!isCardinalManager) {
    loginMessage.textContent = 'Use um email Cardinal valido e a palavra-passe de gestor.';
    return;
  }

  sessionStorage.setItem('cardinalManagerLoggedIn', 'true');
  loginMessage.textContent = '';
  showDashboard();
});

logoutButton.addEventListener('click', () => {
  sessionStorage.removeItem('cardinalManagerLoggedIn');
  dashboard.classList.add('d-none');
  loginSection.classList.remove('d-none');
  loginForm.reset();
});
