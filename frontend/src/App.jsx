import { useEffect, useState } from 'react';

const API_PREFIX = '/api';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    const response = await fetch(`${API_PREFIX}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      setUser({ name: data.name, email });
      setMessage(`Welcome back, ${data.name}!`);
    } else {
      setError('Login failed. Check your credentials and try again.');
    }
  };

  const fetchNotes = async () => {
    setError('');
    const response = await fetch(`${API_PREFIX}/notes`);
    const data = await response.json();

    if (data.notes) {
      setNotes(data.notes);
    } else {
      setNotes([]);
    }
  };

  const handleAddNote = async (event) => {
    event.preventDefault();
    if (!newNote.trim()) {
      setError('Please enter a note before saving.');
      return;
    }

    const response = await fetch(`${API_PREFIX}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: user?.name || 'Guest', note: newNote }),
    });
    const data = await response.json();

    if (data.success) {
      setNewNote('');
      setMessage('Note saved successfully.');
      fetchNotes();
    } else {
      setError('Unable to save note. Please try again.');
    }
  };

  const handleStartEdit = (note) => {
    setEditingNoteId(note.id);
    setEditingText(note.note);
    setMessage('');
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditingText('');
  };

  const handleUpdateNote = async (event) => {
    event.preventDefault();
    if (!editingText.trim()) {
      setError('Please enter a note before saving.');
      return;
    }

    const response = await fetch(`${API_PREFIX}/notes/${editingNoteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: editingText }),
    });
    const data = await response.json();

    if (data.success) {
      setEditingNoteId(null);
      setEditingText('');
      setMessage('Note updated successfully.');
      fetchNotes();
    } else {
      setError(data.error || 'Unable to update note. Please try again.');
    }
  };

  const handleDeleteNote = async (id) => {
    const response = await fetch(`${API_PREFIX}/notes/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (data.success) {
      setMessage('Note deleted successfully.');
      if (editingNoteId === id) {
        handleCancelEdit();
      }
      fetchNotes();
    } else {
      setError(data.error || 'Unable to delete note. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="app-shell">
        <div className="card">
          <h1>Academic Dashboard</h1>
          <p>Sign in with test@example.com / 123456</p>
          <form onSubmit={handleLogin} className="form-grid">
            <label>
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
            </label>
            <label>
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </label>
            <button type="submit">Login</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="card">
        <header className="header-row">
          <div>
            <h1>Welcome, {user.name}</h1>
            <p>{message}</p>
          </div>
          <button className="secondary" onClick={() => setUser(null)}>
            Sign out
          </button>
        </header>

        <section className="section">
          <h2>Create a note</h2>
          <form onSubmit={handleAddNote} className="form-grid">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here..."
              rows="4"
            />
            <button type="submit">Save note</button>
          </form>
        </section>

        <section className="section">
          <h2>Your notes</h2>
          {notes.length === 0 ? (
            <p className="muted">No notes yet. Add one to get started.</p>
          ) : (
            <ul className="notes-list">
              {notes.map((item) => (
                <li key={item.id ?? item.note}>
                  <div className="note-header">
                    <strong>{item.name}</strong>
                    <div className="note-actions">
                      <button type="button" className="secondary" onClick={() => handleStartEdit(item)}>
                        Edit
                      </button>
                      <button type="button" className="danger" onClick={() => handleDeleteNote(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>

                  {editingNoteId === item.id ? (
                    <form onSubmit={handleUpdateNote} className="note-edit-form">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        rows="4"
                      />
                      <div className="note-edit-actions">
                        <button type="submit">Save changes</button>
                        <button type="button" className="secondary" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p>{item.note}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
