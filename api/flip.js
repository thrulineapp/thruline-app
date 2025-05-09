export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.status(200).json({ flip: 'This is a test flip. Your backend works!' });
}
