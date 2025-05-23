"use client";

import { useState, useEffect, useRef } from 'react';
import { portfolioChatbot, type PortfolioChatbotInput, type PortfolioChatbotOutput } from '@/ai/flows/portfolio-chatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User, Loader2, Send, MessageCircle, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioContent, setPortfolioContent] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      // Initial greeting from bot
      setMessages([{id: 'greeting', text: "Hello there! I'm Alex's portfolio assistant. I can help you find information about Alex's projects, skills, and experience on this page. What are you looking for?", sender: 'bot'}]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Function to extract text content from the page
  const extractPageContent = () => {
    if (typeof document !== 'undefined') {
      // Attempt to get main content, otherwise full body. This is a simple heuristic.
      const mainElement = document.querySelector('main');
      return mainElement ? mainElement.innerText : document.body.innerText;
    }
    return '';
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: query, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    // Extract fresh page content on each query for dynamic pages (though this portfolio is mostly static)
    const currentPortfolioContent = extractPageContent();
    setPortfolioContent(currentPortfolioContent);


    try {
      const input: PortfolioChatbotInput = {
        query: userMessage.text,
        portfolioContent: currentPortfolioContent,
      };
      const result: PortfolioChatbotOutput = await portfolioChatbot(input);
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: result.answer, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Error with chatbot:", err);
      const errorMessage = err instanceof Error ? err.message : "Sorry, I couldn't process that.";
      const errorBotMessage: Message = { id: (Date.now() + 1).toString(), text: `Error: ${errorMessage}`, sender: 'bot' };
      setMessages(prev => [...prev, errorBotMessage]);
       toast({
        title: "Chatbot Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null; // Don't render chatbot button until client-side hydration
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-accent hover:bg-accent/90 text-accent-foreground"
            aria-label="Open Chatbot"
          >
            <MessageCircle className="h-7 w-7" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full max-w-md flex flex-col p-0">
          <SheetHeader className="p-6 pb-2 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <SheetTitle className="text-lg">Portfolio Assistant</SheetTitle>
              </div>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
            <SheetDescription className="text-xs">
              Ask me anything about the content on this page.
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea className="flex-grow p-6">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.sender === 'bot' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={18}/></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-sm shadow ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-card-foreground border'
                    }`}
                  >
                    {msg.text}
                  </div>
                   {msg.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted-foreground text-background"><User size={18}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <SheetFooter className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question..."
                disabled={isLoading}
                className="flex-1"
                aria-label="Chat input"
              />
              <Button type="submit" size="icon" disabled={isLoading || !query.trim()} className="bg-primary hover:bg-primary/90">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
