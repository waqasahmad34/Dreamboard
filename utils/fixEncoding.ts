export function fixEncoding(str: string): string {
  try {
    return new TextDecoder('utf-8').decode(
      new Uint8Array([...str].map((c) => c.charCodeAt(0))),
    );
  } catch {
    // Fallback for environments without TextDecoder or on failure
    return decodeURIComponent(escape(str));
  }
}
