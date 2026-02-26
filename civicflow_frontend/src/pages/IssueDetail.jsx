import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const IssueDetail = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssueDetail = async () => {
      try {
        const response = await api.get(`/issues/${id}/`);
        setIssue(response.data);
        setStatus(response.data.status);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        alert("Issue not found");
        navigate("/dashboard");
      }
    };
    fetchIssueDetail();
  }, [id, navigate]);


  const handleStatusChange = async () => {
    setUpdating(true);
    try {
        // PATCH: Sirf 'status' field bhejo, baaki sab waise hi rahega
        const response = await api.patch(`/issues/${id}/`, { status: status });
        
        setIssue(response.data); // UI ko naye data se update karo
        alert(`Status Updated to ${status}! ✅`);
    
    } catch (err) {
        console.error("Update Failed:", err);
        alert("Failed to update status.");
    } finally {
        setUpdating(false);
    }
  };

  const handleDelete = async () => {
    // User se confirmation lo (Galti se click na ho jaye)
    if (window.confirm("Are you sure you want to delete this issue? This cannot be undone.")) {
        try {
            await api.delete(`/issues/${id}/`);
            alert("Issue Deleted Successfully 🗑️");
            navigate("/dashboard"); // Wapas list par bhejo
        } catch (err) {
            console.error("Delete Failed:", err);
            alert("Failed to delete issue.");
        }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Resolved': 'bg-green-100 text-green-800 border-green-200',
      'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Open': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-orange-100 text-orange-800 border-orange-200',
      'Low': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading issue details...</p>
        </div>
      </div>
    );
  }
  
  const lat = issue.latitude ? parseFloat(issue.latitude) : null;
  const lng = issue.longitude ? parseFloat(issue.longitude) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition"
        >
          <span className="text-xl">←</span>
          Back to Dashboard
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{issue.title}</h1>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border whitespace-nowrap self-start ${getStatusColor(issue.status)}`}>
              {issue.status}
            </span>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 font-medium mb-1">Priority</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getPriorityColor(issue.priority)}`}>
                {issue.priority}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 font-medium mb-1">Reported By</p>
              <p className="text-sm font-semibold text-gray-900">{issue.user || 'Anonymous'}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 font-medium mb-1">Date Reported</p>
              <p className="text-sm font-semibold text-gray-900">
                {issue.created_at ? new Date(issue.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{issue.description}</p>
          </div>
        </div>

        {/* Image Card */}
        {issue.image && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📷</span>
              <h3 className="text-lg font-bold text-gray-900">Photo Evidence</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex justify-center">
              <img
                src={issue.image}
                alt="Issue Evidence"
                className="max-w-full max-h-96 rounded-lg shadow-md object-contain"
              />
            </div>
          </div>
        )}

        {/* Map Card */}
        {lat  && lng? (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📍</span>
              <h3 className="text-lg font-bold text-gray-900">Location on Map</h3>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Coordinates: </span>
                Lat: {lat.toFixed(6)}, Lng: {lng.toFixed(6)}
              </p>
            </div>

            <div className="h-72 sm:h-96 rounded-lg overflow-hidden shadow-md">
              <MapContainer
                center={[lat, lng]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={[lat, lng]}>
                  <Popup>
                    <div className="text-center">
                      <p className="font-bold">{issue.title}</p>
                      <p className="text-sm">{issue.status}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <div className="text-center py-8">
              <span className="text-5xl mb-4 block">📍</span>
              <p className="text-gray-500">No location data provided for this issue.</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px", border: "1px solid #eee" }}>
            <h3>🛠️ Manage Issue</h3>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                
                {/* 1. Status Dropdown */}
                <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ padding: "8px" }}
                >
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="REJECTED">Rejected</option>
                </select>

                {/* 2. Update Button */}
                <button 
                    onClick={handleStatusChange} 
                    disabled={updating}
                    style={{ background: "#4CAF50", color: "white", padding: "8px 15px", border: "none", cursor: "pointer" }}
                >
                    {updating ? "Updating..." : "Update Status"}
                </button>

                {/* 3. Delete Button (Right side push karne ke liye marginLeft auto) */}
                <button 
                    onClick={handleDelete}
                    style={{ marginLeft: "auto", background: "red", color: "white", padding: "8px 15px", border: "none", cursor: "pointer" }}
                >
                    Delete Issue
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;