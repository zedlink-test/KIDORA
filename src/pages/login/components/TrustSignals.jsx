import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      icon: "Shield",
      title: "COPPA Compliant",
      description: "Child privacy protection certified"
    },
    {
      id: 2,
      icon: "Award",
      title: "Educational Excellence",
      description: "Accredited management system"
    },
    {
      id: 3,
      icon: "Lock",
      title: "Data Security",
      description: "256-bit SSL encryption"
    },
    {
      id: 4,
      icon: "Heart",
      title: "Child Safety First",
      description: "Background check verified"
    }
  ];

  const features = [
    {
      id: 1,
      icon: "Users",
      title: "Multi-Role Access",
      description: "Secure dashboards for administrators, teachers, and secretaries"
    },
    {
      id: 2,
      icon: "FileText",
      title: "Complete Records",
      description: "Comprehensive student profiles with health and contact information"
    },
    {
      id: 3,
      icon: "BarChart3",
      title: "Progress Tracking",
      description: "Dynamic evaluation modules and progress monitoring"
    },
    {
      id: 4,
      icon: "Clock",
      title: "Real-Time Updates",
      description: "Live age calculations and instant data synchronization"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Trusted & Secure Platform
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {trustBadges?.map((badge) => (
            <div key={badge?.id} className="text-center p-3">
              <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mx-auto mb-2">
                <Icon name={badge?.icon} size={20} className="text-success" />
              </div>
              <h4 className="text-sm font-medium font-body text-foreground mb-1">{badge?.title}</h4>
              <p className="text-xs text-muted-foreground font-caption">{badge?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Features */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Comprehensive Management
        </h3>
        <div className="space-y-4">
          {features?.map((feature) => (
            <div key={feature?.id} className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium font-body text-foreground mb-1">{feature?.title}</h4>
                <p className="text-xs text-muted-foreground font-caption">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Need Help?
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2 text-sm font-body">
            <Icon name="Phone" size={16} className="text-primary" />
            <span className="text-foreground">+1 (555) 123-KIDS</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm font-body">
            <Icon name="Mail" size={16} className="text-primary" />
            <span className="text-foreground">support@kidora.edu</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm font-body">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-muted-foreground">24/7 Support Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;