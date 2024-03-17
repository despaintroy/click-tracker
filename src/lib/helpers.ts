/**
 * Formats a US phone number to E.164 format
 */
export function standardizePhoneNumber(phoneNumber: string) {
  const cleaned = phoneNumber.replaceAll(/[^0-9]/g, "")
  if (cleaned.length === 10) {
    return `+1${cleaned}`
  } else if (cleaned.length === 11 && cleaned[0] === "1") {
    return `+${cleaned}`
  } else {
    throw new Error("Invalid phone number")
  }
}

/**
 * Formats a US phone number to (###) ###-####
 */
export function formatPhoneNumber(phoneNumber: string) {
  try {
    const standardized = standardizePhoneNumber(phoneNumber)
    const tenDigit = standardized.slice(2)
    return `(${tenDigit.slice(0, 3)}) ${tenDigit.slice(3, 6)}-${tenDigit.slice(
      6
    )}`
  } catch {
    return phoneNumber
  }
}
