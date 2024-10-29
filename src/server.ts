import app from "./app";
import config from "./config/config";
import { AppDataSource } from "./database/data-source";
import { initializeCronJob } from "./utils/helpers/cronJob";

(async () => {
    try {
        app.listen(config.APP_PORT, async () => {
            if (!AppDataSource.isInitialized) {
                await AppDataSource.initialize();
            }
            await initializeCronJob();
            console.log(`Server started on port ${config.APP_PORT} 🔥🔥🔥`);
        });

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Database connection error: ${err.message}`);
        } else {
            console.error(`Unexpected error during startup: ${err}`);
        }
        process.exit(1);
    }
})();
