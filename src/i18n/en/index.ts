import type { Dict } from "../types";
import { chrome } from "./chrome";
import { sections } from "./sections";
import { features } from "./features";
import { roadmap } from "./roadmap";
import { plans } from "./plans";

export const en: Dict = { ...chrome, ...sections, ...features, ...roadmap, plans };
