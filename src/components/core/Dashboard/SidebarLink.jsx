// import React from "react";
// import { useDispatch } from "react-redux";
// import { NavLink, matchPath, useLocation } from "react-router-dom";
// import { Icon } from "@iconify/react";

// const SidebarLink = ({ link, iconName }) => {
//   // const icon = Icon[iconName];
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };

//   return (
//     <NavLink
//       to={link.path}
//       className={` relative px-8 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-100" : "bg-opacity-0"}`}
//     >
//       <span
//         className={` absolute  left-0 top-0 h-full w-[0.2rem] bg-yellow-50
//          ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
//       ></span>
      
       
//         <div>
//           <span className="flex items-center gap-x-2" >
//         <Icon icon="mdi:cog-outline" />
//         {link.name}
//         </span>
//         </div>
      
//     </NavLink>
//   );
// };

// export default SidebarLink;




// import * as Icons from "react-icons/vsc"
// import { useDispatch } from "react-redux"
// import { NavLink, matchPath, useLocation } from "react-router-dom"
// import { resetCourseState } from "../../../slice/courseSlice"
// // import { resetCourseState } from "../../../slice/courseSlice
// // import { resetCourseState } from "../../../slices/courseSlice"


// export default function SidebarLink({ link, iconName }) {
//   const Icon = Icons[iconName]
//   const location = useLocation()
//   const dispatch = useDispatch()

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <NavLink
//       to={link.path}
//       onClick={() => dispatch(resetCourseState)}
//       className={`relative px-8 py-2 text-sm font-medium ${
//         matchRoute(link.path)
//           ? "bg-yellow-800 text-yellow-50"
//           : "bg-opacity-0 text-gray-400  hover:text-yellow-50"
//       } transition-all duration-200`}
//     >
//       <span
//         className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
//           matchRoute(link.path) ? "opacity-100" : "opacity-0"
//         }`}
//       ></span>
//       <div className="flex items-center gap-x-2">
//         {/* Icon Goes Here */}
//         <Icon className="text-lg" />
//         <span>{link.name}</span>
//       </div>
//     </NavLink>
//   )
// }


import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slice/courseSlice"

export default function SidebarLink({ link, iconName,name }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-gray-400  "
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}