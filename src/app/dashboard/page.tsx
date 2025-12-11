'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    // Se não está carregando e não tem usuário, redireciona para login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Connect Cidade</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Sair
          </button>
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Bem-vindo!</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>ID:</strong> {user.id}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-lg mb-2">📍 Mapa</h3>
              <p className="text-gray-600 text-sm">Visualize e reporte problemas</p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-lg mb-2">📋 Solicitações</h3>
              <p className="text-gray-600 text-sm">Acompanhe seus registros</p>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="font-bold text-lg mb-2">👤 Perfil</h3>
              <p className="text-gray-600 text-sm">Gerencie sua conta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
