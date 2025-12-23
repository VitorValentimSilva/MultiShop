"use client";

import Link from "next/link";
import { FooterProps } from "@/app/_types/ui";
import { icons, withLocale } from "../_lib/ui";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer({
  title,
  description,
  socialLinks,
  footerLinks,
  contacts,
  text,
}: FooterProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <Link
              href={withLocale(title.href, locale)}
              className="flex items-center gap-2 mb-6"
            >
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

              <span className="text-xl font-bold text-foreground">
                {title.line1}

                {title.line2 && (
                  <span className="gradient-text">{title.line2}</span>
                )}
              </span>
            </Link>

            <p className="text-muted-foreground mb-6 max-w-xs">{description}</p>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = icons[social.icon];

                return (
                  <a
                    key={social.label}
                    href={withLocale(social.value, locale)}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          </div>

          {footerLinks.map((linkGroup) => (
            <div key={linkGroup.name}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {linkGroup.name}
              </h3>
              <ul className="flex flex-col gap-2">
                {linkGroup.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={withLocale(link.value, locale)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {contacts.map((contact) => {
              const Icon = icons[contact.icon];

              const Content = (
                <>
                  {Icon && <Icon className="w-4 h-4" />}
                  {contact.value}
                </>
              );

              return contact.href ? (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  {Content}
                </a>
              ) : (
                <span key={contact.label} className="flex items-center gap-2">
                  {Content}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>{text.line1}</p>
            <p>{text.line2}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
