import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I assist you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      // Call your backend API or directly OpenAI API here
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "Sorry, I didn't understand." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error: Unable to fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <div style={{ minHeight: 300, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === "bot" ? "left" : "right", margin: "10px 0" }}>
            <b>{msg.from === "bot" ? "AI" : "You"}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
        disabled={loading}
        style={{ width: "80%", padding: 8 }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: 8, marginLeft: 8 }}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;
