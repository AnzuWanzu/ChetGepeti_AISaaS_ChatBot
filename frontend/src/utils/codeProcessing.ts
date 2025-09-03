export function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }

  const codePattern =
    /\n(javascript|js|typescript|ts|python|py|java|cpp|c\+\+|csharp|c#|php|ruby|go|rust|swift|kotlin|sql|html|css|scss|json|xml|yaml|bash|shell)\s+(.+?)(?=\n\n|\n[A-Z]|\n\*\*|$)/gs;

  if (codePattern.test(message)) {
    const parts = [];
    let lastIndex = 0;
    let match;

    codePattern.lastIndex = 0;

    while ((match = codePattern.exec(message)) !== null) {
      if (match.index > lastIndex) {
        parts.push(message.substring(lastIndex, match.index));
      }

      // Add the code block with proper formatting
      parts.push(""); // Empty block before code (for alternating pattern)
      parts.push(`${match[1]}\n${match[2]}`); // Language + code
      parts.push(""); // Empty block after code

      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < message.length) {
      parts.push(message.substring(lastIndex));
    }

    return parts.filter((part) => part !== undefined);
  }

  return null;
}

export function detectProgrammingLanguage(code: string): string {
  const firstLine = code.trim().split("\n")[0].toLowerCase();

  if (
    firstLine.match(
      /^(javascript|js|typescript|ts|python|py|java|cpp|c\+\+|csharp|c#|php|ruby|go|rust|swift|kotlin|sql|html|css|scss|json|xml|yaml|markdown|md|bash|shell|powershell)$/
    )
  ) {
    return firstLine
      .replace(/^(js)$/, "javascript")
      .replace(/^(py)$/, "python")
      .replace(/^(ts)$/, "typescript")
      .replace(/^(c#)$/, "csharp")
      .replace(/^(md)$/, "markdown");
  }

  // Language detection based on syntax patterns
  if (code.includes("import ") && code.includes("from ")) return "python";
  if (code.includes("def ") && code.includes(":")) return "python";
  if (
    code.includes("function ") ||
    code.includes("=>") ||
    code.includes("const ")
  )
    return "javascript";
  if (code.includes("interface ") || code.includes("type "))
    return "typescript";
  if (code.includes("public class ") || code.includes("System.out.println"))
    return "java";
  if (code.includes("#include") || code.includes("iostream")) return "cpp";
  if (code.includes("using System") || code.includes("Console.WriteLine"))
    return "csharp";
  if (code.includes("<?php")) return "php";
  if (code.includes("SELECT ") || code.includes("FROM ")) return "sql";
  if (code.includes("<html>") || code.includes("<!DOCTYPE")) return "html";
  if (code.includes("{") && code.includes("}") && code.includes(":"))
    return "css";

  return "text";
}

export function isCodeBlock(str: string): boolean {
  if (!str || typeof str !== "string") return false;

  // Check for ``` wrapped code blocks
  if (str.includes("```")) return true;

  // Check for language indicators at the beginning
  const codeIndicators = [
    "javascript",
    "js",
    "typescript",
    "ts",
    "python",
    "py",
    "java",
    "cpp",
    "c++",
    "csharp",
    "c#",
    "php",
    "ruby",
    "go",
    "rust",
    "swift",
    "kotlin",
    "sql",
    "html",
    "css",
    "scss",
    "json",
    "xml",
    "yaml",
    "bash",
    "shell",
  ];

  const trimmed = str.trim().toLowerCase();

  // Check if starts with a language identifier
  for (const lang of codeIndicators) {
    if (trimmed.startsWith(lang + " ") || trimmed.startsWith(lang + "\n")) {
      return true;
    }
  }

  // Check for common code patterns
  const codePatterns = [
    /^(function|const|let|var|class|import|export|if|for|while|def|public|private|package)/m,
    /[{}();][\s\S]*[{}();]/,
    /^\s*(def|class|import|from|function|const|let|var)\s+/m,
    /console\.(log|error|warn|info)/,
    /print\s*\(/,
    /\$\{.*\}/,
    /\/\/|\/\*|\*\/|#\s/,
    /<[^>]+>.*<\/[^>]+>/,
  ];

  return codePatterns.some((pattern) => pattern.test(str));
}

export function formatCodeBlock(code: string): string {
  return code.trim();
}

export function hasCodeBlocks(message: string): boolean {
  return message.includes("```");
}
