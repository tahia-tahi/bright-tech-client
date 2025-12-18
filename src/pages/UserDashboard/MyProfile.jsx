import { useUser } from "@clerk/clerk-react";

const MyProfile = () => {
  const { user } = useUser();

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-primary">My Profile</h2>

      <div className="space-y-2 text-sm text-primary">
        <p><strong>Name:</strong> {user?.fullName}</p>
        <p><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}</p>
      </div>

      <button className="mt-4 px-4 py-2 rounded-md bg-primary text-white text-sm">
        Edit Profile
      </button>
    </div>
  );
};

export default MyProfile;
