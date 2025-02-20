import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (error) => {
    error.preventDefault();
    setErrors([]);

    const serverResponse = await dispatch(thunkLogin(formData));
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const handleChange = (error) => {
    setFormData({ ...formData, [error.target.name]: error.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="relative z-50">
        <form
          onSubmit={handleSubmit}
          className="bg-ivory text-midnight rounded-lg shadow-lg p-8 max-w-md w-full space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Log In</h2>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx} className="text-red-500 text-sm">
                {error}
              </li>
            ))}
          </ul>
          <div>
            <label htmlFor="user" className="block text-sm font-medium mb-2">
              Email or Username
            </label>
            <input
              id="user"
              name="user"
              type="text"
              value={formData.user}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gold"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gold"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gold text-ivory py-2 px-4 rounded font-semibold hover:bg-charcoal transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
