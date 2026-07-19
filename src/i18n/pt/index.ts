import type { Dict } from "../types";
import { chrome } from "./chrome";
import { sections } from "./sections";
import { features } from "./features";
import { roadmap } from "./roadmap";

export const pt: Dict = { ...chrome, ...sections, ...features, ...roadmap };
