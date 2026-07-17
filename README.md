# Web Radio Site Design

Este é o repositório do site Web Radio Site Design. O design original do projeto está disponível no [Figma](https://www.figma.com/design/nbgNPdxHTicA92JwIVC1ZT/Web-Radio-Site-Design).

---

## 🛠️ Como Executar Localmente

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---

## 🚀 Guia de Deploy na Hostinger

Este guia explica o passo a passo para atualizar e subir o site e a API para o servidor da Hostinger.

### 1. Gerar a Versão de Produção (dist)
Antes de subir os arquivos, você precisa compilar o código do Frontend:
```bash
npm run build
```
Isso gerará ou atualizará a pasta **`dist`** no seu computador.

### 2. Subir os arquivos do Frontend (`dist`)
1. Acesse o Gerenciador de Arquivos da Hostinger (ou use FTP).
2. Vá até a pasta raiz do seu site (geralmente `public_html`).
3. **Envie os arquivos:** Copie todo o **conteúdo** de dentro da pasta `dist` local (não a pasta `dist` em si) para a raiz na Hostinger.

### 3. Configurar e Subir a API (`api`)
* **Quando subir a pasta `api`:** Somente se houver alterações nos arquivos PHP backend ou quando mudar a senha do banco de dados no `api/config.php`.
1. Verifique as credenciais no arquivo `api/config.php`.
2. Envie a pasta **`api`** inteira para a raiz do seu site na Hostinger.

### 4. Executar a Instalação/Atualização do Banco de Dados
Sempre que o banco for alterado ou reiniciado, execute o script no navegador:
👉 **`https://forestgreen-ape-477390.hostingersite.com/api/setup.php`**

*Nota de Segurança: Renomeie ou remova o `setup.php` do servidor Hostinger após a instalação bem-sucedida.*