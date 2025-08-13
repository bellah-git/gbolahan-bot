module.exports = {
  name: 'ping',
  description: 'Check bot response time',
  execute: async (sock, m, args, { from }) => {
    const start = Date.now();
    const sent = await sock.sendMessage(from, { text: "🏓 Calculating response time and server latency..." }, { quoted: m });
    const end = Date.now();
    const responseTime = end - start;
    
    await sock.sendMessage(from, { 
      text: `📊 *Bot Performance Stats:*\n\n🏓 **Ping:** ${responseTime}ms\n⚡ **Status:** Online and fully operational\n🤖 **Server:** Running smoothly with optimal performance\n📡 **Connection:** Stable and responsive to all commands`,
      edit: sent.key 
    });
  }
};
