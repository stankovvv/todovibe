'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Group {
  id: number;
  name: string;
  _count: { members: number };
}

interface AppUser {
  id: number;
  username: string;
  isAdmin: boolean;
}

export default function AdminPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (!isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, router]);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchGroups();
      fetchUsers();
    }
  }, [isAuthenticated, isAdmin]);

  const fetchGroups = async () => {
    const res = await fetch('/api/groups');
    setGroups(await res.json());
  };

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    setUsers(await res.json());
  };

  const createGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newGroupName }),
    });
    setNewGroupName('');
    fetchGroups();
    setMessage(`Group "${newGroupName}" created`);
  };

  const addMember = async (groupId: number) => {
    const select = document.getElementById(`user-select-${groupId}`) as HTMLSelectElement;
    const userId = Number(select.value);
    if (!userId) return;
    const res = await fetch(`/api/groups/${groupId}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    if (res.ok) {
      setMessage('Member added');
      fetchGroups();
    } else {
      const data = await res.json();
      setMessage(data.error || 'Failed to add member');
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="container">
      <div className="todo-app">
        <div className="header">
          <h1>Admin Dashboard</h1>
          <button className="btn-logout" onClick={() => router.push('/')}>Back</button>
        </div>

        {message && <p className="success-message">{message}</p>}

        <h2>Users</h2>
        <div className="user-list">
          {users.map((u) => (
            <div key={u.id} className="user-item">
              <span>{u.username}</span>
              {u.isAdmin && <span className="admin-badge">admin</span>}
            </div>
          ))}
        </div>

        <h2>Create Group</h2>
        <form onSubmit={createGroup} className="add-form">
          <input
            type="text"
            placeholder="Group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <button type="submit" className="btn-add">Create</button>
        </form>

        <h2>Groups</h2>
        {groups.map((g) => (
          <div key={g.id} className="group-card">
            <div className="group-header">
              <strong>{g.name}</strong>
              <span>{g._count.members} members</span>
            </div>
            <div className="group-actions">
              <select id={`user-select-${g.id}`} defaultValue="">
                <option value="" disabled>Select user</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.username}</option>
                ))}
              </select>
              <button className="btn-add" onClick={() => addMember(g.id)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
