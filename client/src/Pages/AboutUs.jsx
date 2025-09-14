import HomeLayout from "../Layouts/HomeLayout";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";

function AboutUs() {
  //making an array of objects to display the content inside the carousel

  return (
    <HomeLayout>
      <div className="pl-20 pr-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide affordable and quality education to all
              students. We believe that every student deserves quality education
              regardless of their financial background.
            </p>
          </section>

          <div className="w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
              }}
              alt="about-main-image"
              className="drop-shadow-2xl"
              src="src/assets/tree-2.png"
            />
          </div>
        </div>

        {/* now after the text and image have been added, we will add a carousal here using tehe daisy ui */}

        <div className="carousel w-1/2 my-16 m-auto">
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
    </HomeLayout>
  );
}

export default AboutUs;
