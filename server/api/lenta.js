export default async (req, res) => {
  try {
    // Выполняем запрос к целевому серверу
    const response = await fetch('https://lenta.ru/rss/news');

    // Получаем данные (в данном случае RSS в формате XML)
    const data = await response.text();

    // Устанавливаем тип содержимого для ответа
    res.setHeader('Content-Type', 'application/xml');

    // Отправляем данные клиенту
    res.status(200).send(data);
  } catch (error) {
    // Обработка ошибок
    res.status(500).json({ error: 'Failed to fetch RSS feed' });
  }
};
