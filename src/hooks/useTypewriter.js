import { useEffect, useState } from "react";

/**
 * Reveals `text` one character at a time.
 * Re-runs whenever `text` changes, so it also works for cycling through
 * multiple strings if you pass a changing value from the parent.
 */
export default function useTypewriter(text, speed = 28) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let i = 0;
    setOutput("");
    const interval = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return output;
}