import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AssignTeacherModal = ({ isOpen, onClose, onAssign, student, currentTeacher }) => {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teacherOptions = [
    { 
      value: 'Sarah Johnson', 
      label: 'Sarah Johnson',
      description: 'Specializes in Language Development - 8 students assigned'
    },
    { 
      value: 'Michael Chen', 
      label: 'Michael Chen',
      description: 'Specializes in Motor Skills - 6 students assigned'
    },
    { 
      value: 'Emily Rodriguez', 
      label: 'Emily Rodriguez',
      description: 'Specializes in Creative Arts - 7 students assigned'
    },
    { 
      value: 'David Thompson', 
      label: 'David Thompson',
      description: 'Specializes in Social Development - 5 students assigned'
    },
    { 
      value: 'Lisa Anderson', 
      label: 'Lisa Anderson',
      description: 'Specializes in Problem Solving - 9 students assigned'
    },
    { 
      value: 'James Wilson', 
      label: 'James Wilson',
      description: 'Specializes in Physical Education - 4 students assigned'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setSelectedTeacher(currentTeacher || '');
    }
  }, [isOpen, currentTeacher]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!selectedTeacher) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onAssign(student?.id, selectedTeacher);
      onClose();
    } catch (error) {
      console.error('Error assigning teacher:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveAssignment = async () => {
    setIsSubmitting(true);
    
    try {
      await onAssign(student?.id, '');
      onClose();
    } catch (error) {
      console.error('Error removing teacher assignment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-card border border-border rounded-lg shadow-soft-xl relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Assign Teacher
              </h3>
              <p className="text-sm text-muted-foreground font-body mt-1">
                {student?.firstName} {student?.lastName}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Current Assignment */}
          {currentTeacher && (
            <div className="mb-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground font-body">Currently Assigned</p>
                  <p className="text-sm text-muted-foreground font-body">{currentTeacher}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveAssignment}
                  disabled={isSubmitting}
                  iconName="UserX"
                  iconPosition="left"
                  iconSize={14}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Select
              label="Select Teacher"
              description="Choose a teacher to assign to this student"
              options={teacherOptions}
              value={selectedTeacher}
              onChange={setSelectedTeacher}
              searchable
              required
            />

            {/* Teacher Info */}
            {selectedTeacher && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="UserCheck" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground font-body">{selectedTeacher}</h4>
                    <p className="text-xs text-muted-foreground font-caption mt-1">
                      {teacherOptions?.find(t => t?.value === selectedTeacher)?.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={!selectedTeacher}
                iconName="UserCheck"
                iconPosition="left"
                iconSize={16}
              >
                Assign Teacher
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignTeacherModal;