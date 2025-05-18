import { GoogleGenAI } from "@google/genai";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;

    this.ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });
  }

  handleUserMessage = async (message) => {
    try {
      const userMsg = this.createChatBotMessage(message, { withAvatar: true });
      //   this.addMessageToState(userMsg);

      // Generate AI response
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash", // or your target model
        contents: message,
      });

      const botText = response.text || "Sorry, no response.";

      const botMessage = this.createChatBotMessage(botText, {
        withAvatar: true,
      });

      this.addMessageToState(botMessage);
    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
      const errorMessage = this.createChatBotMessage(
        "Oops! Something went wrong with Gemini. Please try again later."
      );
      this.addMessageToState(errorMessage);
    }
  };

  addMessageToState = (message) => {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
}

export default ActionProvider;
