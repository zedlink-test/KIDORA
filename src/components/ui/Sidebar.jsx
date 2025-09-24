import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, userRole = 'admin' }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSection = (sectionKey) => {
    if (isCollapsed) return;
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev?.[sectionKey]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const getNavigationConfig = () => {
    const currentPath = location?.pathname;
    
    if (currentPath?.includes('admin')) {
      return {
        sections: [
          {
            key: 'overview',
            label: 'Overview',
            icon: 'LayoutDashboard',
            items: [
              { label: 'Dashboard', path: '/admin-dashboard', icon: 'Home' },
              { label: 'Analytics', path: '/admin-analytics', icon: 'TrendingUp' },
              { label: 'Reports', path: '/admin-reports', icon: 'FileBarChart' }
            ]
          },
          {
            key: 'management',
            label: 'Management',
            icon: 'Users',
            items: [
              { label: 'Teacher Management', path: '/teacher-management', icon: 'UserCheck' },
              { label: 'Student Management', path: '/student-management', icon: 'GraduationCap' },
              { label: 'Staff Directory', path: '/admin-staff', icon: 'Contact' }
            ]
          },
          {
            key: 'operations',
            label: 'Operations',
            icon: 'Settings',
            items: [
              { label: 'Enrollment', path: '/admin-enrollment', icon: 'UserPlus' },
              { label: 'Scheduling', path: '/admin-schedule', icon: 'Calendar' },
              { label: 'Communications', path: '/admin-communications', icon: 'MessageSquare' }
            ]
          }
        ]
      };
    } else if (currentPath?.includes('teacher')) {
      return {
        sections: [
          {
            key: 'classroom',
            label: 'My Classroom',
            icon: 'BookOpen',
            items: [
              { label: 'Dashboard', path: '/teacher-dashboard', icon: 'Home' },
              { label: 'My Students', path: '/teacher-students', icon: 'Users' },
              { label: 'Class Schedule', path: '/teacher-schedule', icon: 'Calendar' }
            ]
          },
          {
            key: 'assessments',
            label: 'Assessments',
            icon: 'ClipboardCheck',
            items: [
              { label: 'Evaluations', path: '/teacher-evaluations', icon: 'CheckSquare' },
              { label: 'Progress Reports', path: '/teacher-progress', icon: 'TrendingUp' },
              { label: 'Observations', path: '/teacher-observations', icon: 'Eye' }
            ]
          },
          {
            key: 'resources',
            label: 'Resources',
            icon: 'FolderOpen',
            items: [
              { label: 'Lesson Plans', path: '/teacher-lessons', icon: 'BookOpen' },
              { label: 'Activities', path: '/teacher-activities', icon: 'Puzzle' },
              { label: 'Materials', path: '/teacher-materials', icon: 'Package' }
            ]
          }
        ]
      };
    } else if (currentPath?.includes('secretary')) {
      return {
        sections: [
          {
            key: 'administration',
            label: 'Administration',
            icon: 'FileText',
            items: [
              { label: 'Dashboard', path: '/secretary-dashboard', icon: 'Home' },
              { label: 'Enrollment', path: '/secretary-enrollment', icon: 'UserPlus' },
              { label: 'Student Profiles', path: '/secretary-profiles', icon: 'Users' }
            ]
          },
          {
            key: 'coordination',
            label: 'Coordination',
            icon: 'MessageSquare',
            items: [
              { label: 'Communications', path: '/secretary-communications', icon: 'Mail' },
              { label: 'Parent Relations', path: '/secretary-parents', icon: 'Heart' },
              { label: 'Events', path: '/secretary-events', icon: 'Calendar' }
            ]
          },
          {
            key: 'records',
            label: 'Records',
            icon: 'Archive',
            items: [
              { label: 'Student Records', path: '/secretary-records', icon: 'FolderOpen' },
              { label: 'Documentation', path: '/secretary-docs', icon: 'FileText' },
              { label: 'Compliance', path: '/secretary-compliance', icon: 'Shield' }
            ]
          }
        ]
      };
    }
    
    return { sections: [] };
  };

  const { sections } = getNavigationConfig();

  const isItemActive = (path) => {
    return location?.pathname === path;
  };

  const isSectionActive = (section) => {
    return section?.items?.some(item => isItemActive(item?.path));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:z-40 bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-heading font-semibold text-foreground">KIDORA</h2>
                <p className="text-xs font-caption text-muted-foreground">Management</p>
              </div>
            </div>
          )}
          
          {onToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {sections?.map((section) => {
            const sectionActive = isSectionActive(section);
            const sectionExpanded = expandedSections?.[section?.key] !== false;
            
            return (
              <div key={section?.key} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section?.key)}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    sectionActive
                      ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  title={isCollapsed ? section?.label : undefined}
                >
                  <Icon name={section?.icon} size={18} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 font-body">{section?.label}</span>
                      <Icon 
                        name="ChevronDown" 
                        size={14} 
                        className={`ml-auto transition-transform duration-200 ${
                          sectionExpanded ? 'rotate-0' : '-rotate-90'
                        }`}
                      />
                    </>
                  )}
                </button>
                {/* Section Items */}
                {(!isCollapsed && sectionExpanded) && (
                  <div className="ml-6 space-y-1">
                    {section?.items?.map((item) => {
                      const itemActive = isItemActive(item?.path);
                      return (
                        <button
                          key={item?.path}
                          onClick={() => handleNavigation(item?.path)}
                          className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                            itemActive
                              ? 'bg-primary text-primary-foreground shadow-soft'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          <Icon name={item?.icon} size={16} className="flex-shrink-0" />
                          <span className="ml-3 font-body">{item?.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                {/* Collapsed tooltips */}
                {isCollapsed && (
                  <div className="relative group">
                    <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-soft-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                      <p className="text-xs font-medium font-body">{section?.label}</p>
                      <div className="mt-1 space-y-1">
                        {section?.items?.map((item) => (
                          <button
                            key={item?.path}
                            onClick={() => handleNavigation(item?.path)}
                            className={`block w-full text-left px-2 py-1 text-xs rounded transition-colors duration-150 ${
                              isItemActive(item?.path)
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                            }`}
                          >
                            {item?.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-success-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-xs font-medium font-body text-foreground">System Status</p>
                <p className="text-xs font-caption text-success">All systems operational</p>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 ${isCollapsed ? 'pointer-events-none' : ''}`}>
        {!isCollapsed && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onToggle}
          />
        )}
        
        <aside className={`absolute left-0 top-0 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}>
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-heading font-semibold text-foreground">KIDORA</h2>
                <p className="text-xs font-caption text-muted-foreground">Management</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
            {sections?.map((section) => {
              const sectionActive = isSectionActive(section);
              const sectionExpanded = expandedSections?.[section?.key] !== false;
              
              return (
                <div key={section?.key} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section?.key)}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      sectionActive
                        ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon name={section?.icon} size={18} className="flex-shrink-0" />
                    <span className="ml-3 font-body">{section?.label}</span>
                    <Icon 
                      name="ChevronDown" 
                      size={14} 
                      className={`ml-auto transition-transform duration-200 ${
                        sectionExpanded ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                  </button>
                  {sectionExpanded && (
                    <div className="ml-6 space-y-1">
                      {section?.items?.map((item) => {
                        const itemActive = isItemActive(item?.path);
                        return (
                          <button
                            key={item?.path}
                            onClick={() => {
                              handleNavigation(item?.path);
                              onToggle && onToggle();
                            }}
                            className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                              itemActive
                                ? 'bg-primary text-primary-foreground shadow-soft'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                          >
                            <Icon name={item?.icon} size={16} className="flex-shrink-0" />
                            <span className="ml-3 font-body">{item?.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;