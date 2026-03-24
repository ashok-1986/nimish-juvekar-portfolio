"use client";

import { useEffect, useRef } from "react";

// Extend Window interface for UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: {
      init?: () => void;
      isInitialized?: boolean;
    };
  }
}

export default function UnicornBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    function initUnicorn() {
      if (window.UnicornStudio && window.UnicornStudio.init) {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      }
    }

    if (window.UnicornStudio && window.UnicornStudio.init) {
      initUnicorn();
      return;
    }

    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
    }

    if (!document.querySelector("script[data-unicorn-loader]")) {
      const s = document.createElement("script");
      s.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.0-1/dist/unicornStudio.umd.js";
      s.setAttribute("data-unicorn-loader", "true");
      s.onload = function () {
        initUnicorn();
      };
      s.onerror = function () {
        console.error("Failed to load UnicornStudio script");
      };
      (document.head || document.body).appendChild(s);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="unicorn-bg fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen">
        <div
          data-us-project="WdVna2EGJHojbGLRHA52"
          data-us-dpi="1.5"
          data-us-fps="60"
          data-us-lazyload="true"
          data-us-production="true"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
