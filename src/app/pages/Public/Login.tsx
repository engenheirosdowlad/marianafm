import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de autenticação "padrão ouro" para protótipo
    if (email === 'admin@radio.com' && password === 'admin123') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Credenciais inválidas. Tente admin@radio.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl text-white shadow-lg shadow-blue-600/20">
            C
          </div>
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">Painel Admin</h1>
          <p className="text-slate-500 text-sm mt-1">Acesso Restrito</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/50 border border-white/5 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                placeholder="admin@radio.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-white/5 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 uppercase text-sm tracking-wider shadow-lg shadow-blue-600/20"
          >
            Entrar
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-slate-600 text-xs text-center mt-6">
          Acesso restrito apenas a administradores cadastrados.
        </p>
      </motion.div>
    </div>
  );
}
