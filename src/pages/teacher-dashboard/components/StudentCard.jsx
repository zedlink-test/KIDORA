import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentCard = ({ student, onViewProfile, onQuickEvaluation }) => {
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

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today?.getFullYear() - birth?.getFullYear();
    const monthDiff = today?.getMonth() - birth?.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birth?.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-soft-md transition-all duration-300 group">
      {/* Student Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
            {student?.avatar ? (
              <Image 
                src={student?.avatar} 
                alt={`${student?.name} ${student?.surname}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="User" size={24} className="text-primary" />
            )}
          </div>
          {student?.hasSpecialNeeds && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Star" size={12} className="text-accent-foreground" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-heading font-semibold text-foreground truncate">
            {student?.name} {student?.surname}
          </h3>
          <p className="text-sm font-body text-muted-foreground">
            Age: {calculateAge(student?.dateOfBirth)} years
          </p>
          <div className="flex items-center mt-1">
            <Icon name="Calendar" size={14} className="text-muted-foreground mr-1" />
            <span className="text-xs font-caption text-muted-foreground">
              Born: {new Date(student.dateOfBirth)?.toLocaleDateString('en-US')}
            </span>
          </div>
        </div>

        <div className={`px-2 py-1 rounded-full border text-xs font-medium font-body ${getStatusColor(student?.evaluationStatus)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon(student?.evaluationStatus)} size={12} />
            <span className="capitalize">{student?.evaluationStatus?.replace('-', ' ')}</span>
          </div>
        </div>
      </div>
      {/* Student Details */}
      <div className="space-y-3 mb-4">
        {student?.bloodType && (
          <div className="flex items-center text-sm">
            <Icon name="Droplets" size={14} className="text-error mr-2" />
            <span className="font-body text-muted-foreground">Blood Type:</span>
            <span className="font-medium font-body text-foreground ml-1">{student?.bloodType}</span>
          </div>
        )}

        {student?.allergies && student?.allergies?.length > 0 && (
          <div className="flex items-start text-sm">
            <Icon name="AlertTriangle" size={14} className="text-warning mr-2 mt-0.5" />
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

        {student?.specialNotes && (
          <div className="flex items-start text-sm">
            <Icon name="FileText" size={14} className="text-primary mr-2 mt-0.5" />
            <div>
              <span className="font-body text-muted-foreground">Notes:</span>
              <p className="text-foreground font-body mt-1 text-xs leading-relaxed">
                {student?.specialNotes}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Evaluation Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium font-body text-foreground">Evaluation Progress</span>
          <span className="text-xs font-caption text-muted-foreground">
            {student?.completedModules}/{student?.totalModules} modules
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${(student?.completedModules / student?.totalModules) * 100}%` }}
          />
        </div>
      </div>
      {/* Recent Activity */}
      {student?.lastEvaluation && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium font-body text-foreground">Last Evaluation</span>
            <span className="text-xs font-caption text-muted-foreground">
              {new Date(student.lastEvaluation.date)?.toLocaleDateString('en-US')}
            </span>
          </div>
          <p className="text-xs font-body text-muted-foreground">
            {student?.lastEvaluation?.module}: {student?.lastEvaluation?.note}
          </p>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewProfile(student)}
          iconName="User"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          View Profile
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuickEvaluation(student)}
          iconName="ClipboardCheck"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Quick Eval
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;