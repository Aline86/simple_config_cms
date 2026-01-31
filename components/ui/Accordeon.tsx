import { useState } from "react";

interface AccordionProps {
  children: React.ReactNode;
  header: string;
}

export function Accordion({ children, header }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full p-2 mx-auto mb-3">
      {/* Header */}
      <button
        className="w-full text-left px-6 py-4 bg-slate-600 hover:bg-slate-700 text-white rounded-lg shadow-md transition-all duration-300 flex items-center justify-between group"
        onClick={toggleAccordion}
      >
        <span className="text-lg font-semibold">{header}</span>
        <svg
          className={`w-6 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Content avec animation */}
      <div
        className={`overflow-x-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 border border-slate-200 rounded-lg shadow-sm">
          <div className="text-slate-700">{children}</div>
        </div>
      </div>
    </div>
  );
}
