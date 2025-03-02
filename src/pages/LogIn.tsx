import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    // Retrieve user data from local storage
    const storedUserString = localStorage.getItem("user");

    if (!storedUserString) {
      setError("User not found. Please sign up first.");
      return;
    }

    // Safely parse the stored user data
    let storedUser: { email: string; password: string };
    try {
      storedUser = JSON.parse(storedUserString);
    } catch (err) {
      setError("Error reading user data. Please try again.");
      return err;
    }

    // Compare entered password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, storedUser.password);

    if (email === storedUser.email && isPasswordValid) {
      // Simulate token generation
      localStorage.setItem("token", "dummy-token");
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
      <div className="container p-6 max-w-xl h-[90%] bg-gray-900 text-white rounded-md">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
          alt="Spotify Logo"
          className="w-32 mb-4 mx-auto"
        />
        <h3 className="text-center text-xl font-bold mb-6">
          Log in to Spotify
        </h3>

        <div className="buttons space-y-2 mb-6">
          <button className="w-full flex items-center justify-center gap-2 bg-gray-800 py-2 rounded-full border border-gray-600 hover:bg-gray-700 p-2 text-white hover:border-white">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              className="h-5"
            />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-gray-800 py-2 rounded-full border border-gray-600 hover:bg-gray-700 p-2 text-white hover:border-white">
            <img
              src="https://img.icons8.com/fluency/48/000000/facebook-new.png"
              alt="Facebook"
              className="h-5"
            />
            Continue with Facebook
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-gray-800 py-2 rounded-full border border-gray-600 hover:bg-gray-700 p-2 text-white hover:border-white">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/mac-os.png"
              alt="Apple"
              className="h-5"
            />
            Continue with Apple
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="login-form" onSubmit={handleLogIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email or username
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or username"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
          >
            Log In
          </button>
          <div className="flex flex-col justify-center items-center mt-3">
            <button>Forgot your password?</button>
            <button className="mt-3" onClick={() => navigate("/signup")}>
              Don't have an account? Sign up for Spotify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
