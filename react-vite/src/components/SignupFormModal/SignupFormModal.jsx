import { useState, useEffect } from "react";
import { thunkSignup } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaCheck, FaTimes } from "react-icons/fa";

function SignupFormModal({isPage = false}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const [passwordRequirements, setPasswordRequirements] = useState({
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false
  });

  useEffect(() => {
    setPasswordRequirements({
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 8
    });
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPasswordValid = Object.values(passwordRequirements).every(req => req);

    if (!isPasswordValid) {
      return setErrors({
        password: "Please meet all password requirements"
      });
    }

    if (password !== confirmPassword) {
      setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
      return;
    }

    const serverResponse = await dispatch(
      thunkSignup({ email, username, password })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      if (!isPage) closeModal();
      if (serverResponse && serverResponse.user && serverResponse.user.role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  };

  const RequirementIndicator = ({ met, text }) => (
    <div className="flex items-center gap-2 text-sm">
      <div className={`rounded-full p-1 ${met ? 'bg-green-500' : 'bg-gray-300'}`}>
        {met ? <FaCheck className="text-white w-3 h-3" /> : <FaTimes className="text-white w-3 h-3" />}
      </div>
      <span className={met ? 'text-green-500' : 'text-gray-400'}>{text}</span>
    </div>
  );

  return (
    <div className="w-full max-w-md p-6 bg-midnight rounded-lg relative">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-ivory hover:text-gold transition-colors"
      >
        <IoMdClose size={24} />
      </button>

      {/* Modal Title */}
      <h1 className="text-center text-2xl font-bold mb-6 text-ivory">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label className="text-ivory">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded bg-ivory text-midnight border border-charcoal focus:outline-none focus:border-gold"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Username Field */}
        <div className="flex flex-col gap-1">
          <label className="text-ivory">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2 rounded bg-ivory text-midnight border border-charcoal focus:outline-none focus:border-gold"
            placeholder="Choose a username"
          />
          {errors.username && (
            <p className="text-red-400 text-sm">{errors.username}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label className="text-ivory">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 rounded bg-ivory text-midnight border border-charcoal focus:outline-none focus:border-gold"
            placeholder="Create a password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}

          {/* Password Requirements */}
          <div className="mt-2 space-y-2 bg-midnight/50 p-3 rounded">
            <RequirementIndicator
              met={passwordRequirements.hasUpperCase}
              text="At least one uppercase letter"
            />
            <RequirementIndicator
              met={passwordRequirements.hasNumber}
              text="At least one number"
            />
            <RequirementIndicator
              met={passwordRequirements.hasSpecialChar}
              text="At least one special character"
            />
            <RequirementIndicator
              met={passwordRequirements.hasMinLength}
              text="Minimum 8 characters"
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1">
          <label className="text-ivory">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="p-2 rounded bg-ivory text-midnight border border-charcoal focus:outline-none focus:border-gold"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 py-2 px-4 rounded font-bold bg-gold hover:bg-gold/80 text-midnight transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
