import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, color = "primary", actions, stats }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success/5 border-success/20 hover:bg-success/10';
      case 'warning':
        return 'bg-warning/5 border-warning/20 hover:bg-warning/10';
      case 'secondary':
        return 'bg-secondary/5 border-secondary/20 hover:bg-secondary/10';
      default:
        return 'bg-primary/5 border-primary/20 hover:bg-primary/10';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'secondary':
        return 'text-secondary';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className={`border rounded-lg p-6 transition-all duration-300 ${getColorClasses()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg bg-card border flex items-center justify-center ${getIconColor()}`}>
            <Icon name={icon} size={20} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">{title}</h3>
            <p className="text-sm font-body text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-heading font-bold text-foreground">{stat?.value}</p>
              <p className="text-xs font-caption text-muted-foreground">{stat?.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant || "outline"}
            size="sm"
            onClick={action?.onClick}
            iconName={action?.icon}
            iconPosition="left"
            iconSize={16}
            className="flex-1 sm:flex-none"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionCard;