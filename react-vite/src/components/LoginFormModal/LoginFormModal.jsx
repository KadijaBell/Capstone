import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaUser, FaLock, FaUserShield, FaUserAstronaut } from "react-icons/fa";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverResponse = await dispatch(thunkLogin({ user, password }));
      console.log("Login Response:", serverResponse);

      if (serverResponse && serverResponse.errors) {
        setErrors(serverResponse.errors);
      } else {
        await closeModal();
        if (serverResponse && serverResponse.role === 'admin') {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(["An error occurred during login"]);
    }
  };

  const handleDemoLogin = async () => {
    try {
      console.log("Attempting demo login...");
      const serverResponse = await dispatch(
        thunkLogin({
          user: "Demo",
          password: "password",
        })
      );
      console.log("Demo Login Response:", serverResponse);

      if (serverResponse && serverResponse.errors) {
        setErrors(serverResponse.errors);
      } else {
        await closeModal();
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors(["Failed to log in as demo user"]);
    }
  };

  const handleAdminLogin = async () => {
    try {
      console.log("Attempting admin login...");
      const serverResponse = await dispatch(
        thunkLogin({
          user: "admin@capstone.com",
          password: "secureadminpassword",
        })
      );
      console.log("Admin Login Response:", serverResponse);

      if (serverResponse && serverResponse.errors) {
        setErrors(serverResponse.errors);
      } else {
        await closeModal();
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setErrors(["Failed to log in as admin user"]);
    }
  };

  return (
    <div className="w-full max-w-md bg-midnight p-8 rounded-lg shadow-xl relative">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-ivory hover:text-gold transition-colors"
      >
        <IoMdClose size={24} />
      </button>

      <h1 className="text-center text-2xl font-bold mb-8 text-ivory">Welcome Back</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Username/Email Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaUser className="text-charcoal" />
          </div>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            placeholder="Username or Email"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-ivory text-midnight border border-charcoal focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="text-charcoal" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-ivory text-midnight border border-charcoal focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <ul className="text-red-400 text-sm list-disc list-inside">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-bold bg-gold hover:bg-gold/80 text-midnight transition-colors duration-300"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-charcoal/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-midnight text-ivory">Or continue with</span>
          </div>
        </div>

        {/* Demo Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="flex items-center justify-center gap-2 py-3 rounded-lg font-medium bg-mint/20 hover:bg-mint/30 text-mint transition-colors duration-300"
          >
            <FaUserAstronaut />
            Demo User
          </button>
          <button
            type="button"
            onClick={handleAdminLogin}
            className="flex items-center justify-center gap-2 py-3 rounded-lg font-medium bg-blush/20 hover:bg-blush/30 text-blush transition-colors duration-300"
          >
            <FaUserShield />
            Demo Admin
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
