
"use client";

import { useState, useEffect, useRef } from 'react';
import { portfolioChatbot, type PortfolioChatbotInput, type PortfolioChatbotOutput } from '@/ai/flows/portfolio-chatbot';
import { suggestedQueriesFlow, type SuggestedQueriesInput, type SuggestedQueriesOutput } from '@/ai/flows/suggested-queries-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Loader2, Send, MessageCircle, X, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { portfolioOwner } from '@/lib/data'; // Import portfolioOwner
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const defaultSuggestedQueries = [
  `What are ${portfolioOwner.name.split(' ')[0]}'s key skills?`,
  `Tell me about ${portfolioOwner.name.split(' ')[0]}'s latest project.`,
  `${portfolioOwner.name.split(' ')[0]}'s experience with GCP?`,
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [dynamicSuggestedQueries, setDynamicSuggestedQueries] = useState<string[]>(defaultSuggestedQueries);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  
  const [displayedSuggestedQuery, setDisplayedSuggestedQuery] = useState<string>('');
  const queryIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setMessages([{id: 'greeting', text: `Hello there! I'm ${portfolioOwner.name.split(' ')[0]}'s portfolio assistant. How can I help you learn more about ${portfolioOwner.name.split(' ')[0]}'s projects, skills, or experience today?`, sender: 'bot'}]);
    }

    const fetchSuggestions = async () => {
      setIsLoadingSuggestions(true);
      try {
        const pageContent = extractPageContent();
        if (pageContent) {
          const input: SuggestedQueriesInput = { portfolioContent: pageContent };
          const suggestionsOutput: SuggestedQueriesOutput = await suggestedQueriesFlow(input);
          if (suggestionsOutput.queries && suggestionsOutput.queries.length > 0) {
            const validQueries = suggestionsOutput.queries.filter(q => q && q.trim() !== '');
            setDynamicSuggestedQueries(validQueries.length > 0 ? validQueries : defaultSuggestedQueries);
          } else {
            setDynamicSuggestedQueries(defaultSuggestedQueries);
          }
        } else {
          setDynamicSuggestedQueries(defaultSuggestedQueries);
        }
      } catch (error) {
        console.error("Failed to fetch dynamic suggestions:", error);
        setDynamicSuggestedQueries(defaultSuggestedQueries);
         toast({
          title: "Suggestion Error",
          description: "Could not load AI-powered suggestions, using defaults.",
          variant: "default",
        });
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    if (typeof window !== 'undefined') {
        fetchSuggestions();
    }
  }, [toast]); 
  
  useEffect(() => {
    if (!isLoadingSuggestions && dynamicSuggestedQueries.length > 0 && isMounted) {
      // Initialize displayed query immediately
      if(!displayedSuggestedQuery) {
        setDisplayedSuggestedQuery(dynamicSuggestedQueries[queryIndexRef.current % dynamicSuggestedQueries.length]);
      }
      
      // Clear any existing interval before setting a new one
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        queryIndexRef.current = (queryIndexRef.current + 1) % dynamicSuggestedQueries.length;
        setDisplayedSuggestedQuery(dynamicSuggestedQueries[queryIndexRef.current]);
      }, 3000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMounted, dynamicSuggestedQueries, isLoadingSuggestions, displayedSuggestedQuery]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
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
      setQuery(''); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    processQuery(query);
  };
    
  if (!isMounted) {
    return null; 
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            onClick={() => {
              if (displayedSuggestedQuery && !isOpen) { // Only process if not already open to avoid double processing
                processQuery(displayedSuggestedQuery);
              }
            }}
            className={cn(
              "fixed bottom-6 left-1/2 -translate-x-1/2",
              "w-11/12 max-w-lg h-14 px-4 py-3",
              "bg-neutral-700 hover:bg-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700",
              "text-neutral-200 dark:text-neutral-300",
              "rounded-full shadow-xl",
              "flex items-center justify-between z-50"
            )}
            aria-label="Open Chatbot with suggested query"
          >
            <div className="flex items-center gap-2 overflow-hidden flex-grow">
              <Sparkles className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="truncate text-sm">
                {isLoadingSuggestions ? "Loading suggestions..." : displayedSuggestedQuery || "Ask about Enoch's portfolio..."}
              </span>
            </div>
            <div className="flex items-center gap-2 pl-2 flex-shrink-0">
              <span className="text-sm font-medium">Chat</span>
              <MessageCircle className="h-5 w-5" />
            </div>
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
