import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedShield } from "./AnimatedShield";
import { RiskMeter } from "./RiskMeter";
import { DetectionResults } from "./DetectionResults";
import { analyzeMessage, type DetectionResult } from "@/lib/scamDetection";

export function MessageAnalyzer() {
  const [message, setMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  // Listen for example clicks
  useEffect(() => {
    const handleSetMessage = (event: CustomEvent<string>) => {
      setMessage(event.detail);
      setResult(null);
    };

    window.addEventListener('setAnalyzerMessage', handleSetMessage as EventListener);
    return () => {
      window.removeEventListener('setAnalyzerMessage', handleSetMessage as EventListener);
    };
  }, []);

  const handleAnalyze = async () => {
    if (!message.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const analysisResult = analyzeMessage(message);
    setResult(analysisResult);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setMessage("");
    setResult(null);
  };

  const getShieldStatus = () => {
    if (isAnalyzing) return 'idle';
    if (!result) return 'idle';
    return result.riskLevel;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 md:p-8 shadow-lifted"
      >
        {/* Shield Status */}
        <div className="flex justify-center mb-6">
          <AnimatedShield 
            status={getShieldStatus()} 
            size={80}
          />
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Paste suspicious messages here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[150px] resize-none text-base bg-background border-2 focus:border-primary/50 rounded-xl p-4"
              disabled={isAnalyzing}
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleAnalyze}
              disabled={!message.trim() || isAnalyzing}
              className="flex-1 h-12 font-medium rounded-xl gradient-hero text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Analyze Message
                </>
              )}
            </Button>
            
            {result && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 px-4 rounded-xl"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-border"
            >
              <div className="mb-6">
                <RiskMeter score={result.riskScore} riskLevel={result.riskLevel} />
              </div>
              <DetectionResults result={result} originalMessage={message} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
