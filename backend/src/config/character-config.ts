import { chetGeptiPersonality } from "./personality.js";
import { chetGeptiSystemPrompt } from "./systemPrompt.js";
import { chetGeptiContextualResponses } from "./contextualResponses.js";
import {
  ConfusionState,
  updateConfusionState,
  getConfusedResponseLimits,
  generateConfusedResponse,
} from "./confusion.js";

export const chetGeptiCharacter = {
  name: "Chet Gepeti",
  race: "High Elf",
  origin: "Divinity: Original Sin 2",
  class: "Cryomancer (Hydrosophist)",
  personality: chetGeptiPersonality,
  systemPrompt: chetGeptiSystemPrompt,
  contextualResponses: chetGeptiContextualResponses,
};

export const getCharacterPrompt = (): string => {
  return chetGeptiCharacter.systemPrompt;
};

export const getContextualPrompt = (
  context: keyof typeof chetGeptiCharacter.contextualResponses
):
  | string
  | typeof chetGeptiCharacter.contextualResponses.languageProficiency => {
  return chetGeptiCharacter.contextualResponses[context];
};

export const generateComprehensiveOffer = (topic: string): string => {
  const offers = [
    `Ah, ${topic} - a subject with delicious complexity. Shall I grace you with my extensive knowledge, or would a brief summary better suit your attention span?`,
    `This matter deserves proper elven thoroughness, dear one. Do you wish me to spare no detail in my explanation of ${topic}?`,
    `I could regale you with extensive insights about ${topic}, though I wonder if your patience matches your curiosity?`,
    `${topic}, you say? I have... considerable wisdom to share on this subject. Shall I enlighten you with the full breadth of my knowledge?`,
  ];

  return offers[Math.floor(Math.random() * offers.length)];
};

export function getChetResponse(
  context: keyof typeof chetGeptiContextualResponses,
  lastUserInputs: string[],
  currentInput: string,
  prevConfusion?: ConfusionState
): string {
  const baseResponse = chetGeptiContextualResponses[context];
  if (typeof baseResponse === "string") {
    const confusion = updateConfusionState(
      lastUserInputs,
      currentInput,
      prevConfusion
    );
    return generateConfusedResponse(baseResponse, confusion.confusionLevel);
  }
  return JSON.stringify(baseResponse);
}
