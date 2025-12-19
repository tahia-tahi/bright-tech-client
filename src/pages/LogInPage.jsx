import { useSignIn, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import SocialButtons from "../components/SocialButtons";
import ShowHidePassword from "../components/ShowHidePassword";

const LogInPage = () => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const { getToken } = useAuth(); // For backend user sync
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);


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
<form
  onSubmit={handleLogin}
  className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg"
>
  <h2 className="text-2xl font-bold mb-6 text-center text-primary">
    Login to your account
  </h2>

  <div className="space-y-4 text-primary">
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
      Login
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
    New here?{" "}
    <span
      onClick={() => navigate("/auth/sign-up")}
      className="cursor-pointer underline hover:opacity-80"
    >
      Create an account
    </span>
  </p>
</form>


  );
};

export default LogInPage;
