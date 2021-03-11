import * as path from "path";
export const normalize = (value) => path.normalize(path.join("/", value));
