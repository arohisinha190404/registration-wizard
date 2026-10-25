import { useState } from "react";
import FormField from "./FormField.jsx";

// This step receives the same parent-owned form values and validation errors.
export default function StepTwo({ register, errors, watch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password");

  return (
    <div className="step-content">
      <div className="step-heading">
        <span className="eyebrow">STEP 02</span>
        <h2>Account details</h2>
        <p>Create login details for your demo profile.</p>
      </div>

      <FormField id="email" label="Email address" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
        />
      </FormField>

      <FormField
        id="password"
        label="Password"
        error={errors.password?.message}
        hint="Use at least 8 characters. This is a demo form; don't use a real password."
      >
        <div className="password-wrap">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            {...register("password")}
            aria-invalid={Boolean(errors.password)}
          />
          <button
            className="visibility-button"
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </FormField>

      <FormField
        id="confirmPassword"
        label="Confirm password"
        error={errors.confirmPassword?.message}
      >
        <div className="password-wrap">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Type the same password again"
            {...register("confirmPassword")}
            aria-invalid={Boolean(errors.confirmPassword)}
          />
          <button
            className="visibility-button"
            type="button"
            onClick={() => setShowConfirmPassword((visible) => !visible)}
            aria-label={showConfirmPassword ? "Hide confirmation" : "Show confirmation"}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </FormField>

      <div className={`password-meter ${password?.length >= 8 ? "password-meter-valid" : ""}`}>
        <span className="meter-dot" />
        {password?.length >= 8
          ? "Password length requirement met"
          : `${password?.length || 0}/8 characters entered`}
      </div>
    </div>
  );
}