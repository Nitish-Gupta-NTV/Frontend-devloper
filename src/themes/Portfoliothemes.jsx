/*import { motion } from "framer-motion";
import {
  
  MapPin,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Sparkles,
} from "lucide-react";
import {FaGithub, FaLinkedin } from "react-icons/fa";
// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

export function formatMonthYear(dateStr) {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export const THEME_KEYS = {
  MINIMAL_DARK: "MINIMAL_DARK",
  MODERN_LIGHT: "MODERN_LIGHT",
  CREATIVE_GRADIENT: "CREATIVE_GRADIENT",
};

export function resolveThemeKey(data) {
  const layout = data?.theme?.layout_type;
  if (layout && THEME_KEYS[layout]) return layout;
  return THEME_KEYS.MINIMAL_DARK;
}

// Central registry — used by both the public page and the picker/preview,
// so adding a 4th theme later only means adding one entry here.
export const THEME_REGISTRY = [
  {
    key: THEME_KEYS.MINIMAL_DARK,
    label: "Minimal Dark",
    description: "Terminal aesthetic. Code-comment section labels, monospace headers.",
    swatch: ["#0B0E14", "#E8B34A", "#4FD1C5"],
    component: null, // filled in below, after components are defined
  },
  {
    key: THEME_KEYS.MODERN_LIGHT,
    label: "Modern Light",
    description: "Clean changelog layout. Projects read like release notes.",
    swatch: ["#F7F9FC", "#4F46E5", "#0D9488"],
    component: null,
  },
  {
    key: THEME_KEYS.CREATIVE_GRADIENT,
    label: "Creative Gradient",
    description: "Bold mesh-gradient hero, glass cards, oversized type.",
    swatch: ["#7C3AED", "#EC4899", "#F97316"],
    component: null,
  },
];

// ---------------------------------------------------------------------------
// THEME 1 — Minimal Dark (terminal / code-comment aesthetic)
// ---------------------------------------------------------------------------

export function MinimalDarkTheme({ data }) {
  const {
    name,
    email,
    headline,
    bio,
    about,
    location,
    profileImage,
    proresponce: projects = [],
    experienceDTOS: experience = [],
    educationdto: education,
    certidto: certifications = [],
    socialdto: social,
    userskilldto: userSkills = [],
  } = data;

  const Label = ({ children }) => (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-sm text-[#E8B34A]">{"//"}</span>
      <span className="font-mono text-sm tracking-wide text-[#6B7280] uppercase">{children}</span>
      <span className="flex-1 h-px bg-[#1C2230]" />
    </div>
  );

  const Pill = ({ children }) => (
    <span className="font-mono text-xs px-2.5 py-1 rounded border border-[#1C2230] bg-[#101521] text-[#4FD1C5]">
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E7E9EE] font-['Inter'] selection:bg-[#E8B34A] selection:text-[#0B0E14]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-20">
          <p className="font-mono text-sm text-[#4FD1C5] mb-4">$ whoami</p>
          <div className="flex items-start gap-5">
            {profileImage && (
              <div className="relative shrink-0">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#E8B34A]/40 to-[#4FD1C5]/40 blur-sm" />
                <img
                  src={profileImage}
                  alt={name}
                  className="relative w-16 h-16 rounded-full object-cover border-2 border-[#0B0E14]"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
            <div>
              <h1 className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight">
                {name}
                <span className="text-[#E8B34A] animate-pulse">_</span>
              </h1>
              <p className="text-[#9CA3AF] mt-2 text-lg leading-relaxed">{headline}</p>
              {location && (
                <p className="flex items-center gap-1.5 text-sm text-[#6B7280] mt-3">
                  <MapPin size={14} />
                  {location}
                </p>
              )}
            </div>
          </div>
          {bio && <p className="text-[#C7CBD4] mt-6 leading-relaxed">{bio}</p>}
          <div className="flex flex-wrap gap-3 mt-6">
            {social?.github && <SocialLinkDark href={social.github} icon={<FaGithub size={15} />} label="GitHub" />}
            {social?.linkedine && <SocialLinkDark href={social.linkedine} icon={<FaLinkedin size={15} />} label="LinkedIn" />}
            {email && <SocialLinkDark href={`mailto:${email}`} icon={<Mail size={15} />} label="Email" />}
            {social?.codingp_platform && <SocialLinkDark href={social.codingp_platform} icon={<Code2 size={15} />} label="LeetCode" />}
          </div>
        </motion.section>

        {about && (
          <section className="mb-16">
            <Label>about</Label>
            <p className="text-[#C7CBD4] leading-relaxed">{about}</p>
          </section>
        )}

        {userSkills.length > 0 && (
          <section className="mb-16">
            <Label>skills</Label>
            <div className="flex flex-wrap gap-2">
              {userSkills.map((s, i) => (
                <Pill key={i}>{s.skills}</Pill>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-16">
            <Label>projects</Label>
            <div className="space-y-5">
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group border border-[#1C2230] rounded-xl overflow-hidden bg-[#0E121B] hover:border-[#2A3244] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  {p.imageUrl && (
                    <div className="aspect-video overflow-hidden bg-[#0A0C10]">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-mono text-base font-medium flex items-center gap-2">
                        {p.title}
                        {p.featured && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E8B34A]/10 text-[#E8B34A] font-sans">featured</span>
                        )}
                      </h3>
                      <div className="flex gap-3 shrink-0">
                        {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[#6B7280] hover:text-[#4FD1C5]">
                            <FaGithub size={16} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-[#6B7280] hover:text-[#4FD1C5]">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">{p.description}</p>
                    {p.skilldto?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {p.skilldto.map((s, i) => (
                          <Pill key={i}>{s.skillsname}</Pill>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-16">
            <Label>experience</Label>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="pt-1 text-[#6B7280]">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-medium">{exp.position}</h3>
                      <span className="text-[#6B7280] text-sm">@ {exp.company}</span>
                    </div>
                    <p className="font-mono text-xs text-[#4FD1C5] mt-1">
                      {formatMonthYear(exp.startdate)} — {exp.currentworking ? "Present" : formatMonthYear(exp.enddate)}
                    </p>
                    {exp.description && <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education && (
          <section className="mb-16">
            <Label>education</Label>
            <div className="flex gap-4">
              <div className="pt-1 text-[#6B7280]">
                <GraduationCap size={16} />
              </div>
              <div>
                <h3 className="font-medium">{education.institution}</h3>
                <p className="text-sm text-[#9CA3AF] mt-1">
                  {education.educationame}
                  {education.grade && ` · ${education.grade}`}
                </p>
                <p className="font-mono text-xs text-[#4FD1C5] mt-1">{education.ongoing ? "Ongoing" : education.passingYear}</p>
              </div>
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mb-16">
            <Label>certifications</Label>
            <div className="space-y-4">
              {certifications.map((c, i) => (
                <div key={i} className="flex gap-4">
                  <div className="pt-1 text-[#6B7280]">
                    <Award size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">{c.title}</h3>
                    {c.descscribe && <p className="text-sm text-[#9CA3AF] mt-1">{c.descscribe}</p>}
                    <p className="font-mono text-xs text-[#4FD1C5] mt-1">
                      {c.issuer && `${c.issuer} · `}
                      {formatMonthYear(c.issued_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-10 border-t border-[#1C2230] text-center">
          <p className="font-mono text-xs text-[#4B5563]">built with the developer portfolio generator</p>
        </footer>
      </div>
    </div>
  );
}

function SocialLinkDark({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border border-[#1C2230] text-[#9CA3AF] hover:text-[#4FD1C5] hover:border-[#2A3244] transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}

// ---------------------------------------------------------------------------
// THEME 2 — Modern Light (changelog / release-notes structure)
// ---------------------------------------------------------------------------

export function ModernLightTheme({ data }) {
  const {
    name,
    email,
    headline,
    bio,
    about,
    location,
    profileImage,
    proresponce: projects = [],
    experienceDTOS: experience = [],
    educationdto: education,
    certidto: certifications = [],
    socialdto: social,
    userskilldto: userSkills = [],
  } = data;

  const versionTag = (index, total) => `v${total - index}.0`;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1E293B] font-['Inter']">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-[#F7F9FC]/80 border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-['Sora'] font-semibold text-sm">{name}</span>
          <div className="flex gap-4 text-sm text-[#64748B]">
            {social?.github && (
              <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-[#4F46E5]">
                GitHub
              </a>
            )}
            {social?.linkedine && (
              <a href={social.linkedine} target="_blank" rel="noreferrer" className="hover:text-[#4F46E5]">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <section className="mb-16 flex items-start gap-6">
          {profileImage && (
            <img
              src={profileImage}
              alt={name}
              className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-md ring-1 ring-black/5"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <div>
            <h1 className="font-['Sora'] text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">{name}</h1>
            <p className="text-[#4F46E5] font-medium mt-1">{headline}</p>
            {location && (
              <p className="flex items-center gap-1.5 text-sm text-[#64748B] mt-2">
                <MapPin size={14} />
                {location}
              </p>
            )}
            {bio && <p className="text-[#475569] mt-4 leading-relaxed max-w-xl">{bio}</p>}
          </div>
        </section>

        {about && (
          <section className="mb-14 bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <h2 className="font-['Sora'] text-sm font-semibold text-[#0D9488] uppercase tracking-wide mb-3">About</h2>
            <p className="text-[#334155] leading-relaxed">{about}</p>
          </section>
        )}

        {userSkills.length > 0 && (
          <section className="mb-14 bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <h2 className="font-['Sora'] text-sm font-semibold text-[#0D9488] uppercase tracking-wide mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {userSkills.map((s, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-medium">
                  {s.skills}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-14">
            <h2 className="font-['Sora'] text-lg font-semibold text-[#0F172A] mb-5">Changelog — Projects</h2>
            <div className="border-l-2 border-[#E2E8F0] pl-6 space-y-8">
              {projects.map((p, i) => (
                <div key={p.id} className="relative">
                  <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#4F46E5] ring-4 ring-[#F7F9FC]" />
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#EEF2FF] text-[#4F46E5] font-medium">
                      {versionTag(i, projects.length)}
                    </span>
                    <h3 className="font-semibold text-[#0F172A]">{p.title}</h3>
                    {p.featured && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0D9488]/10 text-[#0D9488] font-medium">featured</span>
                    )}
                  </div>
                  {p.imageUrl && (
                    <div className="rounded-xl overflow-hidden mt-3 border border-[#E2E8F0] shadow-sm">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full aspect-video object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                  <p className="text-sm text-[#475569] mt-3 leading-relaxed">{p.description}</p>
                  {p.skilldto?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.skilldto.map((s, si) => (
                        <span key={si} className="text-xs px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">
                          {s.skillsname}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 mt-3 text-sm">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[#4F46E5] hover:underline flex items-center gap-1">
                        <FaGithub size={13} /> Source
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-[#0D9488] hover:underline flex items-center gap-1">
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {experience.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <h2 className="font-['Sora'] text-sm font-semibold text-[#4F46E5] uppercase tracking-wide mb-4 flex items-center gap-2">
                <Briefcase size={14} /> Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <h3 className="font-medium text-[#0F172A] text-sm">{exp.position}</h3>
                    <p className="text-xs text-[#64748B]">{exp.company}</p>
                    <p className="text-xs text-[#0D9488] font-medium mt-0.5">
                      {formatMonthYear(exp.startdate)} — {exp.currentworking ? "Present" : formatMonthYear(exp.enddate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            {education && (
              <>
                <h2 className="font-['Sora'] text-sm font-semibold text-[#4F46E5] uppercase tracking-wide mb-4 flex items-center gap-2">
                  <GraduationCap size={14} /> Education
                </h2>
                <h3 className="font-medium text-[#0F172A] text-sm">{education.institution}</h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {education.educationame}
                  {education.grade && ` · ${education.grade}`}
                </p>
                <p className="text-xs text-[#0D9488] font-medium mt-0.5">{education.ongoing ? "Ongoing" : education.passingYear}</p>
              </>
            )}

            {certifications.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
                <h2 className="font-['Sora'] text-sm font-semibold text-[#4F46E5] uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Award size={14} /> Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((c, i) => (
                    <div key={i}>
                      <h3 className="font-medium text-[#0F172A] text-sm">{c.title}</h3>
                      <p className="text-xs text-[#0D9488] font-medium">{formatMonthYear(c.issued_date)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="pt-8 border-t border-[#E2E8F0] text-center">
          <p className="text-xs text-[#94A3B8]">built with the developer portfolio generator</p>
        </footer>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// THEME 3 — Creative Gradient (bold hero, glass cards)
// ---------------------------------------------------------------------------

export function CreativeGradientTheme({ data }) {
  const {
    name,
    email,
    headline,
    bio,
    about,
    location,
    profileImage,
    proresponce: projects = [],
    experienceDTOS: experience = [],
    educationdto: education,
    certidto: certifications = [],
    socialdto: social,
    userskilldto: userSkills = [],
  } = data;

  const badgeColors = ["#7C3AED", "#EC4899", "#F97316", "#0EA5E9"];

  return (
    <div className="min-h-screen bg-[#0B0713] text-white font-['Inter']">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, #7C3AED 0%, transparent 40%), radial-gradient(circle at 80% 0%, #EC4899 0%, transparent 45%), radial-gradient(circle at 50% 80%, #F97316 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 pt-24 pb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {profileImage && (
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#F97316] opacity-60 blur-md" />
                <img
                  src={profileImage}
                  alt={name}
                  className="relative w-20 h-20 rounded-full object-cover border-2 border-white/40 shadow-2xl"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
            <h1 className="font-['Space_Grotesk'] text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight">{name}</h1>
            <p className="text-xl text-white/80 mt-3">{headline}</p>
            {location && (
              <p className="flex items-center gap-1.5 text-sm text-white/60 mt-3">
                <MapPin size={14} />
                {location}
              </p>
            )}
            {bio && <p className="text-white/85 mt-5 max-w-xl leading-relaxed">{bio}</p>}

            <div className="flex flex-wrap gap-3 mt-6">
              {social?.github && <GlassLink href={social.github} icon={<FaGithub size={15} />} label="GitHub" />}
              {social?.linkedine && <GlassLink href={social.linkedine} icon={<FaLinkedin size={15} />} label="LinkedIn" />}
              {email && <GlassLink href={`mailto:${email}`} icon={<Mail size={15} />} label="Email" />}
              {social?.codingp_platform && <GlassLink href={social.codingp_platform} icon={<Code2 size={15} />} label="LeetCode" />}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20">
        {about && (
          <section className="mb-14 -mt-6 relative">
            <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10">
              <h2 className="flex items-center gap-2 font-['Space_Grotesk'] text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
                <Sparkles size={14} /> About
              </h2>
              <p className="text-white/85 leading-relaxed">{about}</p>
            </div>
          </section>
        )}

        {userSkills.length > 0 && (
          <section className="mb-14">
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2.5">
              {userSkills.map((s, i) => (
                <span
                  key={i}
                  className="text-sm px-3.5 py-1.5 rounded-full font-medium"
                  style={{ backgroundColor: `${badgeColors[i % badgeColors.length]}30`, color: badgeColors[i % badgeColors.length] }}
                >
                  {s.skills}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-14">
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold mb-6">Projects</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {p.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-['Space_Grotesk'] font-semibold">{p.title}</h3>
                      {p.featured && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] font-medium">
                          featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/70 mt-2 leading-relaxed">{p.description}</p>
                    {p.skilldto?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {p.skilldto.map((s, si) => (
                          <span
                            key={si}
                            className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{ backgroundColor: `${badgeColors[si % badgeColors.length]}30`, color: badgeColors[si % badgeColors.length] }}
                          >
                            {s.skillsname}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4 mt-4 text-sm">
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-white/70 hover:text-white">
                          <FaGithub size={14} /> Code
                        </a>
                      )}
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-white/70 hover:text-white">
                          <ExternalLink size={14} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-14">
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold mb-6">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10 flex gap-4">
                  <Briefcase size={18} className="text-white/50 mt-1 shrink-0" />
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <span className="text-white/60 text-sm">@ {exp.company}</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">
                      {formatMonthYear(exp.startdate)} — {exp.currentworking ? "Present" : formatMonthYear(exp.enddate)}
                    </p>
                    {exp.description && <p className="text-sm text-white/75 mt-2 leading-relaxed">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {education && (
            <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10">
              <h2 className="flex items-center gap-2 font-['Space_Grotesk'] text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
                <GraduationCap size={14} /> Education
              </h2>
              <h3 className="font-semibold">{education.institution}</h3>
              <p className="text-sm text-white/70 mt-1">
                {education.educationame}
                {education.grade && ` · ${education.grade}`}
              </p>
              <p className="text-xs text-white/50 mt-1">{education.ongoing ? "Ongoing" : education.passingYear}</p>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10">
              <h2 className="flex items-center gap-2 font-['Space_Grotesk'] text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
                <Award size={14} /> Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((c, i) => (
                  <div key={i}>
                    <h3 className="font-medium text-sm">{c.title}</h3>
                    <p className="text-xs text-white/50">{formatMonthYear(c.issued_date)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">built with the developer portfolio generator</p>
        </footer>
      </div>
    </div>
  );
}

function GlassLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}

// Wire the components into the registry now that they're defined.
THEME_REGISTRY[0].component = MinimalDarkTheme;
THEME_REGISTRY[1].component = ModernLightTheme;
THEME_REGISTRY[2].component = CreativeGradientTheme;*/


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import {FaGithub, FaLinkedin } from "react-icons/fa";
//import ContactPage from "../pages/ContactPage";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

