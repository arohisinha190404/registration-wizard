// Show the current step and visual progress through the wizard.
export default function ProgressBar({ step, totalSteps }) {
  const progress = (step / totalSteps) * 100;

  return (
    <section className="progress-section" aria-label="Registration progress">
      <div className="progress-labels">
        <span>Registration</span>
        <span>Step {step} of {totalSteps}</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${step} of ${totalSteps}`}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="step-dots" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => {
          const number = index + 1;
          return (
            <span
              key={number}
              className={`step-dot ${number <= step ? "step-dot-active" : ""}`}
            >
              {number}
            </span>
          );
        })}
      </div>
    </section>
  );
}