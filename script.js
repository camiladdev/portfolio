// Executa quando todo o conteúdo da página já foi carregado
document.addEventListener('DOMContentLoaded', function () {

// 1) RODAPÉ: atualiza o ano automaticamente */
  const elementoAno = document.getElementById('ano-atual');
  if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
  }

// 2) ALTERNÂNCIA DE TEMA (CLARO / ESCURO) 
  const botaoTema = document.getElementById('botao-tema');
  const CHAVE_ARMAZENAMENTO = 'tema-preferido'; // chave usada no localStorage

// Aplica o tema escuro (ou claro) e atualiza o texto/ícone do botão
  function aplicarTema(tema) {
    if (tema === 'escuro') {
      document.body.classList.add('tema-escuro');
      botaoTema.textContent = 'Modo claro';
    } else {
      document.body.classList.remove('tema-escuro');
      botaoTema.textContent = 'Modo escuro';
    }
  }

// Verifica se o usuário já tinha escolhido um tema em uma visita anterior
  const temaSalvo = localStorage.getItem(CHAVE_ARMAZENAMENTO);

  if (temaSalvo) {
// Usa a preferência salva anteriormente
    aplicarTema(temaSalvo);
  } else {
// Se não houver preferência salva, verifica a preferência do sistema operacional
    const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    aplicarTema(prefereEscuro ? 'escuro' : 'claro');
  }

// Evento de clique no botão: alterna entre os temas e salva a escolha
  botaoTema.addEventListener('click', function () {
    const estaEscuro = document.body.classList.contains('tema-escuro');
    const novoTema = estaEscuro ? 'claro' : 'escuro';

    aplicarTema(novoTema);
    localStorage.setItem(CHAVE_ARMAZENAMENTO, novoTema);
  });

// 3) FORMULÁRIO DE CONTATO: validação e simulação de envio
  const form = document.getElementById('form-contato');
  const campoNome = document.getElementById('nome');
  const campoEmail = document.getElementById('email');
  const campoMensagem = document.getElementById('mensagem');
  const elementoErro = document.getElementById('erro-mensagem');

//Verifica se um e-mail tem um formato básico válido.
  function emailEhValido(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

//Exibe uma mensagem de erro na tela.
  function exibirErro(mensagem) {
    elementoErro.textContent = mensagem;
    elementoErro.style.display = 'block';
  }

//Oculta a mensagem de erro (usado quando a validação passa).
  function ocultarErro() {
    elementoErro.style.display = 'none';
    elementoErro.textContent = '';
  }

// Evento disparado ao tentar enviar o formulário
  form.addEventListener('submit', function (evento) {
// Impede o envio padrão do formulário (que recarregaria a página)
    evento.preventDefault();

// Remove espaços extras das pontas dos campos
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const mensagem = campoMensagem.value.trim();

// a) VALIDAÇÃO: verifica se todos os campos foram preenchidos
    if (nome === '' || email === '' || mensagem === '') {
      exibirErro('Por favor, preencha todos os campos antes de enviar.');
      return; // interrompe a execução aqui
    }

// b) VALIDAÇÃO: verifica se o e-mail possui um formato válido
    if (!emailEhValido(email)) {
      exibirErro('Por favor, informe um e-mail em um formato válido (ex: nome@dominio.com).');
      return;
    }

// Se passou pelas validações, esconde qualquer erro anterior
    ocultarErro();

// c) SIMULAÇÃO DE ENVIO
    form.reset();

    alert('Mensagem enviada com sucesso! Em breve retornarei o contato.');
  });

});