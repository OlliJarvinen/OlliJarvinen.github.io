"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Turn the sheet around the stationary notebook spine.
export function PageTurns() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const prefetched = new Set<string>();
    let turnId = 0;
    const sheets = () => document.querySelectorAll<HTMLElement>(
      ".site-shell > :not(.site-header)",
    );

    function reset() {
      turnId++;
      animations.splice(0).forEach((animation) => animation.cancel());
    }

    function enter() {
      reset();
      if (motion.matches) return;
      sheets().forEach((sheet) => animations.push(sheet.animate([
        { transform: "perspective(1600px) rotateY(24deg)", opacity: 0.4 },
        { transform: "perspective(1600px) rotateY(0deg)", opacity: 1 },
      ], { duration: 240, easing: "cubic-bezier(.2,.7,.2,1)" })));
    }

    function destinationFor(event: Event) {
      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.hasAttribute("download") ||
        (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href);
      if (destination.origin !== location.origin ||
        destination.pathname === location.pathname ||
        !/^\/(?:projects(?:\/[^/]+)?|about|education|cv|thesis)?\/?$/.test(destination.pathname)) return;
      return destination.pathname + destination.search + destination.hash;
    }

    function prefetch(event: Event) {
      const destination = destinationFor(event);
      if (!destination || prefetched.has(destination)) return;
      prefetched.add(destination);
      router.prefetch(destination);
    }

    function turn(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey) return;
      const destination = destinationFor(event);
      if (!destination) return;

      event.preventDefault();
      event.stopPropagation();
      reset();
      if (motion.matches) {
        router.push(destination);
        return;
      }

      // Load the destination while the outgoing sheet turns, rather than after it.
      prefetch(event);
      const currentTurn = turnId;
      const outgoing = Array.from(sheets(), (sheet) => sheet.animate([
        { transform: "perspective(1600px) rotateY(0deg)", opacity: 1 },
        { transform: "perspective(1600px) rotateY(-55deg)", opacity: 0.15 },
      ], { duration: 120, easing: "ease-in", fill: "forwards" }));
      animations.push(...outgoing);
      Promise.all(outgoing.map((animation) => animation.finished)).then(() => {
        if (currentTurn === turnId) router.push(destination);
      }).catch(() => { /* A newer click, route change or unmount cancelled the turn. */ });
    }

    enter();
    document.addEventListener("click", turn, true);
    document.addEventListener("pointerover", prefetch);
    document.addEventListener("focusin", prefetch);
    window.addEventListener("pagehide", reset);
    window.addEventListener("pageshow", reset);
    window.addEventListener("popstate", reset);
    motion.addEventListener("change", reset);
    return () => {
      reset();
      document.removeEventListener("click", turn, true);
      document.removeEventListener("pointerover", prefetch);
      document.removeEventListener("focusin", prefetch);
      window.removeEventListener("pagehide", reset);
      window.removeEventListener("pageshow", reset);
      window.removeEventListener("popstate", reset);
      motion.removeEventListener("change", reset);
    };
  }, [pathname, router]);

  return null;
}
