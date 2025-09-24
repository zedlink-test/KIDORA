import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import TeacherTable from './components/TeacherTable';
import TeacherFilters from './components/TeacherFilters';
import PendingApprovals from './components/PendingApprovals';
import TeacherFormModal from './components/TeacherFormModal';
import TeacherStats from './components/TeacherStats';

const TeacherManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Modal states
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [approvalFilter, setApprovalFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  // Selection states
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedPending, setSelectedPending] = useState([]);

  // Sort state
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Mock data
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Sarah",
      surname: "Johnson",
      email: "sarah.johnson@kidora.edu",
      phone: "+1 (555) 123-4567",
      specialty: "Early Childhood Education",
      assignedClasses: ["Toddlers A", "Pre-K A"],
      status: "active",
      approved: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      startDate: "2023-01-15",
      experience: 5,
      education: "Bachelor\'s in Early Childhood Education",
      certifications: "CPR Certified, Child Development Associate"
    },
    {
      id: 2,
      name: "Michael",
      surname: "Chen",
      email: "michael.chen@kidora.edu",
      phone: "+1 (555) 234-5678",
      specialty: "Special Needs",
      assignedClasses: ["Special Needs"],
      status: "active",
      approved: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      startDate: "2022-08-20",
      experience: 8,
      education: "Master\'s in Special Education",
      certifications: "Special Needs Certification, Behavioral Therapy"
    },
    {
      id: 3,
      name: "Emily",
      surname: "Rodriguez",
      email: "emily.rodriguez@kidora.edu",
      phone: "+1 (555) 345-6789",
      specialty: "Music & Arts",
      assignedClasses: ["Pre-K B", "Kindergarten A"],
      status: "active",
      approved: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      startDate: "2023-03-10",
      experience: 3,
      education: "Bachelor\'s in Music Education",
      certifications: "Music Therapy Certification"
    },
    {
      id: 4,
      name: "David",
      surname: "Thompson",
      email: "david.thompson@kidora.edu",
      phone: "+1 (555) 456-7890",
      specialty: "Physical Education",
      assignedClasses: ["Kindergarten B"],
      status: "inactive",
      approved: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      startDate: "2022-11-05",
      experience: 6,
      education: "Bachelor\'s in Physical Education",
      certifications: "Youth Sports Coaching, First Aid"
    },
    {
      id: 5,
      name: "Lisa",
      surname: "Wang",
      email: "lisa.wang@kidora.edu",
      phone: "+1 (555) 567-8901",
      specialty: "Language Development",
      assignedClasses: ["Toddlers B", "Pre-K A"],
      status: "pending",
      approved: false,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      startDate: "2024-01-08",
      experience: 4,
      education: "Master\'s in Linguistics",
      certifications: "ESL Certification, Speech Therapy"
    }
  ]);

  const [pendingTeachers, setPendingTeachers] = useState([
    {
      id: 6,
      name: "Jennifer",
      surname: "Martinez",
      email: "jennifer.martinez@gmail.com",
      phone: "+1 (555) 678-9012",
      specialty: "Child Development",
      requestedClasses: ["Toddlers A", "Toddlers B"],
      status: "pending",
      approved: false,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      applicationDate: "2024-01-20",
      applicationTime: "10:30 AM",
      applicationId: "APP-2024-001",
      experience: 7,
      education: "Master\'s in Child Development",
      certifications: "Montessori Certification, Child Psychology",
      emailVerified: true,
      coverLetter: `I am excited to apply for a teaching position at KIDORA. With over 7 years of experience in early childhood education, I have developed a deep understanding of child development principles and effective teaching methodologies.\n\nMy experience includes working with diverse groups of children, implementing play-based learning approaches, and collaborating with parents to support each child's unique developmental journey. I am particularly passionate about creating inclusive environments where every child can thrive.\n\nI would welcome the opportunity to contribute to KIDORA's mission of providing exceptional early childhood education.`
    },
    {
      id: 7,
      name: "Robert",
      surname: "Kim",
      email: "robert.kim@yahoo.com",
      phone: "+1 (555) 789-0123",
      specialty: "Music & Arts",
      requestedClasses: ["Pre-K B", "Kindergarten A", "Kindergarten B"],
      status: "pending",
      approved: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      applicationDate: "2024-01-18",
      applicationTime: "2:15 PM",
      applicationId: "APP-2024-002",
      experience: 5,
      education: "Bachelor's in Fine Arts, Minor in Education",
      certifications: "Art Therapy Certification, Creative Arts in Education",
      emailVerified: false,
      coverLetter: `Dear Hiring Team,\n\nI am writing to express my interest in joining the KIDORA team as a Music & Arts teacher. My background combines formal training in fine arts with practical experience in educational settings.\n\nI believe in the power of creative expression to enhance children's cognitive and emotional development. Through my previous roles, I have successfully integrated music, visual arts, and movement activities into comprehensive learning experiences that engage young learners.\n\nI am eager to bring my creativity and passion for arts education to your nursery program.`
    }
  ]);

  // Filtered and sorted teachers
  const filteredTeachers = useMemo(() => {
    let filtered = teachers?.filter(teacher => {
      const matchesSearch = !searchTerm || 
        teacher?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        teacher?.surname?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        teacher?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        teacher?.specialty?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      const matchesSpecialty = specialtyFilter === 'all' || teacher?.specialty === specialtyFilter;
      const matchesStatus = statusFilter === 'all' || teacher?.status === statusFilter;
      const matchesApproval = approvalFilter === 'all' || 
        (approvalFilter === 'approved' && teacher?.approved) ||
        (approvalFilter === 'pending' && !teacher?.approved);
      const matchesClass = classFilter === 'all' || 
        teacher?.assignedClasses?.some(cls => cls === classFilter);

      return matchesSearch && matchesSpecialty && matchesStatus && matchesApproval && matchesClass;
    });

    // Sort
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'assignedClasses') {
        aValue = a?.assignedClasses?.length;
        bValue = b?.assignedClasses?.length;
      }

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [teachers, searchTerm, specialtyFilter, statusFilter, approvalFilter, classFilter, sortConfig]);

  // Statistics
  const teacherStats = useMemo(() => {
    const total = teachers?.length;
    const active = teachers?.filter(t => t?.status === 'active')?.length;
    const pending = teachers?.filter(t => !t?.approved)?.length + pendingTeachers?.length;
    const specialties = new Set(teachers.map(t => t.specialty))?.size;

    return {
      total,
      active,
      pending,
      specialties,
      totalChange: 12,
      activeChange: 8,
      pendingChange: -15,
      specialtiesChange: 0
    };
  }, [teachers, pendingTeachers]);

  const teacherCounts = useMemo(() => {
    return {
      total: filteredTeachers?.length,
      active: filteredTeachers?.filter(t => t?.status === 'active')?.length,
      pending: filteredTeachers?.filter(t => !t?.approved)?.length
    };
  }, [filteredTeachers]);

  // Handlers
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectTeacher = (teacherId, checked) => {
    setSelectedTeachers(prev => 
      checked 
        ? [...prev, teacherId]
        : prev?.filter(id => id !== teacherId)
    );
  };

  const handleSelectAllTeachers = (checked) => {
    setSelectedTeachers(checked ? filteredTeachers?.map(t => t?.id) : []);
  };

  const handleSelectPending = (teacherId, checked) => {
    setSelectedPending(prev => 
      checked 
        ? [...prev, teacherId]
        : prev?.filter(id => id !== teacherId)
    );
  };

  const handleSelectAllPending = (checked) => {
    setSelectedPending(checked ? pendingTeachers?.map(t => t?.id) : []);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSpecialtyFilter('all');
    setStatusFilter('all');
    setApprovalFilter('all');
    setClassFilter('all');
  };

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setModalMode('create');
    setShowTeacherModal(true);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setModalMode('edit');
    setShowTeacherModal(true);
  };

  const handleDeleteTeacher = (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(prev => prev?.filter(t => t?.id !== teacherId));
      setSelectedTeachers(prev => prev?.filter(id => id !== teacherId));
    }
  };

  const handleViewProfile = (teacher) => {
    // Navigate to teacher profile or show detailed view
    console.log('View profile for:', teacher);
  };

  const handleSubmitTeacher = (teacherData) => {
    if (modalMode === 'edit') {
      setTeachers(prev => prev?.map(t => 
        t?.id === teacherData?.id ? teacherData : t
      ));
    } else {
      setTeachers(prev => [...prev, teacherData]);
    }
  };

  const handleApproveTeacher = (teacherId) => {
    const teacher = pendingTeachers?.find(t => t?.id === teacherId);
    if (teacher) {
      const approvedTeacher = {
        ...teacher,
        approved: true,
        status: 'active',
        assignedClasses: teacher?.requestedClasses || []
      };
      setTeachers(prev => [...prev, approvedTeacher]);
      setPendingTeachers(prev => prev?.filter(t => t?.id !== teacherId));
      setSelectedPending(prev => prev?.filter(id => id !== teacherId));
    }
  };

  const handleRejectTeacher = (teacherId) => {
    if (window.confirm('Are you sure you want to reject this application?')) {
      setPendingTeachers(prev => prev?.filter(t => t?.id !== teacherId));
      setSelectedPending(prev => prev?.filter(id => id !== teacherId));
    }
  };

  const handleBulkApprove = (teacherIds) => {
    teacherIds?.forEach(id => handleApproveTeacher(id));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="admin"
        userName="Admin User"
        onToggleSidebar={toggleMobileSidebar}
      />
      <Sidebar 
        isCollapsed={showMobileSidebar ? false : sidebarCollapsed}
        onToggle={showMobileSidebar ? toggleMobileSidebar : toggleSidebar}
        userRole="admin"
      />
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      } pt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Teacher Management</h1>
              <p className="text-muted-foreground">
                Manage teacher profiles, approvals, and class assignments
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export Data
              </Button>
              <Button
                variant="default"
                onClick={handleAddTeacher}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Add Teacher
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <TeacherStats stats={teacherStats} />

          {/* Pending Approvals */}
          <PendingApprovals
            pendingTeachers={pendingTeachers}
            onApprove={handleApproveTeacher}
            onReject={handleRejectTeacher}
            onBulkApprove={handleBulkApprove}
            selectedPending={selectedPending}
            onSelectPending={handleSelectPending}
            onSelectAllPending={handleSelectAllPending}
          />

          {/* Filters */}
          <TeacherFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            specialtyFilter={specialtyFilter}
            onSpecialtyChange={setSpecialtyFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            approvalFilter={approvalFilter}
            onApprovalChange={setApprovalFilter}
            classFilter={classFilter}
            onClassChange={setClassFilter}
            onClearFilters={handleClearFilters}
            teacherCounts={teacherCounts}
          />

          {/* Teachers Table */}
          <TeacherTable
            teachers={filteredTeachers}
            onEdit={handleEditTeacher}
            onDelete={handleDeleteTeacher}
            onViewProfile={handleViewProfile}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectedTeachers={selectedTeachers}
            onSelectTeacher={handleSelectTeacher}
            onSelectAll={handleSelectAllTeachers}
          />

          {/* Bulk Actions */}
          {selectedTeachers?.length > 0 && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg shadow-soft-lg p-4 z-40">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-foreground">
                  {selectedTeachers?.length} teacher{selectedTeachers?.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTeachers([])}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="Trash2"
                    iconPosition="left"
                    iconSize={14}
                    onClick={() => {
                      if (window.confirm(`Delete ${selectedTeachers?.length} selected teachers?`)) {
                        setTeachers(prev => prev?.filter(t => !selectedTeachers?.includes(t?.id)));
                        setSelectedTeachers([]);
                      }
                    }}
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Teacher Form Modal */}
      <TeacherFormModal
        isOpen={showTeacherModal}
        onClose={() => setShowTeacherModal(false)}
        onSubmit={handleSubmitTeacher}
        teacher={editingTeacher}
        mode={modalMode}
      />
    </div>
  );
};

export default TeacherManagement;