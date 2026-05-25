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

interface Group {
  id: number;
  name: string;
  _count: { members: number };
}

interface GroupTodo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

type Tab = 'my-tasks' | 'group-tasks';

export default function Home() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>('my-tasks');

  // Personal tasks state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Group tasks state
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [groupTodos, setGroupTodos] = useState<GroupTodo[]>([]);
  const [newGroupTodo, setNewGroupTodo] = useState('');
  const [editingGroupTodoId, setEditingGroupTodoId] = useState<number | null>(null);
  const [editGroupTodoTitle, setEditGroupTodoTitle] = useState('');

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

  useEffect(() => {
    if (isAuthenticated && user) {
      fetch(`/api/groups?memberId=${user.id}`)
        .then((res) => res.json())
        .then(setGroups);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (selectedGroupId) {
      fetch(`/api/groups/${selectedGroupId}/tasks`)
        .then((res) => res.json())
        .then(setGroupTodos);
    } else {
      setGroupTodos([]);
    }
  }, [selectedGroupId]);

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

  const handleAddGroupTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupTodo.trim() || !selectedGroupId || !user) return;
    await fetch(`/api/groups/${selectedGroupId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newGroupTodo, userId: user.id }),
    });
    setNewGroupTodo('');
    fetch(`/api/groups/${selectedGroupId}/tasks`)
      .then((res) => res.json())
      .then(setGroupTodos);
  };

  const handleDeleteGroupTodo = async (todoId: number) => {
    if (!selectedGroupId) return;
    await fetch(`/api/groups/${selectedGroupId}/tasks`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todoId }),
    });
    fetch(`/api/groups/${selectedGroupId}/tasks`)
      .then((res) => res.json())
      .then(setGroupTodos);
  };

  const handleEditGroupTodo = (todo: GroupTodo) => {
    setEditingGroupTodoId(todo.id);
    setEditGroupTodoTitle(todo.title);
  };

  const handleSaveGroupEdit = async (todoId: number) => {
    if (!editGroupTodoTitle.trim() || !selectedGroupId) return;
    await fetch(`/api/groups/${selectedGroupId}/tasks`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todoId, title: editGroupTodoTitle }),
    });
    setEditingGroupTodoId(null);
    setEditGroupTodoTitle('');
    fetch(`/api/groups/${selectedGroupId}/tasks`)
      .then((res) => res.json())
      .then(setGroupTodos);
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
            {isAdmin && <button className="btn-link" onClick={() => router.push('/admin')}>Admin</button>}
            <button className="btn-logout" onClick={() => { logout(); router.push('/login'); }}>Logout</button>
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'my-tasks' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('my-tasks')}
          >
            My Tasks
          </button>
          <button
            className={`tab ${activeTab === 'group-tasks' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('group-tasks')}
          >
            Group Tasks
          </button>
        </div>

        {activeTab === 'my-tasks' && (
          <>
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
          </>
        )}

        {activeTab === 'group-tasks' && (
          <>
            {groups.length === 0 ? (
              <p className="empty-message">You are not a member of any group.</p>
            ) : (
              <>
                <div className="group-selector">
                  <select
                    value={selectedGroupId ?? ''}
                    onChange={(e) => setSelectedGroupId(Number(e.target.value) || null)}
                  >
                    <option value="" disabled>Select a group</option>
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>

                {selectedGroupId && (
                  <>
                    <form onSubmit={handleAddGroupTodo} className="add-form">
                      <input
                        type="text"
                        placeholder="Add a group task..."
                        value={newGroupTodo}
                        onChange={(e) => setNewGroupTodo(e.target.value)}
                      />
                      <button type="submit" className="btn-add">Add</button>
                    </form>
                    <div className="todo-list">
                      {groupTodos.map((todo) => (
                        <div key={todo.id} className="todo-item">
                          {editingGroupTodoId === todo.id ? (
                            <div className="edit-form">
                              <input
                                value={editGroupTodoTitle}
                                onChange={(e) => setEditGroupTodoTitle(e.target.value)}
                              />
                              <button className="btn-save" onClick={() => handleSaveGroupEdit(todo.id)}>Save</button>
                              <button className="btn-cancel" onClick={() => setEditingGroupTodoId(null)}>Cancel</button>
                            </div>
                          ) : (
                            <>
                              <span className="todo-title">{todo.title}</span>
                              <div className="todo-actions">
                                <button className="btn-edit" onClick={() => handleEditGroupTodo(todo)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDeleteGroupTodo(todo.id)}>Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      {groupTodos.length === 0 && (
                        <p className="empty-message">No tasks in this group yet.</p>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
