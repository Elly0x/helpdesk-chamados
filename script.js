// ===== Sistema de Chamados — lógica de dados e interações =====
// Dados guardados no localStorage do navegador (sem backend por enquanto).

const STORAGE_KEY = 'helpdesk_chamados';

const STATUS_LABELS = { aberto: 'ABERTO', andamento: 'EM ANDAMENTO', fechado: 'FECHADO' };
const STATUS_CLASS  = { aberto: 'aberto', andamento: 'andamento', fechado: 'fechado' };
const PRIO_LABELS   = { alta: 'Alta', media: 'Média', baixa: 'Baixa' };
const PRIO_CLASS    = { alta: 'prio-alta', media: 'prio-media', baixa: 'prio-baixa' };

function seedData() {
  return [
    { id: 1, titulo: 'Impressora do 2º andar não liga',
      descricao: 'A impressora do 2º andar não está ligando desde a manhã de hoje. Já foi verificado o cabo de energia.',
      prioridade: 'alta', status: 'aberto', dataAbertura: '17/08/2026', dataFechamento: null },
    { id: 2, titulo: 'Erro ao efetuar login no sistema',
      descricao: 'Usuário recebe mensagem de erro ao tentar logar no sistema interno.',
      prioridade: 'media', status: 'andamento', dataAbertura: '16/08/2026', dataFechamento: null },
    { id: 3, titulo: 'Solicitação de acesso à rede',
      descricao: 'Novo colaborador precisa de acesso à rede Wi-Fi da empresa.',
      prioridade: 'baixa', status: 'fechado', dataAbertura: '15/08/2026', dataFechamento: '15/08/2026' }
  ];
}

function loadChamados() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  return JSON.parse(raw);
}

function saveChamados(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function nextId(list) {
  return list.length ? Math.max(...list.map(c => c.id)) + 1 : 1;
}

function formatId(id) {
  return '#' + String(id).padStart(3, '0');
}

function todayBR() {
  const d = new Date();
  return String(d.getDate()).padStart(2, '0') + '/' +
         String(d.getMonth() + 1).padStart(2, '0') + '/' +
         d.getFullYear();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== Tela: Lista de chamados (index.html) =====

function renderLista() {
  const list = loadChamados();
  const tbody = document.getElementById('tbody-chamados');
  const subtitle = document.getElementById('subtitle-count');
  if (!tbody) return;

  subtitle.textContent = list.length + (list.length === 1 ? ' chamado registrado' : ' chamados registrados');

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-hint">nenhum chamado registrado ainda</td></tr>';
    return;
  }

  const ordenados = list.slice().sort((a, b) => b.id - a.id);
  tbody.innerHTML = '';
  ordenados.forEach(c => {
    const tr = document.createElement('tr');
    tr.className = 'row-link';
    tr.tabIndex = 0;
    tr.addEventListener('click', () => { window.location.href = 'detalhe.html?id=' + c.id; });
    tr.addEventListener('keypress', e => {
      if (e.key === 'Enter') window.location.href = 'detalhe.html?id=' + c.id;
    });
    tr.innerHTML =
      '<td class="id">' + formatId(c.id) + '</td>' +
      '<td class="title">' + escapeHtml(c.titulo) + '</td>' +
      '<td><span class="tag ' + STATUS_CLASS[c.status] + '">' + STATUS_LABELS[c.status] + '</span></td>' +
      '<td class="' + PRIO_CLASS[c.prioridade] + '">' + PRIO_LABELS[c.prioridade] + '</td>' +
      '<td>' + c.dataAbertura + '</td>';
    tbody.appendChild(tr);
  });
}

// ===== Tela: Abrir chamado (novo.html) =====

function initFormNovo() {
  const form = document.getElementById('form-novo');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const prioridadeInput = document.querySelector('input[name="prioridade"]:checked');

    if (!titulo) {
      alert('Informe um título para o chamado.');
      document.getElementById('titulo').focus();
      return;
    }

    const list = loadChamados();
    const novoChamado = {
      id: nextId(list),
      titulo,
      descricao,
      prioridade: prioridadeInput ? prioridadeInput.value : 'media',
      status: 'aberto',
      dataAbertura: todayBR(),
      dataFechamento: null
    };
    list.push(novoChamado);
    saveChamados(list);
    window.location.href = 'index.html';
  });
}

// ===== Tela: Detalhe do chamado (detalhe.html) =====

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'), 10);
}

function renderDetalhe() {
  const container = document.getElementById('detalhe-container');
  if (!container) return;

  const id = getIdFromUrl();
  const list = loadChamados();
  const chamado = list.find(c => c.id === id);

  if (!chamado) {
    container.innerHTML = '<p class="empty-hint">Chamado não encontrado.</p>';
    return;
  }

  document.title = 'Chamado ' + formatId(chamado.id);
  document.getElementById('chamado-heading').textContent = 'chamado ' + formatId(chamado.id);
  document.getElementById('campo-titulo').textContent = chamado.titulo;
  document.getElementById('campo-descricao').textContent = chamado.descricao || '—';

  const prioEl = document.getElementById('campo-prioridade');
  prioEl.textContent = PRIO_LABELS[chamado.prioridade];
  prioEl.className = 'field-value ' + PRIO_CLASS[chamado.prioridade];

  document.getElementById('select-status').value = chamado.status;
  document.getElementById('campo-abertura').textContent = chamado.dataAbertura;
  document.getElementById('campo-fechamento').textContent = chamado.dataFechamento || '—';

  const fecharBtn = document.getElementById('btn-fechar');
  fecharBtn.disabled = chamado.status === 'fechado';
  fecharBtn.textContent = chamado.status === 'fechado' ? 'Chamado Fechado' : 'Fechar Chamado';

  document.getElementById('select-status').onchange = function () {
    chamado.status = this.value;
    chamado.dataFechamento = chamado.status === 'fechado' ? (chamado.dataFechamento || todayBR()) : null;
    saveChamados(list);
    renderDetalhe();
  };

  fecharBtn.onclick = function () {
    if (chamado.status === 'fechado') return;
    chamado.status = 'fechado';
    chamado.dataFechamento = todayBR();
    saveChamados(list);
    renderDetalhe();
  };
}
