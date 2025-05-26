
"use client";

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { portfolioChatbot, type PortfolioChatbotInput, type PortfolioChatbotOutput } from '@/ai/flows/portfolio-chatbot';
import { suggestedQueriesFlow, type SuggestedQueriesInput, type SuggestedQueriesOutput } from '@/ai/flows/suggested-queries-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Loader2, Send, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { portfolioOwner } from '@/lib/data';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const defaultSuggestedQueries = [
  `What are ${portfolioOwner.name.split(' ')[0]}'s key skills?`,
  `Latest project details?`,
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
  const bottomInputRef = useRef<HTMLInputElement>(null);

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
          const validQueries = suggestionsOutput.queries?.filter(q => q && q.trim() !== '');
          if (validQueries && validQueries.length > 0) {
            setDynamicSuggestedQueries(validQueries);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]); 
  
  useEffect(() => {
    if (!isLoadingSuggestions && dynamicSuggestedQueries.length > 0 && isMounted) {
      if(!displayedSuggestedQuery) {
        setDisplayedSuggestedQuery(dynamicSuggestedQueries[queryIndexRef.current % dynamicSuggestedQueries.length]);
      }
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      const isBottomInputFocused = bottomInputRef.current === document.activeElement;
      // Only cycle suggestions if the bottom input bar is not focused AND the query input is empty AND sheet is not open
      if (!isOpen && !isBottomInputFocused && !query) {
        intervalRef.current = setInterval(() => {
          queryIndexRef.current = (queryIndexRef.current + 1) % dynamicSuggestedQueries.length;
          setDisplayedSuggestedQuery(dynamicSuggestedQueries[queryIndexRef.current]);
        }, 3000);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMounted, dynamicSuggestedQueries, isLoadingSuggestions, displayedSuggestedQuery, isOpen, query]);


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
    if (!queryString.trim()) return; 

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
    }
  };

  const handleBottomBarSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const queryToProcess = query.trim() || displayedSuggestedQuery;
    if (!queryToProcess) return;
    
    setIsOpen(true); // Open the sheet immediately

    await processQuery(queryToProcess);
    setQuery(''); // Clear input after processing
  };
  
  const handleSheetFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    await processQuery(query);
    setQuery(''); 
  };
    
  if (!isMounted) {
    return null; 
  }

  const currentPlaceholder = isLoadingSuggestions ? "Loading suggestions..." : displayedSuggestedQuery || `Ask about ${portfolioOwner.name.split(' ')[0]}'s portfolio...`;

  return (
    <>
      {!isOpen && (
        <form
          onSubmit={handleBottomBarSubmit}
          className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2",
            "w-11/12 max-w-lg h-14 px-3 py-2",
            "bg-neutral-700 dark:bg-neutral-800", 
            "rounded-full shadow-xl",
            "flex items-center justify-between gap-2 z-50 group"
          )}
        >
          <Sparkles className="h-5 w-5 text-accent flex-shrink-0 ml-1 group-focus-within:text-primary transition-colors" />
          <Input
            ref={bottomInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={currentPlaceholder}
            className={cn(
              "flex-grow h-full bg-transparent border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
              "text-neutral-200 dark:text-neutral-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-xs sm:text-sm",
              "transition-all duration-300 ease-in-out"
            )}
            onFocus={() => {
              if (intervalRef.current) clearInterval(intervalRef.current);
            }}
            onBlur={() => {
              // Only restart cycling if input is empty, sheet isn't open, and suggestions are loaded
              if (!query && !isOpen && !isLoadingSuggestions && dynamicSuggestedQueries.length > 0 && isMounted) {
                if (intervalRef.current) clearInterval(intervalRef.current); // Clear any existing before starting new
                intervalRef.current = setInterval(() => {
                  queryIndexRef.current = (queryIndexRef.current + 1) % dynamicSuggestedQueries.length;
                  setDisplayedSuggestedQuery(dynamicSuggestedQueries[queryIndexRef.current]);
                }, 3000);
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            disabled={isLoading && !!query.trim()}
            className="h-9 w-9 p-0 text-neutral-300 hover:text-accent disabled:text-neutral-500 transition-colors"
            aria-label="Send message or use suggestion"
          >
            {(isLoading && !!query.trim()) ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
      )}

      <Sheet open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setQuery(''); 
            if (!isLoadingSuggestions && dynamicSuggestedQueries.length > 0 && isMounted && !bottomInputRef.current?.matches(':focus') && !query) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                intervalRef.current = setInterval(() => {
                  queryIndexRef.current = (queryIndexRef.current + 1) % dynamicSuggestedQueries.length;
                  setDisplayedSuggestedQuery(dynamicSuggestedQueries[queryIndexRef.current]);
                }, 3000);
            }
          }
        }}
      >
        <SheetContent className="w-full max-w-md sm:max-w-lg flex flex-col p-0">
          <SheetHeader className="p-6 pb-2 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <SheetTitle className="text-lg">Portfolio Assistant</SheetTitle>
              </div>
            </div>
            <SheetDescription className="text-xs sm:text-sm">
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
                    <Avatar className="h-9 w-9" aria-label="Bot Avatar">
                      <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20}/></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-xs sm:text-sm shadow ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-card-foreground border'
                    }`}
                  >
                    {msg.text}
                  </div>
                   {msg.sender === 'user' && (
                    <Avatar className="h-9 w-9" aria-label="User Avatar">
                      <AvatarFallback className="bg-muted-foreground text-background"><User size={20}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <SheetFooter className="p-4 border-t">
            <form onSubmit={handleSheetFormSubmit} className="flex w-full items-center space-x-2">
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
