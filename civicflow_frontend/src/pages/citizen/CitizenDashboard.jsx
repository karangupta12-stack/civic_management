import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Path dhyan se check karna (../ ya ../../)

const CitizenDashboard = () => {
  const [myIssues, setMyIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- THE GOLDEN RULE (Fetch Data on Load) ---
  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        // Axios token lekar jayega. Backend automatically token se 
        // user ko pehchan lega aur sirf usi ke issues wapas bhejega.
        const response = await api.get("/issues/");
        setMyIssues(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching issues:", err);
        setLoading(false);
      }
    };

    fetchMyIssues();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading Your Complaints... ⏳</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      
      {/* --- HEADER --- */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #eee", paddingBottom: "20px", marginBottom: "30px" }}>
        <div>
            <h1 style={{ margin: "0", color: "#2c3e50" }}>My Dashboard 👤</h1>
            <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>Track your reported civic issues here.</p>
        </div>
        <button onClick={handleLogout} style={{ padding: "10px 20px", background: "#e74c3c", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            Logout
        </button>
      </header>

      {/* --- CALL TO ACTION (Main Button) --- */}
      <div style={{ textAlign: "center", marginBottom: "40px", padding: "30px", background: "#e8f4f8", borderRadius: "10px" }}>
          <h2>See a problem in your area?</h2>
          <Link to="/citizen/report">
            <button style={{ padding: "15px 30px", background: "#3498db", color: "white", fontSize: "18px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                + Report a New Issue 📸
            </button>
          </Link>
      </div>

      {/* --- MY ISSUES LIST (Grid) --- */}
      <h3 style={{ color: "#2c3e50", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>My Previous Reports</h3>
      
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", marginTop: "20px" }}>
        
        {myIssues.length > 0 ? (
          myIssues.map((issue) => (
            <div key={issue.id} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <h4 style={{ margin: 0, color: "#34495e" }}>{issue.title}</h4>
                  
                  {/* Status Badge */}
                  <span style={{ 
                      backgroundColor: issue.status === 'Resolved' ? '#2ecc71' : (issue.status === 'InProgress' ? '#f39c12' : '#e74c3c'), 
                      color: 'white', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: "bold"
                  }}>
                    {issue.status}
                  </span>
              </div>

              <p style={{ color: "#7f8c8d", fontSize: "14px", lineHeight: "1.5" }}>
                  {issue.description.length > 60 ? issue.description.substring(0, 60) + "..." : issue.description}
              </p>
              
              <Link to={`/citizen/issue/${issue.id}`}>
                <button style={{ marginTop: "15px", padding: "8px 15px", backgroundColor: "#ecf0f1", color: "#2c3e50", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%", fontWeight: "bold" }}>
                    Track Status 🔍
                </button>
              </Link>

            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "50px", color: "#95a5a6" }}>
             <p style={{ fontSize: "18px" }}>You haven't reported any issues yet.</p>
             <p>Your city is either perfect, or it needs your help! 😉</p>
          </div>
        )}
      
      </div>
    </div>
  );
};

export default CitizenDashboard;