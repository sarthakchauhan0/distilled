import Navbar from '../src/components/layout/Navbar';
import Footer from '../src/components/layout/Footer';
import Hero from '../src/components/Hero';
import RoiDisplay from '../src/components/RoiDisplay';
import LocalIntelligence from '../src/components/LocalIntelligence';
import SustainabilitySection from '../src/components/SustainabilitySection';
import UniversalIntelligence from '../src/components/UniversalIntelligence';
import StealthManifesto from '../src/components/StealthManifesto';
import TerminalCapture from '../src/components/TerminalCapture';

export default function Home() {
  return (
    <div className="bg-black text-white selection:bg-[#CCFF00]/30 selection:text-[#CCFF00] min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <Hero />
        <RoiDisplay />
        <LocalIntelligence />
        <SustainabilitySection />
        <UniversalIntelligence />
        <StealthManifesto />
        <TerminalCapture />
      </main>

      <Footer />
    </div>
  );
}
