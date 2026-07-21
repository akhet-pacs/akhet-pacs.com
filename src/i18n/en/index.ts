import type { Dict } from "../types";
import { chrome } from "./chrome";
import { sections } from "./sections";
import { features } from "./features";
import { roadmap } from "./roadmap";
import { plans } from "./plans";
import { faq } from "./faq";

export const en: Dict = { ...chrome, ...faq, ...sections, ...features, ...roadmap, plans };
