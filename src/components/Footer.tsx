import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className=" p-4 bg-fuchsia-700 text-white  w-full fixed bottom-0 h-[10%]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p>Preview of Spotify</p>
          <p>
            Sign up to get unlimited songs and podcasts with occasional ads. No
            credit card needed
          </p>
        </div>
        <button
          className="rounded-full p-3 bg-white text-black font-bold"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up for free
        </button>
      </div>
    </footer>
  );
};

export default Footer;
