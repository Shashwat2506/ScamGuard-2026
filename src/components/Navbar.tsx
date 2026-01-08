import { Shield } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">ScamGuard</span>
        </a>
        
        <div className="flex items-center gap-4">
          <a 
            href="#analyzer" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Analyzer
          </a>
          <a 
            href="#examples" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Examples
          </a>
          <a 
            href="#tips" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Safety Tips
          </a>
        </div>
      </div>
    </nav>
  );
}
