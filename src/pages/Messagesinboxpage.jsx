import { useEffect, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import axiosClient from "../api/axiosClient"; // adjust path to match your project structure

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function MessagesInboxPage() {
  const [conversations, setConversations] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    axiosClient.get("/api/developer/portfolio/messages/getmessage").then((res) => setConversations(res.data));
  }, []);

  async function openConversation(id) {
    setSelectedId(id);
    const res = await axiosClient.get(`/api/developer/portfolio/messages/${id}`);
    setDetail(res.data);
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, ownerUnread: false } : c)));
  }

  async function handleReply(e) {
    e.preventDefault();
    if (!reply.trim()) return;
    setSending(true);
    try {
      const res = await axiosClient.post(`/api/developer/portfolio/messages/${selectedId}/reply`, { message: reply });
      setDetail(res.data);
      setReply("");
      setConversations((prev) =>
        prev.map((c) => (c.id === selectedId ? { ...c, lastMessagePreview: reply, updatedAt: new Date().toISOString() } : c))
      );
    } finally {
      setSending(false);
    }
  }

  if (!conversations) {
    return (
      <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#6B7280]" size={22} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E7E9EE]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-1">Messages</h1>
        <p className="text-sm text-[#6B7280] mb-8">
          {conversations.filter((c) => c.ownerUnread).length} unread of {conversations.length} conversations
        </p>

        {conversations.length === 0 ? (
          <p className="text-sm text-[#6B7280]">No messages yet — they'll show up here once visitors contact you.</p>
        ) : (
          <div className="grid md:grid-cols-[320px_1fr] gap-6">
            {/* Conversation list */}
            <div className="space-y-2">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => openConversation(c.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${
                    selectedId === c.id ? "border-[#4F46E5] bg-[#4F46E5]/5" : "border-[#1C2230] bg-[#0E121B] hover:border-[#2A3244]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-sm ${c.ownerUnread ? "text-[#E7E9EE] font-semibold" : "text-[#9CA3AF]"}`}>
                      {c.visitorName}
                    </span>
                    {c.ownerUnread && <span className="w-2 h-2 rounded-full bg-[#4F46E5] shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-sm text-[#6B7280] truncate mt-0.5">{c.subject}</p>
                  <p className="text-xs text-[#4B5563] truncate mt-1">{c.lastMessagePreview}</p>
                  <p className="text-xs text-[#4B5563] mt-1.5">{timeAgo(c.updatedAt)}</p>
                </button>
              ))}
            </div>

            {/* Thread view */}
            <div className="rounded-xl border border-[#1C2230] bg-[#0E121B] flex flex-col h-[70vh]">
              {!detail ? (
                <div className="flex-1 flex items-center justify-center text-[#4B5563] text-sm">
                  Select a conversation to view it
                </div>
              ) : (
                <>
                  <div className="p-5 border-b border-[#1C2230]">
                    <h2 className="text-base font-semibold">{detail.subject}</h2>
                    <p className="text-xs text-[#6B7280] mt-1">
                      {detail.visitorName} · {detail.visitorEmail}
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-3">
                    {detail.messages.map((m, i) => {
                      const isOwner = m.sender === "OWNER";
                      return (
                        <div key={i} className={`flex ${isOwner ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                              isOwner ? "bg-[#4F46E5] text-white" : "bg-[#1C2230] text-[#E7E9EE]"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.body}</p>
                            <p className={`text-[10px] mt-1 ${isOwner ? "text-white/60" : "text-[#6B7280]"}`}>
                              {timeAgo(m.createdAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={handleReply} className="p-4 border-t border-[#1C2230] flex gap-2">
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Reply..."
                      rows={1}
                      className="flex-1 resize-none rounded-lg border border-[#242A38] bg-[#0A0C10] px-3 py-2.5 text-sm text-[#E7E9EE] outline-none focus:border-[#4F46E5] transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={sending || !reply.trim()}
                      className="px-3 rounded-lg bg-[#4F46E5] text-white hover:bg-[#4338CA] disabled:opacity-40 transition-colors shrink-0"
                    >
                      {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}