import { useEffect } from "react";
import { SITE_NAME } from "../constants/siteMeta.js";

/** @param {string} [pageTitle] */
export function usePageTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} · ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = SITE_NAME;
    };
  }, [pageTitle]);
}
