import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  X,
  Save,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  CheckCircle,
  Lightbulb,
  FileText,
  MessageCircle,
  Mail,
  Phone,
  User,
  Building,
  Globe,
  Target,
  TrendingUp,
  Star,
  Eye,
  EyeOff
} from 'lucide-react'
import { useStore } from '../store/store'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useStore()

  // State for different sections
  const [activeSection, setActiveSection] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Data state for each section
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Eventify Platform',
      description: 'Event discovery and booking platform for clubs and venues',
      status: 'Active',
      category: 'Web Application',
      team: ['Frontend', 'Backend', 'Design'],
      progress: 85,
      startDate: '2024-01-15',
      endDate: '2024-06-30'
    },
    {
      id: '2',
      title: 'SOS Emergency System',
      description: 'Emergency response platform with hardware integration',
      status: 'Development',
      category: 'Mobile App',
      team: ['Mobile', 'Hardware', 'Backend'],
      progress: 60,
      startDate: '2024-02-01',
      endDate: '2024-08-15'
    }
  ])

  const [researches, setResearches] = useState([
    {
      id: '1',
      title: 'AI in Emergency Response',
      description: 'Research on implementing AI algorithms for faster emergency response times',
      status: 'In Progress',
      category: 'Artificial Intelligence',
      researcher: 'Dr. Sarah Johnson',
      progress: 70,
      startDate: '2024-01-10',
      endDate: '2024-12-31'
    },
    {
      id: '2',
      title: 'Blockchain for Transparency',
      description: 'Exploring blockchain technology for resource transparency in NGOs',
      status: 'Planning',
      category: 'Blockchain',
      researcher: 'Prof. Michael Chen',
      progress: 25,
      startDate: '2024-03-01',
      endDate: '2025-02-28'
    }
  ])

  const [innovativeIdeas, setInnovativeIdeas] = useState([
    {
      id: '1',
      title: 'Smart City Integration',
      description: 'Integrating SOS system with smart city infrastructure for better emergency response',
      status: 'Concept',
      category: 'IoT',
      submittedBy: 'Alex Rodriguez',
      priority: 'High',
      feasibility: 80,
      submittedDate: '2024-02-15'
    },
    {
      id: '2',
      title: 'Drone Delivery Network',
      description: 'Using drones for emergency medical supply delivery in remote areas',
      status: 'Research',
      category: 'Drones',
      submittedBy: 'Maria Garcia',
      priority: 'Medium',
      feasibility: 65,
      submittedDate: '2024-01-20'
    }
  ])

  const [contacts, setContacts] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-0123',
      company: 'Tech Solutions Inc.',
      message: 'Interested in partnering for the SOS project. Would like to discuss collaboration opportunities.',
      status: 'New',
      submittedDate: '2024-03-10'
    },
    {
      id: '2',
      name: 'Emily Davis',
      email: 'emily.davis@ngo.org',
      phone: '+1-555-0456',
      company: 'Community Help NGO',
      message: 'Looking to implement the SOS system in our community outreach programs.',
      status: 'Contacted',
      submittedDate: '2024-03-08'
    }
  ])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    category: '',
    team: '',
    progress: 0,
    startDate: '',
    endDate: '',
    researcher: '',
    submittedBy: '',
    priority: 'Medium',
    feasibility: 50,
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })

  // Main dashboard cards
  const dashboardCards = [
    {
      id: 'projects',
      title: 'Projects',
      description: 'Manage ongoing and completed projects',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
      count: projects.length,
      items: projects
    },
    {
      id: 'researches',
      title: 'Researches',
      description: 'Track research initiatives and academic collaborations',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      count: researches.length,
      items: researches
    },
    {
      id: 'innovative-ideas',
      title: 'Innovative Ideas',
      description: 'Review and manage innovative project proposals',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500',
      count: innovativeIdeas.length,
      items: innovativeIdeas
    },
    {
      id: 'contacts',
      title: 'Contact Us',
      description: 'Whoever contacted us - manage inquiries and leads',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      count: contacts.length,
      items: contacts
    }
  ]

  const handleCardClick = (sectionId) => {
    setActiveSection(sectionId)
    setSearchQuery('')
    setFilterType('all')
  }

  const handleAddNew = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      description: '',
      status: '',
      category: '',
      team: '',
      progress: 0,
      startDate: '',
      endDate: '',
      researcher: '',
      submittedBy: '',
      priority: 'Medium',
      feasibility: 50,
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    })
    setShowAddForm(true)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title || '',
      description: item.description || '',
      status: item.status || '',
      category: item.category || '',
      team: item.team ? item.team.join(', ') : '',
      progress: item.progress || 0,
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      researcher: item.researcher || '',
      submittedBy: item.submittedBy || '',
      priority: item.priority || 'Medium',
      feasibility: item.feasibility || 50,
      name: item.name || '',
      email: item.email || '',
      phone: item.phone || '',
      company: item.company || '',
      message: item.message || ''
    })
    setShowAddForm(true)
  }

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (activeSection) {
        case 'projects':
          setProjects(projects.filter(p => p.id !== itemId))
          break
        case 'researches':
          setResearches(researches.filter(r => r.id !== itemId))
          break
        case 'innovative-ideas':
          setInnovativeIdeas(innovativeIdeas.filter(i => i.id !== itemId))
          break
        case 'contacts':
          setContacts(contacts.filter(c => c.id !== itemId))
          break
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      ...formData,
      team: formData.team ? formData.team.split(',').map(t => t.trim()) : [],
      submittedDate: editingItem ? editingItem.submittedDate : new Date().toISOString().split('T')[0]
    }

    switch (activeSection) {
      case 'projects':
        if (editingItem) {
          setProjects(projects.map(p => p.id === editingItem.id ? newItem : p))
        } else {
          setProjects([...projects, newItem])
        }
        break
      case 'researches':
        if (editingItem) {
          setResearches(researches.map(r => r.id === editingItem.id ? newItem : r))
        } else {
          setResearches([...researches, newItem])
        }
        break
      case 'innovative-ideas':
        if (editingItem) {
          setInnovativeIdeas(innovativeIdeas.map(i => i.id === editingItem.id ? newItem : i))
        } else {
          setInnovativeIdeas([...innovativeIdeas, newItem])
        }
        break
      case 'contacts':
        if (editingItem) {
          setContacts(contacts.map(c => c.id === editingItem.id ? newItem : c))
        } else {
          setContacts([...contacts, newItem])
        }
        break
    }

    setShowAddForm(false)
    setEditingItem(null)
  }

  const getCurrentItems = () => {
    switch (activeSection) {
      case 'projects': return projects
      case 'researches': return researches
      case 'innovative-ideas': return innovativeIdeas
      case 'contacts': return contacts
      default: return []
    }
  }

  const filteredItems = getCurrentItems().filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.email?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || item.status === filterType || item.priority === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Development': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'In Progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Planning': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Concept': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Research': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
      case 'New': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Contacted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-2">
              Dashboard
            </h1>
            <p className="text-xl text-white/60">
              Manage your projects, research, ideas, and contacts
            </p>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Site</span>
          </button>
        </div>

        {/* Main Dashboard Cards */}
        {!activeSection && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {dashboardCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCardClick(card.id)}
                className="glass rounded-2xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">{card.count}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-white/70 text-sm">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Section Detail View */}
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveSection(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-3xl font-display font-bold text-white">
                    {dashboardCards.find(card => card.id === activeSection)?.title}
                  </h2>
                  <p className="text-white/60">
                    {dashboardCards.find(card => card.id === activeSection)?.description}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleAddNew}
                className="button-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add New</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeSection}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {activeSection === 'projects' && (
                  <>
                    <option value="Active">Active</option>
                    <option value="Development">Development</option>
                    <option value="Planning">Planning</option>
                  </>
                )}
                {activeSection === 'researches' && (
                  <>
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                    <option value="Completed">Completed</option>
                  </>
                )}
                {activeSection === 'innovative-ideas' && (
                  <>
                    <option value="Concept">Concept</option>
                    <option value="Research">Research</option>
                    <option value="Development">Development</option>
                  </>
                )}
                {activeSection === 'contacts' && (
                  <>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Followed Up">Followed Up</option>
                  </>
                )}
              </select>
            </div>

            {/* Items List */}
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-white">
                          {item.title || item.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status || item.priority)}`}>
                          {item.status || item.priority}
                        </span>
                      </div>
                      
                      <p className="text-white/70 mb-4 line-clamp-2">
                        {item.description || item.message}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                        {item.category && (
                          <div className="flex items-center space-x-1">
                            <Building className="w-4 h-4" />
                            <span>{item.category}</span>
                          </div>
                        )}
                        {item.team && item.team.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{item.team.join(', ')}</span>
                          </div>
                        )}
                        {item.progress !== undefined && (
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>{item.progress}% Complete</span>
                          </div>
                        )}
                        {item.email && (
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{item.email}</span>
                          </div>
                        )}
                        {item.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{item.phone}</span>
                          </div>
                        )}
                        {item.submittedDate && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{item.submittedDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-white/60 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {filteredItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-white/40" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {activeSection === 'contacts' ? 'No contacts yet' : 'No items found'}
                  </h3>
                  <p className="text-white/60">
                    {searchQuery || filterType !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : `Add your first ${activeSection.slice(0, -1)} to get started`
                    }
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass rounded-2xl p-8 border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingItem ? 'Edit Item' : `Add New ${activeSection.slice(0, -1)}`}
                  </h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Common Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        {activeSection === 'contacts' ? 'Name' : 'Title'}
                      </label>
                      <input
                        type="text"
                        value={formData.title || formData.name}
                        onChange={(e) => setFormData({
                          ...formData, 
                          [activeSection === 'contacts' ? 'name' : 'title']: e.target.value
                        })}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder={activeSection === 'contacts' ? 'Enter name' : 'Enter title'}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Status</option>
                        {activeSection === 'projects' && (
                          <>
                            <option value="Active">Active</option>
                            <option value="Development">Development</option>
                            <option value="Planning">Planning</option>
                          </>
                        )}
                        {activeSection === 'researches' && (
                          <>
                            <option value="In Progress">In Progress</option>
                            <option value="Planning">Planning</option>
                            <option value="Completed">Completed</option>
                          </>
                        )}
                        {activeSection === 'innovative-ideas' && (
                          <>
                            <option value="Concept">Concept</option>
                            <option value="Research">Research</option>
                            <option value="Development">Development</option>
                          </>
                        )}
                        {activeSection === 'contacts' && (
                          <>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Followed Up">Followed Up</option>
                          </>
                        )}
                      </select>
                    </div>

                    {activeSection !== 'contacts' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Category</label>
                        <input
                          type="text"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter category"
                          required
                        />
                      </div>
                    )}

                    {activeSection === 'contacts' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter email"
                          required
                        />
                      </div>
                    )}

                    {activeSection === 'projects' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Team (comma-separated)</label>
                        <input
                          type="text"
                          value={formData.team}
                          onChange={(e) => setFormData({...formData, team: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., Frontend, Backend, Design"
                        />
                      </div>
                    )}

                    {activeSection === 'researches' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Researcher</label>
                        <input
                          type="text"
                          value={formData.researcher}
                          onChange={(e) => setFormData({...formData, researcher: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter researcher name"
                        />
                      </div>
                    )}

                    {activeSection === 'innovative-ideas' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Submitted By</label>
                        <input
                          type="text"
                          value={formData.submittedBy}
                          onChange={(e) => setFormData({...formData, submittedBy: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter submitter name"
                        />
                      </div>
                    )}

                    {activeSection === 'contacts' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      </div>
                    )}

                    {activeSection === 'contacts' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Company</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter company name"
                        />
                      </div>
                    )}

                    {activeSection !== 'contacts' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Progress (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.progress}
                          onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="0-100"
                        />
                      </div>
                    )}

                    {activeSection === 'innovative-ideas' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Priority</label>
                        <select
                          value={formData.priority}
                          onChange={(e) => setFormData({...formData, priority: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    )}

                    {activeSection === 'innovative-ideas' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Feasibility (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.feasibility}
                          onChange={(e) => setFormData({...formData, feasibility: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="0-100"
                        />
                      </div>
                    )}

                    {activeSection !== 'contacts' && (
                      <div>
                        <label className="block text-white font-medium mb-2">Start Date</label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    )}

                    {activeSection !== 'contacts' && (
                      <div>
                        <label className="block text-white font-medium mb-2">End Date</label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>

                  {/* Description/Message Field */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      {activeSection === 'contacts' ? 'Message' : 'Description'}
                    </label>
                    <textarea
                      value={formData.description || formData.message}
                      onChange={(e) => setFormData({
                        ...formData, 
                        [activeSection === 'contacts' ? 'message' : 'description']: e.target.value
                      })}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder={activeSection === 'contacts' ? 'Enter message' : 'Enter description'}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-3 text-white/60 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="button-primary flex items-center space-x-2"
                    >
                      <Save className="w-5 h-5" />
                      <span>{editingItem ? 'Update' : 'Create'}</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Dashboard
