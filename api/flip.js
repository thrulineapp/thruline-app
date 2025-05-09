export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input, tone } = req.body;

  if (!input || !tone) {
    return res.status(400).json({ error: 'Missing input or tone' });
  }

  // Dummy flip response
  const fakeFlip = `Here’s your ${tone.toLowerCase()} flip of: "${input}"`;

  return res.status(200).json({ flip: fakeFlip });
}
