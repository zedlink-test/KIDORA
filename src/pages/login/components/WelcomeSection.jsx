import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const WelcomeSection = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="space-y-8">
      {/* Hero Image */}
      <div className="relative overflow-hidden rounded-lg shadow-soft-lg">
        <Image
          src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Happy children in nursery classroom with colorful learning materials"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h2 className="text-xl font-heading font-semibold mb-2">Nurturing Young Minds</h2>
          <p className="text-sm font-body opacity-90">Creating a safe, engaging environment for early childhood development</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4">
            <Icon name="Heart" size={24} className="text-accent" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
            Welcome to KIDORA
          </h3>
          <p className="text-muted-foreground font-body mb-4">
            Your comprehensive nursery management platform designed to streamline operations, 
            enhance communication, and support the growth of every child in our care.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm font-body">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-foreground">500+ Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="GraduationCap" size={16} className="text-primary" />
              <span className="text-foreground">50+ Teachers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Building" size={16} className="text-primary" />
              <span className="text-foreground">15+ Locations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Our Mission
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg flex-shrink-0 mt-0.5">
              <Icon name="Target" size={16} className="text-success" />
            </div>
            <div>
              <h4 className="text-sm font-medium font-body text-foreground mb-1">Excellence in Education</h4>
              <p className="text-xs text-muted-foreground font-caption">
                Providing high-quality early childhood education with personalized attention to each child's unique needs.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
              <Icon name="Shield" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium font-body text-foreground mb-1">Safety & Security</h4>
              <p className="text-xs text-muted-foreground font-caption">
                Maintaining the highest standards of child safety with comprehensive background checks and secure facilities.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg flex-shrink-0 mt-0.5">
              <Icon name="Users" size={16} className="text-accent" />
            </div>
            <div>
              <h4 className="text-sm font-medium font-body text-foreground mb-1">Family Partnership</h4>
              <p className="text-xs text-muted-foreground font-caption">
                Building strong partnerships with families to support each child's development and learning journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground font-caption">
          © {currentYear} KIDORA Nursery Management System. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground font-caption mt-1">
          Empowering educators, supporting families, nurturing futures.
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;