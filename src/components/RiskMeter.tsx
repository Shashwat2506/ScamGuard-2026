import { motion } from "framer-motion";

interface RiskMeterProps {
  score: number;
  riskLevel: 'safe' | 'warning' | 'danger';
}

export function RiskMeter({ score, riskLevel }: RiskMeterProps) {
  const getColor = () => {
    switch (riskLevel) {
      case 'safe':
        return 'hsl(145, 65%, 40%)';
      case 'warning':
        return 'hsl(35, 95%, 55%)';
      case 'danger':
        return 'hsl(0, 75%, 55%)';
    }
  };

  const getLabel = () => {
    switch (riskLevel) {
      case 'safe':
        return 'Low Risk';
      case 'warning':
        return 'Medium Risk';
      case 'danger':
        return 'High Risk';
    }
  };

  const getGradientClass = () => {
    switch (riskLevel) {
      case 'safe':
        return 'gradient-safe';
      case 'warning':
        return 'gradient-warning';
      case 'danger':
        return 'gradient-danger';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
        <motion.span
          key={score}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="font-display text-2xl font-bold"
          style={{ color: getColor() }}
        >
          {score}/100
        </motion.span>
      </div>
      
      <div className="h-4 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getGradientClass()}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-center"
      >
        <span
          className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: getColor() }}
        >
          {getLabel()}
        </span>
      </motion.div>
    </div>
  );
}
