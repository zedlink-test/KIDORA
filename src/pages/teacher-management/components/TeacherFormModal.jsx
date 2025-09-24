import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TeacherFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  teacher = null, 
  mode = 'create' 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    specialty: '',
    experience: '',
    education: '',
    certifications: '',
    assignedClasses: [],
    status: 'active',
    startDate: '',
    avatar: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (teacher && mode === 'edit') {
      setFormData({
        name: teacher?.name || '',
        surname: teacher?.surname || '',
        email: teacher?.email || '',
        phone: teacher?.phone || '',
        specialty: teacher?.specialty || '',
        experience: teacher?.experience || '',
        education: teacher?.education || '',
        certifications: teacher?.certifications || '',
        assignedClasses: teacher?.assignedClasses || [],
        status: teacher?.status || 'active',
        startDate: teacher?.startDate || '',
        avatar: teacher?.avatar || ''
      });
    } else {
      setFormData({
        name: '',
        surname: '',
        email: '',
        phone: '',
        specialty: '',
        experience: '',
        education: '',
        certifications: '',
        assignedClasses: [],
        status: 'active',
        startDate: '',
        avatar: ''
      });
    }
    setErrors({});
  }, [teacher, mode, isOpen]);

  const specialtyOptions = [
    { value: '', label: 'Select Specialty' },
    { value: 'Early Childhood Education', label: 'Early Childhood Education' },
    { value: 'Child Development', label: 'Child Development' },
    { value: 'Special Needs', label: 'Special Needs' },
    { value: 'Music & Arts', label: 'Music & Arts' },
    { value: 'Physical Education', label: 'Physical Education' },
    { value: 'Language Development', label: 'Language Development' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const availableClasses = [
    'Toddlers A',
    'Toddlers B',
    'Pre-K A',
    'Pre-K B',
    'Kindergarten A',
    'Kindergarten B',
    'Special Needs'
  ];

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

  const handleClassToggle = (className, checked) => {
    setFormData(prev => ({
      ...prev,
      assignedClasses: checked 
        ? [...prev?.assignedClasses, className]
        : prev?.assignedClasses?.filter(c => c !== className)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'First name is required';
    }

    if (!formData?.surname?.trim()) {
      newErrors.surname = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData?.specialty) {
      newErrors.specialty = 'Specialty is required';
    }

    if (!formData?.experience) {
      newErrors.experience = 'Experience is required';
    } else if (isNaN(formData?.experience) || formData?.experience < 0) {
      newErrors.experience = 'Please enter a valid number of years';
    }

    if (!formData?.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (formData?.assignedClasses?.length === 0) {
      newErrors.assignedClasses = 'Please assign at least one class';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...formData,
        id: teacher?.id || Date.now(),
        approved: true,
        avatar: formData?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData?.name}${formData?.surname}`
      };
      
      await onSubmit(submissionData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
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
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-soft-xl rounded-lg border border-border">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name={mode === 'edit' ? "Edit" : "UserPlus"} size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {mode === 'edit' ? 'Edit Teacher' : 'Add New Teacher'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {mode === 'edit' ? 'Update teacher information' : 'Create a new teacher profile'}
                </p>
              </div>
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
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="Enter first name"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  required
                />
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Enter last name"
                  value={formData?.surname}
                  onChange={(e) => handleInputChange('surname', e?.target?.value)}
                  error={errors?.surname}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  error={errors?.phone}
                  required
                />
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Specialty"
                  options={specialtyOptions}
                  value={formData?.specialty}
                  onChange={(value) => handleInputChange('specialty', value)}
                  error={errors?.specialty}
                  required
                />
                <Input
                  label="Years of Experience"
                  type="number"
                  placeholder="Enter years of experience"
                  value={formData?.experience}
                  onChange={(e) => handleInputChange('experience', e?.target?.value)}
                  error={errors?.experience}
                  min="0"
                  required
                />
                <Input
                  label="Education"
                  type="text"
                  placeholder="Enter education background"
                  value={formData?.education}
                  onChange={(e) => handleInputChange('education', e?.target?.value)}
                />
                <Input
                  label="Certifications"
                  type="text"
                  placeholder="Enter certifications"
                  value={formData?.certifications}
                  onChange={(e) => handleInputChange('certifications', e?.target?.value)}
                />
              </div>
            </div>

            {/* Employment Details */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Employment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={formData?.startDate}
                  onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                  error={errors?.startDate}
                  required
                />
                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                />
              </div>
            </div>

            {/* Class Assignments */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Class Assignments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableClasses?.map((className) => (
                  <Checkbox
                    key={className}
                    label={className}
                    checked={formData?.assignedClasses?.includes(className)}
                    onChange={(e) => handleClassToggle(className, e?.target?.checked)}
                  />
                ))}
              </div>
              {errors?.assignedClasses && (
                <p className="mt-2 text-sm text-destructive">{errors?.assignedClasses}</p>
              )}
            </div>

            {/* Form Actions */}
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
                iconName={mode === 'edit' ? "Save" : "Plus"}
                iconPosition="left"
                iconSize={16}
              >
                {mode === 'edit' ? 'Update Teacher' : 'Add Teacher'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherFormModal;