'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function RegistroPage() {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  // Função para validar CPF (básico)
  const validarCPF = (cpf: string) => {
    const apenasNumeros = cpf.replace(/\D/g, '');
    return apenasNumeros.length === 11;
  };

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    // Validações
    if (!validarCPF(cpf)) {
      setErro('CPF inválido. Deve conter 11 dígitos.');
      return;
    }

    if (nome.trim().length < 3) {
      setErro('Nome deve ter pelo menos 3 caracteres.');
      return;
    }

    if (password !== confirmarSenha) {
      setErro('As senhas não correspondem.');
      return;
    }

    if (password.length < 6) {
      setErro('Senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);

    try {
      const cpfLimpo = cpf.replace(/\D/g, '');
      await signUp(cpfLimpo, nome, email, password);
      alert('Conta criada com sucesso! Faça login para continuar.');
      router.push('/login');
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Connect Cidade</h1>
        <p className="text-gray-600 mb-8">Crie sua conta</p>

        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6">
            ❌ {erro}
          </div>
        )}

        <form onSubmit={handleRegistro}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="000.000.000-00"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="João Silva"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Confirmar Senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
          >
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="text-gray-600 mt-6 text-center">
          Já tem conta?{' '}
          <Link href="/login" className="text-green-600 hover:underline font-bold">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
