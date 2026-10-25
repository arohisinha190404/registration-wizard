import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./schemas/registrationSchema.js";
import ProgressBar from "./components/ProgressBar.jsx";
import StepOne from "./components/StepOne.jsx";
import StepTwo from "./components/StepTwo.jsx";
import StepThree from "./components/StepThree.jsx";
import SuccessScreen from "./components/SuccessScreen.jsx";

// Defaults are kept in the parent so the form values survive step unmounts.
const defaultValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const stepFields = {
  1: ["firstName", "lastName", "dateOfBirth"],
  2: ["email", "password", "confirmPassword"]
};

export default function App() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // React Hook Form owns field values; Zod supplies the validation rules.
  const {
    register,
    watch,
    trigger,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false
  });

  // Validate only the fields visible on the current step before moving forward.
  async function handleNext() {
    const fields = stepFields[step];
    const valid = await trigger(fields, { shouldFocus: true });
    if (valid && step < 3) setStep((current) => current + 1);
  }

  function handleBack() {
    if (step > 1) setStep((current) => current - 1);
  }

  // Log the compiled client-side payload and show the success state.
  async function handleSubmit(event) {
    event.preventDefault();
    const valid = await trigger(undefined, { shouldFocus: true });
    if (!valid) {
      if (errors.firstName || errors.lastName || errors.dateOfBirth) setStep(1);
      else setStep(2);
      return;
    }

    const values = getValues();
    // This is a learning demo; never enter a real password.
    console.log("Registration payload:", { ...values });
    setSubmitted(true);
  }

  function startAgain() {
    reset(defaultValues);
    setStep(1);
    setSubmitted(false);
  }

  // A success screen replaces the wizard after a valid submission.
  if (submitted) {
    return (
      <main className="page-shell">
        <div className="brand-row">
          <div className="brand-mark">R</div>
          <span>Register<span className="brand-dot">.</span></span>
        </div>
        <div className="wizard-card success-card">
          <SuccessScreen onStartAgain={startAgain} />
        </div>
        <footer className="page-footer">A learning project built with React Hook Form + Zod</footer>
      </main>
    );
  }

  // Keep the active step conditional, while values stay in the parent form.
  return (
    <main className="page-shell">
      <div className="brand-row">
        <div className="brand-mark">R</div>
        <span>Register<span className="brand-dot">.</span></span>
      </div>

      <section className="wizard-card">
        <ProgressBar step={step} totalSteps={3} />

        <form onSubmit={handleSubmit} noValidate>
          {step === 1 && <StepOne register={register} errors={errors} />}
          {step === 2 && <StepTwo register={register} errors={errors} watch={watch} />}
          {step === 3 && <StepThree values={getValues()} />}

          <div className={`form-actions ${step === 1 ? "form-actions-first" : ""}`}>
            {step > 1 && (
              <button className="button button-secondary" type="button" onClick={handleBack}>
                ← Back
              </button>
            )}

            {step < 3 ? (
              <button
                className="button button-primary button-next"
                type="button"
                onClick={handleNext}
                disabled={
                  !stepFields[step].every((field) => {
                    const value = watch(field);
                    if (field === "firstName" || field === "lastName") return Boolean(value?.trim());
                    if (field === "dateOfBirth") {
                      if (!value) return false;
                      const date = new Date(`${value}T00:00:00`);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return !Number.isNaN(date.getTime()) && date <= today;
                    }
                    if (field === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
                    if (field === "password") return (value || "").length >= 8;
                    if (field === "confirmPassword") return Boolean(value) && value === watch("password");
                    return false;
                  })
                }
              >
                Next →
              </button>
            ) : (
              <button className="button button-primary button-next" type="submit">
                Submit registration ✓
              </button>
            )}
          </div>
        </form>
      </section>

      <footer className="page-footer">
        A learning project built with React Hook Form + Zod
      </footer>
    </main>
  );
}