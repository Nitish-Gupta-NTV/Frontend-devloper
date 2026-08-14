import Navbar from "../components/homePage/Navbar";
import Hero from "../components/homePage/Hero";
import ThemesSection from "../components/homePage/ThemesSection";
import HowItWorksSection from "../components/homePage/HowItWorksSection";
import Footer from "../components/homePage/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0C10] font-sans antialiased">
      <Navbar />
      <Hero />
      <ThemesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}