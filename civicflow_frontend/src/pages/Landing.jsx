    import { Link } from "react-router-dom";

    const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header/Navbar */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                    CF
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">CivicFlow</h1>
                    <p className="text-xs text-gray-500">Smart Governance Platform</p>
                </div>
                </div>
                <div className="flex items-center gap-3">
                <Link 
                    to="/login"
                    className="hidden sm:block text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                    Login
                </Link>
                <Link 
                    to="/register"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-md hover:shadow-lg"
                >
                    Get Started
                </Link>
                </div>
            </div>
            </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <div className="text-center">
            <div className="inline-block mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                🚀 Empowering Smart Cities
                </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">CivicFlow</span> 🏙️
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Empowering Citizens, Enabling Smart Governance.<br />
                Report local issues with photos and GPS, track resolution in real-time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link to="/register">
                <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
                    Create New Account
                    <span className="text-xl">→</span>
                </button>
                </Link>
                
                <Link to="/login">
                <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-indigo-600 shadow-md hover:shadow-lg transition-all duration-200">
                    Login to Your Account
                </button>
                </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Real-time Updates</span>
                </div>
                <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>GPS Verified</span>
                </div>
            </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose CivicFlow?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Modern technology meets civic responsibility. Report, track, and resolve community issues efficiently.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6">
                📸
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Snap & Report</h3>
                <p className="text-gray-600 leading-relaxed">
                Upload photos with exact GPS location. Visual evidence helps authorities understand and resolve issues faster.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6">
                🤖
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Validated</h3>
                <p className="text-gray-600 leading-relaxed">
                Smart triage system automatically categorizes and prioritizes issues for faster resolution and efficient resource allocation.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6">
                📊
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Live Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                Track your reported issues in real-time. Get notifications when status updates and see exactly when problems are fixed.
                </p>
            </div>
            </div>
        </section>

        {/* Stats Section */}
        <section className="bg-indigo-600 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                <p className="text-4xl sm:text-5xl font-bold text-white mb-2">1000+</p>
                <p className="text-indigo-200">Issues Resolved</p>
                </div>
                <div>
                <p className="text-4xl sm:text-5xl font-bold text-white mb-2">500+</p>
                <p className="text-indigo-200">Active Citizens</p>
                </div>
                <div>
                <p className="text-4xl sm:text-5xl font-bold text-white mb-2">24/7</p>
                <p className="text-indigo-200">System Uptime</p>
                </div>
                <div>
                <p className="text-4xl sm:text-5xl font-bold text-white mb-2">98%</p>
                <p className="text-indigo-200">Satisfaction Rate</p>
                </div>
            </div>
            </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Simple, fast, and effective. Get your community issues resolved in just a few steps.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
                <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Sign Up</h3>
                <p className="text-sm text-gray-600">Create your free account in seconds</p>
            </div>

            <div className="text-center">
                <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Report Issue</h3>
                <p className="text-sm text-gray-600">Upload photo with GPS location</p>
            </div>

            <div className="text-center">
                <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Track Progress</h3>
                <p className="text-sm text-gray-600">Monitor status updates in real-time</p>
            </div>

            <div className="text-center">
                <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Issue Resolved</h3>
                <p className="text-sm text-gray-600">Get notified when completed</p>
            </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 sm:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Make a Difference?
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of citizens making their communities better. Start reporting and tracking issues today.
            </p>
            <Link to="/register">
                <button className="bg-white hover:bg-gray-100 text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200">
                Get Started Free →
                </button>
            </Link>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-indigo-600 text-white w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
                    CF
                    </div>
                    <span className="text-white font-bold text-xl">CivicFlow</span>
                </div>
                <p className="text-sm">
                    Empowering citizens to create better communities through technology and civic engagement.
                </p>
                </div>

                <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                    <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
                    <li><a href="#features" className="hover:text-white transition">Features</a></li>
                    <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                </ul>
                </div>

                <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm">
                    <li>📧 support@civicflow.com</li>
                    <li>📞 +1 (555) 123-4567</li>
                    <li>📍 Smart City, Tech District</li>
                </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-6 text-center text-sm">
                <p>© 2024 CivicFlow. All rights reserved. Making communities better, one issue at a time.</p>
            </div>
            </div>
        </footer>
        </div>
    );
    };

    export default LandingPage;