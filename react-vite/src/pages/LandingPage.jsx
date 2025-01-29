import HeroSection from "../components/HeroSection/HeroSection"
import FillerCarousel from "../components/InformationSection/FillerCarousel";
import OpenModalButton from "../components/OpenModalButton/OpenModalButton";
import SignUpFormModal from "../components/SignUpFormModal/SignUpFormModal";

function LandingPage() {
  return (
    <div className="bg-midnight text-charcoal">
      <HeroSection
        title="Welcome to Calif Pierre"
        subtitle="A solutions company rooted in cultural impact. Effortlessly manage events and connect with your community."
        primaryButtonComponent={
          <OpenModalButton
            buttonText="Get Started"
            modalComponent={<SignUpFormModal />}
            className="bg-gold text-midnight px-8 py-3 rounded-full text-lg font-semibold hover:bg-ivory hover:text-midnight transition duration-300"
          
          />
        }
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
      />


      <FillerCarousel />

    </div>
  )
}

export default LandingPage;
