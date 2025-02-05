import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Logout = () => {
  const { setIsLogin, setUserData, url } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(`${url}users/logout`, {
        method: "GET",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
      setIsLogin(false);
      setUserData([]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <button
      onClick={() => handleLogout()}
      className="drop-shadow-lg px-4  py-1 rounded bg-rose-700  text-white sm:hover:bg-red-900"
    >
      Logout
    </button>
  );
};
