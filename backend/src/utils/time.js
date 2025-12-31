export function now(req) {
  const header = req.headers["x-test-now-ms"];
  return header ? new Date(Number(header)) : new Date();
}
