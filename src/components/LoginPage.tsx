import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"; 
import { loginAsync } from "../redux/authSlice";
import type { RootState, AppDispatch } from "../redux/store";
import "./LoginPage.css";

interface FormData {
  email: string;
  password: string;
  role: "Admin" | "User";
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, email, role, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "User",
  });

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value as "Admin" | "User",
    });

    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear error
  };

  const validateFields = () => {
    const errors: { email?: string; password?: string } = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required!";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required!";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  const handleLogin = () => {
    if (!validateFields()) return; 

    dispatch(loginAsync(formData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      setShowPopup(true);
       navigate("/movie", { replace: true }); 
    }
  }, [isLoggedIn]);

  return (
     <div className="login-page-wrapper">
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <label>Select Role</label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>

      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
        className={fieldErrors.email ? "error-border" : ""}
      />
      {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}

      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
        className={fieldErrors.password ? "error-border" : ""}
      />
      {fieldErrors.password && (
        <p className="field-error">{fieldErrors.password}</p>
      )}

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "⏳ Logging in..." : "Login"}
      </button>
      <NavLink to="/movie" className="link">Login as Guest</NavLink>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>

            <h3>Login Successful!</h3>
            <p>
              Logged in as <strong>{role}</strong> ({email})
            </p>
           <button
            onClick={() => {
            setShowPopup(false);     
            navigate("/movie", { replace: true });   
            }}
            >
            OK
            </button>

          </div>
        </div>
      )}

    </div>
    </div>
  );
};

export default LoginPage;
