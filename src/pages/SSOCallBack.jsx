import { ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";

const SSOCallback = () => {
  return (
    <>
      <ClerkLoading>Signing you in...</ClerkLoading>
      <ClerkLoaded />
    </>
  );
};

export default SSOCallback;