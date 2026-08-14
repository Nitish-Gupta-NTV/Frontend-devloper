import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AboutPage from "./pages/AboutPage.jsx"
import ContactPage from "./pages/ContactPage.jsx"
import PortfolioWizardPage from "./pages/PortfolioWizardPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import GeneratePortfolioPage from "./personalportopolio/Generateportfoliopage.jsx";
import PublicPortfolioPage from "./personalportopolio/Publicportfoliopage.jsx";
import ResumePages from "./personalportopolio/Resumepage.jsx"


function App() {
  return (
    <Routes>
<Route path="/dashboard/theme" element={<GeneratePortfolioPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/resume/:slug" element={<ResumePages />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/AboutPage" element={<AboutPage/>}/>
      <Route path="/ContactPage" element={<ContactPage/>}/>
      <Route path="/onboarding" element={<PortfolioWizardPage />} />
      <Route  path="/p/:slug" element={< PublicPortfolioPage/>} />
    </Routes>
  );
}

export default App;