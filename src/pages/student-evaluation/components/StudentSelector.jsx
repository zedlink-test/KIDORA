import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentSelector = ({ students, selectedStudent, onStudentSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

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
      case 'completed':
        return 'bg-success';
      case 'in-progress':
        return 'bg-warning';
      case 'pending':
        return 'bg-error';
      default:
        return 'bg-muted-foreground';
    }
  };

  const filteredStudents = students?.filter(student =>
    `${student?.name} ${student?.surname}`?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  ) || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document?.addEventListener('mousedown', handleClickOutside);
    return () => {
      document?.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStudentSelect = (student) => {
    onStudentSelect(student);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Student Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 min-w-48 justify-start"
      >
        <div className="flex items-center space-x-3 flex-1">
          <div className="relative">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
              {selectedStudent?.avatar ? (
                <Image 
                  src={selectedStudent?.avatar} 
                  alt={`${selectedStudent?.name} ${selectedStudent?.surname}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={14} className="text-primary" />
              )}
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-card ${getStatusColor(selectedStudent?.evaluationStatus)}`} />
          </div>
          
          <div className="text-left">
            <p className="text-sm font-medium font-body text-foreground">
              {selectedStudent?.name} {selectedStudent?.surname}
            </p>
            <p className="text-xs font-caption text-muted-foreground">
              Age {calculateAge(selectedStudent?.dateOfBirth)}
            </p>
          </div>
        </div>
        
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-soft-lg z-50">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 text-sm font-body border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredStudents?.length > 0 ? (
              filteredStudents?.map((student) => (
                <button
                  key={student?.id}
                  onClick={() => handleStudentSelect(student)}
                  className={`w-full p-3 flex items-center space-x-3 hover:bg-muted/50 transition-colors duration-200 text-left ${
                    selectedStudent?.id === student?.id ? 'bg-primary/5 border-r-2 border-primary' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                      {student?.avatar ? (
                        <Image 
                          src={student?.avatar} 
                          alt={`${student?.name} ${student?.surname}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon name="User" size={16} className="text-primary" />
                      )}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(student?.evaluationStatus)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium font-body text-foreground">
                      {student?.name} {student?.surname}
                    </p>
                    <div className="flex items-center space-x-2 text-xs font-caption text-muted-foreground">
                      <span>Age {calculateAge(student?.dateOfBirth)}</span>
                      <span>•</span>
                      <span className="capitalize">{student?.evaluationStatus?.replace('-', ' ')}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs font-caption text-muted-foreground">
                      {student?.completedModules}/{student?.totalModules}
                    </div>
                    <div className="text-xs font-caption text-muted-foreground">
                      modules
                    </div>
                  </div>

                  {selectedStudent?.id === student?.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))
            ) : (
              <div className="p-6 text-center">
                <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-body text-muted-foreground">
                  No students found matching "{searchTerm}"
                </p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border bg-muted/30">
            <p className="text-xs font-caption text-muted-foreground text-center">
              {filteredStudents?.length} of {students?.length} students
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSelector;