import { disconnectE2EDB, cleanupE2EData } from "@/tests/config/db-e2e";

async function globalTeardown() {
  console.log("🧹 Starting E2E test global teardown...");

  try {
    // Clean up all test data from the database
    await cleanupE2EData();

    // Disconnect from the E2E test database
    await disconnectE2EDB();

    console.log("✅ E2E global teardown completed successfully");
    console.log("🗑️ Test data cleaned up");
    console.log("🔌 Database connection closed");
  } catch (error) {
    console.error("❌ E2E global teardown failed:", error);
  }
}

export default globalTeardown;
