document.addEventListener("DOMContentLoaded", function () {

  const chatbotContainer = document.getElementById("chatbot-container");
  const sendBtn = document.getElementById("send-btn");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");

  const chatbotIcon = document.getElementById("chatbot-icon");
  const closeButton = document.getElementById("close-btn");

  // abrir chat
  chatbotIcon.addEventListener("click", function () {
    chatbotContainer.classList.remove("hidden");
    chatbotIcon.style.display = "none";
  });

  // fechar chat
  closeButton.addEventListener("click", function () {
    chatbotContainer.classList.add("hidden");
    chatbotIcon.style.display = "flex";
  });

  sendBtn.addEventListener("click", sendMessage);

  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {

    const userMessage = chatbotInput.value.trim();

    if (!userMessage) return;

    appendMessage("user", userMessage);

    chatbotInput.value = "";

    getBotResponse(userMessage);

  }

  function appendMessage(sender, message) {

    const messageElement = document.createElement("div");

    messageElement.classList.add("message", sender);

    messageElement.textContent = message;

    chatbotMessages.appendChild(messageElement);

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  }

  async function getBotResponse(userMessage) {

    const apiKey = "AIzaSyAGD_VjQdVh244qnyvNuU3aNVNXv43zczU";
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    try {

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userMessage
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();

      const botMessage =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Não consegui responder.";

      appendMessage("bot", botMessage);

    } catch (error) {

      console.error(error);

      appendMessage("bot", "Erro ao falar com o bot.");

    }

  }

});