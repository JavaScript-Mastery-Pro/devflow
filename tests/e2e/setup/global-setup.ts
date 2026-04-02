import { connectE2EDB, cleanupE2EData, getE2EConnectionInfo, isE2EDBConnected } from "@/tests/config/db-e2e";
import { seed } from "@/tests/seeders/e2e.seeder";

async function globalSetup() {
  console.log("🚀 Starting E2E test global setup...");

  try {
    // Connect to the E2E test database
    await connectE2EDB();

    // Verify connection is established
    const connectionInfo = getE2EConnectionInfo();
    console.log("🔍 E2E Database connection info:", {
      database: connectionInfo.dbName,
      host: connectionInfo.host,
      port: connectionInfo.port,
      isConnected: connectionInfo.isConnected,
    });

    if (!isE2EDBConnected) {
      throw new Error("Failed to establish stable E2E database connection");
    }

    // Clean up any existing test data to start fresh
    await cleanupE2EData();

    // Seed the database with test data
    const seedData = await seed();

    console.log("✅ E2E global setup completed successfully");
    console.log(`👥 Created ${Object.keys(seedData.users).length} test users`);
    console.log(`❓ Created ${Object.keys(seedData.questions).length} test questions`);
  } catch (error) {
    console.error("❌ E2E global setup failed:", error);
    process.exit(1); // Exit with error code to stop test execution
  }
}

export default globalSetup;
