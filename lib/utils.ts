import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate Invite Code
 *
 * This function uses `nanoid` with a custom alphabet to generate a fast,
 * secure, and highly unique invite code. NanoID is designed for high-throughput
 * applications and can safely generate thousands of unique IDs per second with
 * practically zero risk of collision.
 *
 * This approach is more reliable than custom Math.random-based utilities and
 * more convenient than using Node's crypto directly—while still maintaining
 * strong randomness and predictable ID length.
 *
 * @param length - The desired length of the invite code.
 * @returns A unique alphanumeric invite code.
 */
export const generateInviteCode = (length: number) => {
  // Uppercase + lowercase + numbers
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
};
