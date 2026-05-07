import ratelimit from "../config/upstash.js";

export const rateLimiter = async(req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");

        if(!success) {
            return res.status(429).json({ error: "Too many requests" });
        }
        next();
    } catch (error) {
        console.error("Error in rate limiter:", error);
        next(error); // Don't block requests if rate limiter fails
    }
}

