import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MessageAnalyzer } from "@/components/MessageAnalyzer";
import { ScamExamples } from "@/components/ScamExamples";
import { SafetyTips } from "@/components/SafetyTips";
import { Footer } from "@/components/Footer";

const Index = () => {
  const analyzerRef = useRef<HTMLDivElement>(null);
  
  const handleExampleClick = (message: string) => {
    // Scroll to analyzer
    analyzerRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Set the message in the textarea (we'll use a custom event)
    const event = new CustomEvent('setAnalyzerMessage', { detail: message });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Analyzer Section */}
        <section id="analyzer" ref={analyzerRef} className="py-16 bg-muted/30">
          <div className="container">
            <MessageAnalyzer />
          </div>
        </section>
        
        {/* Examples Section */}
        <section id="examples" className="py-16">
          <div className="container">
            <ScamExamples onExampleClick={handleExampleClick} />
          </div>
        </section>
        
        {/* Tips Section */}
        <section id="tips" className="py-16 bg-muted/30">
          <div className="container">
            <SafetyTips />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
