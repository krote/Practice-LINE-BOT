import { get } from '../../request.js';

export const readNews = async () => {
  const newsData = (
    await get(
      `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`,
    )
  ).data;
  return newsData;
};
