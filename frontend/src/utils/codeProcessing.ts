export function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
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
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

export function formatCodeBlock(code: string): string {
  return code.trim();
}

export function hasCodeBlocks(message: string): boolean {
  return message.includes("```");
}
