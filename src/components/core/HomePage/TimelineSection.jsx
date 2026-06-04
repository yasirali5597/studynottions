import React from "react";

import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineLogo from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    logo: logo1,
    heading: "leadership",
    Discription: " Fully commited to the success company ",
  },
  {
    logo: logo2,
    heading: "leadership",
    Discription: " Fully commited to the success company ",
  },
  {
    logo: logo3,
    heading: "leadership",
    Discription: " Fully commited to the success company ",
  },
  {
    logo: logo4,
    heading: "leadership",
    Discription: " Fully commited to the success company ",
  },
];

const TimelineSection = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col lg:flex-row items-center gap-12 py-12">

  {/* LEFT */}
  <div className="w-full lg:w-1/2 flex flex-col gap-8">
    {timeline.map((element, index) => {
      return (
        <div className="flex gap-5 items-start" key={index}>
          
          <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow">
            <img src={element.logo} alt="logo" />
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              {element.heading}
            </h2>
            <p className="text-sm text-gray-600">
              {element.Discription}
            </p>
          </div>

        </div>
      );
    })}
  </div>

  {/* RIGHT */}
  <div className="relative w-full lg:w-1/2 flex justify-center">
    <img
      src={TimeLineLogo}
      alt="timeline"
      className="rounded-lg shadow-md"
    />

    <div className="absolute bottom-[-35px]   bg-green-900 text-white flex uppercase py-2">

      <div className="flex items-center gap-3 border-r border-emerald-500 px-6 py-4 w-[50%]">
        <p className="text-2xl font-bold">10</p>
        <p className="text-xs text-emerald-300">Years of Experience</p>
      </div>

      <div className="flex items-center gap-3 px-6 py-4 w-[40%]">
        <p className="text-2xl font-bold">250</p>
        <p className="text-xs text-emerald-300">Types of Courses</p>
      </div>

    </div>

  </div>

</div>  );
};

export default TimelineSection;





//  <div className="bg-white">
//         <div className="bg-white w-11/12">
//         <div className="flex  justify-between  bg-white mx-auto  max-w-maxContent  gap-7 text-black p-10 ">
//           <div className="font-bold text-xl text-[16px] w-full md:w-[55%]">
//             {" "}
//             Get the skills you need for a
//             <HighlightText text={" job that is in demand "} />
//           </div>

//           <div className="flex flex-col gap-10 w-[40%] items-start ">
//             <p className=" items-center text-sm">
//               The modern studyNotation is the dictates its own terms. today , to
//               be a compeletitive specialist require more than professional
//               skills,
//             </p>
//             <CTAButton active={true} linkto={"/singup"}>
//               <div>Learn more</div>
//             </CTAButton>
//           </div>
//         </div>
//         <TimelineSection />
//       </div>
//       </div>


// import React from "react";

// import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
// import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
// import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
// import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
// import TimeLineLogo from "../../../assets/Images/TimelineImage.png";

// const timeline = [
//   {
//     logo: logo1,
//     heading: "leadership",
//     Discription: " Fully commited to the success company ",
//   },
//   {
//     logo: logo2,
//     heading: "leadership",
//     Discription: " Fully commited to the success company ",
//   },
//   {
//     logo: logo3,
//     heading: "leadership",
//     Discription: " Fully commited to the success company ",
//   },
//   {
//     logo: logo4,
//     heading: "leadership",
//     Discription: " Fully commited to the success company ",
//   },
// ];

// const TimelineSection = () => {
//   return (
//     <div className="flex flex-row items-center p-10 ">
//       <div className=" flex flex-row gap-15 items-center text-black ">
//         <div className="w-[45%] flex flex-col gap-5">
//           {timeline.map((element, index) => {
//             return (
//               <div className="flex flex-row gap-6 text" key={index}>
//                 <div className="w-[50px] h-[50px] bg-white flex items-center ">
//                   <img src={element.logo} />
//                 </div>
//                 <div>
//                   <h2 className="font-semibold text-[18px] ">
//                     {" "}
//                     {element.heading}
//                   </h2>
//                   <p className="text-base">{element.Discription}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="relative shadow-blue-200 ">
//           <img
//             src={TimeLineLogo}
//             alt="timelineImage"
//             className="shadow-white object-cover h-fit "
//           />

//           <div className="absolute bg-green-900 flex flex-row text-white uppercase" >
//             <div className="flex flex-row  gap-5 items-center border-r border-emerald-600 px-7">
//               <p className="text-3xl font-bold  ">10</p>
//               <p className="text-sm text-emerald-400">Years of Exprience</p>
//             </div>
            
//             <div className="flex gap-5 items-center px-7 ">
//                 <p className="text-3xl font-bold ">250</p>
//                 <p className="text-emerald-400 text-sm "> types of course</p>

//             </div>


//           </div>
//         </div>



//       </div>
//     </div>
//   );
// };

// export default TimelineSection;


// ise thora content center me laye 