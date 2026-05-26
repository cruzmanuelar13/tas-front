'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/auth.store';
import { loginRequest } from '@/app/services/auth.service';


export default function LoginForm() {
  const router = useRouter();

  const setAuth = useAuthStore(
    (state) => state.setAuth,
  );

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const onSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      setError('');

      const data =
        await loginRequest(
          email,
          password,
        );

      setAuth(
        data.access_token,
        data.user,
      );

      router.push('/dashboard');
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          'Error'
      );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      {/* {error && <p>{error}</p>} */}

      <button type="submit">
        Ingresar
      </button>
    </form>
  );
}