"use client";

import { useEffect, useState } from "react";

/**
 * Types `text` in letter by letter with a soft, slightly irregular rhythm
 * (jittered delays + a longer beat before punctuation) so it reads as natural
 * rather than a rigid CSS `steps()` reveal. A caret blinks while typing, then
 * fades out. The full text is exposed to assistive tech via aria-label.
 *
 * Rendering starts empty and fills on the client; with reduced motion it shows
 * the full text immediately with no caret.
 */
export function Typewriter({
  text,
  className,
  startDelay = 500,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  const [count, setCount] = useState(0);
  const [caretOn, setCaretOn] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    if (reduce) {
      // Show the whole thing at once, no caret. Deferred so it isn't a
      // synchronous setState inside the effect body.
      timer = setTimeout(() => {
        setCount(text.length);
        setCaretOn(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    const step = () => {
      i += 1;
      setCount(i);
      if (i < text.length) {
        const next = text[i];
        // Longer beat before punctuation; otherwise a jittered ~110–220ms.
        const pause = next === "." || next === "," || next === "!" ? 260 : 110 + Math.random() * 110;
        timer = setTimeout(step, pause);
      } else {
        // Let the caret blink 3 times (1s each) after the last letter, then
        // fade it out.
        timer = setTimeout(() => setCaretOn(false), 3000);
      }
    };
    timer = setTimeout(step, startDelay);
    return () => clearTimeout(timer);
  }, [text, startDelay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span
        aria-hidden="true"
        className={`ml-[0.06em] inline-block h-[0.72em] w-[0.07em] translate-y-[0.06em] bg-current transition-opacity duration-500 ${
          caretOn ? "caret-blink" : "opacity-0"
        }`}
      />
    </span>
  );
}
