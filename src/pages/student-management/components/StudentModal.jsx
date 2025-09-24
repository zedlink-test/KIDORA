import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StudentModal = ({ isOpen, onClose, onSave, student, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    parentContact: '',
    emergencyContact: '',
    bloodType: '',
    allergies: '',
    specialNotes: '',
    assignedTeacher: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (student && mode === 'edit') {
      setFormData({
        firstName: student?.firstName || '',
        lastName: student?.lastName || '',
        dateOfBirth: student?.dateOfBirth || '',
        parentContact: student?.parentContact || '',
        emergencyContact: student?.emergencyContact || '',
        bloodType: student?.bloodType || '',
        allergies: student?.allergies || '',
        specialNotes: student?.specialNotes || '',
        assignedTeacher: student?.assignedTeacher || '',
        status: student?.status || 'Active'
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        parentContact: '',
        emergencyContact: '',
        bloodType: '',
        allergies: '',
        specialNotes: '',
        assignedTeacher: '',
        status: 'Active'
      });
    }
    setErrors({});
  }, [student, mode, isOpen]);

  const bloodTypeOptions = [
    { value: '', label: 'Select Blood Type' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  const teacherOptions = [
    { value: '', label: 'Select Teacher' },
    { value: 'Sarah Johnson', label: 'Sarah Johnson' },
    { value: 'Michael Chen', label: 'Michael Chen' },
    { value: 'Emily Rodriguez', label: 'Emily Rodriguez' },
    { value: 'David Thompson', label: 'David Thompson' },
    { value: 'Lisa Anderson', label: 'Lisa Anderson' },
    { value: 'James Wilson', label: 'James Wilson' }
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Graduated', label: 'Graduated' }
  ];

  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today?.getFullYear() - birth?.getFullYear();
    const monthDiff = today?.getMonth() - birth?.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birth?.getDate())) {
      age--;
    }
    
    return age;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      let age = calculateAge(formData?.dateOfBirth);
      if (age < 2 || age > 6) {
        newErrors.dateOfBirth = 'Student age must be between 2-6 years';
      }
    }

    if (!formData?.parentContact?.trim()) {
      newErrors.parentContact = 'Parent contact is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.parentContact)) {
      newErrors.parentContact = 'Please enter a valid phone number';
    }

    if (!formData?.bloodType) {
      newErrors.bloodType = 'Blood type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const studentData = {
        ...formData,
        id: student?.id || Date.now(),
        age: calculateAge(formData?.dateOfBirth)
      };
      
      await onSave(studentData);
      onClose();
    } catch (error) {
      console.error('Error saving student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-card border border-border rounded-lg shadow-soft-xl relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {mode === 'edit' ? 'Edit Student Profile' : 'Add New Student'}
              </h3>
              <p className="text-sm text-muted-foreground font-body mt-1">
                {mode === 'edit' ? 'Update student information and assignments' : 'Enter student details for enrollment'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground font-heading">Personal Information</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  value={formData?.firstName}
                  onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                  error={errors?.firstName}
                  required
                  placeholder="Enter first name"
                />
                
                <Input
                  label="Last Name"
                  type="text"
                  value={formData?.lastName}
                  onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                  error={errors?.lastName}
                  required
                  placeholder="Enter last name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={formData?.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
                    error={errors?.dateOfBirth}
                    required
                    max={new Date()?.toISOString()?.split('T')?.[0]}
                  />
                  {formData?.dateOfBirth && (
                    <p className="text-xs text-muted-foreground mt-1 font-body">
                      Current age: {calculateAge(formData?.dateOfBirth)} years
                    </p>
                  )}
                </div>
                
                <Select
                  label="Blood Type"
                  options={bloodTypeOptions}
                  value={formData?.bloodType}
                  onChange={(value) => handleInputChange('bloodType', value)}
                  error={errors?.bloodType}
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground font-heading">Contact Information</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Parent Contact"
                  type="tel"
                  value={formData?.parentContact}
                  onChange={(e) => handleInputChange('parentContact', e?.target?.value)}
                  error={errors?.parentContact}
                  required
                  placeholder="+1 (555) 123-4567"
                />
                
                <Input
                  label="Emergency Contact"
                  type="tel"
                  value={formData?.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
                  placeholder="+1 (555) 987-6543"
                  description="Optional backup contact"
                />
              </div>
            </div>

            {/* Assignment & Status */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground font-heading">Assignment & Status</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Assigned Teacher"
                  options={teacherOptions}
                  value={formData?.assignedTeacher}
                  onChange={(value) => handleInputChange('assignedTeacher', value)}
                  description="Optional - can be assigned later"
                />
                
                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                  required
                />
              </div>
            </div>

            {/* Medical & Special Notes */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground font-heading">Medical & Special Information</h4>
              
              <Input
                label="Allergies"
                type="text"
                value={formData?.allergies}
                onChange={(e) => handleInputChange('allergies', e?.target?.value)}
                placeholder="e.g., Peanuts, Dairy, None"
                description="List any known allergies or 'None'"
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground font-body mb-2">
                  Special Notes
                </label>
                <textarea
                  value={formData?.specialNotes}
                  onChange={(e) => handleInputChange('specialNotes', e?.target?.value)}
                  placeholder="Any special instructions, medical conditions, or behavioral notes..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none font-body"
                />
                <p className="text-xs text-muted-foreground mt-1 font-caption">
                  Optional additional information for teachers and staff
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                iconName={mode === 'edit' ? 'Save' : 'Plus'}
                iconPosition="left"
                iconSize={16}
              >
                {mode === 'edit' ? 'Update Student' : 'Add Student'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;