import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch,  } from "react-redux";
import { useModal } from "../../context/Modal";

function LoginFormModal({isPage = false}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    user: "",
    password: "",
  })
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user: formData.user,
      password: formData.password
    };

    const serverResponse = await dispatch(thunkLogin({ email, password }));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      if (!isPage) closeModal();
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      setErrors(["An error occurred during login"]);
    }
  };

  const handleChange = (error) => {
    setFormData({ ...formData, [error.target.name]: error.target.value });
  }

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const demoData = {
      user: "Demo",
      password: "password"
    };

    try {
      const serverResponse = await dispatch(thunkLogin(demoData));
      console.log("Server response:", serverResponse);

      if (serverResponse && serverResponse.errors) {
        setErrors(serverResponse.errors);
        return;
      }


      if (serverResponse && !serverResponse.errors) {
        if (!isPage) closeModal();
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Demo login error:", error);
      setErrors(["Failed to log in as demo user"]);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const adminData = {
      user: "AdminUser",
      password: "secureadminpassword"
    };

    try {
      const serverResponse = await dispatch(thunkLogin(adminData));
      console.log("Admin login response:", serverResponse);

      if (serverResponse.errors) {
        setErrors(serverResponse.errors);
        return;
      }

      if (!isPage) closeModal();

      // Check role and redirect
      if (serverResponse.role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Admin login error:", error);
      setErrors(["Failed to log in as admin user"]);
    }
  };

  return (
    <div className="w-full" style={{ backgroundColor: "#2c3e50" }}>
      {/* Modal Title */}
      <h1
        className="text-center text-2xl font-bold mb-6"
        style={{ color: "#f8f5f2" }}
      >
        Log In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email Field */}
        <div className="flex flex-col">
          <label className="mb-1" style={{ color: "#f8f5f2" }}>
            Email
          </label>
          <input
            type="text"
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
        {/* Submission Button */}
        <button
          type="submit"
          className="mt-4 py-2 rounded font-bold bg-[#cba135] hover:bg-blush transition-colors duration-300"
        >
          Log In
        </button>
      </form>
    </div>
  );
}


export default LoginFormModal;
