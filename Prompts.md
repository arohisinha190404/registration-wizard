# AI Learning / Debugging Log — Sprint 07

> Keep this file honest: edit the entries to match the questions you actually asked and the changes you actually made. Do not claim testing or debugging you did not perform.

## Session 1 — Architecture planning

**Prompt topic:** Explain a three-step React registration wizard with lifted state, conditional rendering, live validation, and persistent values when navigating Back.

**Learning notes:**
- The parent component owns the unified form values and current step.
- Step components receive values and callbacks as props.
- Conditional rendering can unmount one step, but parent state survives.
- Validation messages should be connected to the corresponding input.

## Session 2 — Form validation

**Prompt topic:** Explain how React Hook Form, Zod, and `zodResolver` work together for email format, minimum password length, and password confirmation.

**Learning notes:**
- Zod defines validation rules in one schema.
- `zodResolver` connects the schema to React Hook Form.
- `mode: "onChange"` enables validation as the user types.
- The Next button is disabled until the current step's fields are valid.

## Session 3 — Run and deployment checklist

**Prompt topic:** Help diagnose local Vite startup errors, GitHub upload issues, or Vercel build errors using the actual terminal output.

**Learning notes:**
- Run `npm install` before `npm run dev`.
- Run `npm run build` before deployment.
- Check exact filename casing because Vercel's build environment is case-sensitive.
- Do not put `node_modules`, secrets, or real passwords in GitHub.

## Manual QA checklist

- [ ] Step 1 Next stays disabled until personal details are valid.
- [ ] Step 2 shows a live email error for an invalid email.
- [ ] Password shorter than 8 characters is rejected.
- [ ] Confirm Password must match Password.
- [ ] Show/Hide toggles password visibility.
- [ ] Going Back retains previously entered values.
- [ ] Step 3 displays a review of non-password details.
- [ ] Submit logs the final payload and shows success.
- [ ] `npm run build` succeeds.
- [ ] GitHub repository and deployed URL are verified.

## Before submission

Add your own date, the real errors you encountered, the prompts you actually used, what you changed, and what you learned. Do not submit this template unchanged if your training policy requires a truthful session log.
