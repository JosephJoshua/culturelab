"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

// Keeps the WebGL context alive/restored across tab switches and Chrome quirks.
export function WebGLContextManager() {
  const { gl } = useThree();
  const contextLostRef = useRef(false);

  useEffect(() => {
    const renderer = gl as unknown as {
      domElement: HTMLCanvasElement;
      getContext?: () => WebGLRenderingContext | WebGL2RenderingContext | null;
    };
    const ctx = renderer.getContext ? renderer.getContext() : null;
    const loseCtx =
      ctx && typeof ctx.getExtension === "function"
        ? ctx.getExtension("WEBGL_lose_context")
        : null;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLostRef.current = true;
    };

    const handleContextRestored = () => {
      contextLostRef.current = false;
      loseCtx?.restoreContext?.();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && contextLostRef.current) {
        setTimeout(() => {
          loseCtx?.restoreContext?.();
        }, 100);
      }
    };

    const canvas = renderer.domElement;
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Periodically touch the context to keep it alive.
    const keepAlive = setInterval(() => {
      if (!contextLostRef.current && ctx) {
        try {
          ctx.finish?.(); // gentle ping
          const tempBuffer = ctx.createBuffer();
          if (tempBuffer) {
            ctx.bindBuffer(ctx.ARRAY_BUFFER, tempBuffer);
            ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([0]), ctx.STATIC_DRAW);
            ctx.deleteBuffer(tempBuffer);
          }
        } catch {
          // ignore
        }
      }
    }, 3000);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(keepAlive);
    };
  }, [gl]);

  return null;
}
