import { useCallback, useState } from 'react';

/** Matches `.sheet-panel` exit transition in index.css. */
const EXIT_MS = 220;

/**
 * Lets a bottom sheet play its exit before unmounting: put `data-closing` on
 * the `.sheet-backdrop` while `closing`, and call `close()` instead of `onClose`.
 */
export function useSheetClose(onClose: () => void) {
  const [closing, setClosing] = useState(false);
  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, EXIT_MS);
  }, [closing, onClose]);
  return { closing, close };
}
