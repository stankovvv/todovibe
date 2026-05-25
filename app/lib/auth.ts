export interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

export async function validateCredentials(username: string, password: string): Promise<User | null> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) return null;
  return res.json();
}
