// Review the submitted profile fields without exposing the password.
export default function StepThree({ values }) {
  const rows = [
    ["First name", values.firstName],
    ["Last name", values.lastName],
    ["Date of birth", values.dateOfBirth],
    ["Email address", values.email]
  ];

  return (
    <div className="step-content">
      <div className="step-heading">
        <span className="eyebrow">STEP 03</span>
        <h2>Review your details</h2>
        <p>Check the information below before submitting.</p>
      </div>

      <div className="review-list">
        {rows.map(([label, value]) => (
          <div className="review-row" key={label}>
            <span>{label}</span>
            <strong>{value || "—"}</strong>
          </div>
        ))}
      </div>

      <p className="privacy-note">
        Your password is intentionally hidden from this review screen.
      </p>
    </div>
  );
}