import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EvaluationOverview = ({ evaluationData, onViewAllEvaluations, onCreateEvaluation }) => {
  const getModuleIcon = (moduleType) => {
    const icons = {
      'cognitive': 'Brain',
      'physical': 'Activity',
      'social': 'Users',
      'emotional': 'Heart',
      'language': 'MessageCircle',
      'creative': 'Palette',
      'motor-skills': 'Hand',
      'problem-solving': 'Puzzle'
    };
    return icons?.[moduleType] || 'BookOpen';
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Evaluation Overview</h2>
          <p className="text-sm font-body text-muted-foreground mt-1">
            Track student progress across all modules
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={onCreateEvaluation}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          New Evaluation
        </Button>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-primary" />
            <span className="text-sm font-medium font-body text-foreground">Completed</span>
          </div>
          <p className="text-2xl font-heading font-bold text-primary">
            {evaluationData?.stats?.completed}
          </p>
        </div>

        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm font-medium font-body text-foreground">In Progress</span>
          </div>
          <p className="text-2xl font-heading font-bold text-warning">
            {evaluationData?.stats?.inProgress}
          </p>
        </div>

        <div className="bg-error/5 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm font-medium font-body text-foreground">Pending</span>
          </div>
          <p className="text-2xl font-heading font-bold text-error">
            {evaluationData?.stats?.pending}
          </p>
        </div>

        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium font-body text-foreground">Avg Score</span>
          </div>
          <p className="text-2xl font-heading font-bold text-success">
            {evaluationData?.stats?.averageScore}%
          </p>
        </div>
      </div>
      {/* Module Progress */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Module Progress</h3>
        <div className="space-y-3">
          {evaluationData?.modules?.map((module) => (
            <div key={module.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name={getModuleIcon(module.type)} size={18} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium font-body text-foreground truncate">
                    {module.name}
                  </h4>
                  <span className={`text-sm font-medium font-mono ${getCompletionColor(module.completion)}`}>
                    {module.completion}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${module.completion}%` }}
                  />
                </div>
                <p className="text-xs font-caption text-muted-foreground mt-1">
                  {module.studentsCompleted}/{module.totalStudents} students completed
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Evaluations */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">Recent Evaluations</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAllEvaluations}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={14}
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {evaluationData?.recentEvaluations?.map((evaluation) => (
            <div key={evaluation?.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={14} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium font-body text-foreground truncate">
                    {evaluation?.studentName}
                  </p>
                  <span className="text-xs font-caption text-muted-foreground">
                    {new Date(evaluation.date)?.toLocaleDateString('en-US')}
                  </span>
                </div>
                <p className="text-xs font-body text-muted-foreground">
                  {evaluation?.module} - {evaluation?.note}
                </p>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs font-medium font-body ${
                evaluation?.score >= 80 ? 'bg-success/10 text-success' :
                evaluation?.score >= 60 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
              }`}>
                {evaluation?.score}%
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAllEvaluations}
          iconName="BarChart3"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          View Reports
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onCreateEvaluation}
          iconName="ClipboardCheck"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Create Evaluation
        </Button>
      </div>
    </div>
  );
};

export default EvaluationOverview;