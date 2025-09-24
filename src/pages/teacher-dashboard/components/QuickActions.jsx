import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction }) => {
  const quickActions = [
    {
      id: 'new-evaluation',
      title: 'New Evaluation',
      description: 'Create evaluation for student',
      icon: 'ClipboardCheck',
      color: 'primary',
      action: () => onAction('new-evaluation')
    },
    {
      id: 'view-reports',
      title: 'View Reports',
      description: 'Check progress reports',
      icon: 'BarChart3',
      color: 'secondary',
      action: () => onAction('view-reports')
    },
    {
      id: 'student-notes',
      title: 'Student Notes',
      description: 'Add or view student notes',
      icon: 'FileText',
      color: 'accent',
      action: () => onAction('student-notes')
    },
    {
      id: 'schedule-meeting',
      title: 'Schedule Meeting',
      description: 'Meet with parents',
      icon: 'Calendar',
      color: 'success',
      action: () => onAction('schedule-meeting')
    },
    {
      id: 'class-activities',
      title: 'Class Activities',
      description: 'Plan daily activities',
      icon: 'Puzzle',
      color: 'warning',
      action: () => onAction('class-activities')
    },
    {
      id: 'communication',
      title: 'Communication',
      description: 'Message parents/admin',
      icon: 'MessageSquare',
      color: 'primary',
      action: () => onAction('communication')
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary/10 border-primary/20 hover:bg-primary/20 text-primary',
      secondary: 'bg-secondary/10 border-secondary/20 hover:bg-secondary/20 text-secondary',
      accent: 'bg-accent/10 border-accent/20 hover:bg-accent/20 text-accent-foreground',
      success: 'bg-success/10 border-success/20 hover:bg-success/20 text-success',
      warning: 'bg-warning/10 border-warning/20 hover:bg-warning/20 text-warning'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm font-body text-muted-foreground">
            Common tasks and shortcuts
          </p>
        </div>
      </div>
      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className={`p-4 border rounded-lg transition-all duration-200 text-left group ${getColorClasses(action?.color)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-current/10 rounded-lg group-hover:scale-110 transition-transform duration-200">
                <Icon name={action?.icon} size={18} className="text-current" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium font-body text-current mb-1">
                  {action?.title}
                </h3>
                <p className="text-xs font-caption text-muted-foreground">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Recent Activity */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={14} className="text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium font-body text-foreground">
                Completed evaluation for Emma Johnson
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Cognitive Development - 2 hours ago
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="FileText" size={14} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium font-body text-foreground">
                Added notes for Michael Chen
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Social Skills - 4 hours ago
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
            <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="Calendar" size={14} className="text-warning" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium font-body text-foreground">
                Scheduled parent meeting
              </p>
              <p className="text-xs font-caption text-muted-foreground">
                Sarah Williams - Yesterday
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Button */}
      <div className="mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction('view-all-activity')}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
          fullWidth
        >
          View All Activity
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;