import { useState, useEffect, useCallback } from "react";

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
const currentLocation = () => {
  return window.location.hash.replace(/^#/, "") || "/";
};

export const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLocation());

  useEffect(() => {
    const handler = () => setLoc(currentLocation());

    // subscribe on hash changes
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  // We accept the second argument 'options' to match wouter's signature,
  // but we ignore 'replace' and use direct hash assignment to avoid SecurityErrors
  // associated with history.replaceState in sandboxed environments.
  const navigate = useCallback((to: string, options?: any) => {
    window.location.hash = to;
  }, []);

  return [loc, navigate];
};