import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    localStorage.setItem("user", "Vansh Bansal");

    navigate("/dashboard", { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        <h1>Welcome to TaskMatrix</h1>

        <p style={{ color: "#64748b" }}>
          Sign in to continue to your workspace.
        </p>

        <button
          onClick={handleLogin}
          className="primary-button"
          style={{
            width: "100%",
            marginTop: "24px",
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;