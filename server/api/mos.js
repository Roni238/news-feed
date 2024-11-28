let cachedData = null;
let cacheTimestamp = 0;

export default async (req, res) => {
  const cacheDuration = 60 * 1000; // Кешируем на 1 минуту

  if (cachedData && Date.now() - cacheTimestamp < cacheDuration) {
    res.setHeader('Content-Type', 'application/xml');
    return res.status(200).send(cachedData);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch('https://www.mos.ru/rss', {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.text();
    cachedData = data; // Сохраняем данные в кеше
    cacheTimestamp = Date.now();

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(data);
  } catch (error) {
    if (error.name === 'AbortError') {
      res.status(504).json({ error: 'Request timed out' });
    } else {
      res.status(500).json({ error: error.message || 'Failed to fetch RSS feed' });
    }
  }
};
