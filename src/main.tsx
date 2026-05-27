
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { Capacitor } from "@capacitor/core";

// Se estiver rodando nativamente no celular/TV, redireciona as chamadas de API locais para o servidor online da Hostinger
if (Capacitor.isNativePlatform()) {
  const originalFetch = window.fetch;
  window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
    if (typeof input === 'string' && input.startsWith('/api/')) {
      input = 'https://forestgreen-ape-477390.hostingersite.com' + input;
    } else if (input instanceof URL && input.pathname.startsWith('/api/')) {
      return originalFetch(new URL(input.pathname, 'https://forestgreen-ape-477390.hostingersite.com'), init);
    }
    return originalFetch(input, init);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
  