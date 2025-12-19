import { useSignUp, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import SocialButtons from "../components/SocialButtons";
import ShowHidePassword from "../components/ShowHidePassword";

const SignUpPage = () => {
  const { signUp, isLoaded } = useSignUp();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 12) {
      setError("Password must be at least 12 characters");
      return;
    }

    try {
      // 1️⃣ Create user in Clerk
      await signUp.create({
        emailAddress: email,
        password,
        firstName: name, // ✅ Clerk expects firstName
      });

      // 2️⃣ Prepare email verification
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // 3️⃣ Sync user with backend
      const token = await getToken({ template: "default" });

      await fetch("http://localhost:3000/api/users/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // 4️⃣ Go to verify email page
      navigate("/verify-email");
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Signup failed");
    }
  };

  return (
<form
  onSubmit={handleSignup}
  className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg"
>
  <h2 className="text-2xl font-bold mb-6 text-center text-primary">
    Create Account
  </h2>

  <div className="space-y-4 text-primary">
    <input
      type="text"
      placeholder="Full Name"
      className="w-full p-3 border border-gray-300 rounded-lg
                 text-primary placeholder:text-gray-400
                 focus:outline-none focus:ring-2 focus:ring-primary"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />

    <input
      type="email"
      placeholder="Email"
      className="w-full p-3 border border-gray-300 rounded-lg
                 text-primary placeholder:text-gray-400
                 focus:outline-none focus:ring-2 focus:ring-primary"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="w-full p-3 pr-10 border border-gray-300 rounded-lg
                   text-primary placeholder:text-gray-400
                   focus:outline-none focus:ring-2 focus:ring-primary"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <ShowHidePassword
        show={showPassword}
        setShow={setShowPassword}
      />
    </div>

    {error && (
      <p className="text-sm text-red-500">{error}</p>
    )}

    <button
      type="submit"
      className="w-full bg-primary hover:bg-primary/90
                 text-white p-3 rounded-lg font-medium transition"
    >
      Sign Up
    </button>
  </div>

  {/* Divider */}
  <div className="flex items-center gap-3 my-6">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-xs text-gray-400 uppercase">
      or
    </span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>

  <SocialButtons />

  <p className="text-sm text-center mt-6 text-primary">
    Already have an account?{" "}
    <span
      onClick={() => navigate("/auth/log-in")}
      className="cursor-pointer underline hover:opacity-80"
    >
      Sign In
    </span>
  </p>
</form>


  );
};

export default SignUpPage;