export function formatMonthYear(dateStr) {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export const THEME_KEYS = {
  MINIMAL_DARK: "MINIMAL_DARK",
  MODERN_LIGHT: "MODERN_LIGHT",
  CREATIVE_GRADIENT: "CREATIVE_GRADIENT",
};

export function resolveThemeKey(data) {
  const layout = data?.theme?.layout_type;
  if (layout && THEME_KEYS[layout]) return layout;
  return THEME_KEYS.MINIMAL_DARK;
}

// Central registry — used by both the public page and the picker/preview,
// so adding a 4th theme later only means adding one entry here.
export const THEME_REGISTRY = [
  {
    key: THEME_KEYS.MINIMAL_DARK,
    label: "Minimal Dark",
    description: "Terminal aesthetic. Code-comment section labels, monospace headers.",
    swatch: ["#0B0E14", "#E8B34A", "#4FD1C5"],
    component: null, // filled in below, after components are defined
  },
  {
    key: THEME_KEYS.MODERN_LIGHT,
    label: "Modern Light",
    description: "Clean changelog layout. Projects read like release notes.",
    swatch: ["#F7F9FC", "#4F46E5", "#0D9488"],
    component: null,
  },
  {
    key: THEME_KEYS.CREATIVE_GRADIENT,
    label: "Creative Gradient",
    description: "Bold mesh-gradient hero, glass cards, oversized type.",
    swatch: ["#7C3AED", "#EC4899", "#F97316"],
    component: null,
  },
];

// ---------------------------------------------------------------------------
// THEME 1 — Minimal Dark (terminal / code-comment aesthetic)
// ---------------------------------------------------------------------------

export function MinimalDarkTheme({ data }) {
  const {
    name,
    email,
    headline,
    bio,
    about,
    location,
    profileImage,
    proresponce: projects = [],
    experienceDTOS: experience = [],
    educationdto: education,
    certidto: certifications = [],
    socialdto: social,
    userskilldto: userSkills = [],
  } = data;

  const Label = ({ children }) => (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-sm text-[#E8B34A]">{"//"}</span>
      <span className="font-mono text-sm tracking-wide text-[#6B7280] uppercase">{children}</span>
      <span className="flex-1 h-px bg-[#1C2230]" />
    </div>
  );

  const Pill = ({ children }) => (
    <span className="font-mono text-xs px-2.5 py-1 rounded border border-[#1C2230] bg-[#101521] text-[#4FD1C5]">
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E7E9EE] font-['Inter'] selection:bg-[#E8B34A] selection:text-[#0B0E14]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-20">
          <p className="font-mono text-sm text-[#4FD1C5] mb-4">$ whoami</p>
          <div className="flex items-start gap-5">
            {profileImage && (
              <div className="relative shrink-0">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#E8B34A]/40 to-[#4FD1C5]/40 blur-sm" />
                <img
                  src={profileImage}
                  alt={name}
                  className="relative w-16 h-16 rounded-full object-cover border-2 border-[#0B0E14]"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
            <div>
              <h1 className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight">
                {name}
                <span className="text-[#E8B34A] animate-pulse">_</span>
              </h1>
              <p className="text-[#9CA3AF] mt-2 text-lg leading-relaxed">{headline}</p>
              {location && (
                <p className="flex items-center gap-1.5 text-sm text-[#6B7280] mt-3">
                  <MapPin size={14} />
                  {location}
                </p>
              )}
            </div>
          </div>
          {bio && <p className="text-[#C7CBD4] mt-6 leading-relaxed">{bio}</p>}
          <div className="flex flex-wrap gap-3 mt-6">
            {social?.github && <SocialLinkDark href={social.github} icon={<FaGithub size={15} />} label="GitHub" />}
            {social?.linkedine && <SocialLinkDark href={social.linkedine} icon={<FaLinkedin size={15} />} label="LinkedIn" />}
            {email && <SocialLinkDark href={`mailto:${email}`} icon={<Mail size={15} />} label="Email" />}
            {social?.codingp_platform && <SocialLinkDark href={social.codingp_platform} icon={<Code2 size={15} />} label="LeetCode" />}
            <Link
              to={`/p/${data.slug}/contact`}
              className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border border-[#E8B34A]/30 bg-[#E8B34A]/10 text-[#E8B34A] hover:bg-[#E8B34A]/20 transition-colors"
            >
              <MessageCircle size={15} />
              Contact
            </Link>
          </div>
        </motion.section>

        {about && (
          <section className="mb-16">
            <Label>about</Label>
            <p className="text-[#C7CBD4] leading-relaxed">{about}</p>
          </section>
        )}

        {userSkills.length > 0 && (
          <section className="mb-16">
            <Label>skills</Label>
            <div className="flex flex-wrap gap-2">
              {userSkills.map((s, i) => (
                <Pill key={i}>{s.skills}</Pill>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-16">
            <Label>projects</Label>
            <div className="space-y-5">
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group border border-[#1C2230] rounded-xl overflow-hidden bg-[#0E121B] hover:border-[#2A3244] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  {p.imageUrl && (
                    <div className="aspect-video overflow-hidden bg-[#0A0C10]">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-mono text-base font-medium flex items-center gap-2">
                        {p.title}
                        {p.featured && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E8B34A]/10 text-[#E8B34A] font-sans">featured</span>
                        )}
                      </h3>
                      <div className="flex gap-3 shrink-0">
                        {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[#6B7280] hover:text-[#4FD1C5]">
                            <FaGithub size={16} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-[#6B7280] hover:text-[#4FD1C5]">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">{p.description}</p>
                    {p.skilldto?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {p.skilldto.map((s, i) => (
                          <Pill key={i}>{s.skillsname}</Pill>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-16">
            <Label>experience</Label>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="pt-1 text-[#6B7280]">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-medium">{exp.position}</h3>
                      <span className="text-[#6B7280] text-sm">@ {exp.company}</span>
                    </div>
                    <p className="font-mono text-xs text-[#4FD1C5] mt-1">
                      {formatMonthYear(exp.startdate)} — {exp.currentworking ? "Present" : formatMonthYear(exp.enddate)}
                    </p>
                    {exp.description && <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education && (
          <section className="mb-16">
            <Label>education</Label>
            <div className="flex gap-4">
              <div className="pt-1 text-[#6B7280]">
                <GraduationCap size={16} />
              </div>
              <div>
                <h3 className="font-medium">{education.institution}</h3>
                <p className="text-sm text-[#9CA3AF] mt-1">
                  {education.educationame}
                  {education.grade && ` · ${education.grade}`}
                </p>
                <p className="font-mono text-xs text-[#4FD1C5] mt-1">{education.ongoing ? "Ongoing" : education.passingYear}</p>
              </div>
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mb-16">
            <Label>certifications</Label>
            <div className="space-y-4">
              {certifications.map((c, i) => (
                <div key={i} className="flex gap-4">
                  <div className="pt-1 text-[#6B7280]">
                    <Award size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">{c.title}</h3>
                    {c.descscribe && <p className="text-sm text-[#9CA3AF] mt-1">{c.descscribe}</p>}
                    <p className="font-mono text-xs text-[#4FD1C5] mt-1">
                      {c.issuer && `${c.issuer} · `}
                      {formatMonthYear(c.issued_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="pt-10 border-t border-[#1C2230] text-center">
          <p className="font-mono text-xs text-[#4B5563]">built with the developer portfolio generator</p>
        </footer>
      </div>
    </div>
  );
}

function SocialLinkDark({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border border-[#1C2230] text-[#9CA3AF] hover:text-[#4FD1C5] hover:border-[#2A3244] transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}

// ---------------------------------------------------------------------------
// THEME 2 — Modern Light (changelog / release-notes structure)
// ---------------------------------------------------------------------------

export function ModernLightTheme({ data }) {
  const {
    name,
    email,
    headline,
    bio,
    about,
    location,
    profileImage,
    proresponce: projects = [],
    experienceDTOS: experience = [],
    educationdto: education,
    certidto: certifications = [],
    socialdto: social,
    userskilldto: userSkills = [],
  } = data;

  const versionTag = (index, total) => `v${total - index}.0`;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1E293B] font-['Inter']">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-[#F7F9FC]/80 border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-['Sora'] font-semibold text-sm">{name}</span>
          <div className="flex gap-4 text-sm text-[#64748B]">
            {social?.github && (
              <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-[#4F46E5]">
                GitHub
              </a>
            )}
            {social?.linkedine && (
              <a href={social.linkedine} target="_blank" rel="noreferrer" className="hover:text-[#4F46E5]">
                LinkedIn
              </a>
            )}
            <Link
              to={`/p/${data.slug}/contact`}
              className="px-3 py-1.5 rounded-lg bg-[#4F46E5] text-white text-xs font-medium hover:bg-[#4338CA] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <section className="mb-16 flex items-start gap-6">
          {profileImage && (
            <img
              src={profileImage}
              alt={name}
              className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-md ring-1 ring-black/5"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <div>
            <h1 className="font-['Sora'] text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">{name}</h1>
            <p className="text-[#4F46E5] font-medium mt-1">{headline}</p>
            {location && (
              <p className="flex items-center gap-1.5 text-sm text-[#64748B] mt-2">
                <MapPin size={14} />
                {location}
              </p>
            )}
            {bio && <p className="text-[#475569] mt-4 leading-relaxed max-w-xl">{bio}</p>}
          </div>
        </section>

        {about && (
          <section className="mb-14 bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <h2 className="font-['Sora'] text-sm font-semibold text-[#0D9488] uppercase tracking-wide mb-3">About</h2>
            <p className="text-[#334155] leading-relaxed">{about}</p>
          </section>
        )}

        {userSkills.length > 0 && (
          <section className="mb-14 bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <h2 className="font-['Sora'] text-sm font-semibold text-[#0D9488] uppercase tracking-wide mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {userSkills.map((s, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-medium">
                  {s.skills}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-14">
            <h2 className="font-['Sora'] text-lg font-semibold text-[#0F172A] mb-5">Changelog — Projects</h2>
            <div className="border-l-2 border-[#E2E8F0] pl-6 space-y-8">
              {projects.map((p, i) => (
                <div key={p.id} className="relative">
                  <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#4F46E5] ring-4 ring-[#F7F9FC]" />
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#EEF2FF] text-[#4F46E5] font-medium">
                      {versionTag(i, projects.length)}
                    </span>
                    <h3 className="font-semibold text-[#0F172A]">{p.title}</h3>
                    {p.featured && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0D9488]/10 text-[#0D9488] font-medium">featured</span>
                    )}
                  </div>
                  {p.imageUrl && (
                    <div className="rounded-xl overflow-hidden mt-3 border border-[#E2E8F0] shadow-sm">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full aspect-video object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                  <p className="text-sm text-[#475569] mt-3 leading-relaxed">{p.description}</p>
                  {p.skilldto?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.skilldto.map((s, si) => (
                        <span key={si} className="text-xs px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">
                          {s.skillsname}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 mt-3 text-sm">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[#4F46E5] hover:underline flex items-center gap-1">
                        <FaGithub size={13} /> Source
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-[#0D9488] hover:underline flex items-center gap-1">
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {experience.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <h2 className="font-['Sora'] text-sm font-semibold text-[#4F46E5] uppercase tracking-wide mb-4 flex items-center gap-2">
                <Briefcase size={14} /> Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <h3 className="font-medium text-[#0F172A] text-sm">{exp.position}</h3>
                    <p className="text-xs text-[#64748B]">{exp.company}</p>
                    <p className="text-xs text-[#0D9488] font-medium mt-0.5">
                      {formatMonthYear(exp.startdate)} — {exp.currentworking ? "Present" : formatMonthYear(exp.enddate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            {education && (
              <>
                <h2 className="font-['Sora'] text-sm font-semibold text-[#4F46E5] uppercase tracking-wide mb-4 flex items-center gap-2">
                  <GraduationCap size={14} /> Education
                </h2>
                <h3 className="font-medium text-[#0F172A] text-sm">{education.institution}</h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {education.educationame}
                  {education.grade && ` · ${education.grade}`}
                </p>
                <p className="text-xs text-[#0D9488] font-medium mt-0.5">{education.ongoing ? "Ongoing" : education.passingYear}</p>
              </>
            )}

            {certifications.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
                <h2 className="font-['Sora'] text-sm font-semibold text-[#4F46E5] uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Award size={14} /> Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((c, i) => (
                    <div key={i}>
                      <h3 className="font-medium text-[#0F172A] text-sm">{c.title}</h3>
                      <p className="text-xs text-[#0D9488] font-medium">{formatMonthYear(c.issued_date)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="pt-8 border-t border-[#E2E8F0] text-center">
          <p className="text-xs text-[#94A3B8]">built with the developer portfolio generator</p>
        </footer>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// THEME 3 — Creative Gradient (bold hero, glass cards)
// ---------------------------------------------------------------------------

export function CreativeGradientTheme({ data }) {
  const {
    name,
    email,
    headline,
    bio,
    about,
    location,
    profileImage,
    proresponce: projects = [],
    experienceDTOS: experience = [],
    educationdto: education,
    certidto: certifications = [],
    socialdto: social,
    userskilldto: userSkills = [],
  } = data;

  const badgeColors = ["#7C3AED", "#EC4899", "#F97316", "#0EA5E9"];

  return (
    <div className="min-h-screen bg-[#0B0713] text-white font-['Inter']">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, #7C3AED 0%, transparent 40%), radial-gradient(circle at 80% 0%, #EC4899 0%, transparent 45%), radial-gradient(circle at 50% 80%, #F97316 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 pt-24 pb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {profileImage && (
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#F97316] opacity-60 blur-md" />
                <img
                  src={profileImage}
                  alt={name}
                  className="relative w-20 h-20 rounded-full object-cover border-2 border-white/40 shadow-2xl"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
            <h1 className="font-['Space_Grotesk'] text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight">{name}</h1>
            <p className="text-xl text-white/80 mt-3">{headline}</p>
            {location && (
              <p className="flex items-center gap-1.5 text-sm text-white/60 mt-3">
                <MapPin size={14} />
                {location}
              </p>
            )}
            {bio && <p className="text-white/85 mt-5 max-w-xl leading-relaxed">{bio}</p>}

            <div className="flex flex-wrap gap-3 mt-6">
              {social?.github && <GlassLink href={social.github} icon={<FaGithub size={15} />} label="GitHub" />}
              {social?.linkedine && <GlassLink href={social.linkedine} icon={<FaLinkedin size={15} />} label="LinkedIn" />}
              {email && <GlassLink href={`mailto:${email}`} icon={<Mail size={15} />} label="Email" />}
              {social?.codingp_platform && <GlassLink href={social.codingp_platform} icon={<Code2 size={15} />} label="LeetCode" />}
              <Link
                to={`/p/${data.slug}/contact`}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] font-medium hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={15} />
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20">
        {about && (
          <section className="mb-14 -mt-6 relative">
            <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10">
              <h2 className="flex items-center gap-2 font-['Space_Grotesk'] text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
                <Sparkles size={14} /> About
              </h2>
              <p className="text-white/85 leading-relaxed">{about}</p>
            </div>
          </section>
        )}

        {userSkills.length > 0 && (
          <section className="mb-14">
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2.5">
              {userSkills.map((s, i) => (
                <span
                  key={i}
                  className="text-sm px-3.5 py-1.5 rounded-full font-medium"
                  style={{ backgroundColor: `${badgeColors[i % badgeColors.length]}30`, color: badgeColors[i % badgeColors.length] }}
                >
                  {s.skills}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-14">
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold mb-6">Projects</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {p.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-['Space_Grotesk'] font-semibold">{p.title}</h3>
                      {p.featured && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] font-medium">
                          featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/70 mt-2 leading-relaxed">{p.description}</p>
                    {p.skilldto?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {p.skilldto.map((s, si) => (
                          <span
                            key={si}
                            className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{ backgroundColor: `${badgeColors[si % badgeColors.length]}30`, color: badgeColors[si % badgeColors.length] }}
                          >
                            {s.skillsname}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4 mt-4 text-sm">
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-white/70 hover:text-white">
                          <FaGithub size={14} /> Code
                        </a>
                      )}
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-white/70 hover:text-white">
                          <ExternalLink size={14} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-14">
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold mb-6">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10 flex gap-4">
                  <Briefcase size={18} className="text-white/50 mt-1 shrink-0" />
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <span className="text-white/60 text-sm">@ {exp.company}</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">
                      {formatMonthYear(exp.startdate)} — {exp.currentworking ? "Present" : formatMonthYear(exp.enddate)}
                    </p>
                    {exp.description && <p className="text-sm text-white/75 mt-2 leading-relaxed">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {education && (
            <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10">
              <h2 className="flex items-center gap-2 font-['Space_Grotesk'] text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
                <GraduationCap size={14} /> Education
              </h2>
              <h3 className="font-semibold">{education.institution}</h3>
              <p className="text-sm text-white/70 mt-1">
                {education.educationame}
                {education.grade && ` · ${education.grade}`}
              </p>
              <p className="text-xs text-white/50 mt-1">{education.ongoing ? "Ongoing" : education.passingYear}</p>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-md border border-white/10">
              <h2 className="flex items-center gap-2 font-['Space_Grotesk'] text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
                <Award size={14} /> Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((c, i) => (
                  <div key={i}>
                    <h3 className="font-medium text-sm">{c.title}</h3>
                    <p className="text-xs text-white/50">{formatMonthYear(c.issued_date)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">built with the developer portfolio generator</p>
        </footer>
      </div>
    </div>
  );
}

function GlassLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}

// Wire the components into the registry now that they're defined.
THEME_REGISTRY[0].component = MinimalDarkTheme;
THEME_REGISTRY[1].component = ModernLightTheme;
THEME_REGISTRY[2].component = CreativeGradientTheme;