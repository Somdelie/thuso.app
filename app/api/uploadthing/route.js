import { createRouteHandler } from "uploadthing/next"; // Import the replacement function
import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  // Update to use createRouteHandler
  router: ourFileRouter,
});
