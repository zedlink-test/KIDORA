import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EvaluationHistory = ({ student, evaluationHistory, modules, onBackToEvaluation }) => {
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [filterModule, setFilterModule] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const getModuleInfo = (moduleName) => {
    return modules?.find(m => 
      m?.name?.toLowerCase()?.includes(moduleName?.toLowerCase()) ||
      m?.type?.toLowerCase()?.includes(moduleName?.toLowerCase())
    ) || { name: moduleName, icon: 'BookOpen', color: 'primary' };
  };

  const getScoreColor = (score, maxScore = 5) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBadgeColor = (score, maxScore = 5) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-success/10 text-success border-success/20';
    if (percentage >= 60) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-error/10 text-error border-error/20';
  };

  const filteredAndSortedHistory = React.useMemo(() => {
    let filtered = [...evaluationHistory];

    // Filter by module
    if (filterModule !== 'all') {
      filtered = filtered?.filter(evaluation => evaluation?.module === filterModule);
    }

    // Sort evaluations
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b?.date) - new Date(a?.date);
        case 'date-asc':
          return new Date(a?.date) - new Date(b?.date);
        case 'score-desc':
          return b?.overallScore - a?.overallScore;
        case 'score-asc':
          return a?.overallScore - b?.overallScore;
        case 'module-asc':
          return a?.module?.localeCompare(b?.module);
        default:
          return 0;
      }
    });

    return filtered;
  }, [evaluationHistory, filterModule, sortBy]);

  const uniqueModules = React.useMemo(() => {
    const moduleNames = [...new Set(evaluationHistory?.map(evaluation => evaluation?.module))];
    return moduleNames;
  }, [evaluationHistory]);

  if (selectedEvaluation) {
    const moduleInfo = getModuleInfo(selectedEvaluation?.module);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedEvaluation(null)}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
            >
              Back to History
            </Button>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                {selectedEvaluation?.module} Evaluation
              </h2>
              <p className="text-sm font-body text-muted-foreground">
                {new Date(selectedEvaluation?.date)?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1.5 rounded-full border text-sm font-medium font-body ${getScoreBadgeColor(selectedEvaluation?.overallScore, selectedEvaluation?.maxScore)}`}>
              Score: {selectedEvaluation?.overallScore?.toFixed(1)}/{selectedEvaluation?.maxScore}
            </div>
          </div>
        </div>

        {/* Evaluation Details */}
        <div className="bg-card border border-border rounded-lg shadow-soft">
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-${moduleInfo?.color}/10 rounded-lg flex items-center justify-center`}>
                <Icon name={moduleInfo?.icon} size={32} className={`text-${moduleInfo?.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                  {selectedEvaluation?.module}
                </h3>
                <div className="flex items-center space-x-4 text-sm font-body text-muted-foreground">
                  <div className="flex items-center">
                    <Icon name="User" size={14} className="mr-1" />
                    Evaluated by {selectedEvaluation?.evaluator}
                  </div>
                  <div className="flex items-center">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    {new Date(selectedEvaluation?.date)?.toLocaleDateString('en-US')}
                  </div>
                  <div className="flex items-center">
                    <Icon name="CheckCircle" size={14} className="mr-1" />
                    {selectedEvaluation?.status?.charAt(0)?.toUpperCase() + selectedEvaluation?.status?.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Criteria Scores */}
            {selectedEvaluation?.criteriaScores && (
              <div className="mb-6">
                <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Detailed Scores by Criteria
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object?.entries(selectedEvaluation?.criteriaScores)?.map(([criteriaId, score]) => (
                    <div key={criteriaId} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium font-body text-foreground capitalize">
                        {criteriaId?.replace(/([a-z])([A-Z])/g, '$1 $2')?.replace(/^./, str => str?.toUpperCase())}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium font-body ${getScoreColor(score)}`}>
                          {score?.toFixed(1)}/5.0
                        </span>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(score / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {selectedEvaluation?.notes && (
              <div className="mb-6">
                <h4 className="text-lg font-heading font-semibold text-foreground mb-3">
                  Evaluation Notes
                </h4>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-body text-foreground leading-relaxed">
                    {selectedEvaluation?.notes}
                  </p>
                </div>
              </div>
            )}

            {/* Attachments */}
            {selectedEvaluation?.attachments && selectedEvaluation?.attachments?.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-heading font-semibold text-foreground mb-3">
                  Attachments
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedEvaluation?.attachments?.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
                      <Icon 
                        name={
                          attachment?.includes('.jpg') || attachment?.includes('.png') ? 'Image' :
                          attachment?.includes('.mp4') ? 'Video' :
                          attachment?.includes('.mp3') ? 'Music' : 'File'
                        } 
                        size={16} 
                        className="text-primary" 
                      />
                      <span className="text-sm font-body text-foreground truncate">{attachment}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Evaluation History
          </h2>
          <p className="text-sm font-body text-muted-foreground mt-1">
            Complete evaluation history for {student?.name} {student?.surname}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToEvaluation}
          iconName="ClipboardCheck"
          iconPosition="left"
          iconSize={16}
        >
          Back to Evaluation
        </Button>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium font-body text-foreground">Filter by Module:</span>
            <select 
              value={filterModule} 
              onChange={(e) => setFilterModule(e?.target?.value)}
              className="px-3 py-1.5 text-sm font-body border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
            >
              <option value="all">All Modules</option>
              {uniqueModules?.map((module) => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium font-body text-foreground">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-1.5 text-sm font-body border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="score-desc">Highest Score</option>
              <option value="score-asc">Lowest Score</option>
              <option value="module-asc">Module A-Z</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-sm font-body text-muted-foreground">
            <Icon name="History" size={16} />
            <span>{filteredAndSortedHistory?.length} evaluations found</span>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredAndSortedHistory?.length > 0 ? (
          filteredAndSortedHistory?.map((evaluation) => {
            const moduleInfo = getModuleInfo(evaluation?.module);
            
            return (
              <div 
                key={evaluation?.id}
                className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-soft-md transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedEvaluation(evaluation)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-${moduleInfo?.color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon name={moduleInfo?.icon} size={20} className={`text-${moduleInfo?.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-heading font-semibold text-foreground">
                          {evaluation?.module}
                        </h3>
                        <div className={`px-2 py-0.5 rounded-full border text-xs font-medium font-body ${getScoreBadgeColor(evaluation?.overallScore, evaluation?.maxScore)}`}>
                          {evaluation?.overallScore?.toFixed(1)}/{evaluation?.maxScore}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm font-body text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Icon name="Calendar" size={14} className="mr-1" />
                          {new Date(evaluation?.date)?.toLocaleDateString('en-US')}
                        </div>
                        <div className="flex items-center">
                          <Icon name="User" size={14} className="mr-1" />
                          {evaluation?.evaluator}
                        </div>
                        <div className="flex items-center">
                          <Icon name="CheckCircle" size={14} className="mr-1" />
                          {evaluation?.status?.charAt(0)?.toUpperCase() + evaluation?.status?.slice(1)}
                        </div>
                      </div>
                      
                      {evaluation?.notes && (
                        <p className="text-sm font-body text-muted-foreground line-clamp-2">
                          {evaluation?.notes}
                        </p>
                      )}
                      
                      {evaluation?.attachments && evaluation?.attachments?.length > 0 && (
                        <div className="flex items-center mt-2">
                          <Icon name="Paperclip" size={14} className="text-primary mr-1" />
                          <span className="text-xs font-caption text-primary">
                            {evaluation?.attachments?.length} attachment{evaluation?.attachments?.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      iconSize={14}
                    >
                      View Details
                    </Button>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
              <Icon name="History" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              No Evaluations Found
            </h3>
            <p className="text-muted-foreground font-body mb-4">
              {filterModule === 'all' 
                ? `No evaluations have been completed for ${student?.name} yet.`
                : `No evaluations found for the ${filterModule} module.`
              }
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilterModule('all');
                onBackToEvaluation();
              }}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Start New Evaluation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationHistory;