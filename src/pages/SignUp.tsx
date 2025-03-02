import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Store user data in local storage
      const userData = { email, password: hashedPassword };
      localStorage.setItem("user", JSON.stringify(userData));

      // Simulate token generation
      localStorage.setItem("token", hashedPassword);

      // Navigate to the home page or another page
      navigate("/login");
    } catch (error) {
      setError("An error occurred during signup. Please try again.");
      return error;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-96 p-6 bg-black text-white text-center">
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            alt="Spotify Logo"
            className="h-10"
          />
        </div>
        <h2 className="text-2xl font-bold">Sign up to start listening</h2>
        <form className="mt-6 text-left" onSubmit={handleSignup}>
          <label className="block text-sm font-semibold mb-2">
            Email address
          </label>
          <input
            type="email"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:border-green-500"
          />
          <label className="block text-sm font-semibold mb-2 mt-4">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:border-green-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-4 bg-green-500 text-black py-2 rounded font-bold hover:bg-green-400"
          >
            Next
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-700"></div>
          <p className="px-2 text-gray-400">or</p>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded mb-2 border border-gray-600 hover:bg-gray-700">
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            className="h-5"
          />
          Sign up with Google
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded mb-2 border border-gray-600 hover:bg-gray-700">
          <img
            src="https://img.icons8.com/fluency/48/000000/facebook-new.png"
            alt="Facebook"
            className="h-5"
          />
          Sign up with Facebook
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded border border-gray-600 hover:bg-gray-700">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/mac-os.png"
            alt="Apple"
            className="h-5"
          />
          Sign up with Apple
        </button>
      </div>
    </div>
  );
};
