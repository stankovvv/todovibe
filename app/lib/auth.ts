export interface User {
  username: string;
}

const MOCK_USERS: Record<string, string> = {
  admin: 'admin123',
  user: 'password',
};

export function validateCredentials(username: string, password: string): User | null {
  if (MOCK_USERS[username] && MOCK_USERS[username] === password) {
    return { username };
  }
  return null;
}
