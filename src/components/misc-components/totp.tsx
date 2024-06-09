import { toast } from "sonner";
import { TOTP } from "totp-generator";

// Function to generate a TOTP key
export function generateOTP(): string {
    const secretInput = import.meta.env.VITE_TOTP_SECRET;
    // console.log(TOTP.generate(secretInput));
  return TOTP.generate(secretInput).otp;
}

// Function to verify a TOTP key
export function verifyOTP(userOTP: string): boolean {
    // console.log('hello')
  const expectedOTP = generateOTP();
  if (userOTP === expectedOTP) {
    toast("OTP is verified.");
  } else {
    toast("Entered OTP is incorrect.");
  }
  return userOTP === expectedOTP;
}