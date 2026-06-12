/**
 * Composes the system prompt by concatenating the prompt fragments
 * in a specific order: Soul → Skills → Rules → Context
 *
 * Each .md file is imported as a raw text string via esbuild's Text loader
 * (configured in wrangler-chat.jsonc rules).
 */
import soul from "./prompts/SOUL.md";
import skills from "./prompts/SKILLS.md";
import rules from "./prompts/RULES.md";
import context from "./prompts/CONTEXT.md";

export const SYSTEM_PROMPT = [soul, skills, rules, context]
  .map((s) => s.trim())
  .join("\n\n")
  .trim();
