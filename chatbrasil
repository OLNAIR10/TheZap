<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MURAL OGP DE MENSAGENS</title>
    <!-- Inclui a biblioteca Supabase -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <style>
        :root {
            /* Cores */
            --primary-color: #4CAF50; /* Verde principal */
            --primary-hover: #45a049;
            --secondary-color: #2196F3; /* Azul */
            --background-color: #f0f2f5;
            --card-background: #ffffff;
            --text-color: #333;
            --muted-text: #666;
            --error-color: #F44336; /* Vermelho */
            
            /* Espaçamento */
            --spacing-xs: 4px;
            --spacing-sm: 8px;
            --spacing-md: 16px;
            --spacing-lg: 24px;
        }

        body {
            font-family: 'Arial', sans-serif;
            background-color: var(--background-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            color: var(--text-color);
        }

        .frame {
            width: 100%;
            max-width: 500px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: var(--spacing-md);
            overflow: hidden;
        }

        .card {
            background-color: var(--card-background);
            display: flex;
            flex-direction: column;
            min-height: 500px;
        }

        .topbar {
            background-color: var(--primary-color);
            color: white;
            padding: var(--spacing-md);
            display: flex;
            align-items: center;
        }

        .logo {
            font-size: 2em;
            font-weight: bold;
            margin-right: var(--spacing-md);
        }

        .title {
            font-size: 1.2em;
            font-weight: bold;
        }

        .subtitle {
            font-size: 0.85em;
            opacity: 0.9;
        }

        .main {
            padding: var(--spacing-md);
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        /* --- Auth Panel (Formulário) --- */

        .auth-panel h2 {
            margin-top: 0;
            color: var(--primary-color);
        }

        .field {
            margin-bottom: var(--spacing-sm);
        }

        .field label.small {
            display: block;
            font-size: 0.9em;
            margin-bottom: var(--spacing-xs);
            font-weight: bold;
            color: var(--muted-text);
        }

        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: var(--spacing-sm);
            border: 1px solid #ccc;
            border-radius: var(--spacing-xs);
            box-sizing: border-box;
        }
        
        /* --- Botões --- */

        .button-group {
            display: flex;
            gap: var(--spacing-sm);
            margin-top: var(--spacing-md);
            flex-wrap: wrap; /* Para telas menores */
        }

        .btn {
            padding: var(--spacing-sm) var(--spacing-md);
            border: none;
            border-radius: var(--spacing-xs);
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.2s, opacity 0.2s;
            white-space: nowrap;
        }
        
        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .btn.primary {
            background-color: var(--primary-color);
            color: white;
        }

        .btn.primary:not(:disabled):hover {
            background-color: var(--primary-hover);
        }
        
        .btn:not(.primary) {
            background-color: #eee;
            color: var(--text-color);
        }
        
        .btn:not(.primary):not(:disabled):hover {
            background-color: #ddd;
        }
        
        .forgot-password {
            margin-top: var(--spacing-sm);
            text-align: right;
        }
        
        .forgot-password button {
            background: none;
            border: none;
            color: var(--secondary-color);
            cursor: pointer;
            font-size: 0.9em;
            padding: 0;
        }

        /* --- Status/Erros --- */

        .status-message {
            padding: var(--spacing-sm);
            border-radius: var(--spacing-xs);
            margin-top: var(--spacing-md);
            text-align: center;
        }

        .muted-text {
            color: var(--muted-text);
            font-size: 0.9em;
        }

        .error-text {
            color: white;
            background-color: var(--error-color);
            font-weight: bold;
        }
        
        /* --- App (Mural) --- */
        
        .app {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        .messages-wrap {
            flex-grow: 1;
            overflow-y: auto;
            padding: 0 var(--spacing-sm);
            margin-bottom: var(--spacing-md);
        }
        
        .list {
            list-style: none;
            padding: 0;
        }
        
        .message-item {
            background-color: #f7f7f7;
            padding: var(--spacing-sm);
            border-radius: var(--spacing-xs);
            margin-bottom: var(--spacing-sm);
            word-wrap: break-word;
        }
        
        .message-item strong {
            color: var(--primary-color);
        }
        
        .timestamp {
            font-size: 0.75em;
            color: var(--muted-text);
        }

        /* --- Composer --- */
        
        .composer {
            padding-top: var(--spacing-md);
            border-top: 1px solid #eee;
        }

        .composer-inner {
            display: flex;
            align-items: flex-end;
            gap: var(--spacing-sm);
        }
        
        .attach {
            font-size: 1.5em;
            cursor: pointer;
            padding: var(--spacing-xs);
            line-height: 1;
        }
        
        textarea {
            flex-grow: 1;
            padding: var(--spacing-sm);
            border: 1px solid #ccc;
            border-radius: var(--spacing-xs);
            resize: none;
            min-height: 40px;
            max-height: 150px;
            box-sizing: border-box;
        }
        
        .mic-btn, .send {
            line-height: 1;
            align-self: stretch;
            min-width: 40px;
        }

        .mic-btn {
            background-color: var(--secondary-color);
            color: white;
            font-size: 0.9em;
        }

        .mic-btn.recording {
            background-color: var(--error-color);
        }
        
        .send {
            background-color: var(--primary-color);
            color: white;
            font-size: 1.5em;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
        }
        
        #previewArea {
            font-size: 0.85em;
            color: var(--muted-text);
            margin-top: var(--spacing-xs);
            padding: var(--spacing-xs);
            background-color: #ffe0b2; /* Laranja claro para destaque */
            border-radius: var(--spacing-xs);
        }

        /* --- Utilitário --- */
        .hidden {
            display: none !important;
        }
        
    </style>
</head>
<body>
  <div class="frame">
    <!-- Removido role="main" e aria-live="polite" do .card -->
    <div class="card"> 
      <div class="topbar">
        <div class="logo">OGP</div>
        <div>
          <div class="title">MURAL OGP DE MENSAGENS</div>
          <div class="subtitle">Espaço público -- deixe seu recado</div>
        </div>
      </div>

      <div class="main" id="mainArea">
        <!-- Auth panel -->
        <div class="auth-panel" id="authPanel">
          <h2 id="authTitle">Entrar / Cadastrar</h2>

          <div class="field">
            <label for="email" class="small">E-mail</label>
            <input id="email" type="email" placeholder="seu@exemplo.com" autocomplete="email">
          </div>

          <!-- Painel de Senha e Login/Cadastro -->
          <div id="loginPanel">
            <div class="field">
              <label for="password" class="small">Senha</label>
              <input id="password" type="password" placeholder="Senha (mín. 8 caracteres, 1 maiúscula, 1 número)" autocomplete="new-password">
              <div id="pwHelp" class="help-text error-text hidden"></div> 
            </div>

            <div class="forgot-password">
                <!-- Novo Botão Esqueci a Senha -->
                <button id="btnForgotPw">Esqueci a senha</button> 
            </div>

            <div class="button-group"> 
              <button id="btnLogin" class="btn primary">Entrar</button>
              <button id="btnSignup" class="btn">Cadastrar</button>
              <button id="btnLogout" class="btn hidden">Sair</button> 
            </div>
            
            <div class="button-group">
                <button id="btnSendMagic" class="btn">Enviar link de login (magic link)</button>
                <button id="btnResend" class="btn">Reenviar confirmação</button>
                <button id="btnPermTest" class="btn">Testar Microfone</button>
            </div>
          </div>
          <!-- Fim do Painel de Senha e Login/Cadastro -->

          <!-- Adicionado aria-live para acessibilidade -->
          <div id="authStatus" class="status-message muted-text" aria-live="polite" aria-atomic="true">Faça login ou cadastre-se. Após cadastro, verifique seu e-mail.</div>
        </div>

        <!-- App (mural) -->
        <div class="app hidden" id="appArea" role="main"> <!-- Adicionado role="main" aqui -->
          <div id="messagesWrap" class="messages-wrap">
            <ul id="list" class="list"></ul>
          </div>

          <div class="composer" aria-label="Escrever mensagem">
            <div class="composer-inner">
              <label for="fileInput" class="attach" title="Anexar arquivo">📎</label> 
              <input id="fileInput" type="file" accept="image/*,audio/*,video/*,application/pdf" multiple class="hidden"> 

              <textarea id="inputText" placeholder="Escreva uma mensagem... (Shift+Enter = nova linha)"></textarea>

              <button id="btnRecord" class="btn mic-btn" title="Gravar áudio">🔴 Gravar</button> 

              <button id="btnSend" class="btn send" aria-label="Enviar">➔</button> 
            </div>
            <div id="previewArea"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
<script>
  
  // ====================================================================
  // 1. Configuração do Supabase e Variáveis Globais
  // ====================================================================

  const SUPABASE_URL = 'https://bdiieaartaxkbcclackv.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkaWllYWFydGF4a2JjY2xhY2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMTY4OTcsImV4cCI6MjA3OTc5Mjg5N30.R72tNKrLbAQOYT-w1n5cTouRFssjJ2fBSxg4NDWLoLQ';

  const { createClient } = supabase;
  const SUPABASE_CLIENT = createClient(SUPABASE_URL, SUPABASE_KEY);

  let IS_LOGGED_IN = false;
  let USER_EMAIL = null;
  let isRecording = false;

  // Utilitário para seleção de ID
  const $ = (id) => document.getElementById(id);

  /**
   * Exibe mensagens de status/erro
   * @param {string} elementId - ID do elemento onde a mensagem será exibida.
   * @param {string} message - A mensagem a ser exibida.
   * @param {boolean} isError - Se verdadeiro, usa a classe de erro (vermelho).
   */
  const showError = (elementId, message, isError = true) => {
      const el = $(elementId);
      el.textContent = message;
      el.classList.toggle('hidden', !message); 
      el.classList.toggle('error-text', isError);
      el.classList.toggle('muted-text', !isError);
  };


  // ====================================================================
  // 2. Lógica de Autenticação (Supabase)
  // ====================================================================

  /**
   * Valida a senha conforme os requisitos.
   * @param {string} pw - A senha a ser validada.
   * @returns {string | null} Mensagem de erro ou null se for válida.
   */
  const validatePassword = (pw) => {
      if (pw.length < 8) return 'A senha deve ter no mínimo 8 caracteres.';
      if (!/[A-Z]/.test(pw)) return 'A senha deve conter no mínimo 1 letra maiúscula.';
      if (!/[0-9]/.test(pw)) return 'A senha deve conter no mínimo 1 número.';
      return null;
  };

  /**
   * Tenta fazer Login com Senha.
   */
  const handleLogin = async () => {
      const email = $('email').value.trim();
      const password = $('password').value;

      if (!email || !password) {
          showError('authStatus', 'Preencha o e-mail e a senha.', true);
          return;
      }

      showError('authStatus', 'Tentando entrar...', false);

      const { data, error } = await SUPABASE_CLIENT.auth.signInWithPassword({ email, password });

      if (error) {
          showError('authStatus', `Erro ao entrar: ${error.message}`, true);
      } else if (data.user) {
          // O onAuthStateChange cuidará de atualizar a UI
      }
  };
  
  /**
   * Tenta Cadastrar um novo usuário.
   */
  const handleSignup = async () => {
      const email = $('email').value.trim();
      const password = $('password').value;

      const pwError = validatePassword(password);
      if (pwError) {
          showError('pwHelp', pwError, true);
          return;
      }
      showError('pwHelp', '', false); // Limpa erro de senha

      showError('authStatus', 'Tentando cadastrar...', false);

      // No Supabase, o signUp precisa de um redirecionamento ou ativação por e-mail
      const { error } = await SUPABASE_CLIENT.auth.signUp({ 
        email, 
        password,
        options: {
            // Opcional: Redirecionar após a confirmação do email (útil para Single Page Apps)
            emailRedirectTo: window.location.origin
        }
      });

      if (error) {
          showError('authStatus', `Erro ao cadastrar: ${error.message}`, true);
      } else {
          showError('authStatus', `Cadastro realizado! Verifique seu e-mail (${email}) para confirmar sua conta.`, false);
      }
  };

  /**
   * Tenta enviar um Magic Link para login.
   */
  const handleSendMagic = async () => {
      const email = $('email').value.trim();
      if (!email) {
          showError('authStatus', 'Preencha o e-mail para enviar o Magic Link.', true);
          return;
      }
      
      showError('authStatus', 'Enviando link mágico...', false);
      
      const { error } = await SUPABASE_CLIENT.auth.signInWithOtp({ 
        email, 
        options: {
            emailRedirectTo: window.location.origin
        }
      });

      if (error) {
          showError('authStatus', `Erro: ${error.message}`, true);
      } else {
          showError('authStatus', `Link de login enviado para ${email}. Verifique sua caixa de entrada!`, false);
      }
  };

  /**
   * Tenta iniciar o fluxo de "Esqueci a Senha".
   */
  const handleForgotPassword = async () => {
      const email = $('email').value.trim();
      if (!email) {
          showError('authStatus', 'Preencha o campo de E-mail para recuperação de senha.', true);
          return;
      }
      
      showError('authStatus', `Enviando link de recuperação para ${email}...`, false);

      const { error } = await SUPABASE_CLIENT.auth.resetPasswordForEmail(email, {
          // A URL para onde o usuário será redirecionado após clicar no link do email
          redirectTo: window.location.origin + '/update-password' 
      });

      if (error) {
          showError('authStatus', `Erro ao recuperar senha: ${error.message}`, true);
      } else {
          showError('authStatus', `Link de recuperação de senha enviado para ${email}. Verifique sua caixa de entrada!`, false);
          // Opcional: Esconder o painel de senha após o envio
          // $('loginPanel').classList.add('hidden'); 
      }
  };
  
  /**
   * Tenta reenviar o email de confirmação. (CORRIGIDO)
   */
  const handleResendConfirmation = async () => {
      const email = $('email').value.trim();
      if (!email) {
          showError('authStatus', 'Preencha o e-mail para reenviar a confirmação.', true);
          return;
      }
      
      showError('authStatus', `Reenviando confirmação para ${email}...`, false);
      
      // O Supabase usa a função 'resend' para reenviar e-mails de confirmação.
      const { error } = await SUPABASE_CLIENT.auth.resend({ 
          type: 'signup', 
          email: email 
      });

      if (error) {
          showError('authStatus', `Erro ao reenviar: ${error.message}`, true);
      } else {
          showError('authStatus', `E-mail de confirmação reenviado para ${email}!`, false);
      }
  };

  /**
   * Realiza o Logoff no Supabase.
   */
  const handleLogout = async () => {
      showError('authStatus', 'Saindo...', false);
      const { error } = await SUPABASE_CLIENT.auth.signOut();
      if (error) {
          showError('authStatus', `Erro ao sair: ${error.message}`, true);
      } else {
          // O onAuthStateChange cuidará de atualizar a UI
      }
  };

  /**
   * Alterna a visualização entre o painel de autenticação e o mural.
   * Chamada pelo listener do Supabase.
   * @param {object} session - O objeto de sessão do Supabase ou null.
   */
  const toggleUI = (session) => {
      IS_LOGGED_IN = !!session;
      USER_EMAIL = session?.user?.email || null;

      $('authPanel').classList.toggle('hidden', IS_LOGGED_IN);
      $('appArea').classList.toggle('hidden', !IS_LOGGED_IN);
      
      $('btnLogin').classList.toggle('hidden', IS_LOGGED_IN);
      $('btnSignup').classList.toggle('hidden', IS_LOGGED_IN);
      $('btnLogout').classList.toggle('hidden', !IS_LOGGED_IN);
      
      // Esconde botões irrelevantes ao estar logado
      $('btnSendMagic').classList.toggle('hidden', IS_LOGGED_IN);
      $('btnResend').classList.toggle('hidden', IS_LOGGED_IN);
      $('btnForgotPw').classList.toggle('hidden', IS_LOGGED_IN);

      // Limpa inputs
      $('email').value = USER_EMAIL || '';
      $('password').value = '';
      showError('pwHelp', '', false);

      // Atualiza o status
      if (IS_LOGGED_IN) {
          showError('authStatus', `Sessão ativa para: ${USER_EMAIL}.`, false);
          // Opcional: Carregar mensagens reais aqui (se fosse o escopo)
      } else {
          showError('authStatus', 'Faça login ou cadastre-se. Após cadastro, verifique seu e-mail.', false);
      }
  };

  // ====================================================================
  // 3. Lógica do Mural (App)
  // ====================================================================

  /**
   * Cria um novo elemento de mensagem no mural.
   */
  const createMessageElement = (content, sender = USER_EMAIL || "Você") => {
      const li = document.createElement('li');
      li.className = 'message-item';
      li.innerHTML = `<strong>${sender}</strong>: ${content}`;
      
      const time = document.createElement('span');
      time.className = 'timestamp';
      time.textContent = ` (${new Date().toLocaleTimeString()})`;
      li.appendChild(time);

      return li;
  };

  /**
   * Processa o envio da mensagem (Simulado - sem persistência no BD).
   */
  const handleSend = () => {
      if (!IS_LOGGED_IN) return; // Segurança básica
      
      const text = $('inputText').value.trim();
      const previewContent = $('previewArea').innerHTML;
      
      if (!text && !previewContent) return;

      // 1. Monta o Conteúdo da Mensagem
      let messageContent = text.replace(/\n/g, '<br>');
      if (previewContent) {
          // Usa textContent para garantir que o preview não quebre o HTML
          messageContent += `<p style="margin-top: ${text ? '10px' : '0'};">[ANEXO/ÁUDIO: ${$('previewArea').textContent}]</p>`;
      }

      // 2. Cria e Prepend (adiciona no topo) a mensagem
      const newMessage = createMessageElement(messageContent);
      $('list').prepend(newMessage);

      // 3. Limpa o Composer
      $('inputText').value = '';
      $('previewArea').innerHTML = '';
      $('fileInput').value = ''; 
      isRecording = false;
      $('btnRecord').textContent = '🔴 Gravar';
      $('btnRecord').classList.remove('recording');
  };

  /**
   * Lida com a seleção de arquivos (Simulado).
   */
  const handleFileChange = (event) => {
      const files = event.target.files;
      if (files.length > 0) {
          const names = Array.from(files).map(f => f.name).join(', ');
          $('previewArea').textContent = `Pré-visualizando ${files.length} arquivo(s): ${names}`;
      } else {
          $('previewArea').innerHTML = '';
      }
  };

  /**
   * Alterna o estado de gravação de áudio (Simulado).
   */
  const handleRecordToggle = () => {
      if (!isRecording) {
          isRecording = true;
          $('btnRecord').textContent = '■ Parar';
          $('btnRecord').classList.add('recording');
          $('previewArea').textContent = '🔴 Gravando áudio... Clique em Parar.';
      } else {
          isRecording = false;
          $('btnRecord').textContent = '🔴 Gravar';
          $('btnRecord').classList.remove('recording');
          $('previewArea').textContent = 'Áudio gravado pronto para envio. Adicione texto ou envie.';
      }
  };

  // ====================================================================
  // 4. Inicialização e Event Listeners
  // ====================================================================

  const setupEventListeners = () => {
      // Auth Handlers
      $('btnLogin').addEventListener('click', handleLogin);
      $('btnSignup').addEventListener('click', handleSignup);
      $('btnLogout').addEventListener('click', handleLogout);
      $('btnSendMagic').addEventListener('click', handleSendMagic);
      $('btnForgotPw').addEventListener('click', handleForgotPassword);
      $('btnResend').addEventListener('click', handleResendConfirmation); // CORRIGIDO AQUI

      // Outros Utilitários
      $('password').addEventListener('input', (e) => {
          const pwError = validatePassword(e.target.value);
          showError('pwHelp', pwError, true);
      });
      $('btnPermTest').addEventListener('click', () => {
          navigator.mediaDevices.getUserMedia({ audio: true })
              .then(() => showError('authStatus', 'Microfone Acessível. Gravação pronta.', false))
              .catch(() => showError('authStatus', 'Erro: Microfone negado ou indisponível.', true));
      });

      // Composer Handlers
      $('btnSend').addEventListener('click', handleSend);
      $('btnRecord').addEventListener('click', handleRecordToggle);
      $('fileInput').addEventListener('change', handleFileChange);

      // Teclado: Enter para enviar, Shift+Enter para nova linha
      $('inputText').addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
          }
      });
  };

  const init = () => {
      setupEventListeners();
      
      // 1. Configura o Listener de Estado de Autenticação do Supabase
      SUPABASE_CLIENT.auth.onAuthStateChange((event, session) => {
          console.log('Supabase Auth State Change:', event, session);
          toggleUI(session);
      });
      
      // 2. Mensagens Iniciais (para demonstrar o mural vazio)
      $('list').innerHTML = `
          ${createMessageElement('Seja bem-vindo ao Mural OGP de Mensagens!','OGP Admin').outerHTML}
          ${createMessageElement('Para começar a postar, faça login ou cadastre-se.','OGP Admin').outerHTML}
      `;
  };

  window.addEventListener('load', init);

</script>
</body>
</html>
