import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
  <div
    onClick={() =>
      navigate("/course/description/", { state: { ...data } })
    }
    className="w-full max-w-sm bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group"
  >

    {/* Thumbnail */}
    <div className="overflow-hidden">
      <img
        src={data?.thumbnail?.secure_url}
        alt="Course Thumbnail"
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    {/* Content */}
    <div className="p-5 space-y-3">

      <h2 className="text-lg font-semibold text-[#1E293B] line-clamp-2 group-hover:text-[#2563EB] transition-colors">
        {data?.title}
      </h2>

      <p className="text-sm text-[#64748B] line-clamp-2">
        {data?.description}
      </p>

      <div className="space-y-1 text-sm">

        <p>
          <span className="font-medium text-[#64748B]">Category: </span>
          <span className="text-[#1E293B]">{data?.category}</span>
        </p>

        <p>
          <span className="font-medium text-[#64748B]">Lectures: </span>
          <span className="text-[#1E293B]">
            {data?.numberoflectures}
          </span>
        </p>

        <p>
          <span className="font-medium text-[#64748B]">Instructor: </span>
          <span className="text-[#1E293B]">
            {data?.createdBy}
          </span>
        </p>

      </div>

    </div>
  </div>
);
}

export default CourseCard;
