import { z } from "zod";

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?\d{6,16}$/);

export const sendCodeSchema = z.object({
  phone: phoneSchema,
});

export const verifyCodeSchema = z.object({
  phone: phoneSchema,
  code: z.string().trim().length(6),
});

export const registrationSchema = z.object({
  eventSlug: z.string().trim(),
  name: z.string().trim().min(1).max(80),
  wechat: z.string().trim().min(1).max(80),
  email: z.string().email().optional(),
  subscribe: z.boolean().optional(),
  paymentMethod: z.enum(["wechat", "alipay"]).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email().optional(),
  wechat: z.string().trim().max(80).optional(),
  consent: z.boolean().default(true),
});

export const membershipInterestSchema = z.object({
  tier: z.string().trim(),
  contactEmail: z.string().email().optional(),
  contactWechat: z.string().trim().max(80).optional(),
  subscribe: z.boolean().default(true),
});
