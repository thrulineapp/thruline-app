export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { input, tone } = req.body;

  const prompt = `Reframe this thought in a ${tone} tone:\n\n"${input}"\n\nFlip:`;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 60,
      temperature: 0.8,
    }),
  });

  const data = await response.json();
  const flip = data.choices?.[0]?.text?.trim() || 'No flip found. Try again.';

  res.status(200).json({ flip });
}
