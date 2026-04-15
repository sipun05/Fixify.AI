import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Star, Clock, CheckCircle, Phone, Mail, AlertCircle, Upload, FileImage } from 'lucide-react';

const TechnicianDashboard = () => {
  const [technicianData, setTechnicianData] = useState({
    name: "Raj Kumar",
    phone: "+91 9876543210",
    email: "raj@example.com",
    status: "available",
    skills: ["Electrician", "AC Repair", "Home Appliances"],
    location: {
      lat: 17.4371,
      lng: 78.4485
    },
    rating: 4.6,
    totalTasks: 127,
    assignedTaskId: "TASK-2025-001",
    joinedAt: "2024-03-15T10:32:00Z"
  });

  const [currentTask, setCurrentTask] = useState({
    id: "TASK-2025-001",
    title: "AC Not Working - Urgent",
    description: "Air conditioner stopped working suddenly. No cooling at all.",
    category: "AC Repair",
    priority: "High",
    status: "in-progress",
    customerName: "Priya Sharma",
    customerPhone: "+91 9988776655",
    address: "Apt 304, Green Valley Residency, Gachibowli, Hyderabad",
    reportedAt: "2025-08-01T09:15:00Z",
    assignedAt: "2025-08-01T09:30:00Z",
    estimatedTime: "2-3 hours",
    progressPhotos: []
  });

  const [statusFilter, setStatusFilter] = useState('all');
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [photoDescription, setPhotoDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Mock recent tasks for history
  const [recentTasks] = useState([
    {
      id: "TASK-2025-002",
      title: "Kitchen Sink Leakage",
      category: "Plumbing",
      status: "completed",
      completedAt: "2025-07-31T16:45:00Z",
      rating: 5,
      customerName: "Amit Patel"
    },
    {
      id: "TASK-2025-003",
      title: "Ceiling Fan Installation",
      category: "Electrician",
      status: "completed",
      completedAt: "2025-07-31T11:20:00Z",
      rating: 4.8,
      customerName: "Sunita Reddy"
    },
    {
      id: "TASK-2025-004",
      title: "Water Heater Repair",
      category: "Electrician",
      status: "completed",
      completedAt: "2025-07-30T14:30:00Z",
      rating: 4.5,
      customerName: "Ravi Kumar"
    }
  ]);

  const handleStatusChange = (newStatus) => {
    setTechnicianData(prev => ({ ...prev, status: newStatus }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handlePhotoUpload = () => {
    if (selectedFiles.length === 0) return;

    const newPhotos = selectedFiles.map((file, index) => ({
      id: Date.now() + index,
      file: file,
      description: photoDescription || 'Progress update',
      timestamp: new Date().toISOString(),
      url: URL.createObjectURL(file)
    }));

    setCurrentTask(prev => ({
      ...prev,
      progressPhotos: [...prev.progressPhotos, ...newPhotos]
    }));

    setSelectedFiles([]);
    setPhotoDescription('');
    setShowPhotoUpload(false);
  };

  const handleTaskStatusUpdate = (status) => {
    setCurrentTask(prev => ({ ...prev, status }));
    if (status === 'completed') {
      setTechnicianData(prev => ({
        ...prev,
        assignedTaskId: null,
        status: 'available',
        totalTasks: prev.totalTasks + 1
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTaskStatusColor = (status) => {
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
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffHours = Math.floor((now - past) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ⚡ Fixify.AI
              </h1>
              <span className="ml-4 text-gray-600">Technician Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(technicianData.status)}`}></div>
                <select
                  value={technicianData.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {technicianData.name.charAt(0)}
                </div>
                <span className="font-medium text-gray-800">{technicianData.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile & Stats Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {technicianData.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{technicianData.name}</h2>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-800">{technicianData.rating}</span>
                  <span className="text-gray-600">({technicianData.totalTasks} tasks)</span>
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(technicianData.status)} text-white`}>
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  {technicianData.status.charAt(0).toUpperCase() + technicianData.status.slice(1)}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{technicianData.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{technicianData.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Hyderabad, Telangana</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {technicianData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{technicianData.totalTasks}</div>
                  <div className="text-sm text-gray-600">Total Tasks</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{technicianData.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-600">15</div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Current Task */}
            {technicianData.assignedTaskId && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Current Task</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(currentTask.priority)}`}>
                    {currentTask.priority} Priority
                  </span>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{currentTask.title}</h4>
                      <p className="text-gray-600 mb-3">{currentTask.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>📋 {currentTask.category}</span>
                        <span>⏱️ {currentTask.estimatedTime}</span>
                        <span>📅 {formatTimeAgo(currentTask.assignedAt)}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTaskStatusColor(currentTask.status)}`}>
                      {currentTask.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Customer Details</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Name: <span className="font-medium text-gray-800">{currentTask.customerName}</span></p>
                        <p className="text-sm text-gray-600">Phone: <span className="font-medium text-gray-800">{currentTask.customerPhone}</span></p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Address:</p>
                        <p className="text-sm font-medium text-gray-800">{currentTask.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task Actions */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={() => setShowPhotoUpload(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Add Progress Photo</span>
                  </button>
                  
                  <button
                    onClick={() => handleTaskStatusUpdate('completed')}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </button>
                  
                  <a
                    href={`tel:${currentTask.customerPhone}`}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Customer</span>
                  </a>
                </div>

                {/* Progress Photos */}
                {currentTask.progressPhotos.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-4">Progress Photos ({currentTask.progressPhotos.length})</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {currentTask.progressPhotos.map((photo) => (
                        <div key={photo.id} className="relative group">
                          <img
                            src={photo.url}
                            alt={photo.description}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                            <div className="text-white text-sm opacity-0 group-hover:opacity-100 text-center p-2">
                              <p className="font-medium">{photo.description}</p>
                              <p className="text-xs">{formatTimeAgo(photo.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Photo Upload Modal */}
            {showPhotoUpload && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Add Progress Photo</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Photos
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={photoDescription}
                        onChange={(e) => setPhotoDescription(e.target.value)}
                        placeholder="Describe the progress or issue..."
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                    
                    {selectedFiles.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Selected files:</p>
                        <div className="space-y-1">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                              <FileImage className="w-4 h-4" />
                              <span>{file.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={handlePhotoUpload}
                      disabled={selectedFiles.length === 0}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Upload Photos
                    </button>
                    <button
                      onClick={() => {
                        setShowPhotoUpload(false);
                        setSelectedFiles([]);
                        setPhotoDescription('');
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Tasks */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Tasks</h3>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Tasks</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-800">{task.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                            {task.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>📋 {task.category}</span>
                          <span>👤 {task.customerName}</span>
                          <span>📅 {formatTimeAgo(task.completedAt)}</span>
                        </div>
                      </div>
                      {task.rating && (
                        <div className="flex items-center space-x-1 ml-4">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-800">{task.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;