import React, { useState } from 'react'
import { FiSend } from 'react-icons/fi';

const ChatHeads = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "user", text: "Hi there!" },
    { id: 2, sender: "other", text: "Hello! How can I help you?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, { id: Date.now(), sender: "user", text: inputValue }]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className=" flex flex-col">
      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-center mb-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "other" && (
              <img
                src="https://via.placeholder.com/40"
                alt="Participant"
                className="w-10 h-10 rounded-full mr-2"
              />
            )}
            <div
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                message.sender === "user"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {message.text}
            </div>
            {message.sender === "user" && (
              <img
                src="https://via.placeholder.com/40"
                alt="You"
                className="w-10 h-10 rounded-full ml-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="p-4 bg-white flex items-center rounded-t-xl">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-gray-700 outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  )
}

export default ChatHeads
