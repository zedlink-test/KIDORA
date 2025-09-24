import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'admin', userName = 'John Doe', isCollapsed = false, onToggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationItems = () => {
    const currentPath = location?.pathname;
    
    if (currentPath?.includes('admin')) {
      return [
        { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
        { label: 'Teachers', path: '/teacher-management', icon: 'Users' },
        { label: 'Students', path: '/student-management', icon: 'GraduationCap' },
        { label: 'Reports', path: '/admin-reports', icon: 'BarChart3' }
      ];
    } else if (currentPath?.includes('teacher')) {
      return [
        { label: 'Dashboard', path: '/teacher-dashboard', icon: 'LayoutDashboard' },
        { label: 'My Students', path: '/teacher-students', icon: 'Users' },
        { label: 'Evaluations', path: '/teacher-evaluations', icon: 'ClipboardCheck' },
        { label: 'Schedule', path: '/teacher-schedule', icon: 'Calendar' }
      ];
    } else if (currentPath?.includes('secretary')) {
      return [
        { label: 'Dashboard', path: '/secretary-dashboard', icon: 'LayoutDashboard' },
        { label: 'Enrollment', path: '/secretary-enrollment', icon: 'UserPlus' },
        { label: 'Profiles', path: '/secretary-profiles', icon: 'FileText' },
        { label: 'Coordination', path: '/secretary-coordination', icon: 'MessageSquare' }
      ];
    }
    
    return [];
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (path) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setShowUserMenu(false);
  };

  const getRoleDisplayName = () => {
    if (location?.pathname?.includes('admin')) return 'Administrator';
    if (location?.pathname?.includes('teacher')) return 'Teacher';
    if (location?.pathname?.includes('secretary')) return 'Secretary';
    return 'User';
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-soft">
      <div className="flex h-16 items-center px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="lg:hidden"
            >
              <Icon name="Menu" size={20} />
            </Button>
          )}
          
          <div className="flex items-center space-x-3">
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
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-foreground">KIDORA</h1>
              <p className="text-xs font-caption text-muted-foreground">Nursery Management</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 ml-8">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <Button
                key={item?.path}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="font-body"
              >
                {item?.label}
              </Button>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={18} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-mono">
              3
            </span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {userName?.split(' ')?.map(n => n?.[0])?.join('')}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium font-body">{userName}</p>
                <p className="text-xs text-muted-foreground font-caption">{getRoleDisplayName()}</p>
              </div>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-soft-lg z-50">
                <div className="p-3 border-b border-border">
                  <p className="font-medium font-body">{userName}</p>
                  <p className="text-sm text-muted-foreground font-caption">{getRoleDisplayName()}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center w-full px-3 py-2 text-sm font-body hover:bg-muted transition-colors duration-150"
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Profile Settings
                  </button>
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center w-full px-3 py-2 text-sm font-body hover:bg-muted transition-colors duration-150"
                  >
                    <Icon name="Settings" size={16} className="mr-2" />
                    Preferences
                  </button>
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center w-full px-3 py-2 text-sm font-body hover:bg-muted transition-colors duration-150"
                  >
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Help & Support
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm font-body text-destructive hover:bg-muted transition-colors duration-150"
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-body transition-colors duration-150 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} className="mr-3" />
                  {item?.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {(showUserMenu || showMobileMenu) && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-20"
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;