/* =========================================================
   CYBER SEGURANÇA ELETRÔNICA — script.js
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. CONFIGURAÇÃO — troque pelos dados reais
     --------------------------------------------------------- */
  const CONFIG = {
    // Formato internacional: 55 + DDD + número (sem símbolos)
    whatsapp: '5500000000000',
    telefoneExibido: '(00) 00000-0000'
  };

  /* ---------------------------------------------------------
     2. HELPERS
     --------------------------------------------------------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /**
   * Abre o WhatsApp com uma mensagem pré-montada.
   */
  function abrirWhatsApp(servico, nome, detalhes) {
    let texto = 'Olá, Cyber! ';
    if (nome) texto += `Meu nome é ${nome}. `;
    texto += `Quero um orçamento de ${servico || 'seus serviços'}.`;
    if (detalhes) texto += ` ${detalhes}`;

    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener');
  }

  /* ---------------------------------------------------------
     3. ANO + TELEFONES
     --------------------------------------------------------- */
  function iniciarRodape() {
    const ano = $('#ano');
    if (ano) ano.textContent = new Date().getFullYear();

    // Telefone exibido como texto
    $$('.js-phone').forEach(el => {
      el.textContent = CONFIG.telefoneExibido;
    });

    // Telefone do rodapé — texto + link direto pro WhatsApp
    $$('.js-phone-wa').forEach(el => {
      el.textContent = CONFIG.telefoneExibido;
      el.setAttribute('href', `https://wa.me/${CONFIG.whatsapp}`);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  /* ---------------------------------------------------------
     4. MENU MOBILE
     --------------------------------------------------------- */
  function iniciarMenuMobile() {
    const toggle = $('.menu-toggle');
    const nav    = $('#primary-menu');
    if (!toggle || !nav) return;

    const abrir  = () => {
      document.body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
    };
    const fechar = () => {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    };
    const alternar = () => {
      document.body.classList.contains('nav-open') ? fechar() : abrir();
    };

    toggle.addEventListener('click', alternar);
    $$('a', nav).forEach(a => a.addEventListener('click', fechar));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        fechar();
      }
    });

    const mq = window.matchMedia('(min-width: 901px)');
    mq.addEventListener('change', e => { if (e.matches) fechar(); });
  }

  /* ---------------------------------------------------------
     5. BOTÕES DE SERVIÇO — pré-seleciona no formulário
     --------------------------------------------------------- */
  function iniciarBotoesServico() {
    const select = $('#servico');
    if (!select) return;

    $$('.svc .go').forEach(a => {
      a.addEventListener('click', () => {
        const nome = a.dataset.servico;
        const opt  = Array.from(select.options).find(o => o.text === nome);
        if (opt) select.value = opt.value || opt.text;
      });
    });
  }

  /* ---------------------------------------------------------
     6. BOTÕES DIRETOS (hero, header, flutuante)
     --------------------------------------------------------- */
  function iniciarBotoesDiretos() {
    $$('.js-direct').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        abrirWhatsApp();
      });
    });
  }

  /* ---------------------------------------------------------
     7. FORMULÁRIO DE ORÇAMENTO
     --------------------------------------------------------- */
  function iniciarFormulario() {
    const botao = $('#enviar');
    if (!botao) return;

    botao.addEventListener('click', () => {
      const servico = $('#servico')?.value || '';
      const nome    = $('#nome')?.value.trim() || '';
      const msg     = $('#msg')?.value.trim() || '';

      abrirWhatsApp(servico, nome, msg);
    });
  }

  /* ---------------------------------------------------------
     8. INIT
     --------------------------------------------------------- */
  function init() {
    iniciarRodape();
    iniciarMenuMobile();
    iniciarBotoesServico();
    iniciarBotoesDiretos();
    iniciarFormulario();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();