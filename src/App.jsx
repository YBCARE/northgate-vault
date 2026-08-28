import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import AlertBar from './components/AlertBar.jsx'
import UtilityNav from './components/UtilityNav.jsx'
import MainNav from './components/MainNav.jsx'
import Footer from './components/Footer.jsx'
import LetsTalkButton from './components/LetsTalkButton.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Industries from './pages/Industries.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Insights from './pages/Insights.jsx'
import InsightArticle from './pages/InsightArticle.jsx'
import About from './pages/About.jsx'
import Track from './pages/Track.jsx'
import Portal from './pages/Portal.jsx'
import Governance from './pages/Governance.jsx'
import Corporate from './pages/Corporate.jsx'
import Contact from './pages/Contact.jsx'
import RequestQuote from './pages/RequestQuote.jsx'
import SimplePage from './pages/SimplePage.jsx'
import NotFound from './pages/NotFound.jsx'
import locationsSkylineImage from './assets/locations-city-skyline.jpg'
import careersTeamImage from './assets/careers-team-meeting.jpg'

function SiteLayout() {
  return (
    <>
      <AlertBar />
      <UtilityNav />
      <MainNav />
      <main><Outlet /></main>
      <Footer />
      <LetsTalkButton />
      <CookieConsent />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<Industries />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/track" element={<Track />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-a-quote" element={<RequestQuote />} />
          <Route
            path="/careers"
            element={(
              <SimplePage
                crumb="Careers"
                title="Careers"
                text="We are not currently listing open positions. For inquiries about joining our team, contact us directly."
                backgroundImage={careersTeamImage}
                backgroundAlt="Northgate Vault colleagues in a team meeting"
              />
            )}
          />
          <Route
            path="/locations"
            element={(
              <SimplePage
                crumb="Locations"
                title="Locations"
                text="Northgate Vault operates secure facilities across major financial centers worldwide. Contact us for details on the location nearest you."
                backgroundImage={locationsSkylineImage}
                backgroundAlt="Global financial district skyline"
              />
            )}
          />
          <Route
            path="/privacy-policy"
            element={<SimplePage crumb="Privacy Policy" title="Privacy Policy" text="Northgate Vault handles client information under strict confidentiality protocols consistent with the discretion we apply to physical custody. For the full policy, contact our team." />}
          />
          <Route
            path="/terms"
            element={<SimplePage crumb="Terms & Conditions" title="Terms & Conditions" text="Engagement terms are established individually with each client as part of the consultation process. Contact our team for current terms and conditions." />}
          />
          <Route
            path="/cookie-policy"
            element={<SimplePage crumb="Cookie Policy" title="Cookie Policy" text="This website uses cookies to enhance user experience and analyse site traffic. We do not sell personal information. Strictly necessary cookies keep the site functioning; analytics and marketing cookies are optional and can be managed at any time from the cookie banner." />}
          />
          <Route
            path="/cookie-settings"
            element={<SimplePage crumb="Cookie Settings" title="Cookie Settings" text="This site uses only the cookies required for basic functionality unless you choose to enable additional categories. Preferences can be managed from the cookie banner shown on your first visit each session." />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/portal" element={<Portal />} />
        <Route path="/login" element={<Navigate to="/portal" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
