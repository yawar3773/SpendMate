import ratelimit from "../config/upstash.js"

const ratelimiter = async (req, res , next) => {
    try {
        //Here we just kept it simple.
        //in real world we use userId or ipAddress
        const {success} = await ratelimit.limit("my-rate-limit");
        if(!success){
            return res.status(429).json(
                {message:"Too many requests, Please try again later!"}
            );
        }
        next();

    } catch (error) {
        console.log("Rate Limit error", error);
        next(error);
    }
};

export default ratelimiter;

