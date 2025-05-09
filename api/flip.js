export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input, tone } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  if (!input || !tone) {
    return res.status(400).json({ error: 'Missing input or tone' });
  }

  const prompt = `Reframe this thought in a ${tone} tone:\n\n"${input}"\n\nFlip:`;

  try {
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

    if (!response.ok || data.error) {
      return res.status(500).json({
        error: data.error?.message || 'OpenAI error',
      });
    }

    const flip = data.choices?.[0]?.text?.trim();
    if (!flip) {
      return res.status(500).json({ error: 'No flip returned from OpenAI' });
    }

    return res.status(200).json({ flip });
  } catch (err) {
    console.error('OpenAI API call failed:', err);
    return res.status(500).json({ error: err.message || 'Unknown server error' });
  }
}
