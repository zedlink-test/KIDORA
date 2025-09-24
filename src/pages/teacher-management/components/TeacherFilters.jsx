import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TeacherFilters = ({ 
  searchTerm, 
  onSearchChange, 
  specialtyFilter, 
  onSpecialtyChange,
  statusFilter,
  onStatusChange,
  approvalFilter,
  onApprovalChange,
  classFilter,
  onClassChange,
  onClearFilters,
  teacherCounts 
}) => {
  const specialtyOptions = [
    { value: 'all', label: 'All Specialties' },
    { value: 'Early Childhood Education', label: 'Early Childhood Education' },
    { value: 'Child Development', label: 'Child Development' },
    { value: 'Special Needs', label: 'Special Needs' },
    { value: 'Music & Arts', label: 'Music & Arts' },
    { value: 'Physical Education', label: 'Physical Education' },
    { value: 'Language Development', label: 'Language Development' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const approvalOptions = [
    { value: 'all', label: 'All Approvals' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending Approval' }
  ];

  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'Toddlers A', label: 'Toddlers A' },
    { value: 'Toddlers B', label: 'Toddlers B' },
    { value: 'Pre-K A', label: 'Pre-K A' },
    { value: 'Pre-K B', label: 'Pre-K B' },
    { value: 'Kindergarten A', label: 'Kindergarten A' },
    { value: 'Kindergarten B', label: 'Kindergarten B' },
    { value: 'Special Needs', label: 'Special Needs' }
  ];

  const hasActiveFilters = searchTerm || 
    specialtyFilter !== 'all' || 
    statusFilter !== 'all' || 
    approvalFilter !== 'all' || 
    classFilter !== 'all';

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-6 mb-6">
      {/* Search and Quick Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search teachers by name, email, or specialty..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Active:</span>
            <span className="font-medium text-foreground">{teacherCounts?.active}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Pending:</span>
            <span className="font-medium text-foreground">{teacherCounts?.pending}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium text-foreground">{teacherCounts?.total}</span>
          </div>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Specialty"
          options={specialtyOptions}
          value={specialtyFilter}
          onChange={onSpecialtyChange}
          className="w-full"
        />
        
        <Select
          label="Status"
          options={statusOptions}
          value={statusFilter}
          onChange={onStatusChange}
          className="w-full"
        />
        
        <Select
          label="Approval"
          options={approvalOptions}
          value={approvalFilter}
          onChange={onApprovalChange}
          className="w-full"
        />
        
        <Select
          label="Class Assignment"
          options={classOptions}
          value={classFilter}
          onChange={onClassChange}
          className="w-full"
        />
      </div>
      {/* Filter Actions */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={16} />
            <span>Filters applied</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear All Filters
          </Button>
        </div>
      )}
      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
              Search: "{searchTerm}"
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {specialtyFilter !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
              Specialty: {specialtyOptions?.find(opt => opt?.value === specialtyFilter)?.label}
              <button
                onClick={() => onSpecialtyChange('all')}
                className="ml-1 hover:text-secondary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {statusFilter !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent/10 text-accent-foreground">
              Status: {statusOptions?.find(opt => opt?.value === statusFilter)?.label}
              <button
                onClick={() => onStatusChange('all')}
                className="ml-1 hover:opacity-80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {approvalFilter !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-warning/10 text-warning">
              Approval: {approvalOptions?.find(opt => opt?.value === approvalFilter)?.label}
              <button
                onClick={() => onApprovalChange('all')}
                className="ml-1 hover:text-warning/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {classFilter !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success/10 text-success">
              Class: {classOptions?.find(opt => opt?.value === classFilter)?.label}
              <button
                onClick={() => onClassChange('all')}
                className="ml-1 hover:text-success/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherFilters;