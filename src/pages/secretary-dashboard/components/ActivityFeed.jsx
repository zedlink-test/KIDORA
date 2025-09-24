import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'enrollment',
      title: 'New Student Enrolled',
      description: 'Emma Johnson has been enrolled in Butterfly Class',
      user: 'Sarah Martinez',
      timestamp: new Date(Date.now() - 300000),
      icon: 'UserPlus',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Student Assignment Updated',
      description: 'Michael Chen moved from Caterpillar to Butterfly Class',
      user: 'Lisa Thompson',
      timestamp: new Date(Date.now() - 900000),
      icon: 'ArrowRightLeft',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 3,
      type: 'profile',
      title: 'Profile Information Updated',
      description: 'Contact details updated for Sophia Williams',
      user: 'Maria Rodriguez',
      timestamp: new Date(Date.now() - 1800000),
      icon: 'Edit',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 4,
      type: 'teacher',
      title: 'Teacher Assignment Changed',
      description: 'Ms. Anderson assigned to Ladybug Class',
      user: 'Jennifer Davis',
      timestamp: new Date(Date.now() - 3600000),
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 5,
      type: 'enrollment',
      title: 'Enrollment Application Received',
      description: 'New application from the Parker family',
      user: 'System',
      timestamp: new Date(Date.now() - 7200000),
      icon: 'FileText',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 6,
      type: 'profile',
      title: 'Medical Information Added',
      description: 'Allergy information updated for David Kim',
      user: 'Sarah Martinez',
      timestamp: new Date(Date.now() - 10800000),
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activities', count: activities?.length },
    { value: 'enrollment', label: 'Enrollments', count: activities?.filter(a => a?.type === 'enrollment')?.length },
    { value: 'assignment', label: 'Assignments', count: activities?.filter(a => a?.type === 'assignment')?.length },
    { value: 'profile', label: 'Profile Updates', count: activities?.filter(a => a?.type === 'profile')?.length },
    { value: 'teacher', label: 'Teacher Changes', count: activities?.filter(a => a?.type === 'teacher')?.length }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-foreground">Recent Activity</h2>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left" iconSize={16}>
            Refresh
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`px-3 py-1.5 text-sm font-body rounded-full transition-all duration-200 ${
                filter === option?.value
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {option?.label}
              <span className="ml-1 text-xs font-mono">({option?.count})</span>
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredActivities?.map((activity) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${activity?.bgColor} flex-shrink-0`}>
                    <Icon name={activity?.icon} size={16} className={activity?.color} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium font-body text-foreground truncate">
                        {activity?.title}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-2">
                        {formatTimeAgo(activity?.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm font-body text-muted-foreground mb-2 line-clamp-2">
                      {activity?.description}
                    </p>
                    
                    <div className="flex items-center text-xs font-caption text-muted-foreground">
                      <Icon name="User" size={12} className="mr-1" />
                      <span>by {activity?.user}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Activity" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-body">No activities found for the selected filter.</p>
          </div>
        )}
      </div>
      {filteredActivities?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full" iconName="Eye" iconPosition="left" iconSize={16}>
            View All Activities
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;