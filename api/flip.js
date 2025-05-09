module.exports = async function handler(req, res) {
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

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a clever and emotionally intelligent assistant. When given a self-critical or negative thought and a tone (like witty, dark humor, or empowering), reframe the thought into a positive, human, clever perspective.`,
          },
          {
            role: 'user',
            content: `Reframe this thought in a ${tone} tone: "${input}"`,
          },
        ],
        temperature: 0.8,
        max_tokens: 100,
      }),
    });

    const data = await response.json();

    const flip = data.choices?.[0]?.message?.content?.trim();

    if (!flip) {
      return res.status(500).json({ error: 'No flip returned from OpenAI' });
    }

    return res.status(200).json({ flip });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown server error' });
  }
};
