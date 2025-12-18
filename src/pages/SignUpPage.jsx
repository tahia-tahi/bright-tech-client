import { useSignUp, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import SocialButtons from "../components/SocialButtons";

const SignUpPage = () => {
  const { signUp, isLoaded } = useSignUp();
  const { getToken } = useAuth(); // For backend user sync
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(""); // optional

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    // Basic validation
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
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
        profileImageUrl: profileImage,
      });

      // 2️⃣ Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // 3️⃣ Get Clerk token to sync with backend
      const token = await getToken({ template: "default" });

      await fetch("http://localhost:3000/api/posts/user/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // 4️⃣ Navigate to verify email page
      navigate("/verify-email");
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>

      <input
        type="text"
        placeholder="First Name"
        className="w-full p-2 border mb-2"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Last Name"
        className="w-full p-2 border mb-2"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-500">{error}</p>}

      {/* Social login buttons */}
      <SocialButtons />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Sign Up
      </button>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/auth/log-in")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </form>
  );
};

export default SignUpPage;
