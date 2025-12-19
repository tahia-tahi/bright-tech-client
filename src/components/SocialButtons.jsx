import React from "react";
import { useSignIn } from "@clerk/clerk-react";
import { Chrome, Github } from "lucide-react";

const SocialButtons = () => {
  const { signIn } = useSignIn();

  const oauthLogin = async (provider) => {
    await signIn.authenticateWithRedirect({
      strategy: `oauth_${provider}`,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <div className="space-y-3 mt-6">
      <button
        type="button"
        onClick={() => oauthLogin("google")}
        className="w-full flex items-center justify-center gap-3
                   border border-gray-300 rounded-lg py-2.5
                   font-medium text-primary
                   hover:bg-gray-50 transition"
      >
        <Chrome className="w-5 h-5" />
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => oauthLogin("github")}
        className="w-full flex items-center justify-center gap-3
                   border border-gray-300 rounded-lg py-2.5
                   font-medium text-primary
                   hover:bg-gray-50 transition"
      >
        <Github className="w-5 h-5" />
        Continue with GitHub
      </button>
    </div>
  );
};

export default SocialButtons;
