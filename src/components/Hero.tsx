import { motion } from "framer-motion";
import { Shield, MessageSquareWarning } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <MessageSquareWarning className="w-4 h-4" />
          Fraud Awareness Tool
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Detect{" "}
            <span className="text-gradient">Scam Messages</span>
            <br />
            Before They Trap You
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Instantly analyze suspicious messages for lottery scams, crypto fraud, 
            fake government notices, and phishing attempts.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">30+</div>
              <div className="text-sm text-muted-foreground">Scam Patterns</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Fraud Categories</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Privacy Focused</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
