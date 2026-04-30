import { useCallback, useState } from "react";

/**
 * Reliable email-link behavior across systems where `mailto:` may not have
 * a registered handler. Copies the address to the clipboard and surfaces a
 * `copied` flag the caller can use to render a "Copied!" affordance. Falls
 * back to a real `mailto:` navigation if the clipboard API is unavailable
 * (insecure context, denied permission, etc.) so users with mail clients
 * still get a useful action.
 */
export function useCopyEmail(email: string) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (e?: React.MouseEvent) => {
      e?.preventDefault();
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    },
    [email]
  );

  return { copied, copy };
}
