import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-semibold">Healing Journey</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Evidence-based, trauma-informed digital healing retreats
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                  Crisis Resources
                </Link>
              </li>
              <li>
                <a 
                  href="https://988lifeline.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Suicide Prevention (988)
                </a>
              </li>
              <li>
                <a 
                  href="https://www.samhsa.gov/find-help/national-helpline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  SAMHSA Helpline
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@healingjourney.com</li>
              <li>privacy@healingjourney.com</li>
              <li>legal@healingjourney.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} Healing Journey. All rights reserved.
            </p>
            <p className="text-center md:text-right">
              <strong className="text-destructive">Not a substitute for professional medical or mental health care.</strong>
              {' '}In crisis? Call 988.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
