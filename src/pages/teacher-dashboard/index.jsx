import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StudentCard from './components/StudentCard';
import EvaluationOverview from './components/EvaluationOverview';
import ClassStatistics from './components/ClassStatistics';
import QuickActions from './components/QuickActions';
import StudentFilters from './components/StudentFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('overview');
  const [filters, setFilters] = useState({
    search: '',
    evaluationStatus: 'all',
    ageGroup: 'all',
    specialNeeds: 'all',
    sortBy: 'name-asc'
  });

  // Mock teacher data
  const teacherData = {
    name: "Sarah Johnson",
    class: "Rainbow Class",
    totalStudents: 18,
    completedEvaluations: 12,
    pendingEvaluations: 6
  };

  // Mock students data
  const studentsData = [
    {
      id: 1,
      name: "Emma",
      surname: "Johnson",
      dateOfBirth: "2020-03-15",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      bloodType: "A+",
      allergies: ["Peanuts", "Dairy"],
      specialNotes: "Needs extra attention during group activities. Shows excellent creativity in art projects.",
      hasSpecialNeeds: false,
      evaluationStatus: "completed",
      completedModules: 8,
      totalModules: 10,
      lastEvaluation: {
        date: "2025-09-20",
        module: "Cognitive Development",
        note: "Shows excellent problem-solving skills and logical thinking."
      }
    },
    {
      id: 2,
      name: "Michael",
      surname: "Chen",
      dateOfBirth: "2019-11-22",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bloodType: "O-",
      allergies: ["Shellfish"],
      specialNotes: "Very social child, enjoys helping others. Sometimes needs encouragement to participate in physical activities.",
      hasSpecialNeeds: false,
      evaluationStatus: "in-progress",
      completedModules: 6,
      totalModules: 10,
      lastEvaluation: {
        date: "2025-09-18",
        module: "Social Skills",
        note: "Demonstrates strong leadership qualities and empathy towards peers."
      }
    },
    {
      id: 3,
      name: "Sofia",
      surname: "Rodriguez",
      dateOfBirth: "2020-07-08",
      avatar: "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=400&h=400&fit=crop&crop=face",
      bloodType: "B+",
      allergies: [],
      specialNotes: "Bilingual student (Spanish/English). Excels in language activities and shows strong communication skills.",
      hasSpecialNeeds: false,
      evaluationStatus: "completed",
      completedModules: 9,
      totalModules: 10,
      lastEvaluation: {
        date: "2025-09-21",
        module: "Language Development",
        note: "Outstanding vocabulary development and storytelling abilities."
      }
    },
    {
      id: 4,
      name: "Aiden",
      surname: "Williams",
      dateOfBirth: "2019-12-03",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bloodType: "AB+",
      allergies: ["Eggs", "Tree nuts"],
      specialNotes: "Has mild ADHD. Benefits from structured activities and clear instructions. Shows great interest in building blocks.",
      hasSpecialNeeds: true,
      evaluationStatus: "pending",
      completedModules: 4,
      totalModules: 10,
      lastEvaluation: {
        date: "2025-09-15",
        module: "Motor Skills",
        note: "Good fine motor development, needs support with attention span during activities."
      }
    },
    {
      id: 5,
      name: "Lily",
      surname: "Thompson",
      dateOfBirth: "2020-05-18",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bloodType: "A-",
      allergies: ["Latex"],
      specialNotes: "Very artistic and creative. Enjoys music and dance activities. Sometimes shy in large group settings.",
      hasSpecialNeeds: false,
      evaluationStatus: "in-progress",
      completedModules: 7,
      totalModules: 10,
      lastEvaluation: {
        date: "2025-09-19",
        module: "Creative Expression",
        note: "Exceptional artistic abilities and musical rhythm. Gaining confidence in group participation."
      }
    },
    {
      id: 6,
      name: "Noah",
      surname: "Davis",
      dateOfBirth: "2019-09-25",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bloodType: "O+",
      allergies: [],
      specialNotes: "Natural leader with strong problem-solving skills. Enjoys science experiments and building activities.",
      hasSpecialNeeds: false,
      evaluationStatus: "completed",
      completedModules: 10,
      totalModules: 10,
      lastEvaluation: {
        date: "2025-09-22",
        module: "Problem Solving",
        note: "Completed all modules with excellent results. Ready for advanced challenges."
      }
    }
  ];

  // Mock evaluation data
  const evaluationData = {
    stats: {
      completed: 12,
      inProgress: 4,
      pending: 2,
      averageScore: 87
    },
    modules: [
      {
        id: 1,
        name: "Cognitive Development",
        type: "cognitive",
        completion: 85,
        studentsCompleted: 15,
        totalStudents: 18
      },
      {
        id: 2,
        name: "Social Skills",
        type: "social",
        completion: 78,
        studentsCompleted: 14,
        totalStudents: 18
      },
      {
        id: 3,
        name: "Language Development",
        type: "language",
        completion: 92,
        studentsCompleted: 16,
        totalStudents: 18
      },
      {
        id: 4,
        name: "Motor Skills",
        type: "motor-skills",
        completion: 73,
        studentsCompleted: 13,
        totalStudents: 18
      },
      {
        id: 5,
        name: "Creative Expression",
        type: "creative",
        completion: 88,
        studentsCompleted: 15,
        totalStudents: 18
      }
    ],
    recentEvaluations: [
      {
        id: 1,
        studentName: "Emma Johnson",
        module: "Cognitive Development",
        date: "2025-09-20",
        score: 92,
        note: "Excellent problem-solving skills demonstrated"
      },
      {
        id: 2,
        studentName: "Sofia Rodriguez",
        module: "Language Development",
        date: "2025-09-21",
        score: 95,
        note: "Outstanding vocabulary and communication"
      },
      {
        id: 3,
        studentName: "Noah Davis",
        module: "Problem Solving",
        date: "2025-09-22",
        score: 98,
        note: "Exceptional analytical thinking abilities"
      }
    ]
  };

  // Mock statistics data
  const statisticsData = {
    totalStudents: 18,
    averageProgress: 82,
    progressDistribution: [
      { range: "90-100%", count: 4, percentage: 22 },
      { range: "80-89%", count: 8, percentage: 44 },
      { range: "70-79%", count: 4, percentage: 22 },
      { range: "60-69%", count: 2, percentage: 12 }
    ],
    modulePerformance: [
      { id: 1, name: "Language", averageScore: 92, completedStudents: 16 },
      { id: 2, name: "Cognitive", averageScore: 85, completedStudents: 15 },
      { id: 3, name: "Creative", averageScore: 88, completedStudents: 15 },
      { id: 4, name: "Social", averageScore: 78, completedStudents: 14 },
      { id: 5, name: "Motor", averageScore: 73, completedStudents: 13 }
    ],
    trends: [
      {
        type: "improvement",
        title: "Language Development Improving",
        description: "Average scores increased by 8% this month",
        timeframe: "This month"
      },
      {
        type: "decline",
        title: "Motor Skills Need Attention",
        description: "3 students showing slower progress",
        timeframe: "Last 2 weeks"
      },
      {
        type: "stable",
        title: "Social Skills Stable",
        description: "Consistent performance across all students",
        timeframe: "This quarter"
      }
    ]
  };

  // Filter students based on current filters
  const filteredStudents = useMemo(() => {
    let filtered = [...studentsData];

    // Search filter
    if (filters?.search) {
      filtered = filtered?.filter(student =>
        `${student?.name} ${student?.surname}`?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Evaluation status filter
    if (filters?.evaluationStatus !== 'all') {
      filtered = filtered?.filter(student => student?.evaluationStatus === filters?.evaluationStatus);
    }

    // Age group filter
    if (filters?.ageGroup !== 'all') {
      filtered = filtered?.filter(student => {
        let age = calculateAge(student?.dateOfBirth);
        const [minAge, maxAge] = filters?.ageGroup?.split('-')?.map(Number);
        return age >= minAge && age <= maxAge;
      });
    }

    // Special needs filter
    if (filters?.specialNeeds !== 'all') {
      if (filters?.specialNeeds === 'special-needs') {
        filtered = filtered?.filter(student => student?.hasSpecialNeeds);
      } else if (filters?.specialNeeds === 'regular') {
        filtered = filtered?.filter(student => !student?.hasSpecialNeeds);
      }
    }

    // Sort students
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'name-asc':
          return `${a?.name} ${a?.surname}`?.localeCompare(`${b?.name} ${b?.surname}`);
        case 'name-desc':
          return `${b?.name} ${b?.surname}`?.localeCompare(`${a?.name} ${a?.surname}`);
        case 'age-asc':
          return calculateAge(b?.dateOfBirth) - calculateAge(a?.dateOfBirth);
        case 'age-desc':
          return calculateAge(a?.dateOfBirth) - calculateAge(b?.dateOfBirth);
        case 'progress-desc':
          return (b?.completedModules / b?.totalModules) - (a?.completedModules / a?.totalModules);
        case 'progress-asc':
          return (a?.completedModules / a?.totalModules) - (b?.completedModules / b?.totalModules);
        default:
          return 0;
      }
    });

    return filtered;
  }, [studentsData, filters]);

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

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      evaluationStatus: 'all',
      ageGroup: 'all',
      specialNeeds: 'all',
      sortBy: 'name-asc'
    });
  };

  const handleViewProfile = (student) => {
    console.log('Viewing profile for:', student?.name);
    // Navigate to student profile page
  };

  const handleQuickEvaluation = (student) => {
    console.log('Quick evaluation for:', student?.name);
    // Open evaluation modal or navigate to evaluation page
  };

  const handleViewAllEvaluations = () => {
    console.log('Viewing all evaluations');
    // Navigate to evaluations page
  };

  const handleCreateEvaluation = () => {
    console.log('Creating new evaluation');
    // Navigate to create evaluation page
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    switch (actionId) {
      case 'new-evaluation':
        handleCreateEvaluation();
        break;
      case 'view-reports':
        handleViewAllEvaluations();
        break;
      case 'student-notes': console.log('Opening student notes');
        break;
      case 'schedule-meeting': console.log('Scheduling meeting');
        break;
      case 'class-activities': console.log('Planning class activities');
        break;
      case 'communication': console.log('Opening communication');
        break;
      case 'view-all-activity': console.log('Viewing all activity');
        break;
      default:
        break;
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const viewTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'students', label: 'My Students', icon: 'Users' },
    { id: 'evaluations', label: 'Evaluations', icon: 'ClipboardCheck' },
    { id: 'statistics', label: 'Statistics', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="teacher" 
        userName={teacherData?.name}
        onToggleSidebar={toggleSidebar}
      />
      <div className="flex">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
          userRole="teacher"
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-heading font-bold text-foreground">
                    Welcome back, {teacherData?.name?.split(' ')?.[0]}!
                  </h1>
                  <p className="text-lg font-body text-muted-foreground mt-1">
                    {teacherData?.class} • {teacherData?.totalStudents} Students
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium font-body text-foreground">
                      {new Date()?.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs font-caption text-muted-foreground">
                      {new Date()?.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  
                  <Button
                    variant="default"
                    onClick={handleCreateEvaluation}
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    New Evaluation
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <Icon name="Users" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-primary">
                        {teacherData?.totalStudents}
                      </p>
                      <p className="text-sm font-body text-muted-foreground">Total Students</p>
                    </div>
                  </div>
                </div>

                <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                      <Icon name="CheckCircle" size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-success">
                        {teacherData?.completedEvaluations}
                      </p>
                      <p className="text-sm font-body text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
                      <Icon name="Clock" size={20} className="text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-warning">
                        {teacherData?.pendingEvaluations}
                      </p>
                      <p className="text-sm font-body text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
                {viewTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setCurrentView(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium font-body transition-all duration-200 ${
                      currentView === tab?.id
                        ? 'bg-card text-foreground shadow-soft'
                        : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
              {currentView === 'overview' && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-6">
                    <EvaluationOverview
                      evaluationData={evaluationData}
                      onViewAllEvaluations={handleViewAllEvaluations}
                      onCreateEvaluation={handleCreateEvaluation}
                    />
                    <QuickActions onAction={handleQuickAction} />
                  </div>
                  <div>
                    <ClassStatistics statistics={statisticsData} />
                  </div>
                </div>
              )}

              {currentView === 'students' && (
                <div className="space-y-6">
                  <StudentFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    studentCount={filteredStudents?.length}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredStudents?.map((student) => (
                      <StudentCard
                        key={student?.id}
                        student={student}
                        onViewProfile={handleViewProfile}
                        onQuickEvaluation={handleQuickEvaluation}
                      />
                    ))}
                  </div>

                  {filteredStudents?.length === 0 && (
                    <div className="text-center py-12">
                      <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
                        <Icon name="Search" size={24} className="text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                        No students found
                      </h3>
                      <p className="text-muted-foreground font-body mb-4">
                        Try adjusting your filters or search criteria
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        iconName="RotateCcw"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {currentView === 'evaluations' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <EvaluationOverview
                    evaluationData={evaluationData}
                    onViewAllEvaluations={handleViewAllEvaluations}
                    onCreateEvaluation={handleCreateEvaluation}
                  />
                  <QuickActions onAction={handleQuickAction} />
                </div>
              )}

              {currentView === 'statistics' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ClassStatistics statistics={statisticsData} />
                  <EvaluationOverview
                    evaluationData={evaluationData}
                    onViewAllEvaluations={handleViewAllEvaluations}
                    onCreateEvaluation={handleCreateEvaluation}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;