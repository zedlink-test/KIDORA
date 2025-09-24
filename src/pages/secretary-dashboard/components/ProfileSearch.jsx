import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProfileSearch = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchTypeOptions = [
    { value: 'all', label: 'All Profiles' },
    { value: 'students', label: 'Students Only' },
    { value: 'teachers', label: 'Teachers Only' }
  ];

  const mockProfiles = [
    {
      id: 1,
      type: 'student',
      name: 'Emma Johnson',
      class: 'Butterfly Class',
      teacher: 'Ms. Anderson',
      age: 4,
      status: 'Active',
      lastUpdated: '2025-01-20'
    },
    {
      id: 2,
      type: 'student',
      name: 'Michael Chen',
      class: 'Ladybug Class',
      teacher: 'Mr. Johnson',
      age: 3,
      status: 'Active',
      lastUpdated: '2025-01-19'
    },
    {
      id: 3,
      type: 'teacher',
      name: 'Sarah Anderson',
      specialty: 'Early Childhood Development',
      class: 'Butterfly Class',
      students: 24,
      status: 'Active',
      lastUpdated: '2025-01-18'
    },
    {
      id: 4,
      type: 'student',
      name: 'Sophia Williams',
      class: 'Caterpillar Class',
      teacher: 'Ms. Williams',
      age: 3,
      status: 'Active',
      lastUpdated: '2025-01-17'
    },
    {
      id: 5,
      type: 'teacher',
      name: 'David Johnson',
      specialty: 'Physical Education',
      class: 'Ladybug Class',
      students: 22,
      status: 'Active',
      lastUpdated: '2025-01-16'
    }
  ];

  const handleSearch = () => {
    if (!searchQuery?.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      let filtered = mockProfiles?.filter(profile => 
        profile?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        (profile?.class && profile?.class?.toLowerCase()?.includes(searchQuery?.toLowerCase())) ||
        (profile?.specialty && profile?.specialty?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );

      if (searchType !== 'all') {
        filtered = filtered?.filter(profile => 
          searchType === 'students' ? profile?.type === 'student' : profile?.type === 'teacher'
        );
      }

      setSearchResults(filtered);
      setIsSearching(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const getProfileIcon = (type) => {
    return type === 'student' ? 'GraduationCap' : 'Users';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10';
      case 'Inactive': return 'text-error bg-error/10';
      case 'Pending': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Profile Search</h2>
        <Button 
          variant="outline" 
          size="sm" 
          iconName="Download" 
          iconPosition="left" 
          iconSize={16}
        >
          Export
        </Button>
      </div>
      {/* Search Controls */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search by name, class, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
            />
          </div>
          
          <div className="sm:w-48">
            <Select
              options={searchTypeOptions}
              value={searchType}
              onChange={setSearchType}
              placeholder="Filter by type"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleSearch}
            loading={isSearching}
            iconName="Search"
            iconPosition="left"
            iconSize={16}
          >
            Search
          </Button>
          
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearSearch}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
          >
            Advanced Filters
          </Button>
        </div>
      </div>
      {/* Search Results */}
      <div className="space-y-4">
        {searchResults?.length > 0 && (
          <div className="flex items-center justify-between text-sm font-body text-muted-foreground">
            <span>Found {searchResults?.length} result{searchResults?.length !== 1 ? 's' : ''}</span>
            <Button variant="ghost" size="sm" iconName="Grid" iconSize={16}>
              View Mode
            </Button>
          </div>
        )}

        {searchResults?.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {searchResults?.map((profile) => (
              <div
                key={profile?.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
                onClick={() => onNavigate(`/secretary-profiles/${profile?.id}`)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                    <Icon name={getProfileIcon(profile?.type)} size={20} className="text-primary" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium font-body text-foreground group-hover:text-primary transition-colors duration-200">
                      {profile?.name}
                    </h3>
                    
                    <div className="flex items-center space-x-3 text-xs font-caption text-muted-foreground">
                      {profile?.type === 'student' ? (
                        <>
                          <span>{profile?.class}</span>
                          <span>•</span>
                          <span>Age {profile?.age}</span>
                          <span>•</span>
                          <span>{profile?.teacher}</span>
                        </>
                      ) : (
                        <>
                          <span>{profile?.specialty}</span>
                          <span>•</span>
                          <span>{profile?.class}</span>
                          <span>•</span>
                          <span>{profile?.students} students</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-mono px-2 py-1 rounded-full ${getStatusColor(profile?.status)}`}>
                    {profile?.status}
                  </span>
                  
                  <div className="text-xs font-caption text-muted-foreground text-right">
                    <p>Updated</p>
                    <p>{profile?.lastUpdated}</p>
                  </div>
                  
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery && !isSearching ? (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-body mb-2">No profiles found</p>
            <p className="text-sm text-muted-foreground font-caption">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : !searchQuery ? (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-body mb-2">Search for profiles</p>
            <p className="text-sm text-muted-foreground font-caption">
              Enter a name, class, or specialty to find student and teacher profiles
            </p>
          </div>
        ) : null}
      </div>
      {/* Quick Actions */}
      {searchResults?.length === 0 && !searchQuery && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-medium font-body text-foreground mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/secretary-enrollment')}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
            >
              Add Student
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/secretary-profiles')}
              iconName="Users"
              iconPosition="left"
              iconSize={16}
            >
              View All Profiles
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/secretary-coordination')}
              iconName="ArrowRightLeft"
              iconPosition="left"
              iconSize={16}
            >
              Manage Assignments
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSearch;