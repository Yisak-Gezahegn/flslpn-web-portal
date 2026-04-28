import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

export interface PortableTextRendererProps {
  value: PortableTextBlock[];
  className?: string;
}

const serifStyle = { fontFamily: "var(--font-playfair, Georgia, serif)", color: "inherit" };
const bodyStyle = { color: "inherit", opacity: 0.85 };

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-4 leading-tight" style={serifStyle}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold mt-8 mb-3 leading-tight" style={serifStyle}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-3 leading-snug" style={serifStyle}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-5 mb-2" style={serifStyle}>{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed mb-4" style={bodyStyle}>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-5 my-6 italic text-lg" style={{ borderColor: "#C9A84C", ...serifStyle, opacity: 0.85 }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-4 space-y-1 text-base" style={bodyStyle}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-4 space-y-1 text-base" style={bodyStyle}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold" style={{ color: "inherit" }}>{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <a href={href} target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          style={{ color: "#C9A84C" }}
          className="underline underline-offset-2 transition-colors duration-150">
          {children}
        </a>
      );
    },
  },
};

export function PortableTextRenderer({ value, className = "" }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null;
  return (
    <div className={`portable-text ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
