import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { TbBinaryTree2Filled } from "react-icons/tb";



const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
   <div
  onClick={() => setCurrentCard(cardData.heading)}
  className={`p-5 rounded-xl cursor-pointer transition-all duration-200  
  w-[260px] min-h-[220px] flex flex-col justify-between 
  ${
    currentCard === cardData.heading
      ? "bg-white text-black shadow-[6px_6px_20px_rgba(202,138,4,0.6)]"
      : "bg-gray-900 text-white"
  }`}
>
      <h3 className="font-semibold text-lg text-left">{cardData.heading}</h3>
      <p className="text-sm mt-2 text-left">{cardData.description}</p>

      <div className="flex  justify-between mt-4 border-t border-dashed  border-gray-500 pt-3 ">
        <span className="flex flex-row text-center mt-2 text-lg text-blue-400"><div className="mr-2 text-center mt-1.5 "><FaUserFriends /></div>{cardData.level}</span>
        <span className="flex flex-row text-center mt-2 text-lg text-blue-400"><div className="mr-2 text-center mt-1.5 "><TbBinaryTree2Filled /></div>{cardData.lessioNumber} lessons</span>

        {/* <span>{cardData.lessonNumber} lessons</span> */}
      </div>
    </div>
  );
};

export default CourseCard;