import FormField from "./FormField.jsx";

// This child renders personal fields; their values live in the parent form.
export default function StepOne({ register, errors }) {
  return (
    <div className="step-content">
      <div className="step-heading">
        <span className="eyebrow">STEP 01</span>
        <h2>Personal information</h2>
        <p>Let's start with a few details about you.</p>
      </div>

      <div className="field-grid">
        <FormField id="firstName" label="First name" error={errors.firstName?.message}>
          <input
            id="firstName"
            autoComplete="given-name"
            placeholder="e.g. Asha"
            {...register("firstName")}
            aria-invalid={Boolean(errors.firstName)}
          />
        </FormField>

        <FormField id="lastName" label="Last name" error={errors.lastName?.message}>
          <input
            id="lastName"
            autoComplete="family-name"
            placeholder="e.g. Sharma"
            {...register("lastName")}
            aria-invalid={Boolean(errors.lastName)}
          />
        </FormField>
      </div>

      <FormField
        id="dateOfBirth"
        label="Date of birth"
        error={errors.dateOfBirth?.message}
        hint="Choose today's date or an earlier date."
      >
        <input
          id="dateOfBirth"
          type="date"
          autoComplete="bday"
          max={new Date().toISOString().slice(0, 10)}
          {...register("dateOfBirth")}
          aria-invalid={Boolean(errors.dateOfBirth)}
        />
      </FormField>
    </div>
  );
}