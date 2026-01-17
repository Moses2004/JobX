import React, { useState } from 'react';
import { ToastProvider } from './contexts/ToastContext.jsx';
import JobXLanding from './pages/public/JobXLanding.jsx';
import JobXAuth from './pages/auth/JobXAuth.jsx';
import RoleSelection from './pages/auth/RoleSelection.jsx';
import Dashboard from './pages/authenticated/Dashboard.jsx';
import FeedPage from './pages/authenticated/FeedPage.jsx';
import CommunityFeed from './pages/authenticated/CommunityFeed.jsx';
import ProjectsPage from './pages/authenticated/ProjectsPage.jsx';
import JobsPage from './pages/authenticated/JobsPage.jsx';
import PostJob from './pages/employer/PostJob.jsx';
import ProfilePage from './pages/authenticated/ProfilePage.jsx';
import SettingsPage from './pages/authenticated/SettingsPage.jsx';
import MessagingDrawer from './components/modals/MessagingDrawer.jsx';
import LiquidGlassShowcase from './pages/showcase/LiquidGlassShowcase.jsx';
import FeedbackShowcase from './pages/showcase/FeedbackShowcase.jsx';
import NavigationShowcase from './pages/showcase/NavigationShowcase.jsx';
import ApplicationsPage from './pages/authenticated/ApplicationsPage.jsx';
import EmployerDashboard from './pages/employer/EmployerDashboard.jsx';
import EmployerOnboarding from './pages/employer/EmployerOnboarding.jsx';
import PaymentsPage from './pages/authenticated/PaymentsPage.jsx';
import PremiumPage from './pages/authenticated/PremiumPage.jsx';
import NetworkPage from './pages/authenticated/NetworkPage.jsx';
import CompanyProfilePage from './pages/employer/CompanyProfilePage.jsx';
import TalentPoolPage from './pages/employer/TalentPoolPage.jsx';
import PremiumShowcase from './pages/showcase/PremiumShowcase.jsx';

import { supabase } from './lib/supabaseClient'
const App = () => {
  // Check URL hash for showcase routes
  const getInitialView = () => {
    const hash = window.location.hash;
    if (hash === '#showcase') return 'showcase';
    if (hash === '#feedback') return 'feedback';
    if (hash === '#navigation') return 'navigation';
    return 'landing';
  };

  const [currentView, setCurrentView] = useState(getInitialView()); // 'landing', 'auth', 'role-selection', 'dashboard', 'community', 'projects', 'profile', 'showcase', 'feedback', 'applications', 'employer', 'employer-onboarding'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'seeker', 'hirer', 'both'
  const [employerSetupComplete, setEmployerSetupComplete] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [applications, setApplications] = useState([]); // Job applications tracking

  // Handle new job application
  const handleApply = (applicationData) => {
    setApplications(prev => [...prev, applicationData]);
  };

  // Handle withdraw application
  const handleWithdrawApplication = (jobId) => {
    setApplications(prev => prev.filter(app => app.jobId !== jobId));
  };

  // Handle employer onboarding completion
  const handleEmployerOnboardingComplete = (companyData) => {
    setUserData(prev => ({
      ...prev,
      companyData
    }));
    setEmployerSetupComplete(true);
    // After company setup, go to Employer Dashboard (Hiring Mode)
    setCurrentView('employer');
  };

  // Handle authentication completion
  const handleAuthComplete = (user) => {
    setIsAuthenticated(true);
    setUserData(user);
    setUserRole('job_seeker'); // Always default to job seeker mode
    setCurrentView('feed'); // Always land on Home/Feed
  };

  // Handle navigation between pages
  const handleNavigate = (view) => {
    // Check if user is trying to post a job without company setup
    if (view === 'post-opportunity' && !userData?.companyData) {
      // Redirect to employer onboarding (company setup) first
      setCurrentView('employer-onboarding');
      return;
    }

    setCurrentView(view);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setUserRole(null);
    setCurrentView('landing');
  };

  const handleOpenMessages = () => setIsMessagesOpen(true);
  const handleCloseMessages = () => setIsMessagesOpen(false);

  // Render based on current view
  // Special routes for showcases (accessible without auth)
  if (currentView === 'showcase') {
    return <LiquidGlassShowcase />;
  }

  if (currentView === 'feedback') {
    return <FeedbackShowcase />;
  }

  if (currentView === 'navigation') {
    return <NavigationShowcase />;
  }

  if (currentView === 'premium-showcase') {
    return <PremiumShowcase onBack={() => setCurrentView('landing')} />;
  }

  if (!isAuthenticated && currentView === 'landing') {
    return <JobXLanding onGetStarted={() => setCurrentView('auth')} />;
  }

  if (!isAuthenticated && currentView === 'auth') {
    return (
      <JobXAuth
        onBack={() => setCurrentView('landing')}
        onAuthComplete={handleAuthComplete}
      />
    );
  }

  // Authenticated views
  let page = null;
  switch (currentView) {
    case 'feed':
      page = (
        <FeedPage
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'dashboard':
      page = (
        <Dashboard
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'network':
      page = (
        <NetworkPage
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'community':
      page = (
        <CommunityFeed
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'projects':
      page = (
        <ProjectsPage
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'opportunities':
      page = (
        <JobsPage
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
          applications={applications}
          onApply={handleApply}
        />
      );
      break;

    case 'applications':
      page = (
        <ApplicationsPage
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
          applications={applications}
          onWithdraw={handleWithdrawApplication}
        />
      );
      break;

    case 'employer':
      page = (
        <EmployerDashboard
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'employer-onboarding':
      page = (
        <EmployerOnboarding
          userData={userData}
          onComplete={handleEmployerOnboardingComplete}
          onBack={() => setCurrentView('feed')}
        />
      );
      break;

    case 'post-opportunity':
      page = (
        <PostJob
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'payments':
      page = (
        <PaymentsPage
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'premium':
      page = (
        <PremiumPage
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'company-profile':
      page = (
        <CompanyProfilePage
          userData={userData}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
          onSave={(companyData) => {
            setUserData(prev => ({
              ...prev,
              companyData: { ...prev.companyData, ...companyData }
            }));
          }}
        />
      );
      break;

    case 'talent-pool':
      page = (
        <TalentPoolPage
          userData={userData}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'profile':
      page = (
        <ProfilePage
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    case 'settings':
      page = (
        <SettingsPage
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;

    default:
      page = (
        <FeedPage
          userData={userData}
          userRole={userRole}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onOpenMessages={handleOpenMessages}
        />
      );
      break;
  }

  return (
    <ToastProvider>
      {page}
      <MessagingDrawer open={isMessagesOpen} onClose={handleCloseMessages} currentUser={userData} />
    </ToastProvider>
  );
};
function App() {
  const [connectionStatus, setConnectionStatus] = useState("Testing...")

  useEffect(() => {
    async function checkConnection() {
      // We try to fetch something very small just to test the bridge
      const { data, error } = await supabase.from('any_table_name').select('*').limit(1)
      
      if (error) {
        setConnectionStatus(`❌ Error: ${error.message}`)
      } else {
        setConnectionStatus("✅ Connected to Supabase!")
      }
    }

    checkConnection()
  }, [])

  return (
    <div>
      <h1>My App</h1>
      <p>Status: {connectionStatus}</p>
    </div>
  )
}


export default App;