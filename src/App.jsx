import CursorFollower from './chrome/CursorFollower'
import ProgressBar from './chrome/ProgressBar'
import Nav from './chrome/Nav'
import Marquee from './chrome/Marquee'
import ScrollToTop from './chrome/ScrollToTop'
import JoinToast from './chrome/JoinToast'

import Hero from './sections/Hero'
import NumberBand from './sections/NumberBand'
import Problem from './sections/Problem'
import Solution from './sections/Solution'
import HowItWorks from './sections/HowItWorks'
import Platforms from './sections/Platforms'
import Impact from './sections/Impact'
import SDG from './sections/SDG'
import Markets from './sections/Markets'
import Traction from './sections/Traction'
import Pricing from './sections/Pricing'
import FAQ from './sections/FAQ'
import Waitlist from './sections/Waitlist'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="bg-white text-black">
      <ProgressBar />
      <CursorFollower />
      <Nav />
      <Marquee />
      <ScrollToTop />
      <JoinToast />

      <div className="pt-24" aria-hidden />
      <Hero />
      <NumberBand />
      <Problem />
      <Solution />
      <HowItWorks />
      <Platforms />
      <Impact />
      <SDG />
      <Markets />
      <Traction />
      <Pricing />
      <FAQ />
      <Waitlist />
      <Footer />
    </div>
  )
}
