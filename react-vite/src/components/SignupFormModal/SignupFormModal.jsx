import { useState } from "react";
import { thunkSignup } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function SignupFormModal() {
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
      closeModal();
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full" style={{ backgroundColor: "#2c3e50" }}>
      {/* Modal Title */}
      <h1
        className="text-center text-2xl font-bold mb-6"
        style={{ color: "#f8f5f2" }}
      >
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email Field */}
        <div className="flex flex-col">
          <label className="mb-1" style={{ color: "#f8f5f2" }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 rounded"
            style={{
              backgroundColor: "#f8f5f2",
              color: "#2c3e50",
              border: "1px solid #4a4a4a",
            }}
          />
          {errors.email && (
            <p className="text-sm mt-1" style={{ color: "#ff6f61" }}>
              {errors.email}
            </p>
          )}
        </div>
        {/* Username Field */}
        <div className="flex flex-col">
          <label className="mb-1" style={{ color: "#f8f5f2" }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2 rounded"
            style={{
              backgroundColor: "#f8f5f2",
              color: "#2c3e50",
              border: "1px solid #4a4a4a",
            }}
          />
          {errors.username && (
            <p className="text-sm mt-1" style={{ color: "#ff6f61" }}>
              {errors.username}
            </p>
          )}
        </div>
        {/* Password Field */}
        <div className="flex flex-col">
          <label className="mb-1" style={{ color: "#f8f5f2" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 rounded"
            style={{
              backgroundColor: "#f8f5f2",
              color: "#2c3e50",
              border: "1px solid #4a4a4a",
            }}
          />
          {errors.password && (
            <p className="text-sm mt-1" style={{ color: "#ff6f61" }}>
              {errors.password}
            </p>
          )}
        </div>
        {/* Confirm Password Field */}
        <div className="flex flex-col">
          <label className="mb-1" style={{ color: "#f8f5f2" }}>
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="p-2 rounded"
            style={{
              backgroundColor: "#f8f5f2",
              color: "#2c3e50",
              border: "1px solid #4a4a4a",
            }}
          />
          {errors.confirmPassword && (
            <p className="text-sm mt-1" style={{ color: "#ff6f61" }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>
        {/* Submission Button */}
        <button
          type="submit"
          className="mt-4 py-2 rounded font-bold bg-[#cba135] hover:bg-blush transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}


export default SignupFormModal;
