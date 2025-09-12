"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  nameFilter: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionSearch({ nameFilter, children, defaultOpen }: AccordionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={toggleAccordion}
        className="flex w-full items-center justify-between py-4 text-sm md:text-md font-medium text-gray-600 hover:text-primary transition-colors duration-200 cursor-pointer"
      >
        {nameFilter}
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          height: isOpen ? `${contentHeight}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div 
          ref={contentRef}
          className="pb-4 pt-0 text-sm font-medium capitalize"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export { AccordionSearch };
