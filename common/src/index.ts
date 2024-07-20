import { z } from "zod";

export const SignupInput = z.object({
    name: z.string().optional(),
    username: z.string().email(),
    password: z.string().min(7)
});

export const SigninInput = z.object({
    username: z.string().email(),
    password: z.string().min(7)
});

export const SendingSchema = z.object({
    sendername: z.string().email(),
    receivername: z.string().email(),
    amount: z.number().positive()
});

export type Sending = z.infer<typeof SendingSchema>;
export type SigninInput = z.infer<typeof SigninInput>;
export type SignupInput = z.infer<typeof SignupInput>;
