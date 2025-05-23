
"use client";

import { useState, useEffect, useRef } from 'react';
import { portfolioChatbot, type PortfolioChatbotInput, type PortfolioChatbotOutput } from '@/ai/flows/portfolio-chatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Loader2, Send, MessageCircle, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const suggestedQueries = [
  "What are Alex's key skills?",
  "Tell me about Alex's latest project.",
  "Alex's experience with GCP?",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [portfolioContent, setPortfolioContent] = useState<string>(''); // This state is not directly used for rendering
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [displayedSuggestedQuery, setDisplayedSuggestedQuery] = useState(suggestedQueries[0]);
  const queryIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setMessages([{id: 'greeting', text: "Hello there! I'm Alex's portfolio assistant. How can I help you learn more about Alex's projects, skills, or experience today?", sender: 'bot'}]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  useEffect(() => {
    if (!isMounted) return;

    const cycleQuery = () => {
      queryIndexRef.current = (queryIndexRef.current + 1) % suggestedQueries.length;
      setDisplayedSuggestedQuery(suggestedQueries[queryIndexRef.current]);
    };

    if (!isOpen) {
      setDisplayedSuggestedQuery(suggestedQueries[queryIndexRef.current]); // Initialize/reset
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(cycleQuery, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen, isMounted]); // suggestedQueries is stable, so not strictly needed as dep

  const extractPageContent = () => {
    if (typeof document !== 'undefined') {
      const mainElement = document.querySelector('main');
      return mainElement ? mainElement.innerText : document.body.innerText;
    }
    return '';
  };

  const processQuery = async (queryString: string) => {
    if (!queryString.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: queryString, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);

    const currentPortfolioContent = extractPageContent();
    // setPortfolioContent(currentPortfolioContent); // Not strictly needed if only passed to AI

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
      setQuery(''); // Clear the main input field
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    processQuery(query);
  };

  const handleSingleSuggestionClick = async () => {
    setIsOpen(true); 
    // Wait for sheet to potentially open
    await new Promise(resolve => setTimeout(resolve, 50));
    processQuery(displayedSuggestedQuery);
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <>
      {/* Single Suggested Query Button */}
      {isMounted && !isOpen && (
        <div className="fixed bottom-24 right-6 flex flex-col items-end z-40">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSingleSuggestionClick}
            className="bg-background/80 backdrop-blur-sm shadow-lg hover:bg-card transition-all duration-150 ease-in-out animate-in fade-in zoom-in-95"
          >
            {displayedSuggestedQuery}
          </Button>
        </div>
      )}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-accent hover:bg-accent/90 text-accent-foreground z-50"
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
