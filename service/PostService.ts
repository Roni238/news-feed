import xml2js from 'xml2js';

export default class PostService {
  static async loadPosts(url: string): Promise<object[]> {
    try {
      // Запросы направляются на Vercel API
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        return []; // Возвращаем пустой массив вместо выброса ошибки
      }

      const data = await response.text();
      if (!data.trim()) {
        return [];
      }

      // Парсинг XML
      return new Promise<object[]>((resolve, reject) => {
        xml2js.parseString(data, (err: any, result: any) => {
          if (err) {
            console.error('Ошибка парсинга XML:', err);
            resolve([]);
          } else {
            try {
              const items = result?.rss?.channel?.[0]?.item || [];
              const posts = items.map((item: any) => ({
                title: item?.title || '',
                description: item?.description || '',
                enclosure: item?.enclosure || {},
                link: item?.link || '',
                pubDate: item?.pubDate || '',
              }));
              resolve(posts);
            } catch (error) {
              console.error('Ошибка обработки данных XML:', error);
              resolve([]);
            }
          }
        });
      });
    } catch (error) {
      console.error('Ошибка при запросе данных:', error);
      return [];
    }
  }
}
