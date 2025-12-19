import { useSignUp, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const VerifyEmail = () => {
  const { signUp, isLoaded, setActive } = useSignUp();
  const { getToken } = useAuth(); // needed for backend sync
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const verifyCode = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        // Set active session
        await setActive({ session: result.createdSessionId });

        // ✅ Sync user to backend
        const token = await getToken({ template: "default" });
        await fetch(`${import.meta.env.VITE_API_URL}/api/posts/user/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Navigate to dashboard/home
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid verification code");
    }
  };

  return (
    <form onSubmit={verifyCode} className="max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Verify Email</h2>

      <input
        type="text"
        placeholder="Verification Code"
        className="w-full p-2 border mb-2"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Verify
      </button>
    </form>
  );
};

export default VerifyEmail;
