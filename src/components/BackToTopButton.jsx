import { useEffect, useState } from "react";
import {
  BACK_TO_TOP_LABEL,
  BACK_TO_TOP_SCROLL_THRESHOLD,
} from "../constants/siteInteraction.js";

const backToTopClass =
  "inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-heading shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:border-[#6378DB]/40 hover:text-[#6378DB]";

/** 全站统一：滚过第一屏后淡入，右下角固定，平滑回顶 */
export default function BackToTopButton({ label = BACK_TO_TOP_LABEL }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > BACK_TO_TOP_SCROLL_THRESHOLD());
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 ${backToTopClass} transition-all duration-300 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      {label}
    </button>
  );
}
