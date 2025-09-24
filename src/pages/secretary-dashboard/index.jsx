import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QuickAccessPanel from './components/QuickAccessPanel';
import ActivityFeed from './components/ActivityFeed';
import StatsOverview from './components/StatsOverview';
import ProfileSearch from './components/ProfileSearch';

const SecretaryDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const upcomingTasks = [
    {
      id: 1,
      title: 'Review Enrollment Applications',
      description: 'Process 12 pending applications',
      priority: 'high',
      dueTime: '10:00 AM',
      icon: 'FileText'
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting Setup',
      description: 'Schedule meetings for Butterfly Class',
      priority: 'medium',
      dueTime: '2:00 PM',
      icon: 'Calendar'
    },
    {
      id: 3,
      title: 'Update Student Records',
      description: 'Medical information updates',
      priority: 'medium',
      dueTime: '4:00 PM',
      icon: 'Edit'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="secretary" 
        userName="Maria Rodriguez" 
        onToggleSidebar={toggleSidebar}
      />
      <div className="flex">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
          userRole="secretary"
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-6 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-6 border border-border">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                    Welcome back, Maria! 👋
                  </h1>
                  <p className="text-muted-foreground font-body">
                    Ready to manage enrollments and coordinate with teachers today.
                  </p>
                  <div className="flex items-center space-x-4 text-sm font-caption text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={16} />
                      <span>{formatDate(currentTime)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={16} />
                      <span>{formatTime(currentTime)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    onClick={() => handleNavigation('/secretary-enrollment')}
                    iconName="UserPlus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    New Enrollment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleNavigation('/secretary-coordination')}
                    iconName="ArrowRightLeft"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Manage Assignments
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Access Panel */}
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                Quick Access
              </h2>
              <QuickAccessPanel onNavigate={handleNavigation} />
            </div>

            {/* Stats Overview */}
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                Overview & Statistics
              </h2>
              <StatsOverview />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Activity Feed */}
              <div className="xl:col-span-2">
                <ActivityFeed />
              </div>

              {/* Sidebar Content */}
              <div className="space-y-6">
                {/* Today's Tasks */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-heading font-semibold text-foreground">Today's Tasks</h3>
                    <Button variant="ghost" size="sm" iconName="Plus" iconSize={16}>
                      Add Task
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {upcomingTasks?.map((task) => (
                      <div key={task?.id} className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="p-1.5 bg-primary/10 rounded">
                              <Icon name={task?.icon} size={14} className="text-primary" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-sm font-medium font-body text-foreground">
                                {task?.title}
                              </h4>
                              <p className="text-xs font-caption text-muted-foreground">
                                {task?.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs font-mono px-2 py-1 rounded-full border ${getPriorityColor(task?.priority)}`}>
                              {task?.priority}
                            </span>
                            <p className="text-xs font-caption text-muted-foreground mt-1">
                              {task?.dueTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4" iconName="Eye" iconPosition="left" iconSize={16}>
                    View All Tasks
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Quick Stats</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body text-muted-foreground">Applications Today</span>
                      <span className="text-lg font-heading font-semibold text-success">+5</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body text-muted-foreground">Assignments Updated</span>
                      <span className="text-lg font-heading font-semibold text-primary">8</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body text-muted-foreground">Messages Sent</span>
                      <span className="text-lg font-heading font-semibold text-accent">12</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body text-muted-foreground">Profile Updates</span>
                      <span className="text-lg font-heading font-semibold text-secondary">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Search */}
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                Profile Management
              </h2>
              <ProfileSearch onNavigate={handleNavigation} />
            </div>

            {/* Footer */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-primary-foreground"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-semibold text-foreground">KIDORA</h3>
                    <p className="text-xs font-caption text-muted-foreground">
                      Secretary Dashboard • {new Date()?.getFullYear()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-xs font-caption text-muted-foreground">
                  <span>System Status: Operational</span>
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SecretaryDashboard;