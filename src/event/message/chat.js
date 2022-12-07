import res from 'express/lib/response.js';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPNEAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// テキストメッセージの処理をする関数
export const chatEvent = async (event, appContext) => {
  console.log('chat event happen');
  const receivedMessage = event.message.text;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: receivedMessage,
    max_tokens: 300,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
  });
  return {
    type: 'text',
    text: completion.data.choices[0].text,
  };
};
