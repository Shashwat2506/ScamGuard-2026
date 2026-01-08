import { motion } from "framer-motion";
import { ShieldCheck, Link2Off, Eye, LockKeyhole, MessageCircleWarning, Phone } from "lucide-react";

const tips = [
  {
    icon: <Link2Off className="w-6 h-6" />,
    title: "Never Click Unknown Links",
    description: "Scammers use shortened URLs to hide malicious websites. Always verify the sender first."
  },
  {
    icon: <LockKeyhole className="w-6 h-6" />,
    title: "Guard Your OTP",
    description: "Banks and companies will NEVER ask for your OTP, PIN, or password via message."
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Verify Before Acting",
    description: "If a message claims to be from a company, contact them directly through official channels."
  },
  {
    icon: <MessageCircleWarning className="w-6 h-6" />,
    title: "Report Suspicious Messages",
    description: "Help protect others by reporting scam messages to WhatsApp and cybercrime authorities."
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call to Confirm",
    description: "If a friend or relative asks for money urgently, call them directly to verify."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Trust Your Instincts",
    description: "If something feels too good to be true or creates unnecessary urgency, it probably is a scam."
  }
];

export function SafetyTips() {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="font-display text-3xl font-bold mb-2">Stay Safe Online</h2>
        <p className="text-muted-foreground">Essential tips to protect yourself from fraud</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-5 glass rounded-xl hover:shadow-soft transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground mb-4">
              {tip.icon}
            </div>
            <h3 className="font-semibold mb-2">{tip.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tip.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
