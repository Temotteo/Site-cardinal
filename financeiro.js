const loginForm = document.querySelector('#managerLoginForm');
const loginSection = document.querySelector('#manager-login');
const dashboard = document.querySelector('#financeDashboard');
const loginMessage = document.querySelector('#loginMessage');
const logoutButton = document.querySelector('#managerLogout');
const areaButtons = document.querySelectorAll('[data-area-target]');
const managementAreas = document.querySelectorAll('.management-area');
const PBKDF2_ITERATIONS = 310000;
const MANAGER_USERS = [
  {
    email: 'admin@cardinalt.com',
    name: 'Administrador',
    salt: 'NqOiWGEEDu3sm5JZ1rdSLA==',
    passwordHash: 'R/iecWSINYm4ivNZjnr9cBCiEZ4eIyAtX8olB7wdD84=',
  },
  {
    email: 'obras@cardinalt.com',
    name: 'Gestor de Obras',
    salt: 'hWLrGLCdlvqXMKoLQxykcg==',
    passwordHash: 'ex1bQ6bUnGKBtrpjgswHWEFhcQWyBeMxSra4rugEg9s=',
  },
  {
    email: 'financeiro@cardinalt.com',
    name: 'Gestor Financeiro',
    salt: '2YyMBe+Iu4DRE03y50Y2UA==',
    passwordHash: 'i/+VmWEp4RJ8kONbMRbizVk/MEWbzFyu2X7Occ3t+Bw=',
  },
];

const toBytes = (value) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));

const toBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

const hashPassword = async (password, salt) => {
  const passwordBytes = new TextEncoder().encode(password);
  const keyMaterial = await crypto.subtle.importKey('raw', passwordBytes, 'PBKDF2', false, ['deriveBits']);
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: toBytes(salt),
      iterations: PBKDF2_ITERATIONS,
    },
    keyMaterial,
    256
  );

  return toBase64(derivedBits);
};

const showArea = (targetId) => {
  managementAreas.forEach((area) => {
    area.classList.toggle('d-none', area.id !== targetId);
  });

  areaButtons.forEach((button) => {
    const isActive = button.dataset.areaTarget === targetId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
};

const showDashboard = () => {
  loginSection.classList.add('d-none');
  dashboard.classList.remove('d-none');
  showArea('worksArea');
};

if (sessionStorage.getItem('cardinalManagerLoggedIn') === 'true') {
  showDashboard();
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginMessage.textContent = '';

  if (!crypto.subtle) {
    loginMessage.textContent = 'Este navegador nao suporta login seguro. Use um navegador atualizado.';
    return;
  }

  const email = document.querySelector('#managerEmail').value.trim().toLowerCase();
  const password = document.querySelector('#managerPassword').value;
  const manager = MANAGER_USERS.find((user) => user.email === email);
  const passwordHash = manager ? await hashPassword(password, manager.salt) : '';
  const isValidManager = Boolean(manager && passwordHash === manager.passwordHash);

  if (!isValidManager) {
    loginMessage.textContent = 'Credenciais invalidas.';
    return;
  }

  sessionStorage.setItem('cardinalManagerLoggedIn', 'true');
  sessionStorage.setItem('cardinalManagerName', manager.name);
  loginMessage.textContent = '';
  showDashboard();
});

logoutButton.addEventListener('click', () => {
  sessionStorage.removeItem('cardinalManagerLoggedIn');
  sessionStorage.removeItem('cardinalManagerName');
  dashboard.classList.add('d-none');
  loginSection.classList.remove('d-none');
  loginForm.reset();
});

areaButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showArea(button.dataset.areaTarget);
  });
});
