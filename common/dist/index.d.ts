import { z } from "zod";
export declare const SignupInput: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    name?: string | undefined;
}, {
    username: string;
    password: string;
    name?: string | undefined;
}>;
export declare const SigninInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const Sending: z.ZodObject<{
    sendername: z.ZodString;
    receivername: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    sendername: string;
    receivername: string;
    amount: number;
}, {
    sendername: string;
    receivername: string;
    amount: number;
}>;
export type Sending = z.infer<typeof Sending>;
export type signinInput = z.infer<typeof SigninInput>;
export type SignupInput = z.infer<typeof SignupInput>;
