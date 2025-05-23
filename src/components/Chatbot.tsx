
"use client";

import { useState, useEffect, useRef } from 'react';
import { portfolioChatbot, type PortfolioChatbotInput, type PortfolioChatbotOutput } from '@/ai/flows/portfolio-chatbot';
import { suggestedQueriesFlow, type SuggestedQueriesInput } from '@/ai/flows/suggested-queries-flow';
import type { SuggestedQueriesOutput } from '@/ai/flows/suggested-queries-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Loader2, Send, MessageCircle, X, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const defaultSuggestedQueries = [
  "What are Alex's key skills?",
  "Tell me about Alex's latest project.",
  "Alex's experience with GCP?",
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
      setMessages([{id: 'greeting', text: "Hello there! I'm Alex's portfolio assistant. How can I help you learn more about Alex's projects, skills, or experience today?", sender: 'bot'}]);
    }

    const fetchSuggestions = async () => {
      setIsLoadingSuggestions(true);
      try {
        const pageContent = extractPageContent();
        if (pageContent) {
          const input: SuggestedQueriesInput = { portfolioContent: pageContent };
          const suggestionsOutput: SuggestedQueriesOutput = await suggestedQueriesFlow(input);
          if (suggestionsOutput.queries && suggestionsOutput.queries.length > 0) {
            setDynamicSuggestedQueries(suggestionsOutput.queries);
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

    fetchSuggestions();
  }, [toast]);
  
  useEffect(() => {
    if (!isLoadingSuggestions && dynamicSuggestedQueries.length > 0) {
      if (!isOpen && isMounted) {
        setDisplayedSuggestedQuery(dynamicSuggestedQueries[queryIndexRef.current]);
        intervalRef.current = setInterval(() => {
          queryIndexRef.current = (queryIndexRef.current + 1) % dynamicSuggestedQueries.length;
          setDisplayedSuggestedQuery(dynamicSuggestedQueries[queryIndexRef.current]);
        }, 3000);
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen, isMounted, dynamicSuggestedQueries, isLoadingSuggestions]);


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
  
  const handleSingleSuggestionClick = async () => {
    if (!displayedSuggestedQuery) return;
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
      {isMounted && !isOpen && (
        <div className="fixed bottom-22 right-6 flex flex-col items-end gap-2 z-40"> {/* Adjusted bottom from 24 to 22 */}
           {isLoadingSuggestions ? (
             <Button
                variant="outline"
                size="sm"
                disabled
                className="bg-background/80 backdrop-blur-sm shadow-lg hover:bg-card hover:text-card-foreground transition-all duration-150 ease-in-out animate-in fade-in zoom-in-95"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading suggestions...
            </Button>
           ) : (
            displayedSuggestedQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSingleSuggestionClick}
                className="bg-background/80 backdrop-blur-sm shadow-lg hover:bg-card hover:text-card-foreground transition-all duration-150 ease-in-out animate-in fade-in zoom-in-95 slide-in-from-bottom-5"
              >
                <Sparkles className="mr-2 h-4 w-4 text-accent" />
                {displayedSuggestedQuery}
              </Button>
            )
           )}
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

