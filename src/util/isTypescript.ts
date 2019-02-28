export default function isTs(path: string) {
  const result = path.match(/.*(?=tsx?)/);
  return result !== null;
}
