/* import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form:", formData);

    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] px-6 py-16 text-[#E8EAED]">
      <div className="mx-auto max-w-6xl">

        
        <div className="mb-12">
          <p className="mb-2 font-mono text-sm text-[#4ADE9D]">
            $ ./contact.sh
          </p>

          <h1 className="font-mono text-4xl font-bold md:text-5xl">
            Get in touch
          </h1>

          <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-[#8B93A6]">
            Have a question, suggestion or feedback? Send us a message.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">

          
          <div>
            <div className="rounded-lg border border-[#2E3444] bg-[#0F1218] p-6">

              <p className="mb-6 font-mono text-sm text-[#F2B84B]">
                // contact information
              </p>

              <div className="space-y-6">

                <div>
                  <p className="font-mono text-xs text-[#8B93A6]">
                    email
                  </p>
                  <p className="mt-1 font-mono text-sm">
                    support@portfolio.dev
                  </p>
                </div>

                <div>
                  <p className="font-mono text-xs text-[#8B93A6]">
                    response time
                  </p>
                  <p className="mt-1 font-mono text-sm">
                    Usually within 24 hours
                  </p>
                </div>

                <div>
                  <p className="font-mono text-xs text-[#8B93A6]">
                    availability
                  </p>
                  <p className="mt-1 font-mono text-sm text-[#4ADE9D]">
                    Available
                  </p>
                </div>

              </div>
            </div>
          </div>

          
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-[#2E3444] bg-[#0F1218] p-6"
          >
            <p className="mb-6 font-mono text-sm text-[#F2B84B]">
              // send message
            </p>

            <label className="mb-4 block">
              <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">
                name
              </span>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none focus:border-[#4ADE9D]"
              />
            </label>

            <label className="mb-4 block">
              <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">
                email
              </span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none focus:border-[#4ADE9D]"
              />
            </label>

            <label className="mb-4 block">
              <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">
                subject
              </span>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help?"
                className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none focus:border-[#4ADE9D]"
              />
            </label>

            <label className="mb-6 block">
              <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">
                message
              </span>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Write your message..."
                className="w-full resize-none rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none focus:border-[#4ADE9D]"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567]"
            >
              $ send message
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}*/






import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import axiosClient from "../api/axiosClient"; // adjust path to match your project structure

export default function ContactPage() {
  const { slug } = useParams(); // route should be /p/:slug/contact
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await axiosClient.post(`/api/portfolio/public/${slug}/contact`, formData);
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] px-6 py-16 text-[#E8EAED]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 font-mono text-sm text-[#4ADE9D]">$ ./contact.sh</p>
          <h1 className="font-mono text-4xl font-bold md:text-5xl">Get in touch</h1>
          <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-[#8B93A6]">
            Have a question, suggestion or feedback? Send a message.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Information */}
          <div>
            <div className="rounded-lg border border-[#2E3444] bg-[#0F1218] p-6">
              <p className="mb-6 font-mono text-sm text-[#F2B84B]">// contact information</p>
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs text-[#8B93A6]">response time</p>
                  <p className="mt-1 font-mono text-sm">Usually within 24 hours</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8B93A6]">availability</p>
                  <p className="mt-1 font-mono text-sm text-[#4ADE9D]">Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="rounded-lg border border-[#2E3444] bg-[#0F1218] p-6">
            <p className="mb-6 font-mono text-sm text-[#F2B84B]">// send message</p>

            <label className="mb-4 block">
              <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none focus:border-[#4ADE9D]"
              />
            </label>

            <label className="mb-4 block">
              <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none focus:border-[#4ADE9D]"
              />
            </label>

            <label className="mb-4 block">
              <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">subject</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help?"
                className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none focus:border-[#4ADE9D]"
              />
            </label>

            <label className="mb-6 block">
              <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Write your message..."
                className="w-full resize-none rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none focus:border-[#4ADE9D]"
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
            >
              {status === "sending" && <Loader2 size={14} className="animate-spin" />}
              {status === "sending" ? "sending..." : "$ send message"}
            </button>

            {status === "sent" && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-[#4ADE9D] font-mono">
                <CheckCircle2 size={14} /> Message sent successfully
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-[#F87171] font-mono">
                <AlertCircle size={14} /> Something went wrong. Try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}