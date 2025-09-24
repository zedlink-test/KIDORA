import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_signup':
        return 'UserPlus';
      case 'student_added':
        return 'GraduationCap';
      case 'teacher_approved':
        return 'CheckCircle';
      case 'evaluation_completed':
        return 'ClipboardCheck';
      case 'system_update':
        return 'Settings';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user_signup':
        return 'text-primary';
      case 'student_added':
        return 'text-success';
      case 'teacher_approved':
        return 'text-success';
      case 'evaluation_completed':
        return 'text-accent';
      case 'system_update':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors duration-200">
      <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
        <Icon name={getActivityIcon(activity?.type)} size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-body text-foreground">{activity?.description}</p>
        <p className="text-xs font-caption text-muted-foreground mt-1">
          {formatTime(activity?.timestamp)}
        </p>
      </div>
      {activity?.status && (
        <span className={`text-xs px-2 py-1 rounded-full font-caption ${
          activity?.status === 'pending' ?'bg-warning/10 text-warning' 
            : activity?.status === 'completed' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
        }`}>
          {activity?.status}
        </span>
      )}
    </div>
  );
};

export default ActivityItem;