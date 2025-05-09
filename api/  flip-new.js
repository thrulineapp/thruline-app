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
