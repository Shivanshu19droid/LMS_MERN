import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

function CourseDescription() {
    
    const { state } = useLocation(); //if we store this in a variable, then the entire object fetched using useLocation() is stored in that variable, so here we directly fetch the state which stores the data of the course we want to display

    const { role, data } = useSelector((state) => state.auth); //this role will store - user/ admin and will be used for conditional rendering

    return (
       <HomeLayout>
           <div className="min-h-[99vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
            <div className="grid grid-cols-2 gap-10 py-10 relative">
                <div className="space-y-5">
                <img 
                    className="w-full h-64"
                    alt="thumbnail"
                    src={state?.thumbnail?.secure_url}
                />

                <div className="space-y-4">
                    <div className="flex flex-col items-center justify-between tex-xl">

                        <p className="font-semibold">
                            <span className="text-yellow-500 font-bold">
                                Total lectures : {" "}
                            </span>
                            {state?.numberOfLectures}
                        </p>

                        <p className="font-semibold">
                            <span className="text-yellow-500 font-bold">
                                Instructor : {" "}
                            </span>
                            {state?.createdBy}
                        </p>
                    </div>

                    { role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                        <button className="bg-yellow-600 text-xl rounded-md font-bold px-5 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                            Watch Lectures
                        </button>
                        ) : (
                        <button className="bg-yellow-600 text-xl rounded-md font-bold px-5 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                            Subscribe
                        </button>
                        )}
                </div>

            </div>

            <div className="space-y-2 text-xl">
                <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                    {state?.title}
                </h1>

                <p className="text-yellow-500">Course Description: </p>
                <p>{state?.descripion}</p>

            </div>
            </div>
           </div>
       </HomeLayout>
    );
}

export default CourseDescription;