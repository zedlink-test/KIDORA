import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StudentFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedTeacher, 
  onTeacherChange, 
  selectedBloodType, 
  onBloodTypeChange, 
  selectedStatus, 
  onStatusChange, 
  ageRange, 
  onAgeRangeChange, 
  onClearFilters, 
  resultCount 
}) => {
  const teacherOptions = [
    { value: '', label: 'All Teachers' },
    { value: 'Sarah Johnson', label: 'Sarah Johnson' },
    { value: 'Michael Chen', label: 'Michael Chen' },
    { value: 'Emily Rodriguez', label: 'Emily Rodriguez' },
    { value: 'David Thompson', label: 'David Thompson' },
    { value: 'Lisa Anderson', label: 'Lisa Anderson' },
    { value: 'James Wilson', label: 'James Wilson' }
  ];

  const bloodTypeOptions = [
    { value: '', label: 'All Blood Types' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Graduated', label: 'Graduated' }
  ];

  const ageRangeOptions = [
    { value: '', label: 'All Ages' },
    { value: '2-3', label: '2-3 years' },
    { value: '3-4', label: '3-4 years' },
    { value: '4-5', label: '4-5 years' },
    { value: '5-6', label: '5-6 years' }
  ];

  const hasActiveFilters = selectedTeacher || selectedBloodType || selectedStatus || ageRange || searchTerm;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft mb-6">
      {/* Search and Results */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex-1 max-w-md mb-4 sm:mb-0">
          <Input
            type="search"
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground font-body">
            <span className="font-medium text-foreground">{resultCount}</span> students found
          </div>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Filter by Teacher"
          options={teacherOptions}
          value={selectedTeacher}
          onChange={onTeacherChange}
          placeholder="Select teacher"
        />
        
        <Select
          label="Filter by Blood Type"
          options={bloodTypeOptions}
          value={selectedBloodType}
          onChange={onBloodTypeChange}
          placeholder="Select blood type"
        />
        
        <Select
          label="Filter by Status"
          options={statusOptions}
          value={selectedStatus}
          onChange={onStatusChange}
          placeholder="Select status"
        />
        
        <Select
          label="Filter by Age Range"
          options={ageRangeOptions}
          value={ageRange}
          onChange={onAgeRangeChange}
          placeholder="Select age range"
        />
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-sm text-muted-foreground font-body">Active filters:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                Search: "{searchTerm}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {selectedTeacher && (
              <span className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full border border-secondary/20">
                Teacher: {selectedTeacher}
                <button
                  onClick={() => onTeacherChange('')}
                  className="ml-1 hover:text-secondary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {selectedBloodType && (
              <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent-foreground text-xs rounded-full border border-accent/20">
                Blood: {selectedBloodType}
                <button
                  onClick={() => onBloodTypeChange('')}
                  className="ml-1 hover:opacity-80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {selectedStatus && (
              <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full border border-success/20">
                Status: {selectedStatus}
                <button
                  onClick={() => onStatusChange('')}
                  className="ml-1 hover:text-success/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {ageRange && (
              <span className="inline-flex items-center px-2 py-1 bg-warning/10 text-warning text-xs rounded-full border border-warning/20">
                Age: {ageRange} years
                <button
                  onClick={() => onAgeRangeChange('')}
                  className="ml-1 hover:text-warning/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFilters;