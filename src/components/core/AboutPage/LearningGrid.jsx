import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto grid-cols-1 lg:grid-cols-4 gap-6 mb-10 p-5 max-w-7xl mt-10">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`
              rounded-xl p-6 transition-all duration-300
              ${index === 0 ? "lg:col-span-2 bg-black" : ""}
              ${card.order % 2 === 1
                ? "bg-gray-800 text-white"
                : "text-white "}
                ${card.order===2 || card.order===4 ? "bg-gray-900 ": "" }
              ${card.order === 3 ? "lg:col-start-2" : ""}
            ${card.order===3 || card.order===4  || card.order===5 ? "lg:h-[300px]  ": "" }

              shadow-lg hover:shadow-2xl hover:scale-105
            `}
          >
            {card.order < 0 ? (
              // 🔥 Main Highlight Card
              <div className="flex flex-col gap-6 bg-black">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight ">
                  {card.heading}{" "}    
                  <HighlightText text={card.highlightText} />
                </h1>

                <p className="text-gray-300 text-sm lg:text-base">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              // 🔥 Normal Cards
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold">
                  {card.heading}
                </h2>

                <p className="text-gray-400 text-sm">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;