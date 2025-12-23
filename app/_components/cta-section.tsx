"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/_components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { CtaSectionProps } from "@/app/_types/ui";

export function CtaSection({
  title,
  description,
  buttons,
  text,
}: CtaSectionProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>{title.line1}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {title.highlight && (
              <span className="gradient-text"> {title.highlight} </span>
            )}
            {title.line2 && <span>{title.line2}</span>}
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {buttons.map((button) => (
              <Link key={button.title} href={button.href}>
                <Button
                  variant={button.variant}
                  size={button.size}
                  className="cursor-pointer font-semibold"
                >
                  {button.title}

                  {button.icons.icon === "arrow-right" && (
                    <ArrowRight className="w-5 h-5 ml-2" />
                  )}

                  {button.icons.icon === "play" && (
                    <Play className="w-5 h-5 ml-2" />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-6">{text}</p>
        </motion.div>
      </div>
    </section>
  );
}
