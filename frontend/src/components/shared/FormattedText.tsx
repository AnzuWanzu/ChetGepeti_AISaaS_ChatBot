import React from "react";
import { useMediaQuery } from "@mui/material";
import { responsivePatterns } from "../../utils/responsive";
import { Typography, Link } from "@mui/material";
import { parseMarkdownText } from "../../utils/textFormatting.js";

interface FormattedTextProps {
  text: string;
  fontSize?: string;
  sx?: any;
}

export const FormattedText: React.FC<FormattedTextProps> = ({
  text,
  fontSize,
  sx = {},
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const resolvedFontSize =
    fontSize ||
    (isMobile
      ? responsivePatterns.typography.body.xs
      : responsivePatterns.typography.body.md);
  const cleanedText = text.replace(/\n{3,}/g, "\n\n");
  const segments = parseMarkdownText(cleanedText);

  return (
    <Typography
      sx={{
        fontSize: resolvedFontSize,
        whiteSpace: "pre-line",
        lineHeight: 1.4,
        margin: 0,
        padding: "0 12px 0 0",
        boxSizing: "border-box",
        width: "100%",
        textAlign: "justify",
        ...sx,
      }}
    >
      {segments.map((segment, index) => {
        let segmentFontSize = resolvedFontSize;
        if (segment.type === "bold")
          segmentFontSize = `calc(${resolvedFontSize} * 1.1)`;
        if (segment.type === "code")
          segmentFontSize = `calc(${resolvedFontSize} * 0.9)`;
        return (
          <React.Fragment key={index}>
            {segment.type === "bold" && (
              <strong style={{ fontWeight: 600, fontSize: segmentFontSize }}>
                {segment.content}
              </strong>
            )}
            {segment.type === "italic" && (
              <em style={{ fontSize: segmentFontSize }}>{segment.content}</em>
            )}
            {segment.type === "code" && (
              <code
                style={{
                  backgroundColor: "#4199c6ff",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  fontSize: segmentFontSize,
                }}
              >
                {segment.content}
              </code>
            )}
            {segment.type === "link" && (
              <Link
                href={segment.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#1976d2", fontSize: segmentFontSize }}
              >
                {segment.content}
              </Link>
            )}
            {segment.type === "text" && segment.content}
          </React.Fragment>
        );
      })}
    </Typography>
  );
};

export default FormattedText;
