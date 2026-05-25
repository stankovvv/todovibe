'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    });
    setNewTodo('');
    fetchTodos();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleSaveEdit = async (id: number) => {
    if (!editTitle.trim()) return;
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle }),
    });
    setEditingId(null);
    setEditTitle('');
    fetchTodos();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container">
      <div className="todo-app">
        <div className="header">
          <h1>Todo App</h1>
          <div className="header-actions">
            <button className="btn-theme" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="btn-logout" onClick={() => { logout(); router.push('/login'); }}>Logout</button>
          </div>
        </div>
        <form onSubmit={handleAdd} className="add-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit" className="btn-add">Add</button>
        </form>
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              {editingId === todo.id ? (
                <div className="edit-form">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button className="btn-save" onClick={() => handleSaveEdit(todo.id)}>Save</button>
                  <button className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <>
                  <span className="todo-title">{todo.title}</span>
                  <div className="todo-actions">
                    <button className="btn-edit" onClick={() => handleEdit(todo)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(todo.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
          {todos.length === 0 && (
            <p className="empty-message">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}