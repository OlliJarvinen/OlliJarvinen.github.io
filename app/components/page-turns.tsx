"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Animate the sheet independently of the stationary notebook spine.
export function PageTurns() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sheets = () => document.querySelectorAll<HTMLElement>(
      ".site-shell > :not(.site-header)",
    );
    let turning = false;
    let cancelled = false;
    let turnId = 0;
    const animations: Animation[] = [];

    function reset() {
      turnId++;
      turning = false;
      animations.splice(0).forEach((animation) => animation.cancel());
    }

    function enter() {
      // A cached document can still hold the outgoing fill-forwards animation.
      // Clear it before entering, otherwise it wins again once entry finishes.
      reset();
      if (motion.matches) return;
      sheets().forEach((sheet) => animations.push(sheet.animate([
        { transform: "perspective(1600px) rotateY(24deg)", opacity: 0.25 },
        { transform: "perspective(1600px) rotateY(0deg)", opacity: 1 },
      ], { duration: 520, easing: "cubic-bezier(.2,.7,.2,1)" })));
    }

    function turn(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey || motion.matches) return;
      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.hasAttribute("download") ||
        (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href);
      if (destination.origin !== location.origin ||
        destination.pathname === location.pathname ||
        !/^\/(?:projects(?:\/[^/]+)?|about|education|cv|thesis)?\/?$/.test(destination.pathname)) return;

      event.preventDefault();
      event.stopPropagation();
      if (turning) return;
      reset();
      turning = true;
      const currentTurn = turnId;
      const outgoing = Array.from(sheets(), (sheet) => sheet.animate([
        { transform: "perspective(1600px) rotateY(0deg)", opacity: 1 },
        { transform: "perspective(1600px) rotateY(-55deg)", opacity: 0.15 },
      ], { duration: 300, easing: "ease-in", fill: "forwards" }));
      animations.push(...outgoing);
      Promise.all(outgoing.map((animation) => animation.finished)).then(() => {
        if (!cancelled && currentTurn === turnId) {
          router.push(destination.pathname + destination.search + destination.hash);
        }
      }).catch(() => { /* A route change or unmount cancelled the turn. */ });
    }

    enter();
    document.addEventListener("click", turn, true);
    window.addEventListener("pageshow", enter);
    window.addEventListener("pagehide", reset);
    window.addEventListener("popstate", reset);
    return () => {
      cancelled = true;
      reset();
      document.removeEventListener("click", turn, true);
      window.removeEventListener("pageshow", enter);
      window.removeEventListener("pagehide", reset);
      window.removeEventListener("popstate", reset);
    };
  }, [pathname, router]);

  return null;
}
