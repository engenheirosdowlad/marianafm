# Guia de Deploy na Hostinger

Este guia explica o passo a passo para atualizar e subir o site e a API para o servidor da Hostinger.

---

## 📋 Sumário Geral do Deploy

O projeto é dividido em duas partes:
1. **Frontend (Vite/React):** Fica dentro da pasta `dist` após a compilação.
2. **Backend (API PHP):** Fica dentro da pasta `api`.

---

## 🚀 Passo a Passo do Deploy

### Passo 1: Gerar a Versão de Produção (dist)
Antes de subir os arquivos, você precisa compilar o código do Frontend. 
1. No terminal do seu projeto, execute o comando:
   ```bash
   npm run build
   ```
2. Isso gerará ou atualizará a pasta **`dist`** no seu computador com a versão final otimizada.

---

### Passo 2: Subir os arquivos do Frontend (`dist`)
1. Acesse o Gerenciador de Arquivos da Hostinger (ou use um cliente FTP como o FileZilla).
2. Vá até a pasta raiz do seu site (geralmente `public_html`).
3. **Substitua os arquivos:** Copie todo o **conteúdo** de dentro da pasta `dist` local e envie para a pasta raiz na Hostinger.
   * *Atenção:* Não suba a pasta `dist` em si, mas sim os arquivos e pastas que estão **dentro** dela (ex: `index.html`, pasta `assets`, etc.).

---

### Passo 3: Configurar e Subir a API (`api`)

#### Quando eu devo subir/substituir a pasta `api`?
* **Não é necessário subir sempre.** Você só precisa atualizar a pasta `api` no servidor se:
  1. Houver alterações nos arquivos PHP (ex: lógica de banners, equipe, programação).
  2. For a primeira instalação do site.
  3. Você alterar as credenciais de banco de dados no arquivo `api/config.php`.

#### Como subir a API:
1. Certifique-se de que o arquivo local `api/config.php` possui os dados de conexão corretos do seu banco de dados na Hostinger (servidor, usuário, senha e nome do banco):
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'u348586155_radio');
   define('DB_PASS', 'SuaSenhaAqui');
   define('DB_NAME', 'u348586155_radio');
   ```
2. Envie a pasta **`api`** inteira para a raiz do seu site na Hostinger (ficando no mesmo nível que o `index.html` do frontend).

---

### Passo 4: Executar a Instalação/Atualização do Banco de Dados

Sempre que você criar o banco de dados do zero ou subir novas atualizações que envolvam tabelas do banco, você precisa rodar o script de configuração.

1. Abra o seu navegador.
2. Acesse o seguinte endereço (substituindo pelo seu domínio se necessário):
   👉 **`https://forestgreen-ape-477390.hostingersite.com/api/setup.php`**
3. Esse comando fará o seguinte:
   * Criará as tabelas necessárias (`settings`, `banners`, `top5`, `team`, `schedule`) se elas não existirem.
   * Modificará os campos para suportar imagens em Base64 grandes.
   * Cadastrará os valores iniciais padrão (como o stream de áudio, links de WhatsApp, etc.).

> ⚠️ **Dica de Segurança:** Após rodar o `setup.php` com sucesso e verificar que o site está funcionando, é altamente recomendável deletar ou renomear o arquivo `setup.php` no servidor Hostinger para evitar que terceiros resetem suas tabelas.
