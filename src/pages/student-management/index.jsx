import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import StudentTable from './components/StudentTable';
import StudentCard from './components/StudentCard';
import StudentFilters from './components/StudentFilters';
import StudentModal from './components/StudentModal';
import StudentProfile from './components/StudentProfile';
import AssignTeacherModal from './components/AssignTeacherModal';

const StudentManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Modal states
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  // Mock student data
  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        firstName: "Emma",
        lastName: "Johnson",
        dateOfBirth: "2021-03-15",
        parentContact: "+1 (555) 123-4567",
        emergencyContact: "+1 (555) 987-6543",
        bloodType: "A+",
        allergies: "Peanuts, Dairy",
        specialNotes: "Requires extra attention during meal times due to allergies. Very social and enjoys group activities.",
        assignedTeacher: "Sarah Johnson",
        status: "Active"
      },
      {
        id: 2,
        firstName: "Liam",
        lastName: "Chen",
        dateOfBirth: "2020-11-22",
        parentContact: "+1 (555) 234-5678",
        emergencyContact: "+1 (555) 876-5432",
        bloodType: "O+",
        allergies: "None",
        specialNotes: "Advanced motor skills development. Shows leadership qualities among peers.",
        assignedTeacher: "Michael Chen",
        status: "Active"
      },
      {
        id: 3,
        firstName: "Sophia",
        lastName: "Rodriguez",
        dateOfBirth: "2021-07-08",
        parentContact: "+1 (555) 345-6789",
        emergencyContact: "",
        bloodType: "B+",
        allergies: "Shellfish",
        specialNotes: "Shy initially but warms up quickly. Excellent artistic abilities.",
        assignedTeacher: "Emily Rodriguez",
        status: "Active"
      },
      {
        id: 4,
        firstName: "Noah",
        lastName: "Thompson",
        dateOfBirth: "2020-09-14",
        parentContact: "+1 (555) 456-7890",
        emergencyContact: "+1 (555) 765-4321",
        bloodType: "AB+",
        allergies: "None",
        specialNotes: "High energy level. Responds well to structured activities and clear instructions.",
        assignedTeacher: "David Thompson",
        status: "Active"
      },
      {
        id: 5,
        firstName: "Olivia",
        lastName: "Anderson",
        dateOfBirth: "2021-01-30",
        parentContact: "+1 (555) 567-8901",
        emergencyContact: "+1 (555) 654-3210",
        bloodType: "A-",
        allergies: "Eggs, Gluten",
        specialNotes: "Follows special dietary requirements. Very curious and asks many questions.",
        assignedTeacher: "Lisa Anderson",
        status: "Active"
      },
      {
        id: 6,
        firstName: "Ethan",
        lastName: "Wilson",
        dateOfBirth: "2020-12-05",
        parentContact: "+1 (555) 678-9012",
        emergencyContact: "+1 (555) 543-2109",
        bloodType: "O-",
        allergies: "None",
        specialNotes: "Excellent physical coordination. Enjoys outdoor activities and sports.",
        assignedTeacher: "James Wilson",
        status: "Active"
      },
      {
        id: 7,
        firstName: "Ava",
        lastName: "Martinez",
        dateOfBirth: "2021-05-18",
        parentContact: "+1 (555) 789-0123",
        emergencyContact: "+1 (555) 432-1098",
        bloodType: "B-",
        allergies: "Latex",
        specialNotes: "Sensitive to certain materials. Prefers quiet activities and reading.",
        assignedTeacher: "",
        status: "Active"
      },
      {
        id: 8,
        firstName: "Mason",
        lastName: "Garcia",
        dateOfBirth: "2020-08-27",
        parentContact: "+1 (555) 890-1234",
        emergencyContact: "+1 (555) 321-0987",
        bloodType: "AB-",
        allergies: "Dust, Pollen",
        specialNotes: "Seasonal allergies managed with medication. Very creative and imaginative.",
        assignedTeacher: "Sarah Johnson",
        status: "Inactive"
      },
      {
        id: 9,
        firstName: "Isabella",
        lastName: "Brown",
        dateOfBirth: "2019-04-12",
        parentContact: "+1 (555) 901-2345",
        emergencyContact: "+1 (555) 210-9876",
        bloodType: "A+",
        allergies: "None",
        specialNotes: "Ready for advanced learning activities. Shows strong problem-solving skills.",
        assignedTeacher: "Michael Chen",
        status: "Graduated"
      },
      {
        id: 10,
        firstName: "Lucas",
        lastName: "Davis",
        dateOfBirth: "2021-02-28",
        parentContact: "+1 (555) 012-3456",
        emergencyContact: "+1 (555) 109-8765",
        bloodType: "O+",
        allergies: "Soy",
        specialNotes: "Requires soy-free meals. Very social and helps other children adapt.",
        assignedTeacher: "",
        status: "Active"
      }
    ];
    
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...students];

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter(student =>
        `${student?.firstName} ${student?.lastName}`?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Teacher filter
    if (selectedTeacher) {
      filtered = filtered?.filter(student => student?.assignedTeacher === selectedTeacher);
    }

    // Blood type filter
    if (selectedBloodType) {
      filtered = filtered?.filter(student => student?.bloodType === selectedBloodType);
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered?.filter(student => student?.status === selectedStatus);
    }

    // Age range filter
    if (ageRange) {
      const [minAge, maxAge] = ageRange?.split('-')?.map(Number);
      filtered = filtered?.filter(student => {
        let age = calculateAge(student?.dateOfBirth);
        return age >= minAge && age <= maxAge;
      });
    }

    // Sort
    filtered?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];

      if (sortField === 'age') {
        aValue = calculateAge(a?.dateOfBirth);
        bValue = calculateAge(b?.dateOfBirth);
      }

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredStudents(filtered);
  }, [students, searchTerm, selectedTeacher, selectedBloodType, selectedStatus, ageRange, sortField, sortDirection]);

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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTeacher('');
    setSelectedBloodType('');
    setSelectedStatus('');
    setAgeRange('');
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setModalMode('create');
    setShowStudentModal(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setModalMode('edit');
    setShowStudentModal(true);
  };

  const handleDeleteStudent = (student) => {
    if (window.confirm(`Are you sure you want to delete ${student?.firstName} ${student?.lastName}?`)) {
      setStudents(prev => prev?.filter(s => s?.id !== student?.id));
    }
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const handleAssignTeacher = (student) => {
    setSelectedStudent(student);
    setShowAssignModal(true);
  };

  const handleSaveStudent = (studentData) => {
    if (modalMode === 'create') {
      setStudents(prev => [...prev, { ...studentData, id: Date.now() }]);
    } else {
      setStudents(prev => prev?.map(s => s?.id === studentData?.id ? studentData : s));
    }
  };

  const handleTeacherAssignment = (studentId, teacherName) => {
    setStudents(prev => prev?.map(s => 
      s?.id === studentId ? { ...s, assignedTeacher: teacherName } : s
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="admin" 
        userName="John Doe"
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole="admin"
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Student Management</h1>
              <p className="text-muted-foreground font-body mt-2">
                Manage student profiles, assignments, and educational progress tracking
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  iconName="Table"
                  iconSize={16}
                  className="h-8 px-3"
                >
                  Table
                </Button>
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  iconName="Grid3X3"
                  iconSize={16}
                  className="h-8 px-3"
                >
                  Cards
                </Button>
              </div>
              
              <Button
                onClick={handleAddStudent}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Add Student
              </Button>
            </div>
          </div>

          {/* Filters */}
          <StudentFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTeacher={selectedTeacher}
            onTeacherChange={setSelectedTeacher}
            selectedBloodType={selectedBloodType}
            onBloodTypeChange={setSelectedBloodType}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            ageRange={ageRange}
            onAgeRangeChange={setAgeRange}
            onClearFilters={handleClearFilters}
            resultCount={filteredStudents?.length}
          />

          {/* Content */}
          {viewMode === 'table' ? (
            <StudentTable
              students={filteredStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              onAssignTeacher={handleAssignTeacher}
              onViewProfile={handleViewProfile}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStudents?.map((student) => (
                <StudentCard
                  key={student?.id}
                  student={student}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                  onAssignTeacher={handleAssignTeacher}
                  onViewProfile={handleViewProfile}
                />
              ))}
              
              {filteredStudents?.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground font-heading mb-2">No students found</h3>
                  <p className="text-muted-foreground font-body mb-4">
                    Try adjusting your search or filter criteria, or add a new student.
                  </p>
                  <Button
                    onClick={handleAddStudent}
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Add First Student
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      {/* Modals */}
      <StudentModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        onSave={handleSaveStudent}
        student={selectedStudent}
        mode={modalMode}
      />
      <StudentProfile
        student={selectedStudent}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onEdit={handleEditStudent}
        onAssignTeacher={handleAssignTeacher}
      />
      <AssignTeacherModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onAssign={handleTeacherAssignment}
        student={selectedStudent}
        currentTeacher={selectedStudent?.assignedTeacher}
      />
    </div>
  );
};

export default StudentManagement;