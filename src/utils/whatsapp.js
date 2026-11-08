export function isValidWhatsappNumber(number) {
  return /^\d{8,15}$/.test(String(number || "").replace(/\D/g, ""));
}

export function whatsappUrl(number, message = "") {
  const normalizedNumber = String(number || "").replace(/\D/g, "");

  if (!isValidWhatsappNumber(normalizedNumber)) return null;

  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}
