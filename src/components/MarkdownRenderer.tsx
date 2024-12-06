import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import mermaid from "mermaid";
import { Download } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MermaidDiagram: React.FC<{ chart: string }> = ({ chart }) => {
  const [svg, setSvg] = React.useState<string | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const downloadSvg = React.useCallback(() => {
    if (!svg) return;

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mermaid-diagram.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [svg]);

  React.useEffect(() => {
    const initializeMermaid = async () => {
      if (!isInitialized) {
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
        });
        setIsInitialized(true);
      }
    };

    const renderMermaid = async () => {
      try {
        const { svg } = await mermaid.render("mermaid-svg", chart);
        setSvg(svg);
      } catch (error) {
        console.error("Mermaid rendering error:", error);
        setSvg(null);
      }
    };

    initializeMermaid().then(renderMermaid);
  }, [chart, isInitialized]);

  return svg ? (
    <div className="relative group">
      <div
        className="my-4 p-4 bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <button
        onClick={downloadSvg}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-md"
        title="Download SVG"
      >
        <Download size={20} className="text-gray-700" />
      </button>
    </div>
  ) : null;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");

      if (!inline && match && match[1] === "mermaid") {
        return <MermaidDiagram chart={String(children)} />;
      }
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-4"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className="bg-gray-100 rounded-md px-1 py-0.5 text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },

    h1: ({ children }: any) => (
      <h1 className="text-2xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-bold my-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-bold my-2">{children}</h3>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic text-gray-700">
        {children}
      </blockquote>
    ),

    a: ({ children, href }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc my-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }: any) => <ol className="my-4 space-y-2">{children}</ol>,
    li: ({ children }: any) => <li className="ml-4">{children}</li>,
    p: ({ children }: any) => (
      <p className="my-2 leading-relaxed">{children}</p>
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-gray-50">{children}</thead>
    ),
    th: ({ children }: any) => (
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {children}
      </td>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  };

  return (
    <div className={` max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
