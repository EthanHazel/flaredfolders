export function isFirefox() {
  if (typeof window === "undefined") {
    return false;
  }
  return navigator.userAgent.toLowerCase().includes("firefox");
}
