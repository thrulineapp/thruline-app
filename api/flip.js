module.exports = async function handler(req, res) {
  return res.status(200).json({ flip: '✅ API route is working!' });
};
