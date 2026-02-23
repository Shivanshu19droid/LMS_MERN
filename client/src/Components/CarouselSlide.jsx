function CarouselSlide({
  image,
  title,
  description,
  slideNumber,
  totalSlides,
}) {
  return (
  <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
    <div className="flex flex-col items-center justify-center gap-4 px-4 sm:px-6 md:px-[15%] w-full">
      <img
        src={image}
        alt={title || "slide image"}
        className="w-24 sm:w-28 md:w-36 lg:w-40 rounded-full border-2 border-gray-400 object-cover"
      />

      <p className="text-lg sm:text-xl md:text-xl lg:text-xl text-black-200 text-center">
        {description}
      </p>

      <h3 className="text-xl sm:text-2xl md:text-2xl font-semibold text-center">
        {title}
      </h3>

      <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a
          href={`#slide${slideNumber == 1 ? totalSlides : slideNumber - 1}`}
          className="btn btn-circle"
          aria-label="previous slide"
        >
          ❮
        </a>

        <a
          href={`#slide${(slideNumber % totalSlides) + 1}`}
          className="btn btn-circle"
          aria-label="next slide"
        >
          ❯
        </a>
      </div>
    </div>
  </div>
);

}

export default CarouselSlide;
