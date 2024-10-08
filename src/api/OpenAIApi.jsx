import axios from 'axios';

export const callOpenAI = async (apiKey, model, prompt, temperature) => {
  const url = 'https://api.openai.com/v1/completions';
  try {
    const response = await axios.post(
      url,
      {
        model,
        prompt,
        max_tokens: 200,
        temperature,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
};
