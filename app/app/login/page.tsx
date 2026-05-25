'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    const success = await login(username, password);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      {registered === '1' && <p className="success-message">Account created! You can now log in.</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-add">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="form-footer">
        Don't have an account? <a href="/register">Create one</a>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
