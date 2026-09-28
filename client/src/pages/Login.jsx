import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Check, Package, Heart, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import useApi from "../shared/useApi";
import { useAuthContext } from "../auth/context/AuthProvider";

function Login() {
  const api = useApi();
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const [loginErrorMsg, setLoginErrorMsg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      //console.log("Login Data:", data);

      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // console.log(response);
      //    console.log(response.data);

      if (response.status === 200) {
        setLoginErrorMsg(null);
        navigate("/home");
      }

      authContext.setAccessToken(response.data.accessToken);
      authContext.setUser(response.data.user);
    } catch (error) {
      console.log(error.response);
      setLoginErrorMsg(error.response.data.message);
    }
  }
  return (
    <section className="auth-page">
      <div className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
          alt="Shopper browsing racks of clothing in a bright boutique"
        />
        <div className="auth-visual-overlay">
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your shopping experience.</p>
          <ul className="auth-benefits">
            <li>
              <Check size={16} aria-hidden="true" /> Exclusive offers
            </li>
            <li>
              <Package size={16} aria-hidden="true" /> Track your orders
            </li>
            <li>
              <Heart size={16} aria-hidden="true" /> Save favorite products
            </li>
            <li>
              <ShieldCheck size={16} aria-hidden="true" /> Fast & secure
              checkout
            </li>
          </ul>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <h1>Login to Your Account</h1>

          {loginErrorMsg ? (
            <div className="form-error-box">
              <ul>
                <li>{loginErrorMsg}</li>
              </ul>
            </div>
          ) : (
            ""
          )}

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="form-field">
              <label htmlFor="email">Email Address</label>

              <input
                type="email"
                id="email"
                autoComplete="email"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />

              {errors.email && (
                <span className="field-error">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-field">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                autoComplete="current-password"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />

              {errors.password && (
                <span className="field-error">{errors.password.message}</span>
              )}
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>

          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
