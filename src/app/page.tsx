'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const { data, error } = await supabase
          .from('categorias')
          .select('*');

        if (error) throw error;

        setCategorias(data || []);
      } catch (err: any) {
        setErro(err.message);
      }
    };

    buscarCategorias();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Connect Cidade</h1>

        {erro ? (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
            ❌ Erro: {erro}
          </div>
        ) : categorias.length > 0 ? (
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-6">
            ✅ Conectado ao Supabase com sucesso!
          </div>
        ) : (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded mb-6">
            ⏳ Carregando...
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Categorias de Problemas</h2>
          
          {categorias.length > 0 ? (
            <ul className="space-y-3">
              {categorias.map((cat) => (
                <li key={cat.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-bold text-lg">{cat.nome}</h3>
                  <p className="text-gray-600 text-sm">{cat.descricao}</p>
                </li>
              ))}
            </ul>
          ) : !erro ? (
            <p className="text-gray-500">Carregando categorias...</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
