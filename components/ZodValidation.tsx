import { z } from "zod";
enum Titles {
  President = "President",
  VicePresident = "Vice President",
  Secretary = "Secretary",
  Member = "Member",
  Manager = "Manager",
  Owner = "Owner",
  Other = "Other",
}
export const ownderSchema = z.object({
  firstNameOwner: z.string().min(1, "First Name is required"),
  middleNameOwner: z.string().optional(),
  lastNameOwner: z.string().min(1, "Last Name is required"),
  ownerTitle: z
    .string()
    .refine((value) => value !== "", {
      message: "You must select a title.",
    })
    .refine((value) => Object.values(Titles).includes(value as any), {
      message: "Invalid title. Please select a valid title from the list.",
    }),
  ownerEmail: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  ownerPhone: z
    .string()
    .min(1, "Business Phone is required")
    .regex(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "Invalid phone number format. Use (###) ###-####"
    ),
  ownerOwnershipPercentage: z
    .number()
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage must be between 0 and 100"),
  ownerSocialSecurity: z
    .string()
    .regex(/^\d{3}-\d{2}-\d{4}$/, "Invalid SSN format"),
  ownerDateOfBirth: z.date(),
});

export type FormValues = z.infer<typeof ownderSchema>;
