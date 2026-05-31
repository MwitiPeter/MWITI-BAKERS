import Redis from "ioredis"
import dotenv from "dotenv"


dotenv.config()

const createNoopRedis = () => ({
	get: async () => null,
	set: async () => null,
	del: async () => null,
})

const redisUrl = process.env.UPSTASH_REDIS_URL

if (!redisUrl) {
	console.warn("UPSTASH_REDIS_URL is not set; Redis cache is disabled")
}

const redisClient = redisUrl ? new Redis(redisUrl) : null

if (redisClient) {
	redisClient.on("error", (error) => {
		console.warn("Redis connection error; cache operations will be skipped", error.message)
	})
}

export const redis = redisClient ?? createNoopRedis()

