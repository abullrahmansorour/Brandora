import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { CaseStudies } from "@/components/CaseStudies";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { BlogPreview } from "@/components/BlogPreview";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Services />
      <Process />
      <CaseStudies />
      <About />
      <Testimonials />
      <Pricing />
      <FAQ />
      <BlogPreview />
      <Contact />
    </>
  );
}
