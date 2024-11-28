const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'https://lenta.ru/rss/news',
    changeOrigin: true,
    timeout: 60000, // 20 секунд
    proxyTimeout: 60000, // 20 секунд
    pathRewrite: { '^/api/lenta': '' },
  });
  console.log('запрос')
  return proxy(req, res, (err) => {
    if (err) {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    }
  });
};
