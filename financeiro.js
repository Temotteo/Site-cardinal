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
const monthlySheetRows = document.querySelector('#monthlySheetRows');
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
    sheetRows: [
      { type: 'section', group: 'Inventario', label: 'Resumo de Movimentos 2025' },
      { group: 'Inventario', date: '19/11/2025', doc: 'VD 30095', entity: 'CASA DE TECHLUS', net1: 5750.00, vat1: 920.00, total: 6670.00, expense: 'Material de Manutencao' },
      { group: 'Inventario', date: '15/11/2025', doc: 'VD 003760', entity: 'INTERNATIONAL', net1: 23879.31, vat1: 3820.69, total: 27700.00, expense: 'Material de Manutencao' },
      { group: 'Inventario', date: '18/11/2025', doc: 'VD 3932', entity: 'Panavision', net1: 32730.00, vat1: 5236.80, total: 37968.80, expense: 'Material de Manutencao' },
      { group: 'Inventario', date: '26/11/2025', doc: 'VD 0004021', entity: 'Panavision', net1: 19410.00, vat1: 3105.60, total: 22515.60, expense: 'Material de Manutencao' },
      { type: 'subtotal', group: 'Sub-total', net1: 81769.31, vat1: 13083.09, total: 94852.40 },
      { type: 'section', group: 'GDS', label: 'Gastos diversos' },
      { group: 'GDS', date: '07/11/2025', doc: '45G27917', entity: 'Electro Flux, Lda', net1: 926.72, vat1: 148.28, total: 1075.00, expense: 'Material de Manutencao' },
      { group: 'GDS', date: '18/11/2025', doc: '45G28081', entity: 'Electro Flux, Lda', net1: 637.93, vat1: 102.07, total: 740.00, expense: 'Material de Manutencao' },
      { group: 'GDS', date: '20/11/2025', doc: '45G28132', entity: 'Electro Flux, Lda', net1: 3362.07, vat1: 537.93, total: 3900.00, expense: 'Material de Manutencao' },
      { group: 'GDS', date: '12/11/2025', doc: '75G22568', entity: 'Electro Flux, Lda', net1: 1724.14, vat1: 275.86, total: 2000.00, expense: 'Material de Manutencao' },
      { group: 'GDS', date: '21/11/2025', doc: '001164-2025', entity: 'Premier superpar', net1: 28258.00, vat1: 4520.97, total: 32777.00, expense: 'Material de Manutencao' },
      { group: 'GDS', date: '22/11/2025', doc: 'VD 2-0147', entity: 'FRESH, LDA', net1: 6506.03, vat1: 1040.97, total: 7547.00, expense: 'Material de Manutencao' },
      { group: 'GDS', date: '13/11/2025', doc: 'VD 12581', entity: 'Cominfo Supermercado', net1: 1283.62, vat1: 205.38, total: 1489.00, expense: 'Equipamento / ferramentas' },
      { group: 'GDS', date: '27/11/2025', doc: 'VD 56584', entity: 'Ferragem choupal', net1: 9761.21, vat1: 1561.79, total: 11323.00, expense: 'Material de Manutencao' },
      { group: 'GDS', date: '19/11/2025', doc: 'VD 8812/MPI25', entity: 'Vazuluz', net1: 2780.17, vat1: 444.83, total: 3225.00, expense: 'Material de Manutencao' },
      { group: 'GDS', date: '28/11/2025', doc: 'VD 001299', entity: 'MDS LOGISTIC & TRANSPORT', net1: 8275.86, vat1: 1324.14, total: 9600.00, expense: 'Material de Manutencao', observation: 'E inventario??' },
      { group: 'GDS', date: '24/11/2025', doc: 'VD 56733', entity: 'KBS INTERNATIONAL', net1: 4482.76, vat1: 717.24, total: 5200.00, expense: 'Material de Manutencao' },
      { group: 'GDS', date: '08/11/2025', doc: 'FT 2025110251054', entity: 'Builders', net1: 3299.66, vat1: 527.94, total: 3827.56, expense: 'Material de Manutencao' },
      { type: 'subtotal', group: 'Sub-total', net1: 158385.74, vat1: 25341.72, total: 183727.45 },
      { type: 'section', group: 'Activos tangiveis', label: 'Activos tangiveis' },
      { group: 'Activos tangiveis', date: '27/11/2025', doc: 'VD 56584', entity: 'Ferragem choupal', net1: 9761.21, vat1: 1561.79, total: 11323.00, expense: 'Equip. Basico / Consumiveis' },
      { group: 'Activos tangiveis', date: '21/11/2025', doc: 'VD 001687', entity: 'Panavision', net1: 3850.00, vat1: 616.00, total: 4466.00, expense: 'Equip. Basico / Cabo' },
      { group: 'Activos tangiveis', date: '27/11/2025', doc: 'VD 1688', entity: 'PANAVISION MOCAMBIQUE', net1: 7700.00, vat1: 1232.00, total: 8932.00, expense: 'Equip. Basico / Cabo' },
      { group: 'Activos tangiveis', date: '15/11/2025', doc: 'VD 044717', entity: 'REPRESENTACOES', net1: 5853.45, vat1: 936.55, total: 6790.00, expense: 'Equip. Admin / Celular' },
      { type: 'subtotal', group: 'Sub-total', net1: 27164.66, vat1: 4346.34, total: 31511.00 },
      { type: 'section', group: 'Liquidado', label: 'Vendas / IVA liquidado' },
      { group: 'Liquidado', date: '13/11/2025', doc: 'FT 0036/2025', entity: 'Taha Hotel', net1: 30000.00, vat1: 4800.00, total: 34800.00 },
      { group: 'Liquidado', date: '03/11/2025', doc: 'FT 0035/2025', entity: 'Whasinhanac SA', net1: 38793.10, vat1: 6206.90, total: 45000.00 },
      { group: 'Liquidado', date: '03/11/2025', doc: 'FT 0034/2025', entity: 'Whasinhanac SA', net1: 12931.03, vat1: 2068.97, total: 15000.00 },
      { type: 'subtotal', group: 'Sub-total', net1: 81724.14, net2: 0, vat1: 13075.86, vat2: 0, total: 94800.00 },
      { type: 'tax', group: 'IVA Apuramento', net1: 0, vat1: 42771.16, vat2: 13076.88 },
      { type: 'tax', group: 'IVA a recuperar do periodo anterior', net1: 0, vat2: 0 },
      { type: 'tax', group: 'IVA a pagar', net1: 0, vat2: 0 },
      { type: 'tax', group: 'Credito de imposto', net1: 0, vat2: 29696.28 },
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

const formatSheetMoney = (value) => (Number.isFinite(value) ? value.toLocaleString('pt-PT', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}) : '');

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
    monthlySheetRows.innerHTML = '<tr><td colspan="13" class="empty-sheet-cell">Sem folha detalhada para este mes.</td></tr>';
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
  monthlySheetRows.innerHTML = month.sheetRows.map((row) => {
    if (row.type === 'section') {
      return `
        <tr class="sheet-section-row">
          <td>${row.group}</td>
          <td colspan="12">${row.label}</td>
        </tr>
      `;
    }

    if (row.type === 'subtotal') {
      return `
        <tr class="sheet-subtotal-row">
          <td>${row.group}</td>
          <td colspan="4"></td>
          <td class="sheet-number">${formatSheetMoney(row.net1)}</td>
          <td class="sheet-number">${formatSheetMoney(row.net2)}</td>
          <td class="sheet-number">${formatSheetMoney(row.vat1)}</td>
          <td class="sheet-number">${formatSheetMoney(row.vat2)}</td>
          <td class="sheet-number">${formatSheetMoney(row.total)}</td>
          <td colspan="3"></td>
        </tr>
      `;
    }

    if (row.type === 'tax') {
      return `
        <tr class="sheet-tax-row">
          <td>${row.group}</td>
          <td colspan="4"></td>
          <td class="sheet-number">${formatSheetMoney(row.net1)}</td>
          <td class="sheet-number">${formatSheetMoney(row.net2)}</td>
          <td class="sheet-number">${formatSheetMoney(row.vat1)}</td>
          <td class="sheet-number">${formatSheetMoney(row.vat2)}</td>
          <td colspan="4"></td>
        </tr>
      `;
    }

    return `
      <tr>
        <td>${row.group || ''}</td>
        <td>${row.date || ''}</td>
        <td>${row.doc || ''}</td>
        <td>${row.entity || ''}</td>
        <td>${row.nif || ''}</td>
        <td class="sheet-number">${formatSheetMoney(row.net1)}</td>
        <td class="sheet-number">${formatSheetMoney(row.net2)}</td>
        <td class="sheet-number">${formatSheetMoney(row.vat1)}</td>
        <td class="sheet-number">${formatSheetMoney(row.vat2)}</td>
        <td class="sheet-number">${formatSheetMoney(row.total)}</td>
        <td>${row.expense || ''}</td>
        <td>${row.observation || ''}</td>
        <td>${row.status || ''}</td>
      </tr>
    `;
  }).join('');
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
