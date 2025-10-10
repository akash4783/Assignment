export function formatCents(amountCents: number): string {
  const sign = amountCents < 0 ? '-' : ''
  const abs = Math.abs(amountCents)
  // Render as British Pound with a space like "£ 1.20"
  return `${sign}£ ${(abs / 100).toFixed(2)}`
}
