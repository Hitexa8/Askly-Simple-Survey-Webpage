import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Trash2, Eye, Search, X, ChevronLeft, ChevronRight, PieChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Dummy API service
const api = {
  async getResponses() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { id: 1, email: "john.doe@example.com", surveyTitle: "Customer Satisfaction", date: "2025-03-10", rating: 4.5, details: { 
        respondentName: "John Doe", 
        department: "Marketing", 
        comments: "The product is excellent but the customer service could be improved.",
        questions: [
          { question: "How satisfied are you with our product?", answer: "Very satisfied", score: 5 },
          { question: "How likely are you to recommend us?", answer: "Likely", score: 4 },
          { question: "How would you rate our customer service?", answer: "Average", score: 3 }
        ]
      }},
      { id: 2, email: "jane.smith@example.com", surveyTitle: "Product Feedback", date: "2025-03-12", rating: 3.8, details: { 
        respondentName: "Jane Smith", 
        department: "Sales", 
        comments: "The new features are great but there are some bugs that need fixing.",
        questions: [
          { question: "How easy is the product to use?", answer: "Somewhat easy", score: 4 },
          { question: "How useful are the new features?", answer: "Very useful", score: 5 },
          { question: "Did you encounter any bugs?", answer: "Yes, a few", score: 2 }
        ]
      }},
      { id: 3, email: "michael.brown@example.com", surveyTitle: "Website Usability", date: "2025-03-15", rating: 4.2, details: { 
        respondentName: "Michael Brown", 
        department: "IT", 
        comments: "The website is well-organized but loading times could be improved.",
        questions: [
          { question: "How easy was it to find what you needed?", answer: "Very easy", score: 5 },
          { question: "How would you rate the website speed?", answer: "Average", score: 3 },
          { question: "How visually appealing is the website?", answer: "Very appealing", score: 5 }
        ]
      }},
      { id: 4, email: "sarah.johnson@example.com", surveyTitle: "Customer Satisfaction", date: "2025-03-09", rating: 5.0, details: { 
        respondentName: "Sarah Johnson", 
        department: "Engineering", 
        comments: "Exceptional service and product quality. No complaints whatsoever.",
        questions: [
          { question: "How satisfied are you with our product?", answer: "Extremely satisfied", score: 5 },
          { question: "How likely are you to recommend us?", answer: "Very likely", score: 5 },
          { question: "How would you rate our customer service?", answer: "Excellent", score: 5 }
        ]
      }},
      { id: 5, email: "david.wilson@example.com", surveyTitle: "Product Feedback", date: "2025-03-11", rating: 2.5, details: { 
        respondentName: "David Wilson", 
        department: "Customer Support", 
        comments: "The product is difficult to use and lacks essential features.",
        questions: [
          { question: "How easy is the product to use?", answer: "Difficult", score: 2 },
          { question: "How useful are the new features?", answer: "Not very useful", score: 2 },
          { question: "Did you encounter any bugs?", answer: "Yes, many", score: 1 }
        ]
      }},
      { id: 6, email: "emily.davis@example.com", surveyTitle: "Website Usability", date: "2025-03-14", rating: 3.5, details: { 
        respondentName: "Emily Davis", 
        department: "HR", 
        comments: "The website navigation could be improved, but overall it's decent.",
        questions: [
          { question: "How easy was it to find what you needed?", answer: "Somewhat difficult", score: 3 },
          { question: "How would you rate the website speed?", answer: "Good", score: 4 },
          { question: "How visually appealing is the website?", answer: "Average", score: 3 }
        ]
      }},
      { id: 7, email: "alex.thompson@example.com", surveyTitle: "Employee Engagement", date: "2025-03-08", rating: 4.0, details: { 
        respondentName: "Alex Thompson", 
        department: "Finance", 
        comments: "Generally satisfied with the work environment but would like more growth opportunities.",
        questions: [
          { question: "How satisfied are you with your work?", answer: "Satisfied", score: 4 },
          { question: "How would you rate team collaboration?", answer: "Good", score: 4 },
          { question: "Are you satisfied with growth opportunities?", answer: "Somewhat", score: 3 }
        ]
      }},
      { id: 8, email: "olivia.martin@example.com", surveyTitle: "Customer Satisfaction", date: "2025-03-16", rating: 4.7, details: { 
        respondentName: "Olivia Martin", 
        department: "Operations", 
        comments: "Great product with excellent support team. Very satisfied overall.",
        questions: [
          { question: "How satisfied are you with our product?", answer: "Very satisfied", score: 5 },
          { question: "How likely are you to recommend us?", answer: "Very likely", score: 5 },
          { question: "How would you rate our customer service?", answer: "Very good", score: 4 }
        ]
      }},
      { id: 9, email: "james.taylor@example.com", surveyTitle: "Product Feedback", date: "2025-03-18", rating: 3.9, details: { 
        respondentName: "James Taylor", 
        department: "Product", 
        comments: "Good product with some room for improvement in the UI/UX.",
        questions: [
          { question: "How easy is the product to use?", answer: "Fairly easy", score: 4 },
          { question: "How useful are the new features?", answer: "Quite useful", score: 4 },
          { question: "Did you encounter any bugs?", answer: "Occasionally", score: 3 }
        ]
      }},
      { id: 10, email: "sophia.anderson@example.com", surveyTitle: "Website Usability", date: "2025-03-05", rating: 4.1, details: { 
        respondentName: "Sophia Anderson", 
        department: "Legal", 
        comments: "The website is well-designed but could use more accessibility features.",
        questions: [
          { question: "How easy was it to find what you needed?", answer: "Easy", score: 4 },
          { question: "How would you rate the website speed?", answer: "Fast", score: 5 },
          { question: "How visually appealing is the website?", answer: "Appealing", score: 4 }
        ]
      }},
      { id: 11, email: "ryan.clark@example.com", surveyTitle: "Employee Engagement", date: "2025-03-07", rating: 3.2, details: { 
        respondentName: "Ryan Clark", 
        department: "R&D", 
        comments: "Average work environment. Communication between departments could be improved.",
        questions: [
          { question: "How satisfied are you with your work?", answer: "Somewhat satisfied", score: 3 },
          { question: "How would you rate team collaboration?", answer: "Average", score: 3 },
          { question: "Are you satisfied with growth opportunities?", answer: "Not really", score: 2 }
        ]
      }},
      { id: 12, email: "emma.thomas@example.com", surveyTitle: "Customer Satisfaction", date: "2025-03-17", rating: 4.8, details: { 
        respondentName: "Emma Thomas", 
        department: "Education", 
        comments: "Exceptional product quality and amazing customer support. Highly recommended!",
        questions: [
          { question: "How satisfied are you with our product?", answer: "Extremely satisfied", score: 5 },
          { question: "How likely are you to recommend us?", answer: "Definitely", score: 5 },
          { question: "How would you rate our customer service?", answer: "Outstanding", score: 5 }
        ]
      }}
    ];
  },
  
  async deleteResponse(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  }
};

