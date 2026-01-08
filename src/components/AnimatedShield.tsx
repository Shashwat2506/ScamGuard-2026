import { motion } from "framer-motion";
import { Shield, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";

interface ShieldIconProps {
  status?: 'idle' | 'safe' | 'warning' | 'danger';
  size?: number;
}

export function AnimatedShield({ status = 'idle', size = 120 }: ShieldIconProps) {
  const getIcon = () => {
    switch (status) {
      case 'safe':
        return <ShieldCheck className="w-full h-full" />;
      case 'warning':
        return <ShieldAlert className="w-full h-full" />;
      case 'danger':
        return <ShieldX className="w-full h-full" />;
      default:
        return <Shield className="w-full h-full" />;
    }
  };

  const getGradientClass = () => {
    switch (status) {
      case 'safe':
        return 'gradient-safe';
      case 'warning':
        return 'gradient-warning';
      case 'danger':
        return 'gradient-danger';
      default:
        return 'gradient-hero';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-2xl opacity-40 ${getGradientClass()}`}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Shield icon */}
      <motion.div
        className={`relative z-10 p-4 rounded-3xl ${getGradientClass()} text-white shadow-lifted`}
        animate={status === 'idle' ? { y: [0, -5, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {getIcon()}
      </motion.div>
    </motion.div>
  );
}
