module.exports = {
  name: 'math',
  description: 'Do custom math calculations',
  execute: async (sock, m, args, { from }) => {
    if (args.length === 0) {
      return sock.sendMessage(from, { 
        text: "🧮 *Math Calculator*\n\nUsage: .math <expression>\n\nExamples:\n• .math 2 + 2\n• .math 15 * 8\n• .math 100 / 4\n• .math 2^3" 
      }, { quoted: m });
    }
    
    try {
      const expression = args.join(' ').replace(/\^/g, '**');
      // Basic security: only allow numbers, operators, parentheses, and spaces
      if (!/^[0-9+\-*/().\s**]+$/.test(expression)) {
        throw new Error('Invalid characters in expression');
      }
      
      const result = eval(expression);
      await sock.sendMessage(from, { 
        text: `🧮 *Math Result:*\n\n${args.join(' ')} = **${result}**\n\nCalculation completed successfully with mathematical precision and accuracy!` 
      }, { quoted: m });
    } catch (error) {
      await sock.sendMessage(from, { 
        text: `❌ *Error:* Invalid mathematical expression. Please check your syntax and try again with proper operators.` 
      }, { quoted: m });
    }
  }
};
