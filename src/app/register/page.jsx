"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Select,
  SelectItem,
  Separator,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  FaBookOpen,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPenFancy,
  FaUserCog,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import { motion } from "framer-motion";
import { imageUpload } from "@/lib/imgbb";

const SignUpComponent = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("reader");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const userData = Object.fromEntries(formData.entries());

    //   console.log("User data:", userData);

      let imageUrl = "";
      if (userData?.image && userData.image.size > 0) {
        const uploaded = await imageUpload(userData.image);
        imageUrl = uploaded.url;
        // console.log("Image URL:", imageUrl);
      }

      if (userData.password1 === userData.password2) {
        const { data, error } = await authClient.signUp.email({
          name: userData.name,
          email: userData.email,
          password: userData.password1,
          image: imageUrl,
          role: userData.role, // Add role to the signup data
        });
        if (data) {
          await authClient.signOut();
          toast.success("Account Created Successfully!", { theme: "dark" });
          router.push("/login");
        }

        if (error) {
          toast.error(
            error.message || "Registration Failed! Please try again.", { theme: "dark" }
          );
        }
      }
      else{
        toast.error("Password did not match, try Again" , { theme: "dark" });
        return;
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { theme: "dark" });
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { key: "reader", label: "Reader", icon: FaUser },
    { key: "writer", label: "Writer", icon: FaPenFancy },
    { key: "admin", label: "Admin", icon: FaUserCog },
  ];

  const getRoleIcon = (roleKey) => {
    const role = roles.find((r) => r.key === roleKey);
    return role ? role.icon : FaUser;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-15 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
              Create Account
            </h1>
          </div>

          {/* Role Selection */}
          <div>
            <Label className="text-white/80 text-sm font-medium block mb-2">
              I want to join as
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => setSelectedRole(role.key)}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                      selectedRole === role.key
                        ? "border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`mx-auto mb-1 ${
                        selectedRole === role.key
                          ? "text-yellow-400"
                          : "text-white/40"
                      }`}
                      size={20}
                    />
                    <p
                      className={`text-xs font-medium ${
                        selectedRole === role.key
                          ? "text-yellow-400"
                          : "text-white/60"
                      }`}
                    >
                      {role.label}
                    </p>
                  </button>
                );
              })}
            </div>
            <input type="hidden" name="role" value={selectedRole} />
          </div>

          <TextField isRequired name="name" type="text">
            <Label className="text-white/80 text-sm font-medium">
              Full Name
            </Label>
            <div className="relative">
              <Input
                className="border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all w-full"
                placeholder="Enter your full name"
              />
            </div>
          </TextField>

          <TextField name="image" type="file">
            <Label className="text-white/80 text-sm font-medium">
              Profile Image (Optional)
            </Label>
            <div className="relative">
              <input
                type="file"
                name="image"
                className="border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all w-full rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-yellow-400 file:to-red-600 file:text-black hover:file:scale-105 file:transition-all file:cursor-pointer cursor-pointer"
                accept="image/*"
              />
            </div>
          </TextField>

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
            <Label className="text-white/80 text-sm font-medium">
              Email Address
            </Label>
            <Input
              className="border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all"
              placeholder="you@example.com"
            />
            <FieldError className="text-red-400 text-xs" />
          </TextField>

          <TextField
            isRequired
            name="password1"
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
            <Label className="text-white/80 text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                className="border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all pr-10 w-full"
                placeholder="Create a strong password"
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
          <TextField
            isRequired
            name="password2"
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
            <Label className="text-white/80 text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                className="border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-yellow-400/50 transition-all pr-10 w-full"
                placeholder="Rewrite your password"
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

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-gradient-to-r from-yellow-400 to-red-600 text-black font-semibold py-6 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-yellow-400/20"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="flex items-center gap-3 my-2">
            <Separator
              className="flex-1 bg-white/10"
              orientation="horizontal"
            />
            <span className="text-xs font-medium text-white/30">OR</span>
            <Separator
              className="flex-1 bg-white/10"
              orientation="horizontal"
            />
          </div>

          <Button
            className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 py-6 rounded-xl mt-5"
            variant="flat"
            onClick={signIn}
          >
            <FcGoogle size={20} />
            <span className="font-medium">Continue with Google</span>
          </Button>

          <p className="text-center text-sm text-white/40 mt-2">
            Already have an account?{" "}
            <Link
              className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors hover:underline"
              href="/login"
            >
              Sign In
            </Link>
          </p>
        </Form>
      </motion.div>
    </div>
  );
};

export default SignUpComponent;
