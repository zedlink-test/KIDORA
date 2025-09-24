import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StudentProfileHeader from './components/StudentProfileHeader';
import EvaluationModulesGrid from './components/EvaluationModulesGrid';
import EvaluationHistory from './components/EvaluationHistory';
import StudentSelector from './components/StudentSelector';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentEvaluation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('evaluation');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  // Mock teacher data
  const teacherData = {
    name: "Sarah Johnson",
    class: "Rainbow Class"
  };

  // Mock students data with detailed profiles
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
      evaluationStatus: "in-progress",
      completedModules: 8,
      totalModules: 10,
      overallScore: 87,
      guardian: {
        name: "Michael Johnson",
        email: "michael.j@email.com",
        phone: "+1 (555) 123-4567"
      },
      emergencyContact: {
        name: "Sarah Johnson",
        relationship: "Mother",
        phone: "+1 (555) 987-6543"
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
      overallScore: 78,
      guardian: {
        name: "Li Chen",
        email: "li.chen@email.com",
        phone: "+1 (555) 234-5678"
      },
      emergencyContact: {
        name: "Wei Chen",
        relationship: "Father",
        phone: "+1 (555) 876-5432"
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
      overallScore: 92,
      guardian: {
        name: "Maria Rodriguez",
        email: "maria.rodriguez@email.com",
        phone: "+1 (555) 345-6789"
      },
      emergencyContact: {
        name: "Carlos Rodriguez",
        relationship: "Father",
        phone: "+1 (555) 765-4321"
      }
    }
  ];

  // Mock evaluation modules with detailed criteria
  const evaluationModules = [
    {
      id: 1,
      name: "Cognitive Development",
      type: "cognitive",
      icon: "Brain",
      description: "Problem-solving, memory, attention span, and logical thinking abilities",
      criteria: [
        {
          id: 'c1',
          name: 'Problem Solving',
          description: 'Ability to identify and solve age-appropriate problems',
          maxScore: 5,
          weight: 0.3
        },
        {
          id: 'c2',
          name: 'Memory & Recall',
          description: 'Short-term and long-term memory capabilities',
          maxScore: 5,
          weight: 0.25
        },
        {
          id: 'c3',
          name: 'Attention Span',
          description: 'Focus and concentration during activities',
          maxScore: 5,
          weight: 0.25
        },
        {
          id: 'c4',
          name: 'Logical Thinking',
          description: 'Sequential thinking and cause-effect understanding',
          maxScore: 5,
          weight: 0.2
        }
      ],
      color: 'primary'
    },
    {
      id: 2,
      name: "Social Skills",
      type: "social",
      icon: "Users",
      description: "Interaction with peers, sharing, cooperation, and social understanding",
      criteria: [
        {
          id: 's1',
          name: 'Peer Interaction',
          description: 'Quality of interactions with other children',
          maxScore: 5,
          weight: 0.3
        },
        {
          id: 's2',
          name: 'Sharing & Cooperation',
          description: 'Willingness to share toys and cooperate in activities',
          maxScore: 5,
          weight: 0.3
        },
        {
          id: 's3',
          name: 'Empathy',
          description: 'Understanding and responding to others emotions',
          maxScore: 5,
          weight: 0.25
        },
        {
          id: 's4',
          name: 'Group Participation',
          description: 'Active participation in group activities',
          maxScore: 5,
          weight: 0.15
        }
      ],
      color: 'success'
    },
    {
      id: 3,
      name: "Language Development",
      type: "language",
      icon: "MessageCircle",
      description: "Vocabulary, communication skills, and language comprehension",
      criteria: [
        {
          id: 'l1',
          name: 'Vocabulary',
          description: 'Range and appropriate use of words',
          maxScore: 5,
          weight: 0.3
        },
        {
          id: 'l2',
          name: 'Communication',
          description: 'Clarity and effectiveness of expression',
          maxScore: 5,
          weight: 0.3
        },
        {
          id: 'l3',
          name: 'Listening Skills',
          description: 'Following instructions and understanding conversations',
          maxScore: 5,
          weight: 0.25
        },
        {
          id: 'l4',
          name: 'Storytelling',
          description: 'Ability to narrate events or stories',
          maxScore: 5,
          weight: 0.15
        }
      ],
      color: 'info'
    },
    {
      id: 4,
      name: "Motor Skills",
      type: "motor-skills",
      icon: "Activity",
      description: "Fine and gross motor development, coordination, and physical abilities",
      criteria: [
        {
          id: 'm1',
          name: 'Fine Motor Skills',
          description: 'Hand-eye coordination, writing, drawing capabilities',
          maxScore: 5,
          weight: 0.4
        },
        {
          id: 'm2',
          name: 'Gross Motor Skills',
          description: 'Running, jumping, balance, and large muscle movements',
          maxScore: 5,
          weight: 0.3
        },
        {
          id: 'm3',
          name: 'Coordination',
          description: 'Body awareness and coordinated movements',
          maxScore: 5,
          weight: 0.2
        },
        {
          id: 'm4',
          name: 'Physical Strength',
          description: 'Age-appropriate physical strength and endurance',
          maxScore: 5,
          weight: 0.1
        }
      ],
      color: 'warning'
    },
    {
      id: 5,
      name: "Creative Expression",
      type: "creative",
      icon: "Palette",
      description: "Artistic abilities, imagination, and creative problem-solving",
      criteria: [
        {
          id: 'cr1',
          name: 'Artistic Expression',
          description: 'Drawing, coloring, and creative art activities',
          maxScore: 5,
          weight: 0.35
        },
        {
          id: 'cr2',
          name: 'Imagination',
          description: 'Creative play and imaginative thinking',
          maxScore: 5,
          weight: 0.3
        },
        {
          id: 'cr3',
          name: 'Musical Abilities',
          description: 'Rhythm, singing, and musical engagement',
          maxScore: 5,
          weight: 0.2
        },
        {
          id: 'cr4',
          name: 'Creative Problem Solving',
          description: 'Finding unique solutions to challenges',
          maxScore: 5,
          weight: 0.15
        }
      ],
      color: 'accent'
    },
    {
      id: 6,
      name: "Emotional Development",
      type: "emotional",
      icon: "Heart",
      description: "Emotional regulation, self-awareness, and emotional expression",
      criteria: [
        {
          id: 'e1',
          name: 'Emotional Regulation',
          description: 'Managing emotions and reactions appropriately',
          maxScore: 5,
          weight: 0.4
        },
        {
          id: 'e2',
          name: 'Self-Awareness',
          description: 'Understanding own emotions and needs',
          maxScore: 5,
          weight: 0.3
        },
        {
          id: 'e3',
          name: 'Emotional Expression',
          description: 'Communicating feelings and emotions effectively',
          maxScore: 5,
          weight: 0.2
        },
        {
          id: 'e4',
          name: 'Coping Skills',
          description: 'Handling frustration and disappointment',
          maxScore: 5,
          weight: 0.1
        }
      ],
      color: 'error'
    }
  ];

  // Mock evaluation history data
  const evaluationHistory = [
    {
      id: 1,
      studentId: 1,
      date: "2025-09-20",
      module: "Cognitive Development",
      evaluator: "Sarah Johnson",
      overallScore: 4.2,
      maxScore: 5,
      criteriaScores: {
        c1: 4.5,
        c2: 4.0,
        c3: 4.0,
        c4: 4.3
      },
      notes: "Emma shows excellent problem-solving skills and logical thinking. Memory retention is good, attention span could be improved during longer activities.",
      attachments: ["photo1.jpg", "video1.mp4"],
      status: "completed"
    },
    {
      id: 2,
      studentId: 1,
      date: "2025-09-15",
      module: "Social Skills",
      evaluator: "Sarah Johnson",
      overallScore: 4.5,
      maxScore: 5,
      criteriaScores: {
        s1: 4.5,
        s2: 4.8,
        s3: 4.2,
        s4: 4.5
      },
      notes: "Outstanding social development. Emma is very cooperative and shows great empathy towards her peers. Natural leader in group activities.",
      attachments: [],
      status: "completed"
    },
    {
      id: 3,
      studentId: 2,
      date: "2025-09-18",
      module: "Language Development",
      evaluator: "Sarah Johnson",
      overallScore: 3.8,
      maxScore: 5,
      criteriaScores: {
        l1: 4.0,
        l2: 3.5,
        l3: 4.0,
        l4: 3.8
      },
      notes: "Michael has good vocabulary for his age. Communication skills are developing well. Needs encouragement to speak up in group settings.",
      attachments: ["recording1.mp3"],
      status: "completed"
    }
  ];

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

  const getStudentEvaluationHistory = (studentId) => {
    return evaluationHistory?.filter(evaluation => evaluation?.studentId === studentId) || [];
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setActiveModule(null);
  };

  const handleModuleSelect = (module) => {
    setActiveModule(module);
    setCurrentView('module-detail');
  };

  const handleBackToModules = () => {
    setActiveModule(null);
    setCurrentView('evaluation');
  };

  const handleSaveEvaluation = (moduleId, evaluationData) => {
    console.log('Saving evaluation for module:', moduleId, evaluationData);
    // Here you would typically save to your backend/database
    setActiveModule(null);
    setCurrentView('evaluation');
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleBackToEvaluation = () => {
    setCurrentView('evaluation');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Initialize with student from URL params or first student
  useEffect(() => {
    const searchParams = new URLSearchParams(location?.search);
    const studentId = searchParams?.get('studentId');
    
    if (studentId) {
      const student = studentsData?.find(s => s?.id === parseInt(studentId));
      if (student) {
        setSelectedStudent(student);
      }
    } else if (!selectedStudent && studentsData?.length > 0) {
      setSelectedStudent(studentsData?.[0]);
    }
  }, [location?.search, studentsData, selectedStudent]);

  const viewTabs = [
    { id: 'evaluation', label: 'Evaluation', icon: 'ClipboardCheck' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  if (!selectedStudent) {
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
            <div className="p-6 flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                  No Student Selected
                </h2>
                <p className="text-muted-foreground font-body mb-4">
                  Please select a student to begin evaluation
                </p>
                <Button
                  variant="default"
                  onClick={() => navigate('/teacher-dashboard')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  iconSize={16}
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/teacher-dashboard')}
                    iconName="ArrowLeft"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Back to Dashboard
                  </Button>
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">
                      Student Evaluation
                    </h1>
                    <p className="text-sm font-body text-muted-foreground mt-1">
                      Comprehensive assessment and developmental tracking
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <StudentSelector
                    students={studentsData}
                    selectedStudent={selectedStudent}
                    onStudentSelect={handleStudentSelect}
                  />
                </div>
              </div>
            </div>

            {/* Student Profile Header */}
            <div className="mb-6">
              <StudentProfileHeader
                student={selectedStudent}
                age={calculateAge(selectedStudent?.dateOfBirth)}
              />
            </div>

            {/* View Tabs */}
            {!activeModule && (
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
            )}

            {/* Content Area */}
            <div className="space-y-6">
              {currentView === 'evaluation' && !activeModule && (
                <EvaluationModulesGrid
                  modules={evaluationModules}
                  student={selectedStudent}
                  onModuleSelect={handleModuleSelect}
                  evaluationHistory={getStudentEvaluationHistory(selectedStudent?.id)}
                />
              )}

              {currentView === 'history' && (
                <EvaluationHistory
                  student={selectedStudent}
                  evaluationHistory={getStudentEvaluationHistory(selectedStudent?.id)}
                  modules={evaluationModules}
                  onBackToEvaluation={handleBackToEvaluation}
                />
              )}

              {activeModule && currentView === 'module-detail' && (
                <div className="space-y-6">
                  {/* Module Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBackToModules}
                        iconName="ArrowLeft"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Back to Modules
                      </Button>
                      <div>
                        <h2 className="text-xl font-heading font-semibold text-foreground">
                          {activeModule?.name} Evaluation
                        </h2>
                        <p className="text-sm font-body text-muted-foreground">
                          {selectedStudent?.name} {selectedStudent?.surname}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Module Evaluation Form */}
                  <div className="bg-card border border-border rounded-lg shadow-soft">
                    <div className="p-6 border-b border-border">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-12 h-12 bg-${activeModule?.color}/10 rounded-lg flex items-center justify-center`}>
                          <Icon name={activeModule?.icon} size={24} className={`text-${activeModule?.color}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-heading font-semibold text-foreground">
                            {activeModule?.name}
                          </h3>
                          <p className="text-sm font-body text-muted-foreground">
                            {activeModule?.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-6">
                        {activeModule?.criteria?.map((criterion) => (
                          <div key={criterion?.id} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium font-body text-foreground">
                                  {criterion?.name}
                                </h4>
                                <p className="text-xs font-caption text-muted-foreground">
                                  {criterion?.description}
                                </p>
                              </div>
                              <div className="text-xs font-caption text-muted-foreground">
                                Weight: {(criterion?.weight * 100)}%
                              </div>
                            </div>

                            {/* Rating Scale */}
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-caption text-muted-foreground w-16">
                                Score:
                              </span>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5]?.map((score) => (
                                  <button
                                    key={score}
                                    className="w-8 h-8 rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors duration-200 text-xs font-medium font-body"
                                  >
                                    {score}
                                  </button>
                                ))}
                              </div>
                              <span className="text-xs font-caption text-muted-foreground ml-2">
                                / {criterion?.maxScore}
                              </span>
                            </div>

                            {/* Notes Section */}
                            <div>
                              <label className="text-xs font-caption text-muted-foreground mb-1 block">
                                Notes for {criterion?.name}:
                              </label>
                              <textarea
                                className="w-full p-2 text-sm font-body border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 resize-none"
                                rows={2}
                                placeholder={`Add observations about ${criterion?.name?.toLowerCase()}...`}
                              />
                            </div>
                          </div>
                        ))}

                        {/* Overall Notes */}
                        <div className="pt-4 border-t border-border">
                          <label className="text-sm font-medium font-body text-foreground mb-2 block">
                            Overall Notes for {activeModule?.name}:
                          </label>
                          <textarea
                            className="w-full p-3 text-sm font-body border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 resize-none"
                            rows={4}
                            placeholder="Add comprehensive notes about the student's performance in this module..."
                          />
                        </div>

                        {/* Multimedia Attachments */}
                        <div className="pt-4 border-t border-border">
                          <label className="text-sm font-medium font-body text-foreground mb-2 block">
                            Attachments (Photos, Videos, Audio):
                          </label>
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                            <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm font-body text-muted-foreground mb-2">
                              Drag & drop files here, or click to select
                            </p>
                            <Button variant="outline" size="sm">
                              Choose Files
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-3 pt-6 border-t border-border mt-6">
                        <Button
                          variant="outline"
                          onClick={handleBackToModules}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="secondary"
                        >
                          Save Draft
                        </Button>
                        <Button
                          variant="default"
                          onClick={() => handleSaveEvaluation(activeModule?.id, {})}
                        >
                          Complete Evaluation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentEvaluation;