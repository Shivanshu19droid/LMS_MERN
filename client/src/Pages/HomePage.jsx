import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import HomePageImage from "../assets/home_page.png";
import HeroIllustration from "../assets/hero-1.png";


function HomePage() {
  return (
  <HomeLayout>
    <div className="relative bg-[#F8FAFC] overflow-hidden">

      {/* ================= BLUE GLOW BACKGROUND ================= */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl -z-10"></div>

      {/* ================= ANNOUNCEMENT BAR ================= */}
      <div className="bg-[#2563EB] text-white text-sm text-center py-2">
        🚀 New industry-focused courses launching this month — Explore now
      </div>


{/* ================= HERO SECTION ================= */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24">

  <div className="flex flex-col lg:flex-row items-center gap-12">

    {/* LEFT CONTENT */}
    <div className="flex-1 text-center lg:text-left space-y-6">

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E293B] leading-tight">
        Empower Your Learning Journey with
        <span className="text-[#2563EB]"> Expert-Led Courses</span>
      </h1>

      <p className="text-base sm:text-lg text-[#64748B] max-w-xl mx-auto lg:mx-0 leading-relaxed">
        Gain practical skills, learn from experienced mentors,
        and build real-world expertise that accelerates your career.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">

        <Link to="/courses">
          <button className="px-6 py-3 rounded-xl bg-[#2563EB] text-white font-semibold shadow-sm hover:bg-blue-700 transition-all duration-200">
            Explore Courses
          </button>
        </Link>

        <Link to="/contact">
          <button className="px-6 py-3 rounded-xl border border-[#2563EB] text-[#2563EB] font-semibold hover:bg-[#2563EB]/10 transition-all duration-200">
            Contact Us
          </button>
        </Link>

      </div>

    </div>


    {/* RIGHT ILLUSTRATION */}
    <div className="flex-1 flex justify-center relative">

      {/* subtle glow behind illustration */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-[#2563EB]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Replace src with your illustration */}
        <img
          src={HeroIllustration}
          alt="Online learning illustration"
          className="w-full h-auto object-contain"
        />
      </div>

    </div>

  </div>


  {/* ================= STATS ================= */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 text-center">

    {[
      { number: "50+", label: "Industry-Focused Courses" },
      { number: "10k+", label: "Active Learners" },
      { number: "15+", label: "Expert Mentors" },
    ].map((stat, index) => (
      <div key={index} className="space-y-2">
        <h3 className="text-3xl sm:text-4xl font-bold text-[#2563EB]">
          {stat.number}
        </h3>
        <p className="text-sm sm:text-base text-[#64748B]">
          {stat.label}
        </p>
      </div>
    ))}

  </div>

</section>



      {/* ================= CORE FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {[
            {
              title: "Engaging Learning Experience",
              desc: "Well-structured content designed for practical understanding and real-world application.",
            },
            {
              title: "Experienced & Qualified Mentors",
              desc: "Learn from industry professionals with years of hands-on experience and proven expertise.",
            },
            {
              title: "Affordable & Accessible",
              desc: "High-quality education made accessible with flexible pricing and easy enrollment.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-[#1E293B] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </section>


      {/* ================= WHY CHOOSE SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20">

        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] text-center mb-12">
          Why Choose Our Platform?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {[
            {
              title: "Flexible Learning",
              desc: "Study at your own pace, anytime, anywhere with lifetime access.",
            },
            {
              title: "Well-Experienced Mentors",
              desc: "Courses led by highly qualified professionals with real industry exposure.",
            },
            {
              title: "Supportive Learning Environment",
              desc: "Get guidance, clarity, and support whenever you need it.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <h4 className="text-lg font-semibold text-[#1E293B] mb-3">
                {item.title}
              </h4>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </section>


      {/* ================= TRUSTED BY ================= */}
      <section className="border-t border-slate-200 py-12">

        <div className="max-w-6xl mx-auto px-4 text-center space-y-8">

          <p className="text-sm text-[#64748B]">
            Trusted by thousands of learners worldwide
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-[#64748B] font-semibold text-lg">
            <span>TechCorp</span>
            <span>GlobalEdu</span>
            <span>InnovaSoft</span>
            <span>SkillHub</span>
          </div>

        </div>

      </section>

    </div>
  </HomeLayout>
);



}

export default HomePage;
