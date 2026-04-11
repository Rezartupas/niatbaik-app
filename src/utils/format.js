/**
 * Formats a number into Indonesian Rupiah currency string.
 * @param {number} number - The amount to format.
 * @returns {string} Formatted currency string, e.g. "Rp 150.000.000"
 */
export const formatRupiah = (number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
