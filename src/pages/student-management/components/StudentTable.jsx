import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentTable = ({ students, onEdit, onDelete, onAssignTeacher, onViewProfile, onSort, sortField, sortDirection }) => {
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

  const handleSort = (field) => {
    onSort(field);
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors duration-150"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span className="font-heading">{children}</span>
        {sortField === field && (
          <Icon 
            name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
            size={14} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/30">
            <tr>
              <SortableHeader field="firstName">Student Name</SortableHeader>
              <SortableHeader field="age">Age</SortableHeader>
              <SortableHeader field="assignedTeacher">Assigned Teacher</SortableHeader>
              <SortableHeader field="bloodType">Blood Type</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider font-heading">
                Contact
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider font-heading">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {students?.map((student) => (
              <tr key={student?.id} className="hover:bg-muted/20 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground font-body">
                        {student?.firstName} {student?.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground font-caption">
                        DOB: {new Date(student.dateOfBirth)?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground font-body">
                    {calculateAge(student?.dateOfBirth)} years
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground font-body">
                    {student?.assignedTeacher || (
                      <span className="text-muted-foreground italic">Not Assigned</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getBloodTypeColor(student?.bloodType)}`}>
                    {student?.bloodType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(student?.status)}`}>
                    {student?.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground font-mono">
                    {student?.parentContact}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewProfile(student)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(student)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAssignTeacher(student)}
                      className="h-8 w-8"
                    >
                      <Icon name="UserCheck" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(student)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {students?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground font-heading mb-2">No students found</h3>
          <p className="text-muted-foreground font-body">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StudentTable;