import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PendingApprovals = ({ 
  pendingTeachers, 
  onApprove, 
  onReject, 
  onBulkApprove,
  selectedPending,
  onSelectPending,
  onSelectAllPending 
}) => {
  const [expandedApplications, setExpandedApplications] = useState(new Set());

  const toggleApplicationExpansion = (teacherId) => {
    const newExpanded = new Set(expandedApplications);
    if (newExpanded?.has(teacherId)) {
      newExpanded?.delete(teacherId);
    } else {
      newExpanded?.add(teacherId);
    }
    setExpandedApplications(newExpanded);
  };

  if (pendingTeachers?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-soft p-6 mb-6">
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">All Caught Up!</h3>
          <p className="text-muted-foreground">No pending teacher approvals at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft mb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="Clock" size={20} className="text-warning" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Pending Approvals</h2>
            <p className="text-sm text-muted-foreground">
              {pendingTeachers?.length} teacher{pendingTeachers?.length !== 1 ? 's' : ''} awaiting approval
            </p>
          </div>
        </div>
        
        {selectedPending?.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedPending?.length} selected
            </span>
            <Button
              variant="default"
              size="sm"
              onClick={() => onBulkApprove(selectedPending)}
              iconName="CheckCircle"
              iconPosition="left"
              iconSize={14}
            >
              Approve Selected
            </Button>
          </div>
        )}
      </div>
      {/* Pending Applications List */}
      <div className="divide-y divide-border">
        {pendingTeachers?.map((teacher) => (
          <div key={teacher?.id} className="p-6">
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedPending?.includes(teacher?.id)}
                onChange={(e) => onSelectPending(teacher?.id, e?.target?.checked)}
                className="mt-1 rounded border-border"
              />
              
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={teacher?.avatar}
                  alt={`${teacher?.name} ${teacher?.surname}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {teacher?.name} {teacher?.surname}
                    </h3>
                    <p className="text-sm text-muted-foreground">{teacher?.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {teacher?.specialty}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Applied: {teacher?.applicationDate}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleApplicationExpansion(teacher?.id)}
                      className="h-8 w-8"
                    >
                      <Icon 
                        name={expandedApplications?.has(teacher?.id) ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReject(teacher?.id)}
                      iconName="X"
                      iconPosition="left"
                      iconSize={14}
                      className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onApprove(teacher?.id)}
                      iconName="Check"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Approve
                    </Button>
                  </div>
                </div>

                {/* Expanded Application Details */}
                {expandedApplications?.has(teacher?.id) && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Contact Information</h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-muted-foreground">
                            <span className="font-medium">Phone:</span> {teacher?.phone}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium">Email:</span> {teacher?.email}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-muted-foreground">Email Verified:</span>
                            {teacher?.emailVerified ? (
                              <span className="inline-flex items-center text-success">
                                <Icon name="CheckCircle" size={14} className="mr-1" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-warning">
                                <Icon name="AlertCircle" size={14} className="mr-1" />
                                Pending
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Professional Details</h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-muted-foreground">
                            <span className="font-medium">Experience:</span> {teacher?.experience} years
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium">Education:</span> {teacher?.education}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium">Certifications:</span> {teacher?.certifications}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Requested Classes</h4>
                        <div className="flex flex-wrap gap-1">
                          {teacher?.requestedClasses?.map((className, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary/10 text-secondary">
                              {className}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {teacher?.coverLetter && (
                      <div className="mt-4">
                        <h4 className="font-medium text-foreground mb-2">Cover Letter</h4>
                        <p className="text-sm text-muted-foreground bg-background p-3 rounded border">
                          {teacher?.coverLetter}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Application ID: {teacher?.applicationId}</span>
                      <span>Submitted: {teacher?.applicationDate} at {teacher?.applicationTime}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Bulk Actions Footer */}
      {pendingTeachers?.length > 1 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedPending?.length === pendingTeachers?.length}
                onChange={(e) => onSelectAllPending(e?.target?.checked)}
                className="rounded border-border"
              />
              <span className="text-sm text-muted-foreground">
                Select all pending applications
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {pendingTeachers?.length} total applications pending review
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;