import React, { useRef } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

export function Signup() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      await axios.post(BACKEND_URL + "api/v1/signup", {
        username,
        password,
      });
      alert("You have signed up!");
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.response?.data?.message || error.message);
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-tr from-purple-100 via-blue-100 to-pink-200 flex justify-center items-center">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md mx-4 space-y-8 transition-all duration-300 hover:shadow-2xl">
        {/* App Branding */}
        <div className="flex flex-col items-center space-y-3">
          <Brain className="w-14 h-14 text-purple-600 animate-pulse" />
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">BRAINLY</h1>
          <p className="text-sm text-gray-500">Create a new account to get started</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <Input
            ref={usernameRef}
            placeholder="Choose a username"
            className="text-md p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <Input
            ref={passwordRef}
            type="password"
            placeholder="Create a password"
            className="text-md p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={signup}
          variant="primary"
          text="Sign Up"
          fullWidth={true}
          className="text-md py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition duration-300"
        />

        {/* Footer Link */}
        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}
