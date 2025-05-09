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
  } finally {
    setLoading(false);
  }
};
