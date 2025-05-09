import React, { useState } from 'react';

const TONES = ['Empowering', 'Witty', 'Dark Humor'];

export default function App() {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState(TONES[0]);
  const [flip, setFlip] = useState('');
  const [loading, setLoading] = useState(false);

  const generateFlip = async () => {
  setLoading(true);
  setFlip('');
  try {
    const res = await fetch('/api/flip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, tone }),
    });

    const data = await res.json();

    if (res.ok) {
      setFlip(data.flip);
    } else {
      setFlip(`Error: ${data.error || 'Something went wrong'}`);
    }
  } catch (err) {
    setFlip(`Error: ${err.message}`);
  }

  setLoading(false);
};

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Thruline</h1>
      <p>What’s messing with your head today?</p>
      <textarea
        placeholder="Type your thought here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', minHeight: '100px', padding: '1rem' }}
      />
      <br />
      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        {TONES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <br /><br />
      <button onClick={generateFlip} disabled={loading || !input}>
        {loading ? 'Flipping...' : 'Flip It'}
      </button>
      {flip && (
        <div style={{ marginTop: '2rem', background: '#eee', padding: '1rem' }}>
          <strong>Flip:</strong>
          <p>{flip}</p>
        </div>
      )}
    </div>
  );
}
