// Displayed after the final payload is logged successfully.
export default function SuccessScreen({ onStartAgain }) {
  return (
    <section className="success-screen" aria-live="polite">
      <div className="success-icon" aria-hidden="true">✓</div>
      <span className="eyebrow">ALL DONE</span>
      <h2>Registration complete!</h2>
      <p>Your demo profile has been submitted successfully.</p>
      <p className="privacy-note">
        This is a front-end demonstration. No account was created and no data was sent to a server.
      </p>
      <button className="button button-primary" type="button" onClick={onStartAgain}>
        Start again
      </button>
    </section>
  );
}