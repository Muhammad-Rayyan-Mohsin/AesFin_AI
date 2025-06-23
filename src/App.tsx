import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { AnimationProvider } from './providers/AnimationProvider';
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load components for code splitting
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/about'));
const Contact = lazy(() => import('./pages/contact'));
const Pricing = lazy(() => import('./pages/pricing'));
const Security = lazy(() => import('./pages/security'));
const Documentation = lazy(() => import('./pages/documentation'));
const Privacy = lazy(() => import('./pages/privacy'));
const Terms = lazy(() => import('./pages/terms'));
const WaitlistTestPage = lazy(() => import('./pages/waitlist-test'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component with animation
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-aes-navy via-aes-navy/95 to-aes-navy">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="w-8 h-8 animate-spin text-aes-green" />
      <p className="text-white/80 text-sm font-medium">Loading AesFin AI...</p>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-aes-navy via-aes-navy/95 to-aes-navy">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
            <p className="text-white/80">Please refresh the page to try again.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-aes-green text-white rounded-lg hover:bg-aes-green/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AnimationProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <AnimatePresence mode="wait">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/documentation" element={<Documentation />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/waitlist-test" element={<WaitlistTestPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
            <Toaster />
          </div>
        </Router>
      </AnimationProvider>
    </ErrorBoundary>
  );
}

export default App;
