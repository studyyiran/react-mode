import { createBrowserHistory, createMemoryHistory } from "history";

export function safeEqual(a: any, b: any) {
  return String(a) === String(b);
}


export function isServer() {
  if (typeof window === "undefined") {
    return true;
  } else {
    if (typeof (window as any).AHSENV !== "undefined") {
      return true;
    } else {
      return false;
    }
  }
}

export function scrollTop() {
  window.scrollTo(0, 0);
}
