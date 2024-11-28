import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
  console.log('Proxy handler called for /api/mos');
  const proxy = createProxyMiddleware({
    target: 'https://www.mos.ru/rss',
    changeOrigin: true,
    timeout: 60000, // 20 секунд
    proxyTimeout: 60000, // 20 секунд
    pathRewrite: { '^/api/mos': '' },
  });

  return proxy(req, res, (err) => {
    if (err) {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    }
  });
}
