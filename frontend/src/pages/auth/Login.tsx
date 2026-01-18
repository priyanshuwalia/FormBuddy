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
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    try {
      const res = await loginUser(email, password);
      login(res.data.token, res.data.user);
      navigate("/home");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-100 p-4 font-inter">
      {}
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row">
        {}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-white p-12 text-center">
          <div className="font-medium text-4xl lg:text-5xl text-zinc-800">
            Sign back in to your{" "}
            <span className="bg-gradient-to-r from-[#F5CE9B] to-[#E84C4A] bg-clip-text text-transparent">
              Smart
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r from-[#D06BD1] to-[#272640] bg-clip-text text-transparent">
              Slick
            </span>{" "}
            form experience.
          </div>
          <img
            src={clumsyMan}
            alt="Login Illustration"
            className="mt-8 max-w-xs "
          />
        </div>

        {}
        <div className="w-full bg-white p-8 md:w-1/2 lg:p-12">
          <h1 className="text-4xl font-extrabold text-zinc-800">
            Welcome back
          </h1>
          <h3 className="mt-2 text-base text-zinc-500">
            Continue building forms with FormBuddy.
          </h3>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center rounded-md bg-[#0075DE]/90 p-3 font-semibold text-white transition hover:bg-[#006ACD] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>

            {}
            <div className="flex items-center">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 flex-shrink text-sm text-gray-500">or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {}
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-gray-300 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              <img src={googleIcon} alt="Google" className="mr-2 h-5 w-5" />
              Continue with Google
            </button>

            {}
            <div className="text-center text-sm text-gray-500">
              Don't have an account?
              <Link
                to="/register"
                className="ml-1 font-semibold text-gray-700 underline hover:text-blue-800"
              >
                Sign up
              </Link>
            </div>
            <div className="text-center text-sm text-gray-500">
              Forgot password?
              <Link
                to="/reset-password"
                className="ml-1 font-semibold text-gray-700 underline hover:text-blue-800"
              >
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
