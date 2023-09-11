export function getImage(path: string): string {
  return new URL(path, import.meta.url).href;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
