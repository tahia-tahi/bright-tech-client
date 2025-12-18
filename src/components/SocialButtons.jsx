import React from 'react';
import { useSignIn } from "@clerk/clerk-react";

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
    <div className="space-y-2">
      <button
        onClick={() => oauthLogin("google")}
        className="w-full border p-2 rounded"
      >
        Continue with Google
      </button>

      <button
        onClick={() => oauthLogin("github")}
        className="w-full border p-2 rounded"
      >
        Continue with GitHub
      </button>
    </div>
  );
};

export default SocialButtons;