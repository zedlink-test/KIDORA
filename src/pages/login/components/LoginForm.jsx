import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different roles
  const mockCredentials = {
    admin: { email: "admin@kidora.edu", password: "admin123", role: "admin" },
    teacher: { email: "teacher@kidora.edu", password: "teacher123", role: "teacher" },
    secretary: { email: "secretary@kidora.edu", password: "secretary123", role: "secretary" }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors on input change
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Real-time email validation
    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address'
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check credentials against mock data
    const matchedUser = Object.values(mockCredentials)?.find(
      cred => cred?.email === formData?.email && cred?.password === formData?.password
    );

    if (matchedUser) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: matchedUser?.email,
        role: matchedUser?.role,
        loginTime: new Date()?.toISOString()
      }));

      // Navigate based on role
      switch (matchedUser?.role) {
        case 'admin': navigate('/admin-dashboard');
          break;
        case 'teacher': navigate('/teacher-dashboard');
          break;
        case 'secretary': navigate('/secretary-dashboard');
          break;
        default:
          navigate('/admin-dashboard');
      }
    } else {
      setErrors({
        general: 'Invalid email or password. Please check your credentials and try again.'
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-soft-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">Welcome to KIDORA</h1>
          <p className="text-muted-foreground font-body">Sign in to access your nursery management dashboard</p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={16} className="text-destructive mr-2" />
              <p className="text-sm text-destructive font-body">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="mb-4"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="mb-4"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              size="sm"
            />
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 font-body transition-colors duration-150"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="left"
            iconSize={18}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground font-caption text-center mb-3">Demo Credentials:</p>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center p-2 bg-muted rounded">
              <span className="text-muted-foreground">Admin:</span>
              <span className="text-foreground">admin@kidora.edu / admin123</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted rounded">
              <span className="text-muted-foreground">Teacher:</span>
              <span className="text-foreground">teacher@kidora.edu / teacher123</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted rounded">
              <span className="text-muted-foreground">Secretary:</span>
              <span className="text-foreground">secretary@kidora.edu / secretary123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;