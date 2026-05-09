import { Radio } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex flex-col items-start leading-none group cursor-pointer transition-transform hover:scale-105 duration-300">
      <div className="flex items-end gap-1">
        <div className="relative">
          <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-blue-600 to-indigo-800 drop-shadow-[0_2px_2px_rgba(255,255,255,0.3)]">
            CIDADE
          </h1>
          {/* Internal Play Icon in 'D' - Simplified representation */}
          <div className="absolute top-1/2 left-[60%] -translate-y-1/2 w-5 h-5 bg-white rounded-sm rotate-45 opacity-20" />
        </div>
      </div>
      
      <div className="flex flex-col w-full">
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-yellow-500 to-purple-600 rounded-full my-1 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
        <div className="flex items-center justify-between">
           <span className="text-xl lg:text-2xl font-black italic text-white tracking-widest drop-shadow-md">
             FM 87,9
           </span>
        </div>
        <p className="text-[10px] lg:text-[11px] font-bold italic text-slate-300 tracking-tight mt-0.5">
          Onde nasce o sucesso!
        </p>
      </div>
    </div>
  );
}

export function FaviconIcon({ size = 32 }: { size?: number }) {
  return (
    <div 
      className="bg-gradient-to-br from-blue-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg border border-white/20"
      style={{ width: size, height: size }}
    >
      <Radio className="text-white" size={size * 0.6} />
    </div>
  );
}
