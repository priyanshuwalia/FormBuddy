import React, { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/Input";
import thoughtfulGirl from "../../assets/open-doodles-reading-side.gif";
import googleIcon from "../../assets/google-color-icon.svg";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const minimunPassword = password.length > 4;
  const passwordsMatch = password && password === confirmPassword;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);

    try {
      const res = await registerUser(email, password);
      login(res.data.token, res.data.user);
      navigate("/complete-profile");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-h-screen max-w-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 font-inter ">
      { }
      <div className="flex w-full max-w-4xl flex-col rounded-2xl bg-white dark:bg-gray-800 shadow-2xl md:flex-row ">
        { }
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-white dark:bg-gray-800 p-12  text-center">
          <div className="font-medium text-4xl lg:text-5xl text-zinc-800 dark:text-white">
            The one{" "}
            <span className="bg-gradient-to-r from-[#F5CE9B] to-[#E84C4A] bg-clip-text text-transparent">
              Stylish
            </span>{" "}
            yet{" "}
            <span className="bg-gradient-to-r from-[#D06BD1] to-[#272640] bg-clip-text text-transparent">
              Simple
            </span>{" "}
            &nbsp; form builder.
          </div>
          <img
            src={thoughtfulGirl}
            alt="Registration Illustration"
            className="mt-8 max-w-xs object-contain dark:invert"
          />
        </div>

        { }
        <div className="w-full bg-white dark:bg-gray-800 p-8 md:w-1/2 lg:p-10 ">
          <h1 className="text-4xl font-extrabold text-zinc-800 dark:text-white wrap-normal">
            Craft intelligent forms
          </h1>
          <h3 className="mt-2 text-base text-zinc-500 dark:text-gray-400">
            Meet FormBuddy, your intuitive form-building partner.
          </h3>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5 overflow-auto"
          >
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            { }
            {error && <p className="text-sm text-red-500">{error}</p>}

            { }
            {confirmPassword && !passwordsMatch && !error && (
              <p className="text-sm text-amber-600">Passwords do not match.</p>
            )}

            <button
              type="submit"
              disabled={
                !passwordsMatch || !email || loading || !minimunPassword
              }
              className="w-full flex justify-center items-center rounded-md p-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-400/70 bg-[#0075DE]/90 hover:bg-[#006ACD]"
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
                "Sign Up"
              )}
            </button>

            { }
            <div className="flex items-center">
              <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
              <span className="mx-4 flex-shrink text-sm text-gray-500 dark:text-gray-400">
                or
              </span>
              <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
            </div>

            { }
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 py-2.5 font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img src={googleIcon} alt="Google" className="mr-2 h-5 w-5" />
              Continue with Google
            </button>

            { }
            <div className="text-center text-sm text-gray-500">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 font-semibold text-gray-700 dark:text-white underline hover:text-blue-800 dark:hover:text-blue-400"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
