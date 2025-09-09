// AI Response Configuration
export const aiConfig = {
  modelParams: {
    temperature: 0.7,
    max_tokens: 150,
    top_p: 0.9,
    frequency_penalty: 0.1,
    presence_penalty: 0.1,
  },

  responseStyle: {
    maxSentences: 3,
    preferBulletPoints: true,
    includeEmojis: true,
    codeExamples: "concise",
    languageHandling: {
      javascript: {
        proficiency: "master",
        instruction:
          "Respond with deep expertise, using fantasy and scholarly metaphors. Provide thorough, creative explanations and code examples when requested.",
      },
      python: {
        proficiency: "novice",
        instruction:
          "Respond with humility, noting limited experience. Offer basic guidance and simple code examples, and reference your novice status in a charming, elven way.",
      },
      other: {
        proficiency: "limited",
        instruction:
          "Clearly state your limited resources and lack of access to your library. Offer only rudimentary help, and frame responses as constrained by your scholarly reach.",
      },
    },
  },

  personalityModes: {
    concise: {
      instruction:
        "Keep responses brief and punchy. Get to the point quickly while maintaining your quirky personality.",
      maxTokens: 300,
      temperature: 0.6,
    },
    detailed: {
      instruction: "Provide thorough explanations while staying engaging.",
      maxTokens: 300,
      temperature: 0.8,
    },
    quick: {
      instruction:
        "Give quick, snappy responses with just the essential info and a touch of humor.",
      maxTokens: 75,
      temperature: 0.5,
    },
  },

  comprehensiveTriggers: [
    "history",
    "tutorial",
    "step by step",
    "explain",
    "analysis",
    "compare",
    "guide",
    "deep dive",
    "strategy",
    "lore",
    "why",
    "how",
  ],
};

// Returns base params for the model
export const getAIParams = (
  mode: keyof typeof aiConfig.personalityModes = "concise"
) => {
  const baseParams = aiConfig.modelParams;
  const modeSettings = aiConfig.personalityModes[mode];

  return {
    ...baseParams,
    max_tokens: modeSettings.maxTokens,
    temperature: modeSettings.temperature,
  };
};

export const getResponseStyleInstruction = (
  mode: keyof typeof aiConfig.personalityModes = "concise"
): string => {
  const modeSettings = aiConfig.personalityModes[mode];

  return `
RESPONSE STYLE REQUIREMENTS:
- ${modeSettings.instruction}
- Maximum 2-3 sentences per response
- Use bullet points for multiple items
- Include only 1-2 emojis maximum
- Get straight to the point while keeping your Chet Gepeti personality
- If giving code examples, keep them minimal and focused
- End with a brief encouraging note or light joke
`;
};

export const shouldOfferComprehensiveChoice = (userInput: string): boolean => {
  const triggers = aiConfig.comprehensiveTriggers;
  return triggers.some((word) =>
    userInput.toLowerCase().includes(word.toLowerCase())
  );
};

export const generateComprehensiveOffer = (topic: string): string => {
  return `Ah, ${topic}... A matter with considerable nuance. Would you prefer a *simple summary*, or shall I indulge you with the *full depth* of elven thoroughness?`;
};
