import React from "react";
import { Typography, Link } from "@mui/material";
import { parseMarkdownText } from "../../utils/textFormatting.js";

interface FormattedTextProps {
  text: string;
  fontSize?: string;
  sx?: any;
}

export const FormattedText: React.FC<FormattedTextProps> = ({
  text,
  fontSize = "20px",
  sx = {},
}) => {
  const cleanedText = text.replace(/\n{3,}/g, "\n\n");
  const segments = parseMarkdownText(cleanedText);

  return (
    <Typography
      sx={{
        fontSize,
        whiteSpace: "pre-line",
        lineHeight: 1.4,
        margin: 0,
        padding: 0,
        width: "100%",
        ...sx,
      }}
    >
      {segments.map((segment, index) => {
        return (
          <React.Fragment key={index}>
            {segment.type === "bold" && (
              <strong style={{ fontWeight: 600, fontSize: "1.1em" }}>
                {segment.content}
              </strong>
            )}
            {segment.type === "italic" && <em>{segment.content}</em>}
            {segment.type === "code" && (
              <code
                style={{
                  backgroundColor: "#4199c6ff",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  fontSize: "0.9em",
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
                sx={{ color: "#1976d2" }}
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
