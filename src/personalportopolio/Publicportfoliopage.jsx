import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient"; // adjust path to match your project structure
import {
  THEME_KEYS,
  resolveThemeKey,
  MinimalDarkTheme,
  ModernLightTheme,
  CreativeGradientTheme,
} from "../themes/Portfoliothemes.jsx";

export default function PublicPortfolioPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | not_found | unpublished

  useEffect(() => {
    let cancelled = false;

    axiosClient
      .get(`/api/portfolio/public/${slug}`)
      .then((res) => {
        if (!cancelled) {
          setData(res.data);
          setStatus("ready");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.response?.status === 410) setStatus("unpublished");
        else setStatus("not_found");
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") return <StatusScreen text="Loading portfolio..." />;
  if (status === "not_found") return <StatusScreen text="404 — this page doesn't exist." />;
  if (status === "unpublished") return <StatusScreen text="This portfolio hasn't been published yet." />;

  const themeKey = resolveThemeKey(data);

  if (themeKey === THEME_KEYS.MODERN_LIGHT) return <ModernLightTheme data={data} />;
  if (themeKey === THEME_KEYS.CREATIVE_GRADIENT) return <CreativeGradientTheme data={data} />;
  return <MinimalDarkTheme data={data} />;
}

function StatusScreen({ text }) {
  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
      <p className="font-mono text-[#6B7280] text-sm">{text}</p>
    </div>
  );
}