import rateLimit from 'express-rate-limit';

// all rate limits are included in this page

const passwordLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 mins
   max: 10,
   standardHeaders: true,
   legacyHeaders: false,
});

export { passwordLimiter };
