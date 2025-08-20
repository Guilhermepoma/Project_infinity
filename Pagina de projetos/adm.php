<?php
session_start();

// ===== Configuração do ADM =====
$usuario = "admin";   // login
$senha   = "1234";    // senha

// ===== Login =====
if (isset($_POST['login'])) {
    if ($_POST['user'] === $usuario && $_POST['pass'] === $senha) {
        $_SESSION['logado'] = true;
    } else {
        $erro_login = true;
    }
}

// ===== Logout =====
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: adm.php");
    exit;
}

// ===== Adicionar projeto =====
if (isset($_POST['add']) && isset($_SESSION['logado'])) {
    $novo = [
        "titulo" => $_POST['titulo'],
        "desc"   => $_POST['desc'],
        "tags"   => explode(",", $_POST['tags']),
        "cat"    => explode(",", $_POST['cat']),
        "demo"   => $_POST['demo'],
        "code"   => $_POST['code']
    ];

    $arquivo = "projetos.json";
    $dados = file_exists($arquivo) ? json_decode(file_get_contents($arquivo), true) : [];
    $dados[] = $novo;
    file_put_contents($arquivo, json_encode($dados, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    $sucesso_add = true;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Painel ADM – Guilherme</title>
  <style>
    html.light {
      --bg:#f6f7fb;
      --panel:#ffffff;
      --text:#0f172a;
      --muted:#5b6671;
      --chip:#eef2f7;
      --shadow: 0 10px 28px rgba(16,24,40,.08);
    }

    :root{
      --bg: #0b0c10;
      --panel: #121318;
      --text: #ecf0f1;
      --muted:#9aa4ad;
      --brand:#6ee7b7; /* verde suave */
      --brand-strong:#34d399;
      --chip:#1f2937;
      --ring: rgba(110,231,183,.35);
      --shadow: 0 10px 30px rgba(0,0,0,.35);
      --radius: 18px;
    }
    @media (prefers-color-scheme: light){
      :root{
        --bg:#f6f7fb;
        --panel:#ffffff;
        --text:#0f172a;
        --muted:#5b6671;
        --chip:#eef2f7;
        --shadow: 0 10px 28px rgba(16,24,40,.08);
      }
    }
    *{box-sizing:border-box}
    html,body{margin:0;min-height:100vh;font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Inter,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--text)}
    a{color:inherit;text-decoration:none}
    .container{width:min(600px,92vw);margin:0 auto;padding:40px 0}

    /* Header */
    header{
      position:sticky;top:0;z-index:50;backdrop-filter:saturate(1.2) blur(6px);
      background:color-mix(in oklab, var(--bg) 80%, transparent);
      border-bottom:1px solid color-mix(in oklab, var(--text) 10%, transparent);
    }
    .nav{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
    .brand{display:flex;gap:12px;align-items:center;font-weight:700}
    .logo{width:32px;height:32px;border-radius:10px;background:radial-gradient(circle at 30% 30%, var(--brand) 0 40%, transparent 41%), linear-gradient(135deg, var(--brand-strong), #60a5fa);box-shadow:0 6px 18px var(--ring)}
    .nav a.btn{padding:10px 14px;border-radius:999px;background:var(--chip);border:1px solid color-mix(in oklab, var(--text) 10%, transparent)}
    .nav .actions{display:flex;gap:8px}

    .card { 
      background:var(--panel);
      border:1px solid color-mix(in oklab, var(--text) 10%, transparent);
      border-radius:calc(var(--radius) + 6px);
      padding:30px;
      box-shadow:var(--shadow);
      margin-bottom:20px;
    }
    
    h2 {
      margin:0 0 20px;
      letter-spacing:-.02em;
      font-size:28px;
      color:var(--text);
    }
    
    input, textarea { 
      width:100%; 
      padding:12px 16px; 
      margin:8px 0 16px; 
      border:1px solid color-mix(in oklab, var(--text) 12%, transparent); 
      border-radius:14px;
      background:var(--panel);
      color:var(--text);
      font-family:inherit;
      outline:none;
      transition:border-color 0.2s ease;
    }
    
    input:focus, textarea:focus {
      border-color:var(--brand);
      box-shadow:0 0 0 3px var(--ring);
    }
    
    textarea {
      resize:vertical;
      min-height:100px;
    }
    
    button { 
      padding:12px 20px; 
      border:none; 
      border-radius:14px; 
      background:var(--brand); 
      color:#052e1b; 
      font-weight:700;
      cursor:pointer;
      font-family:inherit;
      font-size:14px;
      transition:all 0.2s ease;
      box-shadow:0 8px 18px var(--ring);
    }
    
    button:hover {
      transform:translateY(-2px);
      box-shadow:0 12px 25px var(--ring);
    }
    
    button:active {
      transform:translateY(0);
    }
    
    .logout-link { 
      color:var(--muted);
      text-decoration:underline;
      font-size:14px;
      margin-top:20px;
      display:inline-block;
    }
    
    .logout-link:hover {
      color:var(--text);
    }
    
    .success {
      color:var(--brand);
      background:color-mix(in oklab, var(--brand) 10%, transparent);
      padding:12px 16px;
      border-radius:10px;
      margin-bottom:20px;
      border:1px solid color-mix(in oklab, var(--brand) 20%, transparent);
    }
    
    .error {
      color:#ff6b6b;
      background:color-mix(in oklab, #ff6b6b 10%, transparent);
      padding:12px 16px;
      border-radius:10px;
      margin-bottom:20px;
      border:1px solid color-mix(in oklab, #ff6b6b 20%, transparent);
    }

    /* Toggle tema */
    .toggle{border:1px solid color-mix(in oklab, var(--text) 12%, transparent);background:var(--panel);border-radius:999px;padding:8px 12px;cursor:pointer}
  </style>
</head>
<body>
  <header>
    <div class="container nav">
      <div class="brand"><div class="logo" aria-hidden="true"></div> <span>Painel ADM</span></div>
      <div class="actions">
        <a class="btn" href="index.html">Projetos</a>
        <a class="btn" href="contatos.html">Contatos</a>
        <button id="toggleTema" class="toggle" aria-label="Alternar tema">🌗</button>
      </div>
    </div>
  </header>

  <div class="container">
    <div class="card">
    <h2>Painel do Administrador</h2>

    <?php if (isset($erro_login)): ?>
      <div class="error">Login inválido! Verifique suas credenciais.</div>
    <?php endif; ?>

    <?php if (isset($sucesso_add)): ?>
      <div class="success">Projeto adicionado com sucesso!</div>
    <?php endif; ?>

    <?php if (!isset($_SESSION['logado'])): ?>
      <!-- Formulário de login -->
      <form method="post">
        <input type="text" name="user" placeholder="Usuário" required>
        <input type="password" name="pass" placeholder="Senha" required>
        <button type="submit" name="login">Entrar</button>
      </form>

    <?php else: ?>
      <!-- Formulário de cadastro -->
      <form method="post">
        <input type="text" name="titulo" placeholder="Título do projeto" required>
        <textarea name="desc" placeholder="Descrição" required></textarea>
        <input type="text" name="tags" placeholder="Tags (separadas por vírgula)" required>
        <input type="text" name="cat" placeholder="Categorias (web,apps,games...)" required>
        <input type="url" name="demo" placeholder="Link demo (opcional)">
        <input type="url" name="code" placeholder="Link código (opcional)">
        <button type="submit" name="add">Adicionar Projeto</button>
      </form>

      <a href="?logout=1" class="logout-link">Sair</a>
    <?php endif; ?>
    </div>
  </div>

  <script>
    // Tema
    const toggle = document.getElementById('toggleTema');

    // começa no modo escuro (sem a classe "light")
    document.documentElement.classList.remove('light');

    toggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
    });
  </script>
</body>
</html>
