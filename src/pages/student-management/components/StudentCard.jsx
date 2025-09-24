import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentCard = ({ student, onEdit, onDelete, onAssignTeacher, onViewProfile }) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Inactive':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Graduated':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'A+': 'bg-red-50 text-red-700 border-red-200',
      'A-': 'bg-red-100 text-red-800 border-red-300',
      'B+': 'bg-blue-50 text-blue-700 border-blue-200',
      'B-': 'bg-blue-100 text-blue-800 border-blue-300',
      'AB+': 'bg-purple-50 text-purple-700 border-purple-200',
      'AB-': 'bg-purple-100 text-purple-800 border-purple-300',
      'O+': 'bg-green-50 text-green-700 border-green-200',
      'O-': 'bg-green-100 text-green-800 border-green-300'
    };
    return colors?.[bloodType] || 'bg-muted text-muted-foreground border-border';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-soft-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              {student?.firstName} {student?.lastName}
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              Age: {calculateAge(student?.dateOfBirth)} years
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(student?.status)}`}>
            {student?.status}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewProfile(student)}
            className="h-8 w-8"
          >
            <Icon name="Eye" size={16} />
          </Button>
        </div>
      </div>
      {/* Student Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Teacher:</span>
          <span className="text-sm font-medium text-foreground font-body">
            {student?.assignedTeacher || 'Not Assigned'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Blood Type:</span>
          <span className={`px-2 py-1 text-xs font-medium rounded border ${getBloodTypeColor(student?.bloodType)}`}>
            {student?.bloodType}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Parent Contact:</span>
          <span className="text-sm font-medium text-foreground font-mono">
            {student?.parentContact}
          </span>
        </div>
        
        {student?.allergies && (
          <div className="flex items-start justify-between">
            <span className="text-sm text-muted-foreground font-body">Allergies:</span>
            <span className="text-sm text-warning font-body text-right max-w-32 truncate" title={student?.allergies}>
              {student?.allergies}
            </span>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(student)}
            iconName="Edit"
            iconPosition="left"
            iconSize={14}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAssignTeacher(student)}
            iconName="UserCheck"
            iconPosition="left"
            iconSize={14}
          >
            Assign
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(student)}
          iconName="Trash2"
          iconPosition="left"
          iconSize={14}
          className="text-destructive hover:text-destructive"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;