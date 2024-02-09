import React, { useState, useEffect, useRef } from "react";
import { MdOutlineShare } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

import { RxDotFilled } from "react-icons/rx";
import Footer from "./Footer";
import ReferCourse from "./ReferCourse";
import OutsideClick from "./OutsideClick";
import ProfileData from "./ProfileData";
import video from "../videos/video.mp4";
import video1 from "../videos/video.mp4";
import video2 from "../videos/video.mp4";

import { useLocation } from "react-router-dom";
import { axiosClient } from "../Utils/axiosClient";
import { useSelector } from "react-redux";

const ShowPackages = () => {
    const [passSuccess, setPassSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [userverifypayement, setUserVerifyPayement] = useState(0);
    const { user } = useSelector((state) => state.auth);
    const { state, id } = useLocation();
    console.log(state.data, state.id, state.info);

    const getuserpaymentstatus = async () => {
        const res = await axiosClient.post("/getuserpaymentstatus", {
            userid: user?._id,
            productid:state?.id,
        });
        if(res?.data?.status === "recieved"){
            setUserVerifyPayement(1)
        }
        if(res?.data?.status === "rejected"){
            setUserVerifyPayement(2)
        }
        if(res?.data?.status === "pending"){
            setUserVerifyPayement(3)
        }

    };

    useEffect(() => {
        getuserpaymentstatus();
    }, []);

    let data = [];
    if (state?.data == "A to Z SEO course") {
        data = [
            {
                _id: "dfghfrigherighekrvndekjvndeedejkrfnv",
                title: "Introduction",
                vidioLink: video,
            },
            {
                _id: "dfghfrigherighekrvndjvndeedejkrfnv",
                title: "How to get started",
                vidioLink: video,
            },
            {
                _id: "dfghfrigherekrvndekjvndeedejkrfnv",
                title: "How to get started",
                vidioLink: video,
            },
        ];
    }
    if (state?.data == "Full stack digital marketing courses") {
        data = [
            {
                _id: "dfghfrigherighekrvndekjvndeedejkrfnv",
                title: "Introduction",
                vidioLink: video1,
            },
            {
                _id: "dfghfrigherighekrvndjvndeedejkrfnv",
                title: "How to get started",
                vidioLink: video1,
            },
            {
                _id: "dfghfrigherekrvndekjvndeedejkrfnv",
                title: "How to get started",
                vidioLink: video1,
            },
        ];
    }
    if (state?.data == "Social media marketing mastery course") {
        data = [
            {
                _id: "dfghfrigherighekrvndekjvndeedejkrfnv",
                title: "Introduction",
                vidioLink: video2,
            },
            {
                _id: "dfghfrigherighekrvndjvndeedejkrfnv",
                title: "How to get started",
                vidioLink: video2,
            },
            {
                _id: "dfghfrigherekrvndekjvndeedejkrfnv",
                title: "How to get started",
                vidioLink: video2,
            },
        ];
    }
    const [courseData, setCourseData] = useState(data);
    const [courseInfo, setCourseInfo] = useState();
    console.log(courseData)


    const getcoursedata = async () => {
        const res = await axiosClient.get(`singleproduct/${state.id}`);
        setCourseInfo(res?.data);
    };

    useEffect(() => {
        getcoursedata();
    }, []);

    const [currentVideo, setCurrentVideo] = useState({
        currentVideo: 0,
        link: courseData[0]?.vidioLink,
    });

    const menuRef = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <>
            <div className="bg-[#100D0F] w-full min-h-screen pb-24">
                {/* navbar */}
                {/* <div ref={menuRef} className="flex justify-between ">
                    <div className="flex gap-4">
                        <img
                            onClick={() => navigate("/")}
                            src="/img/pinklogo.png"
                            alt="logo"
                            className="w-[124px] h-[25px] mt-10 ml-9"
                        />
                        <h1 className="text-white mt-10"> | Bronze Package</h1>
                    </div>

                    <div className="flex gap-5 mt-8">
                        <div className="bg-[#1A1C24] mt-1 w-48 rounded h-9">
                            <h1 className="text-white text-xs mt-3 ml-3 ">
                                30/50 Lectures Completed!
                            </h1>
                        </div>

                        <div className="w-11 h-11 border-t-[#4B006E]  border-l-[#4B006E] border-b-white rounded-[50%] border-2 border-gradient-to-b from-[#4B006E] to-[#FF6584] relative">
                            <p className="text-white absolute text-xs mt-3">
                                30/50
                            </p>
                        </div>
                        <div
                            onClick={() => setPassSuccess(true)}
                            className="bg-[#4B006E] cursor-pointer flex w-48 mt-1 rounded-full h-9"
                        >
                            <MdOutlineShare className="mt-2 ml-2 text-white" />
                            <h1 className="text-white text-sm mt-2 ml-1 ">
                                Refer This Courses
                            </h1>
                        </div>

                        <div className="mt-1 mr-9">
                            <img
                                className="w-10 h-10 rounded-full"
                                src="https://www.secpay.io/img/Pic5.png"
                                alt="Rounded avatar"
                            />
                        </div>
                    </div>
                </div> */}
                {/* yaha tk navbar */}

                {/* start from here */}
                <div className="flex flex-col md:flex-row gap-[20px] mx-4 md:mx-[50px]">
                    <div className="w-[full]">
                        <div className="rounded flex flex-col md:flex-row gap-[20px]  p-1 w-[full] mt-9">
                            <div className="bg-[#1A1C24]  py-2 w-full md:w-[70%]">
                                {
                                    userverifypayement ==1 ?  <video
                                    controls
                                    src={currentVideo?.link}
                                    autoPlay
                                    // controlsList=""
                                    className="w-full h-full aspect-video"
                                ></video> : 
                                userverifypayement == 3 ?
                                <h1 className="text-white">Your Payment verfication in pending</h1> :
                                userverifypayement ==2 &&  <h1 className="text-white">Your Payment verfication Rejected</h1>
                                }
                               
                            </div>
                            <div className="bg-[#1A1C24] w-full md:w-[30%] max-h-[100vh] overflow-auto	rounded p-4">
                                <h1 className="text-white font-montserrat font-bold text-base">
                                    Course Content
                                </h1>
                                <div className="">
                                    {courseData?.map((course, i) => (
                                        <div key={i}>
                                            <div
                                                onClick={() =>
                                                    setCurrentVideo({
                                                        ...currentVideo,
                                                        currentVideo: i,
                                                        link: course?.vidioLink,
                                                    })
                                                }
                                                className={`flex gap-2 bg-${
                                                    currentVideo?.currentVideo ===
                                                    i
                                                        ? "[#4B006E]"
                                                        : "[none]"
                                                } px-4 py-3`}
                                            >
                                                <input type="checkbox" />
                                                <p className="text-white font-lato text-sm mt-1">
                                                    {`${i + 1} ${
                                                        course?.title
                                                    }`}
                                                </p>
                                            </div>

                                            <hr
                                                style={{ color: "#FFFFFF42" }}
                                                className=" mb-2 mt-2 "
                                            />
                                        </div>
                                    ))}
                                    {/* {Array.from({ length: 11 }, (_, index) => (
                                        <div key={index}
                                        >
                                        <div
                                            className="flex gap-2 bg-[#4B006E] px-4 py-3 "
                                        >
                                            <input type="checkbox" />
                                            <p className="text-white font-lato text-sm mt-1">
                                                {`${index + 1}.Introduction`}
                                            </p>
                                        </div>

                                        <hr style={{color:"#FFFFFF42"}} className=" mb-2 mt-2 " />
                                        </div>
                                    ))} */}
                                    {/* <div className="flex relative gap-2 bg-[#4B006E] h-7 ">
                                        <input type="checkbox" />
                                        <p className="text-white font-lato text-sm mt-1">
                                            1.Introduction
                                        </p>
                                    <hr className=" mb-2 mt-2" />
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="p-1 w-[full] h-510px] rounded bg-[#1A1C24] mt-9">
                            <h1 className="text-3xl font-bold leading-9 font-montserrat p-2 text-white mt-6  ml-3">
                                Course Overview
                            </h1>
                            <p className="text-[#FFFFFF] mt-4 font-normal font-lato text-xs leading-5 ml-3">
                               {state?.info}
                            </p>

                            <h4 className="text-white font-lato ml-4 mt-5 text-base leading-5 font-light ">
                                What you'll learn{" "}
                            </h4>

                            <div className="text-white font-lato pl-4 max-h-[300px] overflow-y-auto">
                    {courseInfo?.courseOverview?.map((item, i) => (
                        <React.Fragment key={i}>
                            <b className="text-white font-lato ml-2 text-base leading-5 font-light">
                                Module {i+1}
                            </b>
                            <h6 className="text-white font-lato ml-2 mt-2 text-base leading-5 font-light">
                                {item?.name}
                            </h6>
                            {item?.points?.map((point, index)=>(
                                <p key={index} className="flex gap-2 ml-4">
                                <RxDotFilled className="mt-1" />
                                {point}
                            </p>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                        </div>
                    </div>
                </div>
            </div>
            <OutsideClick onClickOutside={setOpen}>
                {passSuccess && <ReferCourse setPassSuccess={setPassSuccess} />}
            </OutsideClick>
        </>
    );
};

export default ShowPackages;
