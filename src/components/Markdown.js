import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

function Markdown({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      children={children}
      components={{
        code({ node, inline, className, children, ...props }) {
          const language = className?.replace('language-', '');
          if (inline) return <code>{children}</code>;
          return (
            <SyntaxHighlighter PreTag='div' language={language}>
              {children}
            </SyntaxHighlighter>
          );
        },
      }}
    />
  );
}

export default Markdown;
