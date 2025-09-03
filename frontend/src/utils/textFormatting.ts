export interface FormattedTextSegment {
  type: "text" | "bold" | "italic" | "code" | "link";
  content: string;
  url?: string; // for links
}

export function parseMarkdownText(text: string): FormattedTextSegment[] {
  const segments: FormattedTextSegment[] = [];
  let currentIndex = 0;

  // Process text sequentially to avoid overlapping matches
  while (currentIndex < text.length) {
    const remainingText = text.slice(currentIndex);

    // Try to match patterns in order of priority
    let matched = false;

    // Bold text (**text**)
    const boldMatch = remainingText.match(/^\*\*(.*?)\*\*/);
    if (boldMatch) {
      segments.push({
        type: "bold",
        content: boldMatch[1],
      });
      currentIndex += boldMatch[0].length;
      matched = true;
    }

    // Italic text (*text*) - but not if it's part of bold
    else if (
      remainingText.match(/^\*[^*].*?[^*]\*/) ||
      remainingText.match(/^\*[^*]\*/)
    ) {
      const italicMatch = remainingText.match(/^\*(.*?)\*/);
      if (italicMatch) {
        segments.push({
          type: "italic",
          content: italicMatch[1],
        });
        currentIndex += italicMatch[0].length;
        matched = true;
      }
    }

    // Code text (`text`)
    else {
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

    // Link text [text](url)
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

    // Regular text
    if (!matched) {
      // Find the next special character or take one character
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
        // Combine with previous text segment
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
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}
