export interface FormattedTextSegment {
  type: "text" | "bold" | "italic" | "code" | "link";
  content: string;
  url?: string; // for links
}

export function parseMarkdownText(text: string): FormattedTextSegment[] {
  const segments: FormattedTextSegment[] = [];
  let currentIndex = 0;

  const patterns = [
    { type: "bold" as const, regex: /\*\*(.*?)\*\*/g },
    { type: "italic" as const, regex: /\*(.*?)\*/g },
    { type: "code" as const, regex: /`(.*?)`/g },
    { type: "link" as const, regex: /\[([^\]]+)\]\(([^)]+)\)/g },
  ];

  // Find all matches
  const allMatches: Array<{
    type: "text" | "bold" | "italic" | "code" | "link";
    start: number;
    end: number;
    content: string;
    url?: string;
  }> = [];

  patterns.forEach((pattern) => {
    let match;
    while ((match = pattern.regex.exec(text)) !== null) {
      allMatches.push({
        type: pattern.type,
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
        url: pattern.type === "link" ? match[2] : undefined,
      });
    }
  });

  allMatches.sort((a, b) => a.start - b.start);

  allMatches.forEach((match) => {
    if (match.start > currentIndex) {
      const textBefore = text.slice(currentIndex, match.start);
      if (textBefore) {
        segments.push({
          type: "text",
          content: textBefore,
        });
      }
    }

    segments.push({
      type: match.type,
      content: match.content,
      url: match.url,
    });

    currentIndex = match.end;
  });

  if (currentIndex < text.length) {
    const remainingText = text.slice(currentIndex);
    if (remainingText) {
      segments.push({
        type: "text",
        content: remainingText,
      });
    }
  }

  if (segments.length === 0) {
    segments.push({
      type: "text",
      content: text,
    });
  }

  return segments;
}

export function hasMarkdownFormatting(text: string): boolean {
  const markdownPatterns = [
    /\*\*(.*?)\*\*/g,
    /\*(.*?)\*/g,
    /`(.*?)`/g,
    /\[([^\]]+)\]\(([^)]+)\)/g,
  ];

  return markdownPatterns.some((pattern) => pattern.test(text));
}

export function stripMarkdownFormatting(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}
