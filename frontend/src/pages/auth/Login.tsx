import { useState, type FormEvent } from "react";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input";
import clumsyMan from "../../assets/open-doodles-clumsy-man-dropping-documents-and-files.svg";
import googleIcon from "../../assets/google-color-icon.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 font-inter bg-black h-screen">
      <div className="flex w-screen h-screen">
        {/* Left Side - Illustration + Text */}
        <div className="flex flex-col bg-white items-center justify-center w-1/2 overflow-hidden">
          <div className="px-4 py-4 font-medium mt-4 text-6xl h-1/2">
            Sign back in to your <span className="bg-gradient-to-r from-[#F5CE9B] to-[#E84C4A] bg-clip-text text-transparent">Smart</span> & <span className="bg-gradient-to-r from-[#D06BD1] to-[#272640] bg-clip-text text-transparent">Slick</span> Form-building experience.
          </div>
          <img src={clumsyMan} alt="Login Illustration" className="h-2/3" />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 h-full bg-white p-6 shadow-2xl text-zinc-700 font-bold backdrop-blur-lg">
          <h1 className="text-5xl font-extrabold">Welcome back</h1>
          <h3 className="text-lg text-zinc-500 mt-3 mb-6">
            Continue building forms with FormBuddy.
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full text-white p-2 rounded-md mt-3 backdrop-blur-lg bg-[#0075DE]/80 hover:bg-[#0168C4] transition"
            >
              Login
            </button>

            {/* Divider with "or" */}
            <div className="flex items-center justify-center">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Google Sign-in */}
            <button
              type="button"
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>

            {/* Links */}
            <div className="text-sm text-gray-500 mt-2">
              Don't have an account?
              <Link to="/register" className="underline text-gray-700 hover:text-blue-800 ml-1">
                Sign up
              </Link>
            </div>
            <div className="text-sm text-gray-500">
              Forgot password?
              <Link to="/reset-password" className="underline text-gray-700 hover:text-blue-800 ml-1">
                Reset
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
