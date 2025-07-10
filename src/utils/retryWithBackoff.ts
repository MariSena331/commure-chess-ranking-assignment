import { sleep } from "./sleep";

const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  retries = 4,
  delay = 1000
): Promise<T | null> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const is429 = error?.message?.includes("429") || error?.status === 429;
      const isTimeout =
        error?.message?.includes("timeout") || error?.name === "AboutError";

      if (attempt === retries || (!is429 && !isTimeout)) {
        console.warn(`Failed after ${attempt + 1} attempts:`, error);
        return null;
      }

      const backoff = delay * Math.pow(2, attempt);
      console.warn(
        `Attempt ${attempt + 1} failed, retrying in ${backoff}ms...`,
        error
      );
      await sleep(backoff);
    }
  }

  return null;
};
