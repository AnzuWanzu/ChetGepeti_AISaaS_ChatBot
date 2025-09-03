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
  const segments = parseMarkdownText(text);

  return (
    <Typography sx={{ fontSize, ...sx }}>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          {segment.type === "bold" && <strong>{segment.content}</strong>}
          {segment.type === "italic" && <em>{segment.content}</em>}
          {segment.type === "code" && (
            <code
              style={{
                backgroundColor: "#f1f3f4",
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
      ))}
    </Typography>
  );
};

export default FormattedText;
