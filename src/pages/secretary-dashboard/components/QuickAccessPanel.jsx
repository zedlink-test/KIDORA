import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessPanel = ({ onNavigate }) => {
  const quickActions = [
    {
      id: 'student-enrollment',
      title: 'Student Enrollment',
      description: 'Add new students and manage enrollment process',
      icon: 'UserPlus',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      count: '12 Pending',
      action: () => onNavigate('/secretary-enrollment')
    },
    {
      id: 'teacher-coordination',
      title: 'Teacher Coordination',
      description: 'Assign students to teachers and manage class distribution',
      icon: 'Users',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      count: '8 Classes',
      action: () => onNavigate('/secretary-coordination')
    },
    {
      id: 'profile-management',
      title: 'Profile Management',
      description: 'Access and edit all student and teacher profiles',
      icon: 'FileText',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      count: '156 Profiles',
      action: () => onNavigate('/secretary-profiles')
    },
    {
      id: 'communications',
      title: 'Communications',
      description: 'Send notifications and manage parent communications',
      icon: 'MessageSquare',
      color: 'bg-success',
      textColor: 'text-success-foreground',
      count: '24 Messages',
      action: () => onNavigate('/secretary-communications')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {quickActions?.map((action) => (
        <div
          key={action?.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-soft-md transition-all duration-300 group cursor-pointer"
          onClick={action?.action}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${action?.color} group-hover:scale-110 transition-transform duration-300`}>
              <Icon name={action?.icon} size={24} className={action?.textColor} />
            </div>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              {action?.count}
            </span>
          </div>
          
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
            {action?.title}
          </h3>
          
          <p className="text-sm font-body text-muted-foreground mb-4 line-clamp-2">
            {action?.description}
          </p>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
            className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-all duration-200"
          >
            Access
          </Button>
        </div>
      ))}
    </div>
  );
};

export default QuickAccessPanel;