import type { Dict } from "../types";
import { chrome } from "./chrome";
import { sections } from "./sections";
import { features } from "./features";
import { roadmap } from "./roadmap";

export const es: Dict = { ...chrome, ...sections, ...features, ...roadmap };
