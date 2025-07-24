import { useEffect } from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import { getAllCourses } from "../../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { toast } from "react-hot-toast";
import CourseCard from "../../Components/CourseCard";


function CourseList(){
    const dispatch = useDispatch();

    const {loading, error, courseData} = useSelector((state) => state.course);

    async function loadCourses(){
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        if(error){
            console.log(error);
        }
        loadCourses();
    }, []);

    console.log(courseData)

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore the courses made by 
                    <span className="font-bold text-yellow-500 m-1">
                          Industry Experts
                    </span>
                </h1>
                    <div className="nb-10 flex flex-wrap gap-14">
                        {courseData?.map((element) => {
                            return <CourseCard key={element._id} data={element} />
                        })}
                    </div>
                

            </div>
        </HomeLayout>
    )
}

export default CourseList;