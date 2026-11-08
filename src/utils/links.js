export function localUrl(path) {
  const base = import.meta.env.BASE_URL;
  const normalizedPath = path === "/" ? "" : path.replace(/^\//, "");
  return `${base}${normalizedPath}`;
}
