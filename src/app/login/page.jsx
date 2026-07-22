"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaBookOpen, FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import { motion } from "framer-motion";

const LoginComponent = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
    });

    if (data) {
      toast.success("Welcome Back!");
      router.push("/");
    }
    if (error) {
      toast.error("Login Failed! Please check your credentials.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-15 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <Form
          className="relative flex flex-col gap-4 bg-[#14141a] border border-white/10 backdrop-blur-xl px-8 pb-8 rounded-2xl shadow-2xl shadow-black/50"
          onSubmit={handleSubmit}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-yellow-400 via-orange-400 to-red-600 rounded-t-2xl" />
          <div className="flex flex-col items-center gap-3 pt-8 pb-2">
            <div className="p-3 rounded-2xl bg-linear-to-br from-yellow-400/20 to-red-600/20 border border-white/10">
              <FaBookOpen className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-red-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-sm text-white/40">Sign in to continue reading</p>
          </div>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-white/80 text-sm font-medium">Email Address</Label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 z-10" size={16} />
              <Input
                className="pl-10 border w-full border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all"
                placeholder="you@example.com"
              />
            </div>
            <FieldError className="text-red-400 text-xs" />
          </TextField>
          <TextField
            isRequired
            minLength={6}
            name="password"
            type={isVisible ? "text" : "password"}
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              return null;
            }}
          >
            <Label className="text-white/80 text-sm font-medium">Password</Label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 z-10" size={16} />
              <Input
                className="pl-10 w-full pr-10 border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all"
                placeholder="Enter your password"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors focus:outline-none z-10"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            <Description className="text-white/30 text-xs">
              Must be at least 6 characters with 1 uppercase and 1 lowercase
            </Description>
            <FieldError className="text-red-400 text-xs" />
          </TextField>
          <div className="flex items-center justify-between mt-2">
            <Button
              type="submit"
              isLoading={isLoading}
              className="bg-linear-to-r from-yellow-400 to-red-600 text-black font-semibold px-8 py-6 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-yellow-400/20"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <Link
              href="#"
              className="text-sm text-white/40 hover:text-yellow-400 transition-colors hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Separator className="flex-1 bg-white/10" orientation="horizontal" />
            <span className="text-xs font-medium text-white/30">OR</span>
            <Separator className="flex-1 bg-white/10" orientation="horizontal" />
          </div>

          <Button
            className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 py-6 rounded-xl"
            variant="flat"
            onClick={signInWithGoogle}
          >
            <FcGoogle size={20} />
            <span className="font-medium">Continue with Google</span>
          </Button>

          <p className="text-center text-sm text-white/40 mt-2">
            Don&apos;t have an account?{" "}
            <Link
              className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors hover:underline"
              href="/register"
            >
              Create Account
            </Link>
          </p>
        </Form>
      </motion.div>
    </div>
  );
};

export default LoginComponent;