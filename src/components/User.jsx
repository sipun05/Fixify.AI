import React, { useState, useEffect } from 'react';

const FixifyUserDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('active');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateIssue, setShowCreateIssue] = useState(false);
  const [issueForm, setIssueForm] = useState({
    location: '',
    images: []
  });
  const [locationPermission, setLocationPermission] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  // Mock user data
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    avatar: '👤',
    joinDate: '2024-01-15',
    issuesReported: 12,
    issuesResolved: 8
  });

  // Mock issues data
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: 'Broken Street Light',
      description: 'Street light near gate 2 is not working since yesterday',
      category: 'electrical',
      priority: 'high',
      status: 'in-progress',
      location: 'Gate 2, Main Street',
      dateReported: '2024-07-28',
      technician: 'Raj Kumar',
      estimatedTime: '2 hours',
      images: [
        { type: 'placeholder', data: '📷 Street Light 1' },
        { type: 'placeholder', data: '📷 Street Light 2' }
      ]
    },
    {
      id: 2,
      title: 'Water Leakage',
      description: 'Pipe leakage in basement parking area',
      category: 'plumbing',
      priority: 'medium',
      status: 'pending',
      location: 'Basement Level B1',
      dateReported: '2024-07-27',
      technician: null,
      estimatedTime: null,
      images: [
        { type: 'placeholder', data: '📷 Water Leak' }
      ]
    },
    {
      id: 3,
      title: 'Garden Maintenance',
      description: 'Regular trimming and watering needed for garden area',
      category: 'landscaping',
      priority: 'low',
      status: 'completed',
      location: 'Central Garden',
      dateReported: '2024-07-25',
      technician: 'Suresh Yadav',
      estimatedTime: 'Completed',
      images: [
        { type: 'placeholder', data: '📷 Garden 1' },
        { type: 'placeholder', data: '📷 Garden 2' },
        { type: 'placeholder', data: '📷 Garden 3' }
      ]
    }
  ]);

  const [notifications] = useState([
    { id: 1, type: 'success', message: 'Issue #001 has been resolved', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Technician assigned to Issue #002', time: '4 hours ago' },
    { id: 3, type: 'warning', message: 'Issue #003 requires additional information', time: '1 day ago' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIssueForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Simulate reverse geocoding - in real app, use Google Maps API or similar
            const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (Auto-detected)`;
            setIssueForm(prev => ({ ...prev, location: mockAddress }));
            setLocationPermission('granted');
          } catch (error) {
            alert('Unable to get address. Please enter manually.');
          }
          setIsGettingLocation(false);
        },
        (error) => {
          setLocationPermission('denied');
          setIsGettingLocation(false);
          alert('Location access denied. Please enter address manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setIsGettingLocation(false);
    }
  };

  const handleCameraCapture = () => {
    // Create a file input for camera
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use rear camera
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = {
            type: 'image',
            data: e.target.result,
            name: file.name || `Camera_${Date.now()}.jpg`
          };
          setIssueForm(prev => ({
            ...prev,
            images: [...prev.images, imageData]
          }));
        };
        reader.readAsDataURL(file);
        
        // Auto-detect location when taking photo from camera
        getCurrentLocation();
      }
    };
    
    input.click();
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = {
          type: 'image',
          data: e.target.result,
          name: file.name
        };
        setIssueForm(prev => ({
          ...prev,
          images: [...prev.images, imageData]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setIssueForm(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleCreateIssue = (e) => {
    e.preventDefault();
    if (!issueForm.location || issueForm.images.length === 0) {
      alert('Please add images and location to report the issue.');
      return;
    }
    
    const newIssue = {
      id: issues.length + 1,
      title: 'Maintenance Issue',
      description: 'Issue reported via image',
      category: 'general',
      priority: 'medium',
      ...issueForm,
      status: 'pending',
      dateReported: new Date().toISOString().split('T')[0],
      technician: null,
      estimatedTime: null
    };
    
    setIssues(prev => [newIssue, ...prev]);
    setIssueForm({
      location: '',
      images: []
    });
    setShowCreateIssue(false);
    alert('✅ Issue reported successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'electrical': return '⚡';
      case 'plumbing': return '🔧';
      case 'cleaning': return '🧹';
      case 'landscaping': return '🌱';
      case 'hvac': return '❄️';
      case 'security': return '🛡️';
      default: return '🔧';
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (activeTab === 'active') return issue.status !== 'completed';
    if (activeTab === 'completed') return issue.status === 'completed';
    return true;
  });

  const renderImage = (image, index, showRemove = false, size = 'small') => {
    const sizeClasses = size === 'large' ? 'w-48 h-48' : 'w-16 h-16';
    
    if (image.type === 'image') {
      return (
        <div key={index} className="relative group">
          <img
            src={image.data}
            alt={image.name}
            className={`${sizeClasses} object-cover rounded-lg border border-gray-200`}
          />
          {showRemove && (
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>
      );
    } else {
      return (
        <div key={index} className="relative group">
          <div className={`${sizeClasses} bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center`}>
            <span className="text-4xl">📷</span>
          </div>
          {showRemove && (
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ⚡ Fixify.AI
              </h1>
              <span className="ml-4 text-gray-500">|</span>
              <span className="ml-4 text-gray-700 font-medium">User Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors relative"
                >
                  🔔
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-4 border-b border-gray-50 hover:bg-gray-50">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">User</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg">
                  {user.avatar}
                </div>
              </div>
              
              <button
                onClick={() => setCurrentPage('auth')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                  {user.avatar}
                </div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{user.issuesReported}</div>
                    <div className="text-sm text-gray-600">Issues Reported</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{user.issuesResolved}</div>
                    <div className="text-sm text-gray-600">Issues Resolved</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowCreateIssue(true)}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all"
              >
                + Report New Issue
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">
                    ⏳
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {issues.filter(i => i.status === 'pending').length}
                    </div>
                    <div className="text-sm text-gray-600">Pending Issues</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                    🔄
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {issues.filter(i => i.status === 'in-progress').length}
                    </div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                    ✅
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {issues.filter(i => i.status === 'completed').length}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Issues List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">My Issues</h2>
                  <button
                    onClick={() => setShowCreateIssue(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    + New Issue
                  </button>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === 'active'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Active Issues ({issues.filter(i => i.status !== 'completed').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Completed ({issues.filter(i => i.status === 'completed').length})
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {filteredIssues.map(issue => (
                  <div key={issue.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{getCategoryIcon(issue.category)}</span>
                          <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                            {issue.status.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                            {issue.priority.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{issue.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                          <span>📍 {issue.location}</span>
                          <span>📅 {issue.dateReported}</span>
                          {issue.technician && <span>👨‍🔧 {issue.technician}</span>}
                          {issue.estimatedTime && <span>⏱️ {issue.estimatedTime}</span>}
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-gray-500">Images:</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {issue.images.map((img, idx) => renderImage(img, idx))}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Issue Modal */}
      {showCreateIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Report Issue</h2>
              <button
                onClick={() => setShowCreateIssue(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capture Issue</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleCameraCapture}
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="text-4xl mb-2">📷</div>
                    <div className="text-sm font-medium text-gray-700">Take Photo</div>
                    <div className="text-xs text-gray-500">Auto-detect location</div>
                  </button>
                  
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="text-4xl mb-2">🖼️</div>
                    <div className="text-sm font-medium text-gray-700">Upload Photo</div>
                    <div className="text-xs text-gray-500">Manual location</div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {issueForm.images.length > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm font-medium text-gray-700 mb-4 text-center">Selected Images:</div>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {issueForm.images.map((img, idx) => renderImage(img, idx, true, 'large'))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="space-y-3">
                  {!issueForm.location && (
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all disabled:opacity-50"
                    >
                      <span>📍</span>
                      <span>{isGettingLocation ? 'Getting Location...' : 'Auto-detect Location'}</span>
                    </button>
                  )}
                  
                  {!issueForm.location && <div className="text-center text-gray-500 text-sm">or</div>}
                  
                  <input
                    type="text"
                    name="location"
                    value={issueForm.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter location manually"
                  />
                  
                  {issueForm.location && (
                    <button
                      type="button"
                      onClick={() => setIssueForm(prev => ({ ...prev, location: '' }))}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear and re-enter location
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateIssue(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleCreateIssue}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixifyUserDashboard;