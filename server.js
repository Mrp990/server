const http = require('http');
const os = require('os');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'GET') {
    if (req.url === '/userinfo') {
     
      const randomDelay = Math.floor(Math.random() * 3000) + 1000; 
      setTimeout(() => {
        const userInfo = {
          cpu: os.cpus(),
          platform: os.platform(),
          type: os.type(),
          totalMemory: os.totalmem(),
          freeMemory: os.freemem(),
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userInfo));
      }, randomDelay);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


