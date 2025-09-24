import React from 'react';
import Icon from '../../../components/AppIcon';

const ClassStatistics = ({ statistics }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getProgressTextColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="BarChart3" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Class Statistics</h2>
          <p className="text-sm font-body text-muted-foreground">
            Overall class performance metrics
          </p>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium font-body text-foreground">Total Students</span>
            <Icon name="Users" size={16} className="text-primary" />
          </div>
          <p className="text-3xl font-heading font-bold text-primary mb-1">
            {statistics?.totalStudents}
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            Active in your class
          </p>
        </div>

        <div className="bg-gradient-to-r from-success/5 to-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium font-body text-foreground">Avg Progress</span>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <p className="text-3xl font-heading font-bold text-success mb-1">
            {statistics?.averageProgress}%
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            Across all modules
          </p>
        </div>
      </div>
      {/* Progress Distribution */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Progress Distribution</h3>
        <div className="space-y-3">
          {statistics?.progressDistribution?.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-24 text-sm font-medium font-body text-foreground">
                {item?.range}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-caption text-muted-foreground">
                    {item?.count} students
                  </span>
                  <span className={`text-xs font-medium font-mono ${getProgressTextColor(item?.percentage)}`}>
                    {item?.percentage}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(item?.percentage)}`}
                    style={{ width: `${item?.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Module Performance */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Module Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {statistics?.modulePerformance?.map((module) => (
            <div key={module.id} className="p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium font-body text-foreground truncate">
                  {module.name}
                </span>
                <span className={`text-sm font-medium font-mono ${getProgressTextColor(module.averageScore)}`}>
                  {module.averageScore}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor(module.averageScore)}`}
                  style={{ width: `${module.averageScore}%` }}
                />
              </div>
              <p className="text-xs font-caption text-muted-foreground mt-1">
                {module.completedStudents}/{statistics?.totalStudents} completed
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Trends */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Recent Trends</h3>
        <div className="space-y-3">
          {statistics?.trends?.map((trend, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                trend?.type === 'improvement' ? 'bg-success/10' :
                trend?.type === 'decline'? 'bg-error/10' : 'bg-warning/10'
              }`}>
                <Icon 
                  name={
                    trend?.type === 'improvement' ? 'TrendingUp' :
                    trend?.type === 'decline'? 'TrendingDown' : 'Minus'
                  } 
                  size={14} 
                  className={
                    trend?.type === 'improvement' ? 'text-success' :
                    trend?.type === 'decline'? 'text-error' : 'text-warning'
                  }
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium font-body text-foreground">
                  {trend?.title}
                </p>
                <p className="text-xs font-body text-muted-foreground">
                  {trend?.description}
                </p>
              </div>
              <span className="text-xs font-caption text-muted-foreground">
                {trend?.timeframe}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassStatistics;