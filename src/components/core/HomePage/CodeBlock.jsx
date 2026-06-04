import React from "react";
import CTAButton from "../HomePage/Button";
// import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";


const CodeBlock = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300">{subheading}</div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {/* <div className="flex gap-2 items-center"> */}
              {ctabtn2.btnText}
            {/* </div> */}
          </CTAButton>
        </div>
      </div>

      <div className="h-fit flex flex-row text-[10px] w-full py-4 lg:w-[500px] border border-gray-900 rounded-lg bg-richblack-900 shadow-xl ">

  {/* line numbers */}
  <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold border-r border-gray-700">
    {[...Array(11)].map(( _ , i) => (
      <p key={i}>{i + 1}</p>
    ))}
  </div>

  {/* code */}
  <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 pl-3`}>
    <TypeAnimation
      sequence={[codeblock || "", 2000 , ""]}
      repeat={Infinity}
      cursor={true}
      style={{ whiteSpace: "pre-line", display: "block" }}
      omitDeletionAnimation={true}
    />
  </div>

</div>
    </div>
  );
};


export default CodeBlock