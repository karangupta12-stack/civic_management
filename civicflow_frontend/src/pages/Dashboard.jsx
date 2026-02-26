import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({ 
    total: 0, 
    resolved: 0, 
    pending: 0, 
    in_progress: 0, 
    rejected: 0 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- SEARCH & FILTER STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [issuesRes, statsRes] = await Promise.all([
          api.get(`/issues/?t=${new Date().getTime()}`),
          api.get("/analytics/dashboard-stats/")
        ]);

        setIssues(issuesRes.data);

        const backendData = statsRes.data;
        const statusArray = backendData.status_breakdown || [];

        console.log("Status Array from Backend:", statusArray);

        const getCount = (statusKey) => {
          const found = statusArray.find(item => item.status === statusKey);
          return found ? found.count : 0;
        };

        setStats({
          total: backendData.total_issues || 0,
          resolved: getCount('RESOLVED'),
          pending: getCount('OPEN'),
          in_progress: getCount('IN_PROGRESS'),
          rejected: getCount('REJECTED')
        });

        setLoading(false);

      } catch (err) {
        console.error("Error loading dashboard:", err);
        setError("Failed to load dashboard data.");
        setLoading(false);
        
        if (err.response && err.response.status === 401) {
          alert("Session Expired. Please Login Again");
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const getDisplayStatus = (status) => {
    const map = {
      'IN_PROGRESS': 'In Progress',
      'OPEN': 'Open',
      'RESOLVED': 'Resolved',
      'REJECTED': 'Rejected',
      'PENDING': 'Pending'
    };
    return map[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      'RESOLVED': 'bg-green-100 text-green-800 border-green-200',
      'IN_PROGRESS': 'bg-blue-100 text-blue-800 border-blue-200',
      'OPEN': 'bg-orange-100 text-orange-800 border-orange-200',
      'PENDING': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'REJECTED': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'HIGH': 'text-red-600',
      'MEDIUM': 'text-orange-600',
      'LOW': 'text-green-600',
      'High': 'text-red-600',
      'Medium': 'text-orange-600',
      'Low': 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  const getPriorityDisplay = (priority) => {
    const map = { 'HIGH': 'High', 'MEDIUM': 'Medium', 'LOW': 'Low' };
    return map[priority] || priority;
  };

  // --- 🔥 THE MAGIC: SEARCH + FILTER LOGIC ---
  const filteredIssues = issues.filter((issue) => {
    // Step 1: Status Filter Check
    let matchesStatus = true;
    if (statusFilter !== "All") {
      const status = issue.status;
      if (statusFilter === "Open") matchesStatus = status === "OPEN" || status === "PENDING";
      else if (statusFilter === "InProgress") matchesStatus = status === "IN_PROGRESS";
      else if (statusFilter === "Resolved") matchesStatus = status === "RESOLVED";
      else if (statusFilter === "Rejected") matchesStatus = status === "REJECTED";
    }

    // Step 2: Search Term Check
    let matchesSearch = true;
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      matchesSearch = (
        (issue.title && issue.title.toLowerCase().includes(q)) ||
        (issue.description && issue.description.toLowerCase().includes(q)) ||
        (issue.status && getDisplayStatus(issue.status).toLowerCase().includes(q)) ||
        (issue.priority && issue.priority.toLowerCase().includes(q))
      );
    }

    // Both conditions must be true
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading analytics & issues...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4 text-center">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Error</h2>
          <p className="text-gray-600 text-center">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Desktop */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold">
                CF
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CivicFlow</h1>
                <p className="text-sm text-gray-500">Community Issue Tracker</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                to="/report"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                Report Issue
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
                  CF
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">CivicFlow</h1>
                  <p className="text-xs text-gray-500">Community Tracker</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
            <Link 
              to="/report"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 shadow-md"
            >
              <span className="text-xl">+</span>
              Report New Issue
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-indigo-500">
            <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-green-500">
            <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Resolved</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.resolved}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-blue-500">
            <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">In Progress</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.in_progress}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-orange-500">
            <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Open</p>
            <p className="text-2xl sm:text-3xl font-bold text-orange-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 border-red-500">
            <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Rejected</p>
            <p className="text-2xl sm:text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, description, status or priority..."
                className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none text-sm sm:text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-lg"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none bg-white cursor-pointer text-sm sm:text-base font-medium"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="InProgress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Active filters indicator */}
          {(searchTerm || statusFilter !== "All") && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-semibold text-indigo-600">{filteredIssues.length}</span> result{filteredIssues.length !== 1 ? 's' : ''} found
                {searchTerm && <span className="font-medium"> for "{searchTerm}"</span>}
                {statusFilter !== "All" && <span className="font-medium"> in {statusFilter}</span>}
              </p>
              <button
                onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
                className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-medium transition"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Issues Grid */}
        {filteredIssues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredIssues.map((issue) => (
              <div 
                key={issue.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 flex-1 mr-2 truncate">
                      {issue.title}
                    </h3>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusColor(issue.status)}`}>
                      {getDisplayStatus(issue.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-3">
                    {issue.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium">Priority:</span>
                      <span className={`text-sm font-bold ${getPriorityColor(issue.priority)}`}>
                        {getPriorityDisplay(issue.priority)}
                      </span>
                    </div>
                  
                    <Link to={`/issue/${issue.id}`} className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto mt-2 sm:mt-0 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 py-2 px-4 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2">
                        View Details 🗺️
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
            <div className="text-5xl sm:text-6xl mb-4">
              {searchTerm || statusFilter !== "All" ? '🔍' : '🎉'}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Issues Found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {searchTerm && statusFilter !== "All"
                ? `No ${statusFilter} issues match "${searchTerm}".`
                : searchTerm
                  ? `No issues match "${searchTerm}".`
                  : statusFilter === 'All'
                    ? 'Your community is issue-free!'
                    : `No ${statusFilter} issues found.`}
            </p>
            {(searchTerm || statusFilter !== "All") && (
              <button
                onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-6 rounded-lg transition shadow-md"
              >
                Clear Search & Filters
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            © 2024 CivicFlow. Making communities better, one issue at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;