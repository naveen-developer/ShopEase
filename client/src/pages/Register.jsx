import React, { useState } from "react";
import { Link } from "react-router";
import { Check, Heart, Package, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import useApi from "../shared/useApi";
import { useAuthContext } from "../auth/context/AuthProvider";

function Register() {
  const api = useApi();
  const authContext = useAuthContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);
  // console.log(errorMessage);

  const password = watch("password");

  async function onSubmit(data) {
    try {
      // console.log("Form Data:", data);
      const response = await api.post("/auth/register", {
        name: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      authContext.setAccessToken(response.data.accessToken);
      authContext.setUser(response.data.data.user);

      if (response.status === 200) {
        setErrorMessage(null);
        navigate("/home");
      }

      // console.log(response.data);
    } catch (err) {
      //  console.log(err.response.data);
      setErrorMessage(err.response.data.errors);
      // { message: "Validation failed", errors: [{ field: "password", message: "..." }] }

      //console.log(err.response.data.errors[0].message);
      // "Password must contain at least one uppercase letter"
    }
  }

  return (
    <section className="auth-page auth-page-register">
      <div className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80"
          alt="Shopper carrying bags after a shopping trip"
        />
        <div className="auth-visual-overlay">
          <h2>Join ShopEase</h2>
          <p>Create an account and enjoy a better shopping experience.</p>
          <ul className="auth-benefits">
            <li>
              <Check size={16} aria-hidden="true" /> Exclusive offers
            </li>
            <li>
              <Heart size={16} aria-hidden="true" /> Save favorite products
            </li>
            <li>
              <Package size={16} aria-hidden="true" /> Track orders
            </li>
            <li>
              <Zap size={16} aria-hidden="true" /> Fast checkout
            </li>
          </ul>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <h1>Create Your Account</h1>
          {errorMessage ? (
            <div className="form-error-box">
              <ul>
                {errorMessage.map((value) => (
                  <li>{value.message}</li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {/* First Name + Last Name */}
            <div className="form-row-split">
              <div className="form-field">
                <label htmlFor="username">Username</label>

                <input
                  type="text"
                  id="username"
                  autoComplete="given-name"
                  {...register("username", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                  })}
                />

                {errors.username && (
                  <span className="field-error">{errors.username.message}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="form-field">
              <label htmlFor="registerEmail">Email Address</label>

              <input
                type="email"
                id="registerEmail"
                autoComplete="email"
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
              <label htmlFor="registerPassword">Password</label>

              <input
                type="password"
                id="registerPassword"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                    message: "Password must contain a letter and a number",
                  },
                })}
              />

              {errors.password && (
                <span className="field-error">{errors.password.message}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <input
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: function (value) {
                    return value === password || "Passwords do not match";
                  },
                })}
              />

              {errors.confirmPassword && (
                <span className="field-error">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Terms */}
            <div className="form-field">
              <label className="checkbox-label terms-checkbox">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: "You must accept the terms and conditions",
                  })}
                />

                <span>
                  I agree to the <a href="#">Terms & Conditions</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </span>
              </label>

              {errors.terms && (
                <span className="field-error">{errors.terms.message}</span>
              )}
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary btn-block">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
