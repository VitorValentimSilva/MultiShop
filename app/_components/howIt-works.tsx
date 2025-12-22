"use client";

import { motion } from "framer-motion";
import { HowltItWorksStepProps } from "@/app/_types/ui";
import { icons } from "@/app/_lib/ui";

export function HowItWorks({
  title,
  description,
  steps,
}: HowltItWorksStepProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = icons[step.icon.icon];

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-linear-to-r from-primary/50 to-transparent" />
                )}

                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <span className="absolute -top-2 -left-2 text-6xl font-bold text-primary/10">
                      {step.number}
                    </span>
                    <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                      {Icon && <Icon className="w-8 h-8 text-primary" />}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
