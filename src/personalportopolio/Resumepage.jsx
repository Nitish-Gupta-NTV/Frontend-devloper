import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print"; // npm install react-to-print
import { Download, Mail, Phone, MapPin,  Loader2 } from "lucide-react";
import {FaGithub, FaLinkedin } from "react-icons/fa";
import axiosClient from "../api/axiosClient"; // adjust path to match your project structure
import { formatMonthYear } from "../themes/Portfoliothemes.jsx";

export default function ResumePage() {
  const [data, setData] = useState(null);
  const printRef = useRef(null);
  const { slug } = useParams();

  useEffect(() => {
    axiosClient.get(`/api/portfolio/public/${slug}`).then((res) => setData(res.data));
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: data ? `${data.name}-resume` : "resume",
  });

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F5F7]">
        <Loader2 className="animate-spin text-[#6B7280]" size={22} />
      </div>
    );
  }

  const {
    name,
    email,
    phonenumber,
    headline,
    about,
    location,
    proresponce: projects = [],
    experienceDTOS: experience = [],
    educationdto: education,
    certidto: certifications = [],
    socialdto: social,
    userskilldto: userSkills = [],
  } = data;

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      {/* Toolbar — hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-[#E5E7EB] px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[#374151]">Resume preview</span>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#111827] text-white hover:bg-[#1F2937] transition-colors"
        >
          <Download size={15} />
          Download PDF
        </button>
      </div>

      {/* Printable area */}
      <div className="max-w-[210mm] mx-auto py-10 px-4 print:py-0 print:px-0">
        <div
          ref={printRef}
          className="bg-white shadow-sm print:shadow-none rounded-lg print:rounded-none p-10 print:p-8 text-[#1F2937]"
        >
          {/* Header */}
          <header className="border-b border-[#E5E7EB] pb-5 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
            <p className="text-[#4B5563] mt-1">{headline}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-sm text-[#6B7280]">
              {email && (
                <span className="flex items-center gap-1.5">
                  <Mail size={13} /> {email}
                </span>
              )}
              {phonenumber && (
                <span className="flex items-center gap-1.5">
                  <Phone size={13} /> {phonenumber}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} /> {location}
                </span>
              )}
              {social?.github && (
                <span className="flex items-center gap-1.5">
                  <FaGithub size={13} /> {social.github.replace(/^https?:\/\//, "")}
                </span>
              )}
              {social?.linkedine && (
                <span className="flex items-center gap-1.5">
                  <FaLinkedin size={13} /> {social.linkedine.replace(/^https?:\/\//, "")}
                </span>
              )}
            </div>
          </header>

          {about && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">Summary</h2>
              <p className="text-sm leading-relaxed text-[#374151]">{about}</p>
            </section>
          )}

          {userSkills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">Skills</h2>
              <p className="text-sm text-[#374151] leading-relaxed">
                {userSkills.map((s) => s.skills).join(" · ")}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div key={i} className="break-inside-avoid">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-sm font-semibold">{exp.position} — {exp.company}</h3>
                      <span className="text-xs text-[#6B7280] shrink-0 ml-3">
                        {formatMonthYear(exp.startdate)} – {exp.currentworking ? "Present" : formatMonthYear(exp.enddate)}
                      </span>
                    </div>
                    {exp.description && <p className="text-sm text-[#4B5563] mt-1 leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3">Projects</h2>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id} className="break-inside-avoid">
                    <h3 className="text-sm font-semibold">{p.title}</h3>
                    <p className="text-sm text-[#4B5563] mt-0.5 leading-relaxed">{p.description}</p>
                    {p.skilldto?.length > 0 && (
                      <p className="text-xs text-[#6B7280] mt-1">
                        {p.skilldto.map((s) => s.skillsname).join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-6">
            {education && (
              <section className="break-inside-avoid">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">Education</h2>
                <h3 className="text-sm font-semibold">{education.institution}</h3>
                <p className="text-sm text-[#4B5563]">
                  {education.educationame}
                  {education.grade && ` · ${education.grade}`}
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5">{education.ongoing ? "Ongoing" : education.passingYear}</p>
              </section>
            )}

            {certifications.length > 0 && (
              <section className="break-inside-avoid">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">Certifications</h2>
                <div className="space-y-1.5">
                  {certifications.map((c, i) => (
                    <div key={i}>
                      <h3 className="text-sm font-medium">{c.title}</h3>
                      <p className="text-xs text-[#6B7280]">{formatMonthYear(c.issued_date)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Contact section — separate from the printable resume itself */}
        <div className="print:hidden mt-8 bg-white rounded-lg border border-[#E5E7EB] p-6">
          <h2 className="text-sm font-semibold text-[#111827] mb-1">Get in touch</h2>
          <p className="text-sm text-[#6B7280] mb-4">Reach out directly, or connect on socials.</p>
          <div className="flex flex-wrap gap-3">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-[#111827] text-white hover:bg-[#1F2937] transition-colors"
              >
                <Mail size={14} /> Email me
              </a>
            )}
            {social?.linkedine && (
              <a
                href={social.linkedine}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] transition-colors"
              >
                <FaLinkedin size={14} /> LinkedIn
              </a>
            )}
            {social?.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] transition-colors"
              >
                <FaGithub size={14} /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}