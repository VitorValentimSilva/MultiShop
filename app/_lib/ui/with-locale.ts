export function withLocale(href: string, locale: string) {
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}
