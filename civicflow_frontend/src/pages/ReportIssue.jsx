import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const ReportIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [loading, setLoading] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  
  const navigate = useNavigate();

  // Handle Image Selection with Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get Location
  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      setFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {

          const lat = parseFloat(position.coords.latitude.toFixed(6));
          const lng = parseFloat(position.coords.longitude.toFixed(6));

          setLocation({
            lat: lat,
            lng: lng,
          });
          setFetchingLocation(false);
          alert("Location Fetched! 📍");
        },
        (error) => {
          console.error("Geolocation Error:", error);
          
          setFetchingLocation(false);
          alert("Error fetching location. Please enable GPS.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("priority", priority);
    formData.append("latitude", location.lat);
    formData.append("longitude", location.lng);
    
    if (image) {
      formData.append("image", image);
    }

    try {
      await api.post("/issues/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Issue Reported Successfully! 🎉");
      navigate("/dashboard");

    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to report issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex bg-indigo-600 text-white w-16 h-16 rounded-2xl items-center justify-center text-3xl font-bold mb-4 shadow-lg">
            CF
          </div>
          <h1 className="text-3xl font-bold text-gra  y-900 mb-2">Report an Issue</h1>
          <p className="text-gray-600">Help improve your community by reporting problems</p>
        </div>

        {/* Cards Grid - 3 columns on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Card 1: Basic Information */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">📝</span>
              <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="space-y-5">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., Broken streetlight on Main Street"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                />
              </div>

              {/* Description Textarea */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed information about the issue..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none resize-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {description.length} characters
                </p>
              </div>

              {/* Priority Select */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level <span className="text-red-500">*</span>
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none bg-white cursor-pointer"
                >
                  <option value="LOW">🟢 Low - Minor inconvenience</option>
                  <option value="MEDIUM">🟡 Medium - Moderate concern</option>
                  <option value="HIGH">🔴 High - Urgent attention needed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Location */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">📍</span>
              <h2 className="text-xl font-bold text-gray-900">Location</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Click the button below to capture your current GPS location.
              </p>
              
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={fetchingLocation}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {fetchingLocation ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Fetching...
                  </>
                ) : (
                  <>
                    📍 Get Current Location
                  </>
                )}
              </button>
              
              {location.lat && location.lng && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-sm font-medium text-green-800">Location Captured</p>
                      <p className="text-xs text-green-600 mt-1">
                        Lat: {location.lat.toFixed(6)}
                      </p>
                      <p className="text-xs text-green-600">
                        Lng: {location.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-2">
                  <span className="text-xl">💡</span>
                  <div>
                    <p className="text-xs font-medium text-blue-900">Location Tips</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Ensure GPS is enabled for accurate location capture
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Image Upload - Full Width */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📷</span>
            <h2 className="text-xl font-bold text-gray-900">Upload Photo (Optional)</h2>
          </div>
          
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-64 w-auto rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !location.lat}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                '📢 Submit Report'
              )}
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-sm font-medium text-blue-900">Tips for better reporting</p>
              <ul className="mt-2 text-xs text-blue-700 space-y-1">
                <li>• Be specific and clear in your description</li>
                <li>• Add photos to help identify the issue</li>
                <li>• Ensure location is accurate for faster resolution</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;