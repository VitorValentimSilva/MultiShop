"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Store, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { HeroSectionProps } from "@/app/_types/ui";

export function HeroSection({
  icons,
  title,
  description,
  buttons,
  stats,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-secondary/50">
      {icons !== undefined && icons.length > 0 && (
        <>
          <motion.div
            className="absolute top-32 left-[10%] hidden lg:block"
            animate={{ y: 10 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
          >
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
              {icons[0].icon === "store" && (
                <Store className="w-8 h-8 text-primary" />
              )}
            </div>
          </motion.div>

          <motion.div
            className="absolute top-48 right-[15%] hidden lg:block"
            animate={{ y: 10 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
              delay: 1.2,
            }}
          >
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-accent/20 to-accent/5 backdrop-blur-sm border border-accent/20 flex items-center justify-center">
              {icons[1].icon === "users" && (
                <Users className="w-7 h-7 text-accent" />
              )}
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-48 left-[15%] hidden lg:block"
            animate={{ y: 10 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
              delay: 2,
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-accent/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
              {icons[2].icon === "zap" && (
                <Zap className="w-6 h-6 text-primary" />
              )}
            </div>
          </motion.div>
        </>
      )}

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            {title.line1}
            {title.highlight && (
              <span className="gradient-text"> {title.highlight} </span>
            )}
            {title.line2 && <span>{title.line2}</span>}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
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
          </motion.div>

          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
