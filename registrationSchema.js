import { z } from "zod";

// Define one source of truth for validation across the wizard.
export const registrationSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required.")
      .refine((value) => {
        if (!value) return false;
        const date = new Date(`${value}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return !Number.isNaN(date.getTime()) && date <= today;
      }, "Date of birth must be today or earlier."),
    email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
    password: z.string().min(8, "Password must contain at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password.")
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });

// Step 1 validates only personal information.
export const personalInfoSchema = registrationSchema.pick({
  firstName: true,
  lastName: true,
  dateOfBirth: true
});

// Step 2 validates account fields and also checks that passwords match.
export const accountDetailsSchema = registrationSchema
  .pick({
    email: true,
    password: true,
    confirmPassword: true
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });