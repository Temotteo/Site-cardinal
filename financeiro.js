const loginForm = document.querySelector('#managerLoginForm');
const loginSection = document.querySelector('#manager-login');
const dashboard = document.querySelector('#financeDashboard');
const loginMessage = document.querySelector('#loginMessage');
const logoutButton = document.querySelector('#managerLogout');
const areaButtons = document.querySelectorAll('[data-area-target]');
const managementAreas = document.querySelectorAll('.management-area');
const financialMonthSelect = document.querySelector('#financialMonthSelect');
const financialMonthStatus = document.querySelector('#financialMonthStatus');
const monthlyCategoryRows = document.querySelector('#monthlyCategoryRows');
const monthDocumentsTotal = document.querySelector('#monthDocumentsTotal');
const monthDocumentsNote = document.querySelector('#monthDocumentsNote');
const monthDeductibleVat = document.querySelector('#monthDeductibleVat');
const monthCollectedVat = document.querySelector('#monthCollectedVat');
const monthVatToPay = document.querySelector('#monthVatToPay');
const monthVatNote = document.querySelector('#monthVatNote');
const vatDeductibleDetail = document.querySelector('#vatDeductibleDetail');
const vatCollectedDetail = document.querySelector('#vatCollectedDetail');
const vatPayableDetail = document.querySelector('#vatPayableDetail');
const vatCreditDetail = document.querySelector('#vatCreditDetail');
const monthlyObservation = document.querySelector('#monthlyObservation');
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
const FINANCIAL_MONTHS = [
  {
    id: '2025-11',
    label: 'Novembro 2025',
    source: 'Folha enviada em 28/07/2026',
    hasData: true,
    documentsTotal: 310090.85,
    deductibleVat: 42771.16,
    collectedVat: 13076.88,
    vatToPay: 0,
    vatCredit: 29696.28,
    vatNote: 'Credito de imposto',
    categories: [
      { name: 'Inventario', net: 81769.31, vat: 13083.09, total: 94852.40 },
      { name: 'Gastos diversos', net: 158385.74, vat: 25341.72, total: 183727.45 },
      { name: 'Activos tangiveis', net: 27164.66, vat: 4346.34, total: 31511.00 },
      { name: 'Liquidado', net: 81724.14, vat: 13075.86, total: 94800.00 },
    ],
    observation: 'Primeiro mes carregado. Valores resumidos a partir da folha de novembro de 2025.',
  },
  { id: '2025-12', label: 'Dezembro 2025', hasData: false },
  { id: '2026-01', label: 'Janeiro 2026', hasData: false },
  { id: '2026-02', label: 'Fevereiro 2026', hasData: false },
  { id: '2026-03', label: 'Marco 2026', hasData: false },
  { id: '2026-04', label: 'Abril 2026', hasData: false },
  { id: '2026-05', label: 'Maio 2026', hasData: false },
  { id: '2026-06', label: 'Junho 2026', hasData: false },
  { id: '2026-07', label: 'Julho 2026', hasData: false },
];

const toBytes = (value) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));

const formatMoney = (value) => `${value.toLocaleString('pt-PT', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})} MT`;

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

const renderFinancialMonth = (monthId) => {
  const month = FINANCIAL_MONTHS.find((item) => item.id === monthId) || FINANCIAL_MONTHS[0];

  if (!month.hasData) {
    financialMonthStatus.textContent = 'Sem dados adicionados ainda';
    monthDocumentsTotal.textContent = '0,00 MT';
    monthDocumentsNote.textContent = 'Aguardando importacao';
    monthDeductibleVat.textContent = '0,00 MT';
    monthCollectedVat.textContent = '0,00 MT';
    monthVatToPay.textContent = '0,00 MT';
    monthVatNote.textContent = 'Sem apuramento';
    vatDeductibleDetail.textContent = '0,00 MT';
    vatCollectedDetail.textContent = '0,00 MT';
    vatPayableDetail.textContent = '0,00 MT';
    vatCreditDetail.textContent = '0,00 MT';
    monthlyObservation.textContent = `Ainda nao foram adicionados valores para ${month.label}.`;
    monthlyCategoryRows.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Sem movimentos registados para este mes.</td></tr>';
    return;
  }

  financialMonthStatus.textContent = month.source;
  monthDocumentsTotal.textContent = formatMoney(month.documentsTotal);
  monthDocumentsNote.textContent = 'Compras, despesas e ativos';
  monthDeductibleVat.textContent = formatMoney(month.deductibleVat);
  monthCollectedVat.textContent = formatMoney(month.collectedVat);
  monthVatToPay.textContent = formatMoney(month.vatCredit || month.vatToPay);
  monthVatNote.textContent = month.vatNote;
  vatDeductibleDetail.textContent = formatMoney(month.deductibleVat);
  vatCollectedDetail.textContent = formatMoney(month.collectedVat);
  vatPayableDetail.textContent = formatMoney(month.vatToPay);
  vatCreditDetail.textContent = formatMoney(month.vatCredit);
  monthlyObservation.textContent = month.observation;
  monthlyCategoryRows.innerHTML = month.categories.map((category) => `
    <tr>
      <td>${category.name}</td>
      <td class="text-end">${formatMoney(category.net)}</td>
      <td class="text-end">${formatMoney(category.vat)}</td>
      <td class="text-end">${formatMoney(category.total)}</td>
    </tr>
  `).join('');
};

const setupFinancialMonths = () => {
  financialMonthSelect.innerHTML = FINANCIAL_MONTHS.map((month) => `
    <option value="${month.id}">${month.label}${month.hasData ? '' : ' - sem dados'}</option>
  `).join('');
  financialMonthSelect.value = '2025-11';
  renderFinancialMonth(financialMonthSelect.value);
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

financialMonthSelect.addEventListener('change', () => {
  renderFinancialMonth(financialMonthSelect.value);
});

setupFinancialMonths();
