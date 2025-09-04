export interface FormattedTextSegment {
  type: "text" | "bold" | "italic" | "code" | "link";
  content: string;
  url?: string; // for links
}

export function parseMarkdownText(text: string): FormattedTextSegment[] {
  const segments: FormattedTextSegment[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    const remainingText = text.slice(currentIndex);

    let matched = false;

    const boldMatch = remainingText.match(/^\*\*(.*?)\*\*/);
    if (boldMatch) {
      segments.push({
        type: "bold",
        content: boldMatch[1],
      });
      currentIndex += boldMatch[0].length;
      matched = true;
    }

    if (!matched) {
      const italicMatch = remainingText.match(/^\*([^*]+?)\*/);
      if (italicMatch) {
        segments.push({
          type: "italic",
          content: italicMatch[1],
        });
        currentIndex += italicMatch[0].length;
        matched = true;
      }
    } else {
      const codeMatch = remainingText.match(/^`(.*?)`/);
      if (codeMatch) {
        segments.push({
          type: "code",
          content: codeMatch[1],
        });
        currentIndex += codeMatch[0].length;
        matched = true;
      }
    }

    if (!matched) {
      const linkMatch = remainingText.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        segments.push({
          type: "link",
          content: linkMatch[1],
          url: linkMatch[2],
        });
        currentIndex += linkMatch[0].length;
        matched = true;
      }
    }
    if (!matched) {
      const nextSpecialIndex = remainingText.search(/[\*`\[]/);
      const textToAdd =
        nextSpecialIndex === -1
          ? remainingText
          : remainingText.slice(
              0,
              nextSpecialIndex === 0 ? 1 : nextSpecialIndex
            );

      if (
        segments.length > 0 &&
        segments[segments.length - 1].type === "text"
      ) {
        segments[segments.length - 1].content += textToAdd;
      } else {
        segments.push({
          type: "text",
          content: textToAdd,
        });
      }

      currentIndex += textToAdd.length;
    }
  }

  return segments.length > 0 ? segments : [{ type: "text", content: text }];
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
    .replace(/\*([^*]+?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}
