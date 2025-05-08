
/**
 * Retry an async function with exponential backoff.
 *
 * @param fn            — function that returns a Promise<T>
 * @param retries       — number of total attempts (default: 3)
 * @param delayMs       — initial delay before retry in ms (default: 500)
 * @param backoffFactor — multiplier for delay on each retry (default: 2)
 */



export const fetchWithRetry = async (
    fn: () => Promise<any>,
    retries: number =3,
    delayMs: number =500, 
    backoffFactor: number =2, 
): Promise<any> => {
    try {
        // first (or retried) attempt
        return await fn();
      } catch (error) {
        if (retries > 1) {
          // pause before next attempt
          await new Promise(resolve => setTimeout(resolve, delayMs));
          // retry with one fewer attempt, and increased delay
          return fetchWithRetry(fn, retries - 1, delayMs * backoffFactor, backoffFactor);
        }
        // out of retries—bubble up the error
        throw error;
      }

};