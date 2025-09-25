"use client";
import { useState } from "react";
import { Paper, TextInput, PasswordInput, Button, Tabs } from "@mantine/core";
import { register, signIn } from "@/api/v1/auth";
import { useAuth } from "@/hooks/useAuth";

export default function Auth() {
  const [activeTab, setActiveTab] = useState<string | null>("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (activeTab === "signin") {
        response = await signIn(username, password);
      } else {
        response = await register(username, password);
      }

      if (response) {
        login(response);
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <Paper className="w-full max-w-md p-8 rounded-2xl shadow-xl" radius="lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black">Welcome</h2>
          <p className="text-gray-700 text-sm mt-1">
            {activeTab === "signin"
              ? "Sign in to your account"
              : "Create new account"}
          </p>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List className="mb-6 bg-gray-100 p-1 rounded-lg">
            <Tabs.Tab
              value="signin"
              className={`flex-1 py-2 px-2  rounded-md transition-all text-black ${
                activeTab === "signin" ? "bg-white shadow-sm" : ""
              }`}
            >
              Sign In
            </Tabs.Tab>
            <Tabs.Tab
              value="signup"
              className={`flex-1 py-2 px-2  rounded-md transition-all text-black ${
                activeTab === "signup" ? "bg-white shadow-sm" : ""
              }`}
            >
              Sign Up
            </Tabs.Tab>
          </Tabs.List>

          <form onSubmit={handleSubmit}>
            <Tabs.Panel value="signin">
              <div className="space-y-4">
                <TextInput
                  label="Username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="text-black [&_label]:text-black [&_input]:text-black [&_input]:rounded-lg"
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-black [&_label]:text-black [&_input]:text-black [&_input]:rounded-lg"
                />
                <Button
                  type="submit"
                  fullWidth
                  className="mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg h-10 font-medium transition-colors text-white px-6"
                >
                  Sign In
                </Button>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="signup">
              <div className="space-y-4">
                <TextInput
                  label="Username"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="text-black [&_label]:text-black [&_input]:text-black [&_input]:rounded-lg"
                />
                <PasswordInput
                  label="Password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-black [&_label]:text-black [&_input]:text-black [&_input]:rounded-lg"
                />
                <Button
                  type="submit"
                  fullWidth
                  loading={loading}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg h-10 font-medium transition-colors text-white px-6"
                >
                  {activeTab === "signin" ? "Sign In" : "Create Account"}
                </Button>
              </div>
            </Tabs.Panel>
          </form>
        </Tabs>

        <p className="text-center text-sm text-gray-700 mt-6">
          {activeTab === "signin"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={() =>
              setActiveTab(activeTab === "signin" ? "signup" : "signin")
            }
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            {activeTab === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </Paper>
    </div>
  );
}
