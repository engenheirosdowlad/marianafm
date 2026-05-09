import { MessageCircle, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-6 px-4 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-slate-300 hover:text-green-500 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-blue-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
          </div>

          <div className="text-center">
            <p className="text-white font-semibold text-sm mb-0.5">Contato Info</p>
            <p className="text-slate-400 text-xs">(81) 999.523.2550</p>
          </div>

          <p className="text-slate-600 text-[10px] text-center">
            *Regulamentos regulares regularmente os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
