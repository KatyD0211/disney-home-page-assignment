
/**
 * Retry an async function with exponential backoff.
 *
 * @param fn            — function that returns a Promise<T>
 * @param retries       — number of total attempts (default: 5)
 * @param delayMs       — initial delay before retry in ms (default: 500)
 * @param backoffFactor — multiplier for delay on each retry (default: 2)
 */



export const useFetchWithRetry = async (
    fn: () => Promise<any>,
    retries: number =5,
    delayMs: number =500, 
    backoffFactor: number =2, 
): Promise<any> => {
    try {
        // first attempt
        return await fn();
      } catch (error) {
        if (retries > 1) {
          // next attempt
          await new Promise(resolve => setTimeout(resolve, delayMs));
          // retry with one fewer attempt, and increased delay
          return useFetchWithRetry(fn, retries - 1, delayMs * backoffFactor, backoffFactor);
        }
        // out of retries time and throw error
        throw error;
      }

};