"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { PricingSectionProps } from "@/app/_types/ui";

export function PricingSection({
  title,
  description,
  typePricing,
  plans,
}: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section className="section-padding relative overflow-hidden bg-secondary/30">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            {title.line1}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {title.highlight && (
              <span className="gradient-text"> {title.highlight} </span>
            )}
            {title.line2 && <span>{title.line2}</span>}
          </h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          {typePricing.map(
            (type) =>
              type.type === "monthly" && (
                <span
                  key={type.type}
                  className={`text-sm font-medium flex items-center gap-2 ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {type.type}
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-bold">
                    {type.description}
                  </span>
                </span>
              ),
          )}

          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              isYearly ? "bg-primary" : "bg-secondary"
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-foreground transition-transform duration-300 ${
                isYearly ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>

          {typePricing.map(
            (type) =>
              type.type === "annual" && (
                <span
                  key={type.type}
                  className={`text-sm font-medium flex items-center gap-2 ${isYearly ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {type.type}
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-bold">
                    {type.description}
                  </span>
                </span>
              ),
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl ${
                plan.popular
                  ? "bg-linear-to-b from-primary/20 to-card border-2 border-primary shadow-lg shadow-primary/20"
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-linear-to-r from-primary to-accent text-primary-foreground text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    R$ {isYearly ? plan.priceMonthly : plan.priceAnnual}
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                  {isYearly && (
                    <p className="text-sm text-accent mt-1">
                      Economize R$ {(plan.priceMonthly - plan.priceAnnual) * 12}
                      /ano
                    </p>
                  )}
                </div>

                <Link href="/planos">
                  <Button
                    variant={plan.popular ? "secondary" : "outline"}
                    className="w-full mb-8"
                  >
                    Começar Agora
                  </Button>
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
