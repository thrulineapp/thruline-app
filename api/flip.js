export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input, tone } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  try {
    const prompt = `Reframe this thought in a ${tone} tone:\n\n"${input}"\n\nFlip:`;

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 60,
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const flip = data.choices?.[0]?.text?.trim() || 'No flip found. Try again.';
    res.status(200).json({ flip });
  } catch (err) {
    console.error('OpenAI request failed:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
