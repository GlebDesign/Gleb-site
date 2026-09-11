import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Results from "@/components/Results";
import Cases from "@/components/Cases";
import Pricing from "@/components/Pricing";
import Audit from "@/components/Audit";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Advantages from "@/components/Advantages";
import Process from "@/components/Process";
import Cta2 from "@/components/Cta2";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import LeadModal from "@/components/LeadModal";

/* Порядок блоков = порядок франкенштейна (docs/refs/frankenstein-overview.png) */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />        {/* 1 */}
        <Problems />    {/* 2 */}
        <Results />     {/* 3 */}
        <Cases />       {/* 4 */}
        <Pricing />     {/* 5 */}
        <Audit />       {/* 6 */}
        <About />       {/* 7 */}
        <Reviews />     {/* 8 */}
        <Advantages />  {/* 9 */}
        <Process />     {/* 10 */}
        <Cta2 />        {/* 11 */}
        <Faq />         {/* 12 */}
      </main>
      <Footer />        {/* 13 */}
      <LeadModal />
    </>
  );
}
