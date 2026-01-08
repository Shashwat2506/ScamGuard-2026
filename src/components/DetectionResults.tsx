import { motion } from "framer-motion";
import { AlertTriangle, Link, ShieldAlert, Eye } from "lucide-react";
import type { DetectionResult } from "@/lib/scamDetection";

interface DetectionResultsProps {
  result: DetectionResult;
  originalMessage: string;
}

export function DetectionResults({ result, originalMessage }: DetectionResultsProps) {
  const highlightMessage = () => {
    let highlighted = originalMessage;
    
    // Highlight scam keywords
    result.detectedKeywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlighted = highlighted.replace(regex, `<mark class="bg-destructive/20 text-destructive px-1 rounded">$1</mark>`);
    });
    
    // Highlight phishing phrases
    result.detectedPhishing.forEach(phrase => {
      const regex = new RegExp(`(${phrase})`, 'gi');
      highlighted = highlighted.replace(regex, `<mark class="bg-warning/20 text-warning-foreground px-1 rounded">$1</mark>`);
    });
    
    return highlighted;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {/* Summary */}
      <motion.div
        variants={item}
        className={`p-4 rounded-xl border-2 ${
          result.riskLevel === 'danger' 
            ? 'bg-destructive/10 border-destructive/30' 
            : result.riskLevel === 'warning'
            ? 'bg-warning/10 border-warning/30'
            : 'bg-success/10 border-success/30'
        }`}
      >
        <p className="font-medium">{result.summary}</p>
      </motion.div>

      {/* Highlighted Message */}
      <motion.div variants={item} className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Eye className="w-4 h-4" />
          Analyzed Message
        </div>
        <div 
          className="p-4 bg-muted rounded-xl text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightMessage() }}
        />
      </motion.div>

      {/* Detection Details */}
      <div className="grid gap-3">
        {result.detectedKeywords.length > 0 && (
          <motion.div variants={item} className="p-4 glass rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="font-medium text-sm">Scam Keywords Detected</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.detectedKeywords.map((keyword, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 text-xs bg-destructive/10 text-destructive rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {result.detectedPhishing.length > 0 && (
          <motion.div variants={item} className="p-4 glass rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-warning" />
              <span className="font-medium text-sm">Phishing Phrases Found</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.detectedPhishing.map((phrase, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 text-xs bg-warning/10 text-warning-foreground rounded-full"
                >
                  {phrase}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {(result.suspiciousUrls.length > 0 || result.shortenerUrls.length > 0) && (
          <motion.div variants={item} className="p-4 glass rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Link className="w-4 h-4 text-destructive" />
              <span className="font-medium text-sm">Suspicious Links</span>
            </div>
            <div className="space-y-1">
              {[...result.suspiciousUrls, ...result.shortenerUrls].map((url, idx) => (
                <div 
                  key={idx}
                  className="px-2 py-1 text-xs bg-destructive/10 text-destructive rounded font-mono truncate"
                >
                  {url}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
