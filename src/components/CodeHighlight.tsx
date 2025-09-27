"use client";

import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { codeToHtml } from "shiki";

interface CodeHighlightProps {
  code: string;
  language: string;
  theme?: string;
  title?: string;
}

export function CodeHighlight({
  code,
  language,
  theme = "dark-plus",
  title,
}: CodeHighlightProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: theme,
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Shiki highlighting error:", error);
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    highlightCode();
  }, [code, language, theme]);

  if (isLoading) {
    return (
      <Paper
        sx={{
          p: 2,
          bgcolor: "#1e1e1e",
          border: "1px solid #374151",
          borderRadius: 2,
          minHeight: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#9ca3af",
            fontFamily: "monospace",
          }}
        >
          コードを読み込み中...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 0,
        bgcolor: "#1e1e1e",
        border: "1px solid #374151",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {title && (
        <Typography
          variant="body2"
          sx={{
            px: 2,
            py: 1,
            bgcolor: "#374151",
            color: "#e5e7eb",
            borderBottom: "1px solid #4b5563",
            fontWeight: "medium",
          }}
        >
          {title}
        </Typography>
      )}
      <div
        style={{
          padding: "16px",
          fontSize: "0.8rem",
          lineHeight: 1.6,
          overflow: "auto",
        }}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </Paper>
  );
}
