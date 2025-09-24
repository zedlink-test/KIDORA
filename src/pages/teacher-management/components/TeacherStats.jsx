import React from 'react';
import Icon from '../../../components/AppIcon';

const TeacherStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Teachers',
      value: stats?.total,
      icon: 'Users',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      bgColor: 'bg-primary/10',
      change: stats?.totalChange,
      changeType: stats?.totalChange >= 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Active Teachers',
      value: stats?.active,
      icon: 'UserCheck',
      color: 'bg-success',
      textColor: 'text-success-foreground',
      bgColor: 'bg-success/10',
      change: stats?.activeChange,
      changeType: stats?.activeChange >= 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Pending Approval',
      value: stats?.pending,
      icon: 'Clock',
      color: 'bg-warning',
      textColor: 'text-warning-foreground',
      bgColor: 'bg-warning/10',
      change: stats?.pendingChange,
      changeType: stats?.pendingChange >= 0 ? 'increase' : 'decrease'
    },
    {
      title: 'Specialties',
      value: stats?.specialties,
      icon: 'Award',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      bgColor: 'bg-secondary/10',
      change: stats?.specialtiesChange,
      changeType: stats?.specialtiesChange >= 0 ? 'increase' : 'decrease'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border shadow-soft p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat?.title}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {stat?.value}
              </p>
              {stat?.change !== undefined && (
                <div className="flex items-center mt-2">
                  <Icon 
                    name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    className={stat?.changeType === 'increase' ? 'text-success' : 'text-destructive'} 
                  />
                  <span className={`text-xs font-medium ml-1 ${
                    stat?.changeType === 'increase' ? 'text-success' : 'text-destructive'
                  }`}>
                    {Math.abs(stat?.change)}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    vs last month
                  </span>
                </div>
              )}
            </div>
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={24} className={stat?.color?.replace('bg-', 'text-')} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeacherStats;