import HeroSection from "../components/HeroSection/HeroSection"
import FillerCarousel from "../components/InformationSection/FillerCarousel";
import OpenModalButton from "../components/OpenModalButton/OpenModalButton";
import SignUpFormModal from "../components/SignupFormModal/SignupFormModal";

function LandingPage() {
  return (
    <div className="bg-midnight text-charcoal">
      <HeroSection
        // title="Welcome to Calif Pierre"
        subtitle="A solutions company rooted in cultural impact. Effortlessly manage events and connect with your community."
        primaryButtonComponent={
          <OpenModalButton
            buttonText="Get Started"
            modalComponent={<SignUpFormModal />}
            className="bg-gold border border-ivory px-6 py-3 rounded-lg text-lg  text-midnight font-semibold hover:bg-ivory hover:text-midnight transition duration-300"

          />
        }
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about-us"
      />


      <FillerCarousel />

    </div>
  )
}

export default LandingPage;
