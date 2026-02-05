/**
 * Utilitário para combinar classes CSS condicionalmente
 * Similar à biblioteca clsx/tailwind-merge
 * Remove classes duplicadas e falsy values
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
