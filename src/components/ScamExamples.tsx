import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Building2, Bitcoin, Briefcase, Landmark, ChevronRight } from "lucide-react";
import { SCAM_EXAMPLES } from "@/lib/scamDetection";

interface ScamExamplesProps {
  onExampleClick: (message: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  lottery: <Trophy className="w-5 h-5" />,
  banking: <Building2 className="w-5 h-5" />,
  crypto: <Bitcoin className="w-5 h-5" />,
  job: <Briefcase className="w-5 h-5" />,
  government: <Landmark className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  lottery: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  banking: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  crypto: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  job: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  government: "bg-red-500/10 text-red-600 border-red-500/20",
};

export function ScamExamples({ onExampleClick }: ScamExamplesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="font-display text-3xl font-bold mb-2">Common Scam Patterns</h2>
        <p className="text-muted-foreground">Click on any example to analyze it</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SCAM_EXAMPLES.map((example, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onExampleClick(example.message)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group text-left p-4 glass rounded-xl hover:shadow-soft transition-all duration-300 border-2 border-transparent hover:border-primary/20"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg border ${categoryColors[example.category]}`}>
                {categoryIcons[example.category]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1 flex items-center gap-1">
                  {example.title}
                  <motion.span
                    animate={{ x: hoveredIndex === index ? 4 : 0 }}
                    className="text-primary"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.span>
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {example.message}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
