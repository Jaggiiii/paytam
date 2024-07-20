"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sending = exports.SigninInput = exports.SignupInput = void 0;
const zod_1 = require("zod");
exports.SignupInput = zod_1.z.object({
    name: zod_1.z.string().optional(),
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(7)
});
exports.SigninInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(7)
});
exports.Sending = zod_1.z.object({
    sendername: zod_1.z.string().email(),
    receivername: zod_1.z.string().email(),
    amount: zod_1.z.number().positive()
});
