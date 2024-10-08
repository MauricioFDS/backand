
  // Capturar o formulário de login
  const loginForm = document.querySelector('#login form');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#loginEmail').value;
    const senha = document.querySelector('#loginPassword').value;

    try {
      const response = await fetch('/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();
      if (response.status === 200) {
        // Se o login for bem-sucedido, redireciona para o dashboard
        window.location.href = '../';
      } else {
        alert(data.message); // Mostra mensagem de erro
      }
    } catch (error) {
      console.error('Erro no login:', error);
    }
  });


  // Capturar o formulário de cadastro
  const registerForm = document.querySelector('#register form');
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#registerEmail').value;
    const senha = document.querySelector('#registerPassword').value;
    const confirmSenha = document.querySelector('#registerConfirmPassword').value;

    if (senha !== confirmSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  });

