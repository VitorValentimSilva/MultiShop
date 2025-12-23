"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import { HeaderProps } from "@/app/_types/ui/header";
import { icons, withLocale } from "@/app/_lib/ui";
import { LanguageSwitcher } from "@/app/_components/language-switcher";

export function Header({ title, navLinks, buttons }: HeaderProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom max-w-full xl:max-w-11/12">
        <div className="flex items-center justify-between h-20">
          <Link
            href={withLocale(title.href, locale)}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              {title.type === "icon" &&
                (() => {
                  const Icon = icons[title.icon];
                  return <Icon className="w-5 h-5 text-primary-foreground" />;
                })()}

              {title.type === "image" && (
                <Image
                  src={title.src}
                  alt={title.alt}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              )}
            </div>

            <span className="text-xl font-bold text-foreground">
              {title.line1}

              {title.line2 && (
                <span className="gradient-text">{title.line2}</span>
              )}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const href = withLocale(link.value, locale);

              return (
                <Link
                  key={link.value}
                  href={href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />

            {buttons.map((button) => (
              <Button
                key={button.title}
                variant={button.variant}
                size={button.size}
                className="cursor-pointer font-semibold"
              >
                {button.title}
              </Button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container-custom py-6 space-y-4">
              {navLinks.map((link) => {
                const href = withLocale(link.value, locale);
                const isActive = pathname === href;

                return (
                  <Link
                    key={link.value}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 space-y-3 border-t border-border">
                {buttons.map((button) => (
                  <Button
                    key={button.title}
                    variant={button.variant}
                    className="w-full cursor-pointer font-semibold"
                  >
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
