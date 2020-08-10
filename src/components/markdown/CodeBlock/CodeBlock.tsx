// File taken from https://github.com/FormidableLabs/prism-react-renderer/issues/54

import * as React from 'react';
import Highlight from './SyntaxHighlighting/Highlight';
import vsDark from 'prism-react-renderer/themes/vsDark';
import Prism from './SyntaxHighlighting/prism';
import { useState } from 'react';

const renderTokens = (tokens, getLineProps, getTokenProps) => {
  return tokens.map((line, i) => {
    if (line.length === 1 && line[0].content === '') line[0].content = '\n';
    return (
      <div key={i} {...getLineProps({ line, key: i })}>
        {line.map((token, key) => (
          <span key={key} {...getTokenProps({ token, key })} />
        ))}
      </div>
    );
  });
};

export default ({ children, className }) => {
  if (className === undefined) {
    // no styling, just a regular pre tag
    return (
      <pre className="-mx-4 sm:-mx-6 lg:mx-0 lg:rounded bg-gray-100 p-4 mb-4 whitespace-pre-wrap break-all">
        {children}
      </pre>
    );
  }
  const language = className.replace(/language-/, '');
  const [collapsed, setCollapsed] = useState(true);

  return (
    // @ts-ignore
    <Highlight
      Prism={Prism as any}
      code={children.trim()}
      language={language}
      theme={vsDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="gatsby-highlight" data-language={language}>
          <pre
            className={
              '-mx-4 sm:-mx-6 lg:mx-0 lg:rounded whitespace-pre-wrap break-all p-4 mb-4 relative ' +
              className
            }
            style={{ ...style }}
          >
            {collapsed && tokens.length > 10
              ? renderTokens(tokens.slice(0, 10), getLineProps, getTokenProps)
              : renderTokens(tokens, getLineProps, getTokenProps)}
            {tokens.length > 10 && !collapsed && <div className="h-4" />}
            {tokens.length > 10 && (
              <div
                className={
                  (collapsed ? 'h-20' : 'h-12') +
                  ' absolute inset-x-0 bottom-0 flex items-end justify-center group cursor-pointer lg:rounded-b'
                }
                style={
                  collapsed
                    ? {
                        background:
                          'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                      }
                    : null
                }
                onClick={() => setCollapsed(!collapsed)}
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={
                    'text-white w-6 h-6 transform group-hover:-translate-y-2 transition duration-150 ease-in-out mb-2 ' +
                    (collapsed ? '' : 'rotate-180')
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            )}
          </pre>
        </div>
      )}
    </Highlight>
  );
};
