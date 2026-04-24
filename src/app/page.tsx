import Layout from "@/layouts/Layout";
import HeroSection from "@/features/landing-page/hero-section";
import HowItWorksSection from "@/features/landing-page/how-it-works-section";
import MeetOurTeamSection from "@/features/landing-page/meet-our-team-section";
import OurPricingSection from "@/features/landing-page/our-pricing-section";
import FaqSection from "@/features/landing-page/faq-section";
import CallToActionSection from "@/features/landing-page/call-to-action-section";
import OurTestimonialSection from "@/features/landing-page/our-testimonials-section";

export default function Home() {
  return (
    <>
      <Layout withBanner withFooter withNavbar>
        <main className="px-4">
          <HeroSection />
          <HowItWorksSection />
          <MeetOurTeamSection />
          <OurTestimonialSection />
          <OurPricingSection />
          <FaqSection />
          <CallToActionSection />
        </main>
      </Layout>
    </>
  );
}
