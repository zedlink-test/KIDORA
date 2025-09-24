import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import WelcomeSection from './components/WelcomeSection';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      // Navigate to appropriate dashboard based on role
      switch (userData.role) {
        case 'admin': navigate('/admin-dashboard');
          break;
        case 'teacher': navigate('/teacher-dashboard');
          break;
        case 'secretary': navigate('/secretary-dashboard');
          break;
        default:
          localStorage.removeItem('user'); // Clear invalid user data
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%234A7C59%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Login Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </div>

          {/* Right Column - Welcome & Trust Signals */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <WelcomeSection />
            </div>
            
            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <WelcomeSection />
                </div>
                <div>
                  <TrustSignals />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals - Desktop Only */}
        <div className="hidden lg:block mt-12">
          <div className="max-w-4xl mx-auto">
            <TrustSignals />
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden mt-8 text-center">
          <p className="text-xs text-muted-foreground font-caption">
            Secure • Trusted • Professional
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;