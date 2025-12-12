import React, { useState, useEffect } from "react";
// ADVANCED: Import professional icons from lucide-react
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import {
  Droplet,
  HeartHandshake,
  MapPin,
  CheckCircle2,
  Menu, // Icon for mobile menu
  X, // Icon to close mobile menu
  Quote, // Icon for testimonials
  Star, // Icon for testimonial ratings
  ArrowUp, // Icon for Scroll to Top
  Mail, // Icon for final bar
  Phone, // Icon for final bar
} from "lucide-react";

// --- Global Styles and Animations (FIXED: Removed non-standard attributes) ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
    }

    /* ADVANCED: Keyframes for the mobile menu slide-down */
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-slideDown {
      animation: slideDown 0.3s ease-out forwards;
    }

    /* ADVANCED: Keyframes for the fade-in animation (for scroll-to-top) */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-in-out forwards;
    }
    
    /* Unique Background Gradient for Hero - Using custom gradient class */
    .hero-gradient {
      background: radial-gradient(at 50% 10%, #fef2f2, #fff); /* Soft light gradient */
    }
  `}</style>
);

// --- ADVANCED: Hero Background Pattern Component ---
const HeroBackgroundPattern = () => (
  <>
    {/* Subtle Dot Pattern */}
    <svg
      className="absolute inset-0 w-full h-full text-red-100 opacity-20"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hero-pattern"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-pattern)" />
    </svg>

    {/* Unique Wave Divider at the bottom of the Hero */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg
        className="relative block w-full h-16 sm:h-24 text-white"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,176C672,192,768,224,864,224C960,224,1056,192,1152,160C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  </>
);

// --- Component: Header ---

// --- Component: HeroSection (Unique Design Implemented) ---
const HeroSection = () => (
  <section
    id="hero"
    // ADVANCED: Use custom gradient class and increase padding for depth
    className="hero-gradient pt-24 pb-48 text-center relative overflow-hidden"
  >
    {/* ADVANCED: Added background pattern and unique wave divider */}
    <HeroBackgroundPattern />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
        <span className="text-red-800">Your Drop,</span>
        <br className="hidden sm:block" /> Their Lifeline.
      </h1>
      <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto font-medium">
        Be the trusted link in solving critical blood shortages. Seamlessly
        connect with urgent, local donation opportunities and save lives.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Primary CTA */}
        <a
          href="#cta" // Points to final CTA
          // ADVANCED: Re-targeting smooth scroll
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("cta")
              .scrollIntoView({ behavior: "smooth" });
          }}
          // UPDATED: Added a more pronounced shadow and deeper red
          className="px-8 py-4 text-lg font-bold rounded-full shadow-2xl bg-red-700 text-white hover:bg-red-600 transform hover:scale-105 transition duration-300"
        >
          Find a Donation Center
        </a>
        {/* Secondary CTA --- UPDATED */}
        <a
          href="#features" // Points to features section
          // ADVANCED: Re-targeting smooth scroll
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("features")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className="px-8 py-4 text-lg font-bold rounded-full text-red-700 bg-white border-2 border-red-700 shadow-md hover:bg-red-50 transition duration-300"
        >
          Learn More
        </a>
      </div>
      <p className="mt-6 text-sm text-gray-600 font-medium">
        Join thousands of heroes today.
      </p>
    </div>
  </section>
);

// --- Component: FeaturesSection ---
const FeaturesSection = () => {
  const features = [
    {
      icon: <HeartHandshake size={32} className="text-red-700" />,
      title: "Immediate Impact",
      description:
        "Your donation is directed to the most urgent, local needs for maximum effectiveness.",
    },
    {
      icon: <MapPin size={32} className="text-red-700" />,
      title: "Effortless Discovery",
      description:
        "Quickly locate authorized drives and centers with up-to-the-minute availability data.",
    },
    {
      icon: <CheckCircle2 size={32} className="text-red-700" />,
      title: "Seamless Experience",
      description:
        "Book your appointment and track your history—designed for maximum convenience.",
    },
  ];

  return (
    // ADVANCED: Increased vertical padding and added a subtle top shadow
    <section id="features" className="py-24 sm:py-32 bg-white shadow-inner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-red-700 tracking-wide uppercase">
            Why Choose Us
          </h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-gray-900">
            A Better Way to Make a Difference
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              // ADVANCED: Added hover micro-interaction and refined shadow
              className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-red-50 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-center justify-center h-16 w-16 bg-red-100 rounded-full mx-auto mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Component: Stats/Social Proof Section ---
const StatsSection = () => (
  <section id="stats" className="bg-red-800 text-white py-20 sm:py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { stat: "50,000+", label: "Donors Registered" },
          { stat: "150+", label: "Hospitals Partnered" },
          { stat: "200,000+", label: "Lives Impacted" },
        ].map((item) => (
          <div
            key={item.label}
            // ADVANCED: Added hover micro-interaction
            className="p-4 transform hover:scale-105 transition-transform duration-300"
          >
            <span className="text-5xl font-extrabold text-red-300">
              {item.stat}
            </span>
            <p className="mt-2 text-lg font-medium text-red-100">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- ADVANCED: New Testimonials Section ---
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "The process was so simple and fast. Knowing my donation helped someone in my city is an incredible feeling. The app makes scheduling effortless.",
      name: "Simranpreet Kaur Saini",
      title: "Verified Donor",
    },
    {
      quote:
        "When my mother needed an urgent transfusion, this platform connected us to a donor in hours. I'm forever grateful for this essential service.",
      name: "Sakshi",
      title: "Verified Donor",
    },
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-red-700 tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-gray-900">
            What Our Community Says
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-red-500"
            >
              <div className="flex justify-between items-start mb-4">
                <Quote className="h-10 w-10 text-red-200" />
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-lg text-gray-700 italic mb-6">
                "{testimonial.quote}"
              </p>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-red-700">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Component: HowItWorksSection ---
const HowItWorksSection = () => {
  const steps = [
    {
      title: "Locate",
      description:
        "Find an urgent request or center near you using our map tool.",
    },
    {
      title: "Schedule",
      description:
        "Book your preferred time slot online instantly—no calls needed.",
    },
    {
      title: "Donate",
      description: "Give the gift of life at a verified, partner facility.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-red-700 tracking-wide uppercase">
            Simple 3-Step Process
          </h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-gray-900">
            How You Can Save a Life Today
          </p>
        </div>

        {/* Mobile Stepper */}
        <div className="md:hidden">
          <div className="relative space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-700 text-white font-bold z-10 shadow-lg">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-red-300 mt-2"></div>
                  )}
                </div>
                <div className="bg-gray-50 p-6 rounded-xl shadow-lg w-full">
                  <h3 className="font-extrabold text-xl mb-2 text-red-700">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:flex relative justify-between items-start">
          {/* Timeline Line */}
          <div
            className="absolute top-6 left-0 right-0 h-0.5 bg-red-300 w-[75%] mx-auto"
            style={{ left: "12.5%", right: "12.5%" }}
          ></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="w-1/3 p-4 relative z-10 flex flex-col items-center"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-4 border-red-700 text-red-700 font-bold shadow-xl text-xl transition-transform duration-300 hover:scale-110">
                {index + 1}
              </div>
              <div className="mt-6 text-center p-6 bg-gray-50 rounded-xl shadow-lg w-full">
                <h3 className="font-extrabold text-xl mb-2 text-red-700">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Component: CTASection ---
const CTASection = () => (
  <section id="cta" className="py-20 sm:py-28 bg-red-700 text-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
        Ready to Become a Donor Hero?
      </h2>
      <p className="text-xl opacity-90 mb-10 font-light">
        Your next appointment could save a life. Find a center and schedule your
        appointment today.
      </p>
      {/* Final CTA - Large and prominent */}
      <a
        href="/finddonors" // In a real app, this would go to a search page
        className="inline-block px-12 py-5 text-xl font-bold rounded-full shadow-2xl bg-white text-red-700 hover:bg-gray-100 transition duration-300 transform hover:scale-105 ring-4 ring-red-300/50"
      >
        FIND A DONATION CENTER TODAY
      </a>
    </div>
  </section>
);

// --- Component: FinalBar (Replaces bulky Footer) ---
const FinalBar = () => (
  <div className="bg-gray-900 text-gray-400 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm">
      <p className="order-2 sm:order-1 mt-4 sm:mt-0">
        &copy; {new Date().getFullYear()} DonorLink. Connecting Communities.
      </p>
      <div className="flex space-x-6 order-1 sm:order-2">
        <a href="#" className="hover:text-red-500 flex items-center gap-1">
          <Mail className="h-4 w-4" />
          Support
        </a>
        <a href="#" className="hover:text-red-500 flex items-center gap-1">
          <Phone className="h-4 w-4" />
          (800) Donate
        </a>
      </div>
    </div>
  </div>
);

// --- ADVANCED: New ScrollToTopButton Component ---
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          // Uses .animate-fadeIn class defined in GlobalStyles
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-red-700 text-white shadow-xl hover:bg-red-600 transition-all duration-300 animate-fadeIn ring-4 ring-red-300/50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

// --- Main Landing Page Component ---
export default function App() {
  return (
    <div className="min-h-screen antialiased bg-white">
      <GlobalStyles /> {/* ADVANCED: Inject global styles */}
      <main>
        <NavBar />
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialsSection /> {/* ADVANCED: Added new section */}
        <HowItWorksSection />
        {/* REMOVED: RegistrationFormSection was here */}
        <CTASection />
      </main>
      <FinalBar />
      <ScrollToTopButton />
      <Footer /> {/* ADVANCED: Added scroll-to-top button */}
    </div>
  );
}
