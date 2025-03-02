import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdDownloadForOffline } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Type as boolean
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>(""); // Type as string

  // Type the handleButtonClick function
  const handleButtonClick = (buttonName: string): void => {
    setActiveButton(buttonName);
  };

  // Type the handleLogout function
  const handleLogout = (): void => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const isHashed = localStorage.getItem("token");
    if (isHashed) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="header flex justify-between items-center z-[1000] bg-black sticky top-0 h-16 w-full shadow-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
        alt="Spotify Logo"
        className="w-32 p-2"
      />
      <div className="flex justify-center items-center gap-4 w-[50%]">
        <IoMdHome
          className="h-8 w-8"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="flex items-center justify-center px-4 py-2 w-[50%] bg-[#222222] rounded-full">
          <FaSearch className="text-white h-5 w-5 ml-2" />
          <input
            type="text"
            className="bg-[#222222] text-white placeholder-gray-400 outline-none ml-2 flex-grow"
            placeholder="What do you want to play?"
          />
        </div>
      </div>
      <div className="header-buttons flex justify-center items-center p-6 gap-5 ">
        <MdDownloadForOffline className="h-8 w-8 cursor-pointer text-white transform hover:scale-110 transition duration-300" />
        <Link
          to="/install"
          className={`hover:text-slate-300 ${
            activeButton === "installapp" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("install app")}
        >
          Install App
        </Link>

        {!isLoggedIn ? (
          <>
            <Link
              to="/signup"
              className={`hover:text-slate-300 `}
              onClick={() => handleButtonClick("signup")}
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className={`rounded-full bg-white text-black hover:bg-slate-300 px-4 py-2 ${
                activeButton === "login" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("login")}
            >
              Log in
            </Link>
          </>
        ) : (
          <Link
            to="/"
            className={`rounded-full bg-white text-black hover:bg-slate-300 px-4 py-2 ${
              activeButton === "" ? "active" : ""
            }`}
            onClick={handleLogout}
          >
            Logout
          </Link>
        )}
      </div>
    </header>
  );
}
