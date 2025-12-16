import { SignIn } from "@clerk/clerk-react";

const LogInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn fallbackRedirectUrl="/" />
    </div>
  );
};

export default LogInPage;
