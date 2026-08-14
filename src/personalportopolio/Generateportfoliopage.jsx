/*import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ExternalLink, Globe } from "lucide-react";
import axiosClient from "../api/axiosClient"; // adjust path to match your project structure
//import { THEME_REGISTRY, THEME_KEYS } from "../themes/PortfolioThemes";
import { THEME_REGISTRY, THEME_KEYS } from "../themes/Portfoliothemes.jsx";
import SlugEditor from "./SlugEditor";

export default function GeneratePortfolioPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState(THEME_KEYS.MINIMAL_DARK);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState(null);

  // Load the user's own portfolio data (name, headline, projects, etc.)
  useEffect(() => {
    axiosClient
      .get("api/responces/see")
      .then((res) => {
        setPortfolio(res.data);
        // Pre-select whatever theme is already saved, else default
        setSelectedKey(res.data?.theme?.layout_type || THEME_KEYS.MINIMAL_DARK);
      })
      .catch(() => setError("Could not load your portfolio. Make sure you've filled in your basic info first."))
      .finally(() => setLoading(false));
  }, []);

  const activeThemeEntry = THEME_REGISTRY.find((t) => t.key === selectedKey) || THEME_REGISTRY[0];
  const ActiveComponent = activeThemeEntry.component;

  // Build the data object the preview components expect — same shape the
  // public endpoint returns, but with the *currently selected* theme swapped in
  // so the preview updates instantly before you save anything.
  const previewData = portfolio
    ? { ...portfolio, theme: { ...portfolio.theme, layout_type: selectedKey } }
    : null;

  async function handleSaveTheme() {
    // Look up the real theme id from the backend theme list by matching layout_type.
    // Simpler alternative: fetch /api/themes once and store id alongside key —
    // shown here as a direct call assuming selectedKey maps to a themeId you already have.
    setSaving(true);
    setError(null);
    try {
      const themesRes = await axiosClient.get("/api/developer/portfolio/theme");
      const match = themesRes.data.find((t) => t.layout_type === selectedKey);
      if (!match) throw new Error("Theme not found on server");

      await axiosClient.patch("/api/developer/portfolio/theme", { themeId: match.id });
      setPortfolio((prev) => ({ ...prev, theme: match }));
    } catch (err) {
      setError("Couldn't save your theme. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePublish() {
    setPublishing(true);
    setError(null);
    try {
      await axiosClient.patch("/api/developer/portfolio/ispublish"); // adjust to your actual toggle endpoint path
      setPortfolio((prev) => ({ ...prev, published: !prev.published }));
    } catch (err) {
      setError("Couldn't update publish status. Try again.");
    } finally {
      setPublishing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#6B7280]" size={24} />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center px-6">
        <p className="text-[#9CA3AF] text-sm text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E7E9EE]">
      <div className="max-w-7xl mx-auto px-6 py-10">
       
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Choose your theme</h1>
            <p className="text-sm text-[#6B7280] mt-1">Pick a look, preview it live, then save.</p>
          </div>

          <div className="flex items-center gap-3">
            {portfolio.slug && (
              <a
                href={`/p/${portfolio.slug}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-[#242A38] text-[#9CA3AF] hover:text-[#E7E9EE] hover:border-[#3A4258] transition-colors"
              >
                <ExternalLink size={14} />
                View live
              </a>
            )}
            <button
              onClick={handleTogglePublish}
              disabled={publishing}
              className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
                portfolio.published
                  ? "bg-[#1C2230] text-[#9CA3AF] hover:bg-[#242A38]"
                  : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
              }`}
            >
              <Globe size={14} />
              {publishing ? "Updating..." : portfolio.published ? "Unpublish" : "Publish"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 text-sm text-[#F87171] bg-[#F87171]/10 border border-[#F87171]/20 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="mb-8">
          <SlugEditor
            currentSlug={portfolio.slug}
            onSaved={(newSlug) => setPortfolio((prev) => ({ ...prev, slug: newSlug }))}
          />
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
         
          <div className="space-y-3">
            {THEME_REGISTRY.map((t) => {
              const isActive = selectedKey === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setSelectedKey(t.key)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    isActive
                      ? "border-[#4F46E5] bg-[#4F46E5]/5"
                      : "border-[#1C2230] bg-[#0E121B] hover:border-[#2A3244]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{t.label}</span>
                    {isActive && (
                      <span className="w-5 h-5 rounded-full bg-[#4F46E5] flex items-center justify-center shrink-0">
                        <Check size={12} className="text-white" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed mb-3">{t.description}</p>
                  <div className="flex gap-1.5">
                    {t.swatch.map((color, i) => (
                      <span key={i} className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </button>
              );
            })}

            <button
              onClick={handleSaveTheme}
              disabled={saving}
              className="w-full mt-2 py-2.5 rounded-lg bg-[#E7E9EE] text-[#0A0C10] font-medium text-sm hover:bg-white transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save theme"}
            </button>
          </div>

         
          <div className="rounded-2xl overflow-hidden border border-[#1C2230] bg-[#0E121B]">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1C2230]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3A4258]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3A4258]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3A4258]" />
              <span className="ml-3 text-xs text-[#6B7280] font-mono">
                yourapp.com/p/{portfolio.slug}
              </span>
            </div>
            <div className="h-[70vh] overflow-y-auto">
              <motion.div
                key={selectedKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none"
              >
                {ActiveComponent && <ActiveComponent data={previewData} />}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}*/




import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ExternalLink, Globe } from "lucide-react";
import axiosClient from "../api/axiosClient"; // adjust path to match your project structure
//import { THEME_REGISTRY, THEME_KEYS } from "../themes/PortfolioThemes";
import { THEME_REGISTRY, THEME_KEYS } from "../themes/Portfoliothemes.jsx";
import AnalyticsWidget from "./Analyticswidget";
export default function GeneratePortfolioPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState(THEME_KEYS.MINIMAL_DARK);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState(null);

  // Load the user's own portfolio data (name, headline, projects, etc.)
  useEffect(() => {
    axiosClient
      .get("api/responces/see")
      .then((res) => {
        setPortfolio(res.data);
        // Pre-select whatever theme is already saved, else default
        setSelectedKey(res.data?.theme?.layout_type || THEME_KEYS.MINIMAL_DARK);
      })
      .catch(() => setError("Could not load your portfolio. Make sure you've filled in your basic info first."))
      .finally(() => setLoading(false));
  }, []);

  const activeThemeEntry = THEME_REGISTRY.find((t) => t.key === selectedKey) || THEME_REGISTRY[0];
  const ActiveComponent = activeThemeEntry.component;

  // Build the data object the preview components expect — same shape the
  // public endpoint returns, but with the *currently selected* theme swapped in
  // so the preview updates instantly before you save anything.
  const previewData = portfolio
    ? { ...portfolio, theme: { ...portfolio.theme, layout_type: selectedKey } }
    : null;

  async function handleSaveTheme() {
    // Look up the real theme id from the backend theme list by matching layout_type.
    // Simpler alternative: fetch /api/themes once and store id alongside key —
    // shown here as a direct call assuming selectedKey maps to a themeId you already have.
    setSaving(true);
    setError(null);
    try {
      const themesRes = await axiosClient.get("/api/themes");
      const match = themesRes.data.find((t) => t.layout_type === selectedKey);
      if (!match) throw new Error("Theme not found on server");

      await axiosClient.patch("/api/developer/portfolio/theme", { themeId: match.id });
      setPortfolio((prev) => ({ ...prev, theme: match }));
    } catch (err) {
      setError("Couldn't save your theme. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePublish() {
    setPublishing(true);
    setError(null);
    try {
      await axiosClient.patch("/api/developer/portfolio/ispublish");// adjust to your actual toggle endpoint path
      setPortfolio((prev) => ({ ...prev, published: !prev.published }));
    } catch (err) {
      setError("Couldn't update publish status. Try again.");
    } finally {
      setPublishing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#6B7280]" size={24} />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center px-6">
        <p className="text-[#9CA3AF] text-sm text-center">{error}</p>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-[#0A0C10] text-[#E7E9EE]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        {error && (
  <div className="mb-6 text-sm text-[#F87171] bg-[#F87171]/10 border border-[#F87171]/20 rounded-lg px-4 py-3">
    {error}
  </div>
)}

<div className="mb-8">
  <AnalyticsWidget />
</div>
<a
  href={`/resume/${portfolio.slug}`}
  target="_blank"
  rel="noreferrer"
  className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-[#242A38] text-[#9CA3AF] hover:text-[#E7E9EE] hover:border-[#3A4258] transition-colors"
>
  <ExternalLink size={14} />
  View Resume
</a>

<div className="grid lg:grid-cols-[280px_1fr] gap-8"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Choose your theme</h1>
            <p className="text-sm text-[#6B7280] mt-1">Pick a look, preview it live, then save.</p>
          </div>

          <div className="flex items-center gap-3">
            {portfolio.slug && (
              <a
                href={`/p/${portfolio.slug}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-[#242A38] text-[#9CA3AF] hover:text-[#E7E9EE] hover:border-[#3A4258] transition-colors"
              >
                <ExternalLink size={14} />
                View live
              </a>
            )}
            <button
              onClick={handleTogglePublish}
              disabled={publishing}
              className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
                portfolio.published
                  ? "bg-[#1C2230] text-[#9CA3AF] hover:bg-[#242A38]"
                  : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
              }`}
            >
              <Globe size={14} />
              {publishing ? "Updating..." : portfolio.published ? "Unpublish" : "Publish"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 text-sm text-[#F87171] bg-[#F87171]/10 border border-[#F87171]/20 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Theme cards */}
          <div className="space-y-3">
            {THEME_REGISTRY.map((t) => {
              const isActive = selectedKey === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setSelectedKey(t.key)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    isActive
                      ? "border-[#4F46E5] bg-[#4F46E5]/5"
                      : "border-[#1C2230] bg-[#0E121B] hover:border-[#2A3244]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{t.label}</span>
                    {isActive && (
                      <span className="w-5 h-5 rounded-full bg-[#4F46E5] flex items-center justify-center shrink-0">
                        <Check size={12} className="text-white" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed mb-3">{t.description}</p>
                  <div className="flex gap-1.5">
                    {t.swatch.map((color, i) => (
                      <span key={i} className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </button>
              );
            })}

            <button
              onClick={handleSaveTheme}
              disabled={saving}
              className="w-full mt-2 py-2.5 rounded-lg bg-[#E7E9EE] text-[#0A0C10] font-medium text-sm hover:bg-white transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save theme"}
            </button>
          </div>

          {/* Live preview — scaled down inside a browser-like frame */}
          <div className="rounded-2xl overflow-hidden border border-[#1C2230] bg-[#0E121B]">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1C2230]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3A4258]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3A4258]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3A4258]" />
              <span className="ml-3 text-xs text-[#6B7280] font-mono">
                yourapp.com/p/{portfolio.slug}
              </span>
            </div>
            <div className="h-[70vh] overflow-y-auto">
              <motion.div
                key={selectedKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none"
              >
                {ActiveComponent && <ActiveComponent data={previewData} />}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}