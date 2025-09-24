import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentProfileHeader = ({ student, age }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'in-progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'pending':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-6">
          {/* Student Avatar */}
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-xl flex items-center justify-center overflow-hidden">
              {student?.avatar ? (
                <Image 
                  src={student?.avatar} 
                  alt={`${student?.name} ${student?.surname}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={32} className="text-primary" />
              )}
            </div>
            {student?.hasSpecialNeeds && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center border-2 border-card">
                <Icon name="Star" size={14} className="text-accent-foreground" />
              </div>
            )}
          </div>

          {/* Student Information */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {student?.name} {student?.surname}
                </h2>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center text-sm font-body text-muted-foreground">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Age: {age} years
                  </div>
                  <div className="flex items-center text-sm font-body text-muted-foreground">
                    <Icon name="Cake" size={16} className="mr-2" />
                    Born: {new Date(student?.dateOfBirth)?.toLocaleDateString('en-US')}
                  </div>
                </div>
              </div>

              <div className={`px-3 py-1.5 rounded-full border text-sm font-medium font-body ${getStatusColor(student?.evaluationStatus)}`}>
                <div className="flex items-center space-x-2">
                  <Icon name={getStatusIcon(student?.evaluationStatus)} size={14} />
                  <span className="capitalize">{student?.evaluationStatus?.replace('-', ' ')}</span>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="BookOpen" size={16} className="text-primary" />
                  <span className="text-sm font-medium font-body text-foreground">Modules Progress</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-heading font-bold text-primary">
                    {student?.completedModules}/{student?.totalModules}
                  </span>
                  <span className="text-xs font-caption text-muted-foreground">
                    {Math?.round((student?.completedModules / student?.totalModules) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(student?.completedModules / student?.totalModules) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="TrendingUp" size={16} className="text-success" />
                  <span className="text-sm font-medium font-body text-foreground">Overall Score</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-heading font-bold text-success">
                    {student?.overallScore || 0}%
                  </span>
                  <div className="text-xs font-caption text-success">
                    Excellent
                  </div>
                </div>
              </div>

              <div className="bg-info/5 border border-info/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-info" />
                  <span className="text-sm font-medium font-body text-foreground">Last Updated</span>
                </div>
                <div className="text-sm font-body text-info">
                  {new Date()?.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {student?.bloodType && (
                  <div className="flex items-center text-sm">
                    <Icon name="Droplets" size={16} className="text-error mr-3" />
                    <span className="font-body text-muted-foreground w-20">Blood Type:</span>
                    <span className="font-medium font-body text-foreground">{student?.bloodType}</span>
                  </div>
                )}

                {student?.guardian && (
                  <div className="flex items-center text-sm">
                    <Icon name="User" size={16} className="text-primary mr-3" />
                    <span className="font-body text-muted-foreground w-20">Guardian:</span>
                    <div>
                      <span className="font-medium font-body text-foreground">{student?.guardian?.name}</span>
                      <div className="text-xs font-caption text-muted-foreground">
                        {student?.guardian?.email}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {student?.allergies && student?.allergies?.length > 0 && (
                  <div className="flex items-start text-sm">
                    <Icon name="AlertTriangle" size={16} className="text-warning mr-3 mt-0.5" />
                    <div>
                      <span className="font-body text-muted-foreground">Allergies:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {student?.allergies?.map((allergy, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded-full font-caption"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {student?.hasSpecialNeeds && (
                  <div className="flex items-center text-sm">
                    <Icon name="Star" size={16} className="text-accent mr-3" />
                    <span className="font-body text-muted-foreground">Special Needs:</span>
                    <span className="font-medium font-body text-accent ml-2">Yes</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              iconSize={14}
            >
              Contact Guardian
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              iconSize={14}
            >
              View Full Profile
            </Button>
          </div>
        </div>

        {/* Special Notes */}
        {student?.specialNotes && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-start space-x-3">
              <Icon name="FileText" size={16} className="text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium font-body text-foreground mb-1">
                  Teacher Notes
                </h4>
                <p className="text-sm font-body text-muted-foreground leading-relaxed">
                  {student?.specialNotes}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfileHeader;