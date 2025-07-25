import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/Input";
import thoughtfulGirl from "../../assets/open-doodles-reading-side.gif";
import googleIcon from "../../assets/google-color-icon.svg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Derived state to check if passwords match.
  const passwordsMatch = password && password === confirmPassword;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Clear previous errors on new submission
    setError("");

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await registerUser(email, password);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
 
    <div className="flex max-h-screen max-w-screen items-center justify-center bg-gray-100 p-4 font-inter">
      {/* Card container: handles the two-column layout */}
      <div className="flex w-full max-w-4xl flex-col overflow-hidden max-h-160 rounded-2xl bg-white shadow-2xl md:flex-row ">
        
        {/* Left Side: Illustration + Text. Hidden on mobile. */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-white p-12  text-center">
          <div className="font-medium text-4xl lg:text-5xl text-zinc-800">
            The one{" "}
            <span className="bg-gradient-to-r from-[#F5CE9B] to-[#E84C4A] bg-clip-text text-transparent">
              Stylish
            </span>{" "}
            yet{" "}
            <span className="bg-gradient-to-r from-[#D06BD1] to-[#272640] bg-clip-text text-transparent">
              Simple
            </span>{" "}
           &nbsp; form  builder.
          </div>
          <img
            src={thoughtfulGirl}
            alt="Registration Illustration"
            className="mt-8 max-w-xs object-contain"
          />
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full bg-white p-8 md:w-1/2 lg:p-10">
          <h1 className="text-4xl font-extrabold text-zinc-800 text-nowrap">Craft intelligent forms</h1>
          <h3 className="mt-2 text-base text-zinc-500 ">
            Meet FormBuddy, your intuitive  form-building partner.
          </h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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

            {/* Error messaging for password mismatch or API errors */}
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            {/* Conditional rendering for password mismatch hint */}
            {confirmPassword && !passwordsMatch && !error && (
              <p className="text-sm text-amber-600">Passwords do not match.</p>
            )}

            <button
              type="submit"
              disabled={!passwordsMatch || !email}
              className="w-full rounded-md p-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-gray-400/70 bg-[#0075DE]/90 hover:bg-[#006ACD]"
            >
              Sign Up
            </button>

            {/* Divider with "or" */}
            <div className="flex items-center">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 flex-shrink text-sm text-gray-500">or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Google Sign-in */}
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-gray-300 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              <img src={googleIcon} alt="Google" className="mr-2 h-5 w-5" />
              Continue with Google
            </button>

            {/* Link to Login */}
            <div className="text-center text-sm text-gray-500">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 font-semibold text-gray-700 underline hover:text-blue-800"
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
