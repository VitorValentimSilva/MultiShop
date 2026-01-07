export const USERS = [
  {
    name: "Admin Master",
    email: "admin@multishop.com",
    emailVerified: new Date("2026-01-01"),
    image: null,
    passwordHash:
      "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    tenantSlug: "multishop",
    roles: ["admin"],
  },
  {
    name: "Demo User",
    email: "demo@multishop.com",
    emailVerified: new Date("2026-01-02"),
    image: null,
    passwordHash:
      "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    tenantSlug: "multishop",
    roles: ["user"],
  },
  {
    name: "Store Manager",
    email: "manager@multishop.com",
    emailVerified: new Date("2026-01-03"),
    image: null,
    passwordHash:
      "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    tenantSlug: "multishop",
    roles: ["manager"],
  },
] as const;
