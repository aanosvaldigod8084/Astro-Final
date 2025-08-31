import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  role: 'user' | 'astrologer';
  content: string;
  timestamp: Date;
}

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY as string
);

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'astrologer',
      content:
        '🌌 Namaste! I am your cosmic guide. Share your questions about life path, relationships, or career. I will interpret them through Vedic astrology and cosmic energies.',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      history.push({
        role: 'user',
        parts: [
          {
            text: `You are a Vedic astrology assistant named AstroGuide. 
Respond in a warm, spiritual, and insightful way. 
User says: ${newMessage}`,
          },
        ],
      });

      // Call Gemini
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const result = await model.generateContent({
        contents: history,
      });

      const astrologerText =
        result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
        "✨ The cosmos whispers, but I couldn't interpret clearly. Please ask again.";

      // Add AI response
      const astrologerResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'astrologer',
        content: astrologerText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, astrologerResponse]);
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'astrologer',
          content:
            '⚠️ Sorry, the cosmic connection failed. Please try again in a moment.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">Cosmic Astrologer</h3>
            <p className="text-sm text-muted-foreground">Your celestial guide</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'stellar-gradient border border-border'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing dots */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="stellar-gradient border border-border p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask the cosmos..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !newMessage.trim()}
            className="cosmic-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
