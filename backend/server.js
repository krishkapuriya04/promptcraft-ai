require("dotenv").config();
const { validateEnv } = require("./src/config/validateEnv");
const app = require("./src/app");
const connectDatabase = require("./src/config/database");

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  validateEnv();
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`PromptCraft API is running on port ${PORT}`);
  });
}

bootstrap();