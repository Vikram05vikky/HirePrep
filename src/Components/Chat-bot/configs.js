import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "HelperBot",
  initialMessages: [
    createChatBotMessage("Hi! I'm HelperBot. How can I assist you today?"),
  ],

  customStyles: {
    botMessageBox: {
      color: "#ffffff", // white text for bot
      backgroundColor: "#D3D3D3", // black background for bot
      padding: "10px 15px",
      borderRadius: "12px 12px 12px 0",
      fontSize: "14px",
      maxWidth: "75%",
      wordBreak: "break-word",
    },
    userMessageBox: {
      backgroundColor: "#ffffff", // white background for user
      color: "#000000", // black text for user
      padding: "10px 15px",
      borderRadius: "12px 12px 0 12px",
      fontSize: "14px",
      maxWidth: "75%",
      wordBreak: "break-word",
      border: "1px solid #ccc", // subtle border so user messages stand out
    },
    chatButton: {
      backgroundColor: "#4f46e5",
      borderRadius: "50%",
      width: "44px",
      height: "44px",
      fontSize: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    },
    chatWindow: {
      height: "450px",
      width: "320px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      borderRadius: "16px",
      overflowY: "auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "14px",
      backgroundColor: "#f9f9f9",
    },
  },

  customComponents: {
    botAvatar: () => null,
    userAvatar: () => null,
  },
};

export default config;
