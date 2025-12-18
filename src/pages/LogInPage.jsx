import { useSignIn, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import SocialButtons from "../components/SocialButtons";

const LogInPage = () => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const { getToken } = useAuth(); // For backend user sync
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      // 1️⃣ Attempt to sign in
      const result = await signIn.create({
        identifier: email,
        password,
      });

      // 2️⃣ If login complete, set active session
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        // 3️⃣ Sync user to backend
        const token = await getToken({ template: "default" });
        await fetch("http://localhost:3000/api/posts/user/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // 4️⃣ Redirect to dashboard/home
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

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
        Login
      </button>

      <p className="text-sm text-center mt-4">
        New to our platform?{" "}
        <span
          onClick={() => navigate("/auth/sign-up")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default LogInPage;