const ViewResponses = () => {
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSurvey, setFilterSurvey] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('surveyType'); // 'surveyType', 'rating', 'department'
  const itemsPerPage = 5;
  
  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.getResponses();
        setResponses(data);
        setFilteredResponses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Prepare chart data
  useEffect(() => {
    if (responses.length > 0) {
      let data = [];
      
      if (chartType === 'surveyType') {
        // Group by survey type
        const surveyGroups = {};
        responses.forEach(response => {
          if (!surveyGroups[response.surveyTitle]) {
            surveyGroups[response.surveyTitle] = 0;
          }
          surveyGroups[response.surveyTitle]++;
        });
        
        data = Object.keys(surveyGroups).map(key => ({
          name: key,
          value: surveyGroups[key],
        }));
      } else if (chartType === 'rating') {
        // Group by rating range
        const ratingGroups = {
          '5 Stars': 0,
          '4-4.9 Stars': 0,
          '3-3.9 Stars': 0,
          '2-2.9 Stars': 0,
          '1-1.9 Stars': 0
        };
        
        responses.forEach(response => {
          if (response.rating === 5) {
            ratingGroups['5 Stars']++;
          } else if (response.rating >= 4) {
            ratingGroups['4-4.9 Stars']++;
          } else if (response.rating >= 3) {
            ratingGroups['3-3.9 Stars']++;
          } else if (response.rating >= 2) {
            ratingGroups['2-2.9 Stars']++;
          } else {
            ratingGroups['1-1.9 Stars']++;
          }
        });
        
        data = Object.keys(ratingGroups).map(key => ({
          name: key,
          value: ratingGroups[key],
        }));
      } else if (chartType === 'department') {
        // Group by department
        const deptGroups = {};
        responses.forEach(response => {
          const dept = response.details.department;
          if (!deptGroups[dept]) {
            deptGroups[dept] = 0;
          }
          deptGroups[dept]++;
        });
        
        data = Object.keys(deptGroups).map(key => ({
          name: key,
          value: deptGroups[key],
        }));
      }
      
      setChartData(data);
    }
  }, [responses, chartType]);
  
  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Apply sorting and filtering
  useEffect(() => {
    let filtered = [...responses];
    
    // Apply search term filtering
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.surveyTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply survey type filtering
    if (filterSurvey) {
      filtered = filtered.filter(item => item.surveyTitle === filterSurvey);
    }
    
    // Apply rating filtering
    if (filterRating) {
      const rating = parseFloat(filterRating);
      filtered = filtered.filter(item => {
        if (filterRating === '5') return item.rating === 5;
        return item.rating >= rating && item.rating < (rating + 1);
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredResponses(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  }, [responses, searchTerm, sortConfig, filterSurvey, filterRating]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResponses.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle actions
  const handleDelete = async (id) => {
    try {
      await api.deleteResponse(id);
      setResponses(responses.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };
  
  const handleView = (id) => {
    const response = responses.find(item => item.id === id);
    setSelectedResponse(response);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedResponse(null);
  };
  
  const getSurveyOptions = () => {
    const surveys = [...new Set(responses.map(item => item.surveyTitle))];
    return surveys;
  };
  
  // Render sort arrow
  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} className="text-blue-400" /> : <ChevronDown size={16} className="text-blue-400" />;
  };

  // Star rating display
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg ${i < fullStars ? 'text-yellow-400' : (i === fullStars && hasHalfStar ? 'text-yellow-300' : 'text-gray-600')}`}>
            ★
          </span>
        ))}
        <span className="ml-2 text-gray-300">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Colors for the pie chart
  const COLORS = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8F00FF', '#1E90FF', '#00C49F', '#FF8042'];

  // Custom pie chart legend
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div style={{ backgroundColor: entry.color }} className="w-4 h-4 mr-2 rounded"></div>
            <span className="text-gray-300 text-sm">{entry.payload.name}</span>
          </div>
        ))}
      </div>
    );
  };

  // Modal component
  const ResponseDetailsModal = ({ response, onClose }) => {
    if (!response) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto border border-gray-700">
          <div className="flex justify-between items-center border-b border-gray-700 p-4">
            <h2 className="text-xl font-bold text-white">Response Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-4">
            {/* Basic Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-4 rounded">
                <div>
                  <p className="text-sm text-gray-400">Respondent</p>
                  <p className="font-medium text-white">{response.details.respondentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium text-white">{response.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Department</p>
                  <p className="font-medium text-white">{response.details.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Survey</p>
                  <p className="font-medium text-white">{response.surveyTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Date Submitted</p>
                  <p className="font-medium text-white">{new Date(response.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Overall Rating</p>
                  <StarRating rating={response.rating} />
                </div>
              </div>
            </div>
            
            {/* Survey Responses */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Survey Responses</h3>
              <div className="border border-gray-700 rounded overflow-hidden">
                {response.details.questions.map((q, index) => (
                  <div 
                    key={index} 
                    className={`p-4 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} ${index !== 0 ? 'border-t border-gray-700' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-white">{q.question}</p>
                      <div className="bg-blue-900 text-blue-300 text-sm font-medium px-2 py-0.5 rounded">
                        Score: {q.score}/5
                      </div>
                    </div>
                    <p className="text-gray-300">{q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Comments */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Additional Comments</h3>
              <div className="bg-gray-800 p-4 rounded border border-gray-700">
                <p className="text-gray-300 whitespace-pre-line">{response.details.comments || "No comments provided."}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 p-4 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-10 py-4 w-full mx-auto bg-gray-900 shadow text-white">
      <h1 className="text-2xl font-bold mb-6 text-white">Survey Responses</h1>
      
      {/* Chart Section */}
      <div className="mb-8 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-400">Response Distribution</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setChartType('surveyType')} 
              className={`px-3 py-1 rounded text-sm ${chartType === 'surveyType' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              By Survey
            </button>
            <button 
              onClick={() => setChartType('rating')} 
              className={`px-3 py-1 rounded text-sm ${chartType === 'rating' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              By Rating
            </button>
            <button 
              onClick={() => setChartType('department')} 
              className={`px-3 py-1 rounded text-sm ${chartType === 'department' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              By Department
            </button>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }} 
                itemStyle={{ color: '#F9FAFB' }}
                formatter={(value) => [`${value} responses`, '']}
              />
              <Legend content={<CustomLegend />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 p-2 border border-gray-700 rounded w-full bg-gray-800 text-white placeholder-gray-400"
            placeholder="Search by email or survey title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div>
            <select 
              className="p-2 border border-gray-700 rounded bg-gray-800 text-white"
              value={filterSurvey}
              onChange={(e) => setFilterSurvey(e.target.value)}
            >
              <option value="">All Surveys</option>
              {getSurveyOptions().map(survey => (
                <option key={survey} value={survey}>{survey}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select 
              className="p-2 border border-gray-700 rounded bg-gray-800 text-white"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Table Section */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg border border-gray-700">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-700">
            <tr>
              <th 
                className="p-3 text-left cursor-pointer" 
                onClick={() => requestSort('email')}
              >
                <div className="flex items-center">
                  Email {getSortArrow('email')}
                </div>
              </th>
              <th 
                className="p-3 text-left cursor-pointer"
                onClick={() => requestSort('surveyTitle')}
              >
                <div className="flex items-center">
                  Survey Title {getSortArrow('surveyTitle')}
                </div>
              </th>
              <th 
                className="p-3 text-left cursor-pointer"
                onClick={() => requestSort('date')}
              >
                <div className="flex items-center">
                  Date {getSortArrow('date')}
                </div>
              </th>
              <th 
                className="p-3 text-left cursor-pointer"
                onClick={() => requestSort('rating')}
              >
                <div className="flex items-center">
                  Rating {getSortArrow('rating')}
                </div>
              </th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400">
                  Loading data...
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map(item => (
                <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="p-3 text-left text-gray-300">{item.email}</td>
                  <td className="p-3 text-left text-gray-300">{item.surveyTitle}</td>
                  <td className="p-3 text-left text-gray-300">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="p-3 text-left">
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-300">{item.rating.toFixed(1)}</span>
                      <div className="w-24 bg-gray-700 rounded h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded" 
                          style={{ width: `${(item.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button 
                        className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-900 rounded-full"
                        onClick={() => handleView(item.id)}
                        title="View details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900 rounded-full"
                        onClick={() => handleDelete(item.id)}
                        title="Delete response"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400">
                  No responses found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Section */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {filteredResponses.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredResponses.length)} of {filteredResponses.length} entries
        </div>
        <div className="flex gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'}`}
          >
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`p-2 rounded ${currentPage === totalPages || totalPages === 0 ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-50'}`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <ResponseDetailsModal 
          response={selectedResponse} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default ViewResponses;