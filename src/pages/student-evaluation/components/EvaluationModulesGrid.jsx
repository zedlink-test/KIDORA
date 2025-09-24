import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EvaluationModulesGrid = ({ modules, student, onModuleSelect, evaluationHistory }) => {
  const getModuleStatus = (moduleId) => {
    const moduleEvaluations = evaluationHistory?.filter(evaluation => 
      evaluation?.module?.toLowerCase()?.includes(modules?.find(m => m?.id === moduleId)?.name?.toLowerCase()) ||
      evaluation?.module?.toLowerCase()?.includes(modules?.find(m => m?.id === moduleId)?.type?.toLowerCase())
    ) || [];
    
    if (moduleEvaluations?.length === 0) return 'not-started';
    
    const latestEvaluation = moduleEvaluations?.[moduleEvaluations?.length - 1];
    if (latestEvaluation?.status === 'completed') return 'completed';
    return 'in-progress';
  };

  const getModuleScore = (moduleId) => {
    const moduleEvaluations = evaluationHistory?.filter(evaluation => 
      evaluation?.module?.toLowerCase()?.includes(modules?.find(m => m?.id === moduleId)?.name?.toLowerCase()) ||
      evaluation?.module?.toLowerCase()?.includes(modules?.find(m => m?.id === moduleId)?.type?.toLowerCase())
    ) || [];
    
    if (moduleEvaluations?.length === 0) return null;
    
    const latestEvaluation = moduleEvaluations?.[moduleEvaluations?.length - 1];
    return latestEvaluation?.overallScore;
  };

  const getModuleLastUpdated = (moduleId) => {
    const moduleEvaluations = evaluationHistory?.filter(evaluation => 
      evaluation?.module?.toLowerCase()?.includes(modules?.find(m => m?.id === moduleId)?.name?.toLowerCase()) ||
      evaluation?.module?.toLowerCase()?.includes(modules?.find(m => m?.id === moduleId)?.type?.toLowerCase())
    ) || [];
    
    if (moduleEvaluations?.length === 0) return null;
    
    const latestEvaluation = moduleEvaluations?.[moduleEvaluations?.length - 1];
    return latestEvaluation?.date;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-success/30 bg-success/5';
      case 'in-progress':
        return 'border-warning/30 bg-warning/5';
      case 'not-started':
        return 'border-border bg-muted/30';
      default:
        return 'border-border bg-card';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'in-progress':
        return { icon: 'Clock', color: 'text-warning' };
      case 'not-started':
        return { icon: 'Circle', color: 'text-muted-foreground' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      'primary': 'bg-primary/10 text-primary',
      'success': 'bg-success/10 text-success',
      'info': 'bg-info/10 text-info',
      'warning': 'bg-warning/10 text-warning',
      'error': 'bg-error/10 text-error',
      'accent': 'bg-accent/10 text-accent'
    };
    return colorMap?.[color] || 'bg-primary/10 text-primary';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Evaluation Modules
          </h2>
          <p className="text-sm font-body text-muted-foreground mt-1">
            Select a module to begin or continue evaluation for {student?.name}
          </p>
        </div>
        <div className="text-sm font-body text-muted-foreground">
          {modules?.filter(m => getModuleStatus(m?.id) === 'completed')?.length} of {modules?.length} completed
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules?.map((module) => {
          const status = getModuleStatus(module?.id);
          const score = getModuleScore(module?.id);
          const lastUpdated = getModuleLastUpdated(module?.id);
          const statusInfo = getStatusIcon(status);

          return (
            <div
              key={module?.id}
              className={`border rounded-lg p-6 shadow-soft hover:shadow-soft-md transition-all duration-300 cursor-pointer group ${getStatusColor(status)}`}
              onClick={() => onModuleSelect(module)}
            >
              {/* Module Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(module?.color)}`}>
                  <Icon name={module?.icon} size={24} />
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name={statusInfo?.icon} size={16} className={statusInfo?.color} />
                  {score && (
                    <span className="text-sm font-medium font-body text-foreground">
                      {Math?.round((score / 5) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Module Details */}
              <div className="mb-4">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {module?.name}
                </h3>
                <p className="text-sm font-body text-muted-foreground leading-relaxed">
                  {module?.description}
                </p>
              </div>

              {/* Module Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-body text-muted-foreground">Criteria:</span>
                  <span className="font-medium font-body text-foreground">
                    {module?.criteria?.length} assessments
                  </span>
                </div>
                
                {lastUpdated && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-muted-foreground">Last Updated:</span>
                    <span className="font-medium font-body text-foreground">
                      {new Date(lastUpdated)?.toLocaleDateString('en-US')}
                    </span>
                  </div>
                )}

                {score && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-body text-muted-foreground">Score:</span>
                    <span className={`font-medium font-body ${
                      score >= 4 ? 'text-success' : score >= 3 ? 'text-warning' : 'text-error'
                    }`}>
                      {score?.toFixed(1)}/5.0
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-border">
                <Button
                  variant={status === 'completed' ? 'outline' : 'default'}
                  size="sm"
                  className="w-full"
                  iconName={
                    status === 'completed' ? 'Eye' : 
                    status === 'in-progress' ? 'Edit' : 'Play'
                  }
                  iconPosition="left"
                  iconSize={14}
                >
                  {status === 'completed' ? 'Review Evaluation' : 
                   status === 'in-progress' ? 'Continue Evaluation' : 'Start Evaluation'}
                </Button>
              </div>

              {/* Status Indicator */}
              <div className="mt-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    status === 'completed' ? 'bg-success' :
                    status === 'in-progress' ? 'bg-warning' : 'bg-muted-foreground'
                  }`} />
                  <span className="text-xs font-caption text-muted-foreground capitalize">
                    {status?.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Evaluation Progress Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <p className="text-2xl font-heading font-bold text-success">
              {modules?.filter(m => getModuleStatus(m?.id) === 'completed')?.length}
            </p>
            <p className="text-xs font-caption text-muted-foreground">Completed</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <p className="text-2xl font-heading font-bold text-warning">
              {modules?.filter(m => getModuleStatus(m?.id) === 'in-progress')?.length}
            </p>
            <p className="text-xs font-caption text-muted-foreground">In Progress</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Circle" size={20} className="text-muted-foreground" />
            </div>
            <p className="text-2xl font-heading font-bold text-muted-foreground">
              {modules?.filter(m => getModuleStatus(m?.id) === 'not-started')?.length}
            </p>
            <p className="text-xs font-caption text-muted-foreground">Not Started</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-heading font-bold text-primary">
              {student?.overallScore || 0}%
            </p>
            <p className="text-xs font-caption text-muted-foreground">Overall Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationModulesGrid;