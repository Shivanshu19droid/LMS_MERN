import HomeLayout from "../Layouts/HomeLayout";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import TreeImage  from "../assets/tree-2.png";


function AboutUs() {
  //making an array of objects to display the content inside the carousel

  return (
  <HomeLayout>
    <div className="bg-[#F8FAFC] min-h-[90vh] px-4 sm:px-6 lg:px-12 py-16">

      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= HERO SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">

          {/* Subtle Glow */}
          <div className="absolute w-72 h-72 bg-[#2563EB]/10 rounded-full blur-3xl"></div>

          {/* Left Content */}
          <section className="relative space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] leading-tight">
              Affordable and
              <span className="text-[#2563EB] ml-2">
                Quality Education
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed">
              Our mission is to make high-quality learning accessible to everyone.
              We believe education should empower students regardless of
              financial background.
            </p>
          </section>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end relative">
            <img
              alt="about-main-image"
              src={TreeImage}
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full object-contain drop-shadow-xl"
            />
          </div>
        </div>


        {/* ================= CAROUSEL SECTION ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10 space-y-8">

          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E293B]">
              Meet Industry Experts
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto">
              Learn from professionals who bring real-world experience and
              practical knowledge to every course.
            </p>
          </div>

          <div className="carousel w-full">
            {celebrities &&
              celebrities.map((celebrity) => (
                <CarouselSlide
                  {...celebrity}
                  key={celebrity.slideNumber}
                  totalSlides={celebrities.length}
                />
              ))}
          </div>
        </div>

      </div>
    </div>
  </HomeLayout>
);
}

export default AboutUs;
