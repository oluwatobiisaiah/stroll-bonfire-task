import { createClient } from "redis";
import config from "../../config/config";

const redisClient = createClient({
    socket: {
        reconnectStrategy: function (retries) {
            if (retries > 20) {
                console.log("Too many attempts to reconnect. Redis connection was terminated");
                return new Error("Too many retries.");
            } else {
                return retries * 500;
            }
        }
    },
    legacyMode:false
    // username: config.REDIS_USERNAME,
    // password: config.REDIS_PASSWORD,
    // name: config.REDIS_NAME,
    
});
redisClient.on('error', error => console.error('Redis client error:', error));
redisClient.connect();
export default redisClient;
