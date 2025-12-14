import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp redirectUrl="/" />
    </div>
  );
};

export default SignUpPage;
