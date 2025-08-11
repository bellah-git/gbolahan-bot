module.exports = {
  name: 'ping',
  description: 'Replies with pong',
  run: async (sock, msg, args) => {
    try {
      await sock.sendMessage(msg.key.remoteJid, { text: 'pong' }, { quoted: msg });
    } catch (e) {
      console.error('ping error', e);
    }
  }
};


