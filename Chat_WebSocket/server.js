const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`🚀 Serveur WebSocket démarré sur ws://localhost:${PORT}`);

const clients = new Set();

wss.on('connection', (ws) => {
  console.log('✅ Nouveau client connecté');
  clients.add(ws);

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log(`📩 Message de @${message.username}: ${message.message}`);

      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    } catch (error) {
      console.error('❌ Erreur parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('👋 Client déconnecté');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('❌ Erreur WebSocket:', error);
    clients.delete(ws);
  });
});
