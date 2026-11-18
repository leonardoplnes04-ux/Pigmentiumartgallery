import { v } from "convex/values";
import { mutation } from "./_generated/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const subscribe = mutation({
  args: { email: v.string(), lang: v.string() },
  handler: async (ctx, a) => {
    const email = a.email.trim().toLowerCase();
    if (!EMAIL_RE.test(email) || email.length > 200) throw new Error("invalid_email");
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    if (existing) return existing._id; // ya suscrito: no se duplica
    return ctx.db.insert("subscribers", { email, lang: a.lang === "en" ? "en" : "es" });
  },
});
