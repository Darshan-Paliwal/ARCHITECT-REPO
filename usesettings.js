/**
 * useSettings hook
 * Fetches and caches site settings globally
 */

"use client";

import { useState, useEffect } from "react";
import { publicApi } from "@/lib/api";

let cachedSettings = null;
let fetchPromise = null;

export function useSettings() {
  const [settings, setSettings] = useState(cachedSettings);
  const [loading, setLoading] = useState(!cachedSettings);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = publicApi.getSettings().then(res => res.data.settings);
    }

    fetchPromise
      .then(data => {
        cachedSettings = data;
        setSettings(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        fetchPromise = null;
      });
  }, []);

  return { settings, loading, error };
}

/** Apply CSS custom properties from settings theme */
export function applyTheme(theme) {
  if (!theme || typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--color-primary", theme.primaryColor || "#C9A96E");
  root.style.setProperty("--color-secondary", theme.secondaryColor || "#1A1A2E");
  root.style.setProperty("--color-accent", theme.accentColor || "#E8E8E0");
  root.style.setProperty("--color-bg", theme.backgroundColor || "#0D0D0D");
  root.style.setProperty("--color-text", theme.textColor || "#F5F5F0");
                         }
