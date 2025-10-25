import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // Match system preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleBack = () => {
    window.location.href = "/chatbot";
  };

  const user = JSON.parse(localStorage.getItem("current_user") || "{}");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Button
            onClick={handleBack}
            variant="outline"
            className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Profile & Settings</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-8">
        {/* User Info */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">User Information</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {user?.full_name || "N/A"}</p>
            <p><strong>Email:</strong> {user?.email || "N/A"}</p>
          </div>
        </section>

        {/* Theme Settings */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Theme</h2>
          <div className="flex items-center gap-4">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </section>

        <section className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>AgriBot v1.0 © 2025</p>
        </section>
      </main>
    </div>
  );
}
