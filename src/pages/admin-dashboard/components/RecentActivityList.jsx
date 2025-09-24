import React from 'react';
import ActivityItem from './ActivityItem';

const RecentActivityList = ({ activities, title = "Recent Activities" }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">{title}</h3>
        <button className="text-sm font-body text-primary hover:text-primary/80 transition-colors duration-200">
          View All
        </button>
      </div>
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {activities?.length > 0 ? (
          activities?.map((activity) => (
            <ActivityItem key={activity?.id} activity={activity} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-sm font-body text-muted-foreground">No recent activities</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityList;