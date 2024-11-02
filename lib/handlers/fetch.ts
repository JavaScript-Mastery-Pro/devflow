import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError, { ResponseType } from "./error";

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

// Type guard to check if the error is an instance of Error
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {},
  responseType: ResponseType = "api"
): Promise<T | ReturnType<typeof handleError>> {
  const {
    timeout = 5000,
    retries = 3,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  let lastError: Error | null = null;

  // Retry logic for the fetch request
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, config);
      clearTimeout(id); // Clear the timeout on successful fetch

      if (!response.ok) {
        throw new RequestError(
          response.status,
          `HTTP error! status: ${response.status}`
        );
      }

      return (await response.json()) as T; // Successfully parsed response
    } catch (error) {
      lastError = isError(error) ? error : new Error("Unknown error");

      // Use the handleError function to manage the error
      const handledResponse = handleError(lastError, responseType);

      // If it's a retry attempt and we encountered an RequestError
      if (lastError instanceof RequestError) {
        // Don't retry for client errors (4xx)
        if (lastError.statusCode >= 400 && lastError.statusCode < 500) {
          return handledResponse; // Return the handled response
        }
      }

      // Handle request timeouts
      if (lastError.name === "AbortError") {
        logger.warn(`Request timed out for ${url}`);
        continue; // Skip to the next attempt
      }

      logger.error(
        `Attempt ${attempt + 1} failed for ${url}: ${lastError.message}`
      );

      // Throw the handled error if it's the last attempt
      if (attempt === retries - 1) {
        return handledResponse; // Return the handled response
      }

      // Exponential backoff delay for retry
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 100)
      );
    }
  }

  return lastError
    ? handleError(lastError, responseType)
    : handleError(new Error("Unknown error"), responseType);
}
