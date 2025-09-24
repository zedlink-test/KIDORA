import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeacherTable = ({ 
  teachers, 
  onEdit, 
  onDelete, 
  onViewProfile, 
  sortConfig, 
  onSort,
  selectedTeachers,
  onSelectTeacher,
  onSelectAll 
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (teacherId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(teacherId)) {
      newExpanded?.delete(teacherId);
    } else {
      newExpanded?.add(teacherId);
    }
    setExpandedRows(newExpanded);
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="opacity-50" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pending' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getApprovalBadge = (approved) => {
    return approved ? (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
        <Icon name="CheckCircle" size={12} className="mr-1" />
        Approved
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
        <Icon name="Clock" size={12} className="mr-1" />
        Pending
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedTeachers?.length === teachers?.length && teachers?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Teacher</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => onSort('specialty')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Specialty</span>
                  {getSortIcon('specialty')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => onSort('assignedClasses')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Classes</span>
                  {getSortIcon('assignedClasses')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => onSort('approved')}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Approval</span>
                  {getSortIcon('approved')}
                </button>
              </th>
              <th className="text-right px-4 py-3 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {teachers?.map((teacher) => (
              <React.Fragment key={teacher?.id}>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTeachers?.includes(teacher?.id)}
                      onChange={(e) => onSelectTeacher(teacher?.id, e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={teacher?.avatar}
                          alt={`${teacher?.name} ${teacher?.surname}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{teacher?.name} {teacher?.surname}</p>
                        <p className="text-sm text-muted-foreground">{teacher?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {teacher?.specialty}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {teacher?.assignedClasses?.slice(0, 2)?.map((className, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary/10 text-secondary">
                          {className}
                        </span>
                      ))}
                      {teacher?.assignedClasses?.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{teacher?.assignedClasses?.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(teacher?.status)}
                  </td>
                  <td className="px-4 py-3">
                    {getApprovalBadge(teacher?.approved)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRowExpansion(teacher?.id)}
                        className="h-8 w-8"
                      >
                        <Icon 
                          name={expandedRows?.has(teacher?.id) ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewProfile(teacher)}
                        className="h-8 w-8"
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(teacher)}
                        className="h-8 w-8"
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(teacher?.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
                {expandedRows?.has(teacher?.id) && (
                  <tr>
                    <td colSpan="7" className="px-4 py-3 bg-muted/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-foreground mb-1">Contact Information</p>
                          <p className="text-muted-foreground">Phone: {teacher?.phone}</p>
                          <p className="text-muted-foreground">Email: {teacher?.email}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Employment Details</p>
                          <p className="text-muted-foreground">Start Date: {teacher?.startDate}</p>
                          <p className="text-muted-foreground">Experience: {teacher?.experience} years</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">All Assigned Classes</p>
                          <div className="flex flex-wrap gap-1">
                            {teacher?.assignedClasses?.map((className, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary/10 text-secondary">
                                {className}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {teachers?.map((teacher) => (
          <div key={teacher?.id} className="p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedTeachers?.includes(teacher?.id)}
                onChange={(e) => onSelectTeacher(teacher?.id, e?.target?.checked)}
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
                    <h3 className="font-medium text-foreground">{teacher?.name} {teacher?.surname}</h3>
                    <p className="text-sm text-muted-foreground">{teacher?.email}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleRowExpansion(teacher?.id)}
                    className="h-8 w-8"
                  >
                    <Icon 
                      name={expandedRows?.has(teacher?.id) ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                    />
                  </Button>
                </div>
                
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {teacher?.specialty}
                    </span>
                    {getStatusBadge(teacher?.status)}
                    {getApprovalBadge(teacher?.approved)}
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Classes:</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher?.assignedClasses?.slice(0, 3)?.map((className, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary/10 text-secondary">
                          {className}
                        </span>
                      ))}
                      {teacher?.assignedClasses?.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{teacher?.assignedClasses?.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {expandedRows?.has(teacher?.id) && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2">
                    <div>
                      <p className="text-xs font-medium text-foreground">Contact</p>
                      <p className="text-xs text-muted-foreground">{teacher?.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Employment</p>
                      <p className="text-xs text-muted-foreground">Started: {teacher?.startDate}</p>
                      <p className="text-xs text-muted-foreground">Experience: {teacher?.experience} years</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-2 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewProfile(teacher)}
                    iconName="Eye"
                    iconPosition="left"
                    iconSize={14}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(teacher)}
                    iconName="Edit"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(teacher?.id)}
                    iconName="Trash2"
                    iconPosition="left"
                    iconSize={14}
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {teachers?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No teachers found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TeacherTable;