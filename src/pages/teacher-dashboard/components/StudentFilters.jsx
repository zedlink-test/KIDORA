import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StudentFilters = ({ filters, onFilterChange, onClearFilters, studentCount }) => {
  const evaluationStatusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'pending', label: 'Pending' }
  ];

  const ageGroupOptions = [
    { value: 'all', label: 'All Ages' },
    { value: '2-3', label: '2-3 years' },
    { value: '3-4', label: '3-4 years' },
    { value: '4-5', label: '4-5 years' },
    { value: '5-6', label: '5-6 years' }
  ];

  const specialNeedsOptions = [
    { value: 'all', label: 'All Students' },
    { value: 'special-needs', label: 'Special Needs' },
    { value: 'regular', label: 'Regular' }
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'age-asc', label: 'Age (Youngest)' },
    { value: 'age-desc', label: 'Age (Oldest)' },
    { value: 'progress-desc', label: 'Progress (High-Low)' },
    { value: 'progress-asc', label: 'Progress (Low-High)' }
  ];

  const hasActiveFilters = () => {
    return filters?.search || 
           filters?.evaluationStatus !== 'all' || 
           filters?.ageGroup !== 'all' || 
           filters?.specialNeeds !== 'all' ||
           filters?.sortBy !== 'name-asc';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Filter" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">Student Filters</h2>
            <p className="text-sm font-body text-muted-foreground">
              {studentCount} students found
            </p>
          </div>
        </div>
        
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Search */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search students by name..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          label="Evaluation Status"
          options={evaluationStatusOptions}
          value={filters?.evaluationStatus}
          onChange={(value) => onFilterChange('evaluationStatus', value)}
        />

        <Select
          label="Age Group"
          options={ageGroupOptions}
          value={filters?.ageGroup}
          onChange={(value) => onFilterChange('ageGroup', value)}
        />

        <Select
          label="Special Needs"
          options={specialNeedsOptions}
          value={filters?.specialNeeds}
          onChange={(value) => onFilterChange('specialNeeds', value)}
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />
      </div>
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={filters?.evaluationStatus === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('evaluationStatus', 
            filters?.evaluationStatus === 'pending' ? 'all' : 'pending'
          )}
          iconName="AlertCircle"
          iconPosition="left"
          iconSize={14}
        >
          Needs Evaluation
        </Button>

        <Button
          variant={filters?.specialNeeds === 'special-needs' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('specialNeeds', 
            filters?.specialNeeds === 'special-needs' ? 'all' : 'special-needs'
          )}
          iconName="Star"
          iconPosition="left"
          iconSize={14}
        >
          Special Needs
        </Button>

        <Button
          variant={filters?.evaluationStatus === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('evaluationStatus', 
            filters?.evaluationStatus === 'completed' ? 'all' : 'completed'
          )}
          iconName="CheckCircle"
          iconPosition="left"
          iconSize={14}
        >
          Completed
        </Button>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="border-t border-border pt-4">
          <p className="text-sm font-medium font-body text-foreground mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters?.search && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                <Icon name="Search" size={12} />
                <span>"{filters?.search}"</span>
                <button
                  onClick={() => onFilterChange('search', '')}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={10} />
                </button>
              </div>
            )}
            
            {filters?.evaluationStatus !== 'all' && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs">
                <Icon name="ClipboardCheck" size={12} />
                <span>{evaluationStatusOptions?.find(opt => opt?.value === filters?.evaluationStatus)?.label}</span>
                <button
                  onClick={() => onFilterChange('evaluationStatus', 'all')}
                  className="hover:bg-secondary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={10} />
                </button>
              </div>
            )}
            
            {filters?.ageGroup !== 'all' && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent-foreground rounded-full text-xs">
                <Icon name="Calendar" size={12} />
                <span>{ageGroupOptions?.find(opt => opt?.value === filters?.ageGroup)?.label}</span>
                <button
                  onClick={() => onFilterChange('ageGroup', 'all')}
                  className="hover:bg-accent/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={10} />
                </button>
              </div>
            )}
            
            {filters?.specialNeeds !== 'all' && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-warning/10 text-warning rounded-full text-xs">
                <Icon name="Star" size={12} />
                <span>{specialNeedsOptions?.find(opt => opt?.value === filters?.specialNeeds)?.label}</span>
                <button
                  onClick={() => onFilterChange('specialNeeds', 'all')}
                  className="hover:bg-warning/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={10} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFilters;