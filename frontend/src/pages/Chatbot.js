import React, { useState, useRef, useEffect } from "react";
import { queryModel } from "../utils/queryModel"; // Ensure this points to your correct utils path
import {
  MessageSquare,
  Plus,
  Search,
  Trash2,
  LogOut,
  Send,
  Menu,
  X,
  Leaf,
  Sparkles,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const currentUser = localStorage.getItem("current_user");

    if (!token || !currentUser) {
      window.location.href = "/login";
      return;
    }

    setUser(JSON.parse(currentUser));
  }, []);

  // Load chats from localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("chatHistory");
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChatHistory(parsedChats);
      setActiveChatId(parsedChats[0]?.id || null);
    } else {
      const defaultChat = [
        {
          id: Date.now(),
          title: "Crop Disease Diagnosis",
          date: "Today",
          messages: [
            { role: "assistant", content: "Hello! How can I help with your crops?" },
          ],
        },
      ];
      setChatHistory(defaultChat);
      setActiveChatId(defaultChat[0].id);
      localStorage.setItem("chatHistory", JSON.stringify(defaultChat));
    }
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, activeChatId]);

  const activeChat = chatHistory.find((chat) => chat.id === activeChatId);
  const messages = activeChat?.messages || [];

  const filteredChatHistory = chatHistory.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const saveChats = (updatedChats) => {
    setChatHistory(updatedChats);
    localStorage.setItem("chatHistory", JSON.stringify(updatedChats));
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: "user", content: inputValue };

    // Add user message immediately
    const updatedChats = chatHistory.map((chat) => {
      if (chat.id === activeChatId) {
        return { ...chat, messages: [...chat.messages, userMessage] };
      }
      return chat;
    });
    saveChats(updatedChats);
    setInputValue("");

    try {
      // Get AI reply as string
      const aiResponse = await queryModel({ prompt: inputValue });
      const assistantMessage = { role: "assistant", content: aiResponse };

      // Add assistant reply using updatedChats (not old chatHistory)
      const updatedChatsWithReply = updatedChats.map((chat) => {
        if (chat.id === activeChatId) {
          return { ...chat, messages: [...chat.messages, assistantMessage] };
        }
        return chat;
      });
      saveChats(updatedChatsWithReply);
    } catch (err) {
      console.error("Error fetching model response:", err);
      const errorMessage = {
        role: "assistant",
        content: "❌ Failed to get response from AI model. Please try again.",
      };

      const updatedChatsWithError = updatedChats.map((chat) => {
        if (chat.id === activeChatId) {
          return { ...chat, messages: [...chat.messages, errorMessage] };
        }
        return chat;
      });
      saveChats(updatedChatsWithError);
    }
  };




  // New chat
  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      date: "Today",
      messages: [
        {
          role: "assistant",
          content: "Hello! I'm AgriBot, your AI farming assistant. How can I help you today?",
        },
      ],
    };
    const updatedChats = [newChat, ...chatHistory];
    saveChats(updatedChats);
    setActiveChatId(newChat.id);
  };

  // Delete chat
  const handleDeleteChat = (id) => {
    const updatedChats = chatHistory.filter((chat) => chat.id !== id);
    saveChats(updatedChats);
    if (activeChatId === id) setActiveChatId(updatedChats[0]?.id || null);
  };

  // Rename chat
  const handleRenameChat = (id) => {
    const newTitle = prompt("Enter new chat title:");
    if (!newTitle) return;
    const updatedChats = chatHistory.map((chat) =>
      chat.id === id ? { ...chat, title: newTitle } : chat
    );
    saveChats(updatedChats);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("current_user");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="w-80 bg-gray-900 text-white flex flex-col fixed md:relative h-full z-40"
          >
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">AgriBot</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <Button
                onClick={handleNewChat}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-800">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chats..."
                  className="w-full bg-gray-800 border-gray-700 pl-10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Recent Chats</h3>
              <div className="space-y-2">
                {filteredChatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    className={`w-full text-left p-3 rounded-lg hover:bg-gray-800 transition-colors group ${
                      chat.id === activeChatId ? "bg-gray-800" : ""
                    }`}
                    onClick={() => setActiveChatId(chat.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{chat.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{chat.date}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRenameChat(chat.id);
                          }}
                        >
                          <Edit2 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChat(chat.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center gap-3 mb-3 p-3 bg-gray-800 rounded-lg">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.full_name || "User"}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <h1 className="text-lg font-semibold text-gray-900">AgriBot Chat</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`px-5 py-4 rounded-2xl max-w-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-700 font-medium">
                      {user?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white p-6">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about farming..."
                className="flex-1 h-14 px-6 text-base border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <Button
                type="submit"
                className="h-14 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center">
              All chats are now saved permanently in your browser.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

