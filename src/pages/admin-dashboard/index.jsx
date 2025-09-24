import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import QuickActionCard from './components/QuickActionCard';
import PendingApprovalCard from './components/PendingApprovalCard';
import RecentActivityList from './components/RecentActivityList';
import SystemStatusCard from './components/SystemStatusCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data for dashboard metrics
  const metricsData = [
    {
      title: "Total Students",
      value: "247",
      change: "+12 this month",
      changeType: "positive",
      icon: "GraduationCap",
      color: "primary"
    },
    {
      title: "Active Teachers",
      value: "18",
      change: "+2 this week",
      changeType: "positive",
      icon: "Users",
      color: "success"
    },
    {
      title: "Pending Approvals",
      value: "5",
      change: "3 new today",
      changeType: "warning",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "All systems operational",
      changeType: "positive",
      icon: "Activity",
      color: "success"
    }
  ];

  // Mock data for pending approvals
  const pendingApprovals = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      specialty: "Early Childhood Development",
      preferredClass: "Toddlers (2-3 years)",
      appliedDate: "2025-01-20",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      specialty: "Music & Arts",
      preferredClass: "Preschool (3-4 years)",
      appliedDate: "2025-01-19",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      specialty: "Special Needs Support",
      preferredClass: "Mixed Age Groups",
      appliedDate: "2025-01-18",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "teacher_approved",
      description: "Teacher Maria Santos has been approved and assigned to Kindergarten class",
      timestamp: new Date(Date.now() - 300000),
      status: "completed"
    },
    {
      id: 2,
      type: "student_added",
      description: "New student Emma Wilson enrolled in Toddlers class",
      timestamp: new Date(Date.now() - 900000),
      status: "completed"
    },
    {
      id: 3,
      type: "evaluation_completed",
      description: "Monthly evaluation completed for 15 students in Preschool class",
      timestamp: new Date(Date.now() - 1800000),
      status: "completed"
    },
    {
      id: 4,
      type: "user_signup",
      description: "New teacher application received from David Kim",
      timestamp: new Date(Date.now() - 3600000),
      status: "pending"
    },
    {
      id: 5,
      type: "system_update",
      description: "System backup completed successfully",
      timestamp: new Date(Date.now() - 7200000),
      status: "completed"
    }
  ];

  // Mock data for system status
  const systemStatus = [
    {
      title: "Database",
      status: "operational",
      lastUpdated: new Date(Date.now() - 300000),
      details: [
        { label: "Response Time", value: "45ms" },
        { label: "Uptime", value: "99.9%" }
      ]
    },
    {
      title: "Authentication",
      status: "operational",
      lastUpdated: new Date(Date.now() - 600000),
      details: [
        { label: "Active Sessions", value: "23" },
        { label: "Success Rate", value: "100%" }
      ]
    },
    {
      title: "File Storage",
      status: "warning",
      lastUpdated: new Date(Date.now() - 1200000),
      details: [
        { label: "Usage", value: "78%" },
        { label: "Available", value: "2.1GB" }
      ]
    }
  ];

  // Quick action configurations
  const quickActions = [
    {
      title: "Student Management",
      description: "Add, edit, and manage student profiles",
      icon: "GraduationCap",
      color: "primary",
      stats: [
        { value: "247", label: "Total Students" },
        { value: "12", label: "New This Month" }
      ],
      actions: [
        {
          label: "Add Student",
          icon: "Plus",
          variant: "default",
          onClick: () => navigate('/student-management')
        },
        {
          label: "View All",
          icon: "Users",
          variant: "outline",
          onClick: () => navigate('/student-management')
        }
      ]
    },
    {
      title: "Teacher Management",
      description: "Manage teacher profiles and assignments",
      icon: "Users",
      color: "success",
      stats: [
        { value: "18", label: "Active Teachers" },
        { value: "5", label: "Pending Approval" }
      ],
      actions: [
        {
          label: "Approve Teachers",
          icon: "CheckCircle",
          variant: "default",
          onClick: () => navigate('/teacher-management')
        },
        {
          label: "View All",
          icon: "Eye",
          variant: "outline",
          onClick: () => navigate('/teacher-management')
        }
      ]
    },
    {
      title: "System Reports",
      description: "Generate and view system reports",
      icon: "BarChart3",
      color: "secondary",
      stats: [
        { value: "15", label: "Reports Generated" },
        { value: "98.5%", label: "System Health" }
      ],
      actions: [
        {
          label: "Generate Report",
          icon: "FileText",
          variant: "default",
          onClick: () => console.log('Generate report')
        },
        {
          label: "View Reports",
          icon: "FolderOpen",
          variant: "outline",
          onClick: () => console.log('View reports')
        }
      ]
    }
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleApproveTeacher = (teacherId) => {
    console.log('Approving teacher:', teacherId);
    // In real app, this would make an API call
  };

  const handleRejectTeacher = (teacherId) => {
    console.log('Rejecting teacher:', teacherId);
    // In real app, this would make an API call
  };

  const handleBulkApproval = () => {
    console.log('Bulk approving all pending teachers');
    // In real app, this would make an API call
  };

  const handleExportData = () => {
    console.log('Exporting dashboard data');
    // In real app, this would generate and download a report
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" userName="John Administrator" onToggleSidebar={() => {}} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground font-body mt-1">
                Welcome back! Here's what's happening at KIDORA Nursery today.
              </p>
              <p className="text-sm font-caption text-muted-foreground mt-1">
                {currentTime?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentTime?.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search dashboard..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64"
                />
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
                />
              </div>
              <Button
                variant="outline"
                onClick={handleExportData}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData?.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              color={metric?.color}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {quickActions?.map((action, index) => (
            <QuickActionCard
              key={index}
              title={action?.title}
              description={action?.description}
              icon={action?.icon}
              color={action?.color}
              stats={action?.stats}
              actions={action?.actions}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Pending Teacher Approvals
                </h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkApproval}
                    iconName="CheckCircle"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Approve All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/teacher-management')}
                    iconName="ExternalLink"
                    iconPosition="left"
                    iconSize={16}
                  >
                    View All
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {pendingApprovals?.map((approval) => (
                  <PendingApprovalCard
                    key={approval?.id}
                    approval={approval}
                    onApprove={handleApproveTeacher}
                    onReject={handleRejectTeacher}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <RecentActivityList activities={recentActivities} />
            
            {/* System Status */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                System Status
              </h3>
              <div className="space-y-4">
                {systemStatus?.map((status, index) => (
                  <SystemStatusCard
                    key={index}
                    title={status?.title}
                    status={status?.status}
                    lastUpdated={status?.lastUpdated}
                    details={status?.details}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Quick Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: "Total Enrollments", value: "247", icon: "UserPlus" },
              { label: "Active Classes", value: "12", icon: "BookOpen" },
              { label: "Completed Evaluations", value: "1,234", icon: "ClipboardCheck" },
              { label: "Parent Satisfaction", value: "96%", icon: "Heart" },
              { label: "Staff Attendance", value: "98%", icon: "Calendar" },
              { label: "System Uptime", value: "99.9%", icon: "Activity" }
            ]?.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                <Icon name={stat?.icon} size={20} className="text-primary mx-auto mb-2" />
                <p className="text-lg font-heading font-bold text-foreground">{stat?.value}</p>
                <p className="text-xs font-caption text-muted-foreground">{stat?.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;