import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PendingApprovalCard = ({ approval, onApprove, onReject }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-soft-md transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={approval?.avatar}
            alt={`${approval?.name} avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-heading font-semibold text-foreground truncate">
              {approval?.name}
            </h4>
            <span className="text-xs font-caption text-muted-foreground">
              {formatDate(approval?.appliedDate)}
            </span>
          </div>
          
          <p className="text-sm font-body text-muted-foreground mb-2">
            {approval?.email}
          </p>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={14} className="text-muted-foreground" />
              <span className="text-xs font-caption text-muted-foreground">
                {approval?.specialty}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} className="text-muted-foreground" />
              <span className="text-xs font-caption text-muted-foreground">
                {approval?.preferredClass}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="xs"
              onClick={() => onApprove(approval?.id)}
              iconName="Check"
              iconPosition="left"
              iconSize={14}
            >
              Approve
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => onReject(approval?.id)}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalCard;