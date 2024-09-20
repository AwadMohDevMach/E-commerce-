import { z } from "zod";




    const signUpSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1, { message: "last name is required" }),
    email: z.string().min(1, { message: "email address is required" }).email(),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 chractres long" })
      .regex(/.*[!@#$%^&*()_+{}|[\\:";'<>,./]*./, {
        message: "Password should be cntain at least 1 special characters",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "password and confirmpassword does not match",
    path: ["confirmPassword"],
  });


  type signUpType = z.infer<typeof signUpSchema>;
  
export  {signUpSchema , type signUpType }
