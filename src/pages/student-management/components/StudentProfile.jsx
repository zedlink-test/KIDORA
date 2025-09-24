import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentProfile = ({ student, isOpen, onClose, onEdit, onAssignTeacher }) => {
  if (!isOpen || !student) return null;

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today?.getFullYear() - birth?.getFullYear();
    const monthDiff = today?.getMonth() - birth?.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birth?.getDate())) {
      age--;
    }
    
    return age;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Inactive':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Graduated':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'A+': 'bg-red-50 text-red-700 border-red-200',
      'A-': 'bg-red-100 text-red-800 border-red-300',
      'B+': 'bg-blue-50 text-blue-700 border-blue-200',
      'B-': 'bg-blue-100 text-blue-800 border-blue-300',
      'AB+': 'bg-purple-50 text-purple-700 border-purple-200',
      'AB-': 'bg-purple-100 text-purple-800 border-purple-300',
      'O+': 'bg-green-50 text-green-700 border-green-200',
      'O-': 'bg-green-100 text-green-800 border-green-300'
    };
    return colors?.[bloodType] || 'bg-muted text-muted-foreground border-border';
  };

  const evaluationModules = [
    { id: 1, name: 'Language Development', progress: 85, lastUpdated: '2025-01-15' },
    { id: 2, name: 'Motor Skills', progress: 92, lastUpdated: '2025-01-14' },
    { id: 3, name: 'Social Interaction', progress: 78, lastUpdated: '2025-01-13' },
    { id: 4, name: 'Creative Expression', progress: 88, lastUpdated: '2025-01-12' },
    { id: 5, name: 'Problem Solving', progress: 75, lastUpdated: '2025-01-11' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-card border border-border rounded-lg shadow-soft-xl relative max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  {student?.firstName} {student?.lastName}
                </h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-muted-foreground font-body">
                    Age: {calculateAge(student?.dateOfBirth)} years
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(student?.status)}`}>
                    {student?.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(student)}
                iconName="Edit"
                iconPosition="left"
                iconSize={14}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground font-body">Date of Birth</label>
                    <p className="text-sm text-foreground font-body mt-1">
                      {new Date(student.dateOfBirth)?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground font-body">Blood Type</label>
                    <div className="mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getBloodTypeColor(student?.bloodType)}`}>
                        {student?.bloodType}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground font-body">Parent Contact</label>
                    <p className="text-sm text-foreground font-mono mt-1">{student?.parentContact}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground font-body">Emergency Contact</label>
                    <p className="text-sm text-foreground font-mono mt-1">
                      {student?.emergencyContact || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Medical Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground font-body">Allergies</label>
                    <p className="text-sm text-foreground font-body mt-1">
                      {student?.allergies || 'None reported'}
                    </p>
                  </div>
                  {student?.specialNotes && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground font-body">Special Notes</label>
                      <p className="text-sm text-foreground font-body mt-1 whitespace-pre-wrap">
                        {student?.specialNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Evaluation Modules */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Evaluation Modules</h3>
                <div className="space-y-3">
                  {evaluationModules?.map((module) => (
                    <div key={module.id} className="bg-card border border-border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-foreground font-body">{module.name}</h4>
                        <span className="text-xs text-muted-foreground font-caption">
                          Updated: {new Date(module.lastUpdated)?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${module.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground font-mono">
                          {module.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Assignment & Actions */}
            <div className="space-y-6">
              {/* Teacher Assignment */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Teacher Assignment</h3>
                {student?.assignedTeacher ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Icon name="UserCheck" size={16} className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground font-body">
                          {student?.assignedTeacher}
                        </p>
                        <p className="text-xs text-muted-foreground font-caption">Primary Teacher</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAssignTeacher(student)}
                      iconName="RefreshCw"
                      iconPosition="left"
                      iconSize={14}
                      className="w-full"
                    >
                      Reassign Teacher
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Icon name="UserX" size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground font-body mb-3">No teacher assigned</p>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onAssignTeacher(student)}
                      iconName="UserPlus"
                      iconPosition="left"
                      iconSize={14}
                      className="w-full"
                    >
                      Assign Teacher
                    </Button>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-body">Enrollment Date</span>
                    <span className="text-sm font-medium text-foreground font-body">
                      {new Date(2024, 8, 15)?.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-body">Days Attended</span>
                    <span className="text-sm font-medium text-foreground font-mono">142</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-body">Attendance Rate</span>
                    <span className="text-sm font-medium text-success font-mono">96%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-body">Overall Progress</span>
                    <span className="text-sm font-medium text-primary font-mono">84%</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-foreground font-body">Language evaluation updated</p>
                      <p className="text-xs text-muted-foreground font-caption">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-foreground font-body">Motor skills assessment completed</p>
                      <p className="text-xs text-muted-foreground font-caption">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-foreground font-body">Parent meeting scheduled</p>
                      <p className="text-xs text-muted-foreground font-caption">1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;