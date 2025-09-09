export interface ConfusionState {
  repetitionCount: number;
  confusionLevel: number;
}

export const updateConfusionState = (
  lastUserInputs: string[],
  currentInput: string,
  prevState?: ConfusionState
): ConfusionState => {
  const repetitionCount = lastUserInputs.filter(
    (input) => input.trim().toLowerCase() === currentInput.trim().toLowerCase()
  ).length;
  const confusionLevel = prevState
    ? Math.min(prevState.confusionLevel + (repetitionCount > 0 ? 1 : 0), 5)
    : repetitionCount > 0
    ? 1
    : 0;
  return { repetitionCount, confusionLevel };
};

export const getConfusedResponseLimits = (confusionLevel: number) => {
  const maxLines = Math.max(1, 3 - confusionLevel);
  const maxWords = Math.max(5, 40 - confusionLevel * 7);
  return { maxLines, maxWords };
};

export const generateConfusedResponse = (
  baseResponse: string,
  confusionLevel: number
): string => {
  const { maxLines, maxWords } = getConfusedResponseLimits(confusionLevel);
  let lines = baseResponse.split(/\r?\n|\.\s+/).filter(Boolean);
  const reducedLines = Math.max(1, Math.floor(maxLines * 0.7));
  const reducedWords = Math.max(5, Math.floor(maxWords * 0.7));
  lines = lines.slice(0, reducedLines);
  let words = lines.join(" ").split(" ");
  words = words.slice(0, reducedWords);
  let confusedText = words.join(" ");
  if (confusionLevel > 0) {
    confusedText += " ...I am growing perplexed by your repetition.";
    if (confusionLevel > 2) confusedText += " My thoughts are clouded.";
    if (confusionLevel > 4) confusedText += " Please, clarify your intent.";
  }
  return confusedText.trim();
};
