
'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { SkillCategory } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillItemCardProps {
  category: SkillCategory;
  isUserExpanded: boolean;
  onToggleExpand: () => void;
  className?: string;
  contentMaxHeightBeforeExpand?: string;
}

export function SkillItemCard({
  category,
  isUserExpanded,
  onToggleExpand,
  className,
  contentMaxHeightBeforeExpand = '120px', // Default max height for skill list section
}: SkillItemCardProps) {
  const [isOverflowDetected, setIsOverflowDetected] = useState(false);
  const skillListContainerRef = useRef<HTMLDivElement>(null); // Ref for the div containing skill badges

  useEffect(() => {
    const checkOverflow = () => {
      if (skillListContainerRef.current) {
        const el = skillListContainerRef.current;
        // Temporarily allow full height to measure its potential scrollHeight accurately
        const originalMaxHeight = el.style.maxHeight;
        el.style.maxHeight = 'none'; 
        const scrollHeight = el.scrollHeight;
        el.style.maxHeight = originalMaxHeight; // Restore original maxHeight
        
        // We consider it overflowing if its natural height (scrollHeight) is greater than
        // the height it's allowed to be when collapsed (parseFloat converts '120px' to 120).
        if (scrollHeight > parseFloat(contentMaxHeightBeforeExpand)) {
          setIsOverflowDetected(true);
        } else {
          setIsOverflowDetected(false);
        }
      }
    };

    checkOverflow();
    // Re-check on window resize as available width can affect content wrapping and height
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [category.skills, contentMaxHeightBeforeExpand, isUserExpanded]); // Rerun if skills, expansion, or prop changes


  return (
    <Card className={cn(
        "w-full h-full flex flex-col items-center text-center p-3 sm:p-4 transition-shadow duration-300 ease-in-out rounded-xl bg-card", // Ensured rounded-xl
        className
      )}>
      <CardHeader className="p-2 sm:p-3 shrink-0 w-full">
        <category.icon className="mx-auto mb-3 h-12 w-12 sm:h-14 sm:w-14 text-primary" />
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex-grow flex flex-col justify-between relative pt-2 pb-12"> {/* Ensure padding for button */}
        <div
          ref={skillListContainerRef}
          className="flex flex-wrap gap-2 justify-center p-2 sm:p-3 overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isUserExpanded ? 'none' : contentMaxHeightBeforeExpand,
          }}
        >
          {category.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs sm:text-sm py-1 px-2.5">
              {skill}
            </Badge>
          ))}
        </div>
        
        {isOverflowDetected && !isUserExpanded && (
          <Button
            variant="ghost"
            size="sm" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click if button is on card
              onToggleExpand();
            }}
            className="absolute bottom-3 right-3 text-primary hover:text-primary/80 flex items-center gap-1 px-2 py-1 h-auto"
            aria-label="Show more skills"
          >
            <PlusCircle className="h-5 w-5" />
            <span className="text-xs">More</span>
          </Button>
        )}
        {isUserExpanded && isOverflowDetected && ( // Show minus only if it was overflowing initially
           <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="absolute bottom-3 right-3 text-primary hover:text-primary/80 flex items-center gap-1 px-2 py-1 h-auto"
            aria-label="Show fewer skills"
          >
            <MinusCircle className="h-5 w-5" />
             <span className="text-xs">Less</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
