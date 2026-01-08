import { Shield, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold">ScamGuard</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Built to protect you from online fraud
          </p>
          
          <p className="text-sm text-muted-foreground">
            © 2026 ScamGuard. Stay Safe Online.
          </p>
        </div>
      </div>
    </footer>
  );
}
