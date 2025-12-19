import React from "react";
import { Eye, EyeOff } from "lucide-react";

const ShowHidePassword = ({ show, setShow }) => {
  return (
    <button
      type="button"
      onClick={() => setShow(!show)}
      className="absolute right-3 top-1/2 -translate-y-1/2
                 text-gray-500 hover:text-primary transition"
    >
      {show ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );
};

export default ShowHidePassword;
