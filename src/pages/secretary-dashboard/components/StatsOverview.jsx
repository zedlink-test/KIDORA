import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = () => {
  const stats = [
    {
      id: 'total-students',
      title: 'Total Students',
      value: '156',
      change: '+12',
      changeType: 'increase',
      icon: 'GraduationCap',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Active enrollments'
    },
    {
      id: 'active-teachers',
      title: 'Active Teachers',
      value: '18',
      change: '+2',
      changeType: 'increase',
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Teaching staff'
    },
    {
      id: 'pending-enrollments',
      title: 'Pending Enrollments',
      value: '12',
      change: '-3',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Awaiting approval'
    },
    {
      id: 'class-capacity',
      title: 'Class Capacity',
      value: '87%',
      change: '+5%',
      changeType: 'increase',
      icon: 'BarChart3',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Overall utilization'
    }
  ];

  const classDistribution = [
    { name: 'Butterfly Class', students: 24, capacity: 25, teacher: 'Ms. Anderson', utilization: 96 },
    { name: 'Ladybug Class', students: 22, capacity: 25, teacher: 'Mr. Johnson', utilization: 88 },
    { name: 'Caterpillar Class', students: 20, capacity: 25, teacher: 'Ms. Williams', utilization: 80 },
    { name: 'Bee Class', students: 23, capacity: 25, teacher: 'Ms. Davis', utilization: 92 },
    { name: 'Dragonfly Class', students: 19, capacity: 25, teacher: 'Mr. Thompson', utilization: 76 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat) => (
          <div key={stat?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-soft-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div className={`flex items-center text-xs font-mono px-2 py-1 rounded-full ${
                stat?.changeType === 'increase' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                <Icon 
                  name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                  className="mr-1" 
                />
                {stat?.change}
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-heading font-bold text-foreground">{stat?.value}</h3>
              <p className="text-sm font-medium font-body text-foreground">{stat?.title}</p>
              <p className="text-xs font-caption text-muted-foreground">{stat?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Class Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">Class Distribution</h3>
          <div className="flex items-center space-x-2 text-sm font-body text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Real-time capacity tracking</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {classDistribution?.map((classInfo) => (
            <div key={classInfo?.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h4 className="text-sm font-medium font-body text-foreground">{classInfo?.name}</h4>
                  <span className="text-xs font-caption text-muted-foreground">
                    {classInfo?.teacher}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-mono">
                  <span className="text-foreground">{classInfo?.students}/{classInfo?.capacity}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    classInfo?.utilization >= 90 
                      ? 'bg-error/10 text-error' 
                      : classInfo?.utilization >= 80 
                        ? 'bg-warning/10 text-warning' :'bg-success/10 text-success'
                  }`}>
                    {classInfo?.utilization}%
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    classInfo?.utilization >= 90 
                      ? 'bg-error' 
                      : classInfo?.utilization >= 80 
                        ? 'bg-warning' :'bg-success'
                  }`}
                  style={{ width: `${classInfo?.utilization}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="font-body text-foreground">Total Capacity Utilization</span>
            <span className="font-mono font-semibold text-primary">87%</span>
          </div>
          <div className="mt-2 w-full bg-muted rounded-full h-2">
            <div className="h-2 bg-primary rounded-full transition-all duration-500" style={{ width: '87%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;