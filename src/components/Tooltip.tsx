"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  /** The element that triggers the tooltip (wrapped) */
  children: ReactNode;
  /** Tooltip content */
  content: ReactNode;
  /** Optional placement preference */
  placement?: "top" | "bottom" | "left" | "right";
  /** Delay before showing (ms) */
  delay?: number;
}

export default function Tooltip({
  children,
  content,
  placement = "top",
  delay = 150,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const tapRef = useRef(false);

  // Track client-side mounting for portal
  useEffect(() => {
    // Using queueMicrotask to avoid "set-state-in-effect" linter warning
    // This is safe because it only runs once on mount for SSR/CSR portal handling
    queueMicrotask(() => setMounted(true));
  }, []);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const gap = 8; // spacing between trigger and tooltip
    const viewportPadding = 8; // min distance from viewport edge

    let top = 0;
    let left = 0;

    // Calculate based on placement preference
    switch (placement) {
      case "top":
        top = trigger.top - tooltip.height - gap;
        left = trigger.left + trigger.width / 2 - tooltip.width / 2;
        break;
      case "bottom":
        top = trigger.bottom + gap;
        left = trigger.left + trigger.width / 2 - tooltip.width / 2;
        break;
      case "left":
        top = trigger.top + trigger.height / 2 - tooltip.height / 2;
        left = trigger.left - tooltip.width - gap;
        break;
      case "right":
        top = trigger.top + trigger.height / 2 - tooltip.height / 2;
        left = trigger.right + gap;
        break;
    }

    // Keep within viewport bounds
    if (left < viewportPadding) left = viewportPadding;
    if (left + tooltip.width > window.innerWidth - viewportPadding) {
      left = window.innerWidth - tooltip.width - viewportPadding;
    }
    if (top < viewportPadding) top = viewportPadding;
    if (top + tooltip.height > window.innerHeight - viewportPadding) {
      top = window.innerHeight - tooltip.height - viewportPadding;
    }

    setPosition({ top, left });
  }, [placement]);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
      // Calculate position after visibility (so tooltip has dimensions)
      requestAnimationFrame(calculatePosition);
    }, delay);
  }, [delay, calculatePosition]);

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
    tapRef.current = false;
  }, []);

  // Mobile tap handling
  const handleTap = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.stopPropagation();
    if (tapRef.current) {
      hide();
    } else {
      tapRef.current = true;
      show();
    }
  }, [show, hide]);

  // Click outside to dismiss on mobile
  useEffect(() => {
    if (!visible || !tapRef.current) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        hide();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [visible, hide]);

  // Recalculate position on scroll/resize
  useEffect(() => {
    if (!visible) return;

    const handleUpdate = () => calculatePosition();
    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);
    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [visible, calculatePosition]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const tooltipElement = visible && mounted ? (
    <div
      ref={tooltipRef}
      role="tooltip"
      className="tooltip-card"
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
      }}
    >
      {content}
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        className="tooltip-trigger"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={handleTap}
        onTouchStart={(e) => {
          // Prevent mouse events on touch devices
          e.preventDefault();
          handleTap(e);
        }}
        tabIndex={0}
        aria-describedby={visible ? "tooltip" : undefined}
      >
        {children}
      </div>
      {mounted && createPortal(tooltipElement, document.body)}
    </>
  );
}
