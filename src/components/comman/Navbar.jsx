import React from "react";
// import  { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
// import NavbarLinks from "../../data/navbar-links";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
// import { apiConnector } from "../../services/apiconnector";
// import { categories } from "../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";

const subLinks = [
  {
    title: "pyhton",
    link: "/catalog/pyhton",
  },
  {
    title: "web dev ",
    link: "/catalog/web-development",
  },
];

const Navbar = () => {
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.profile?.user);
  const totalItems = useSelector((state) => state.cart?.totalItems);

  // const [subLinks, setSubLinks] = useState([]);

  //   const fetchSubLinks = async () => {
  //     try {
  // const result = await apiConnector("GET", categories.CATEGORIES_API);
  //       console.log("printing sublinks results", result);
  //       setSubLinks(result?.data?.data || []);
  //     } catch (error) {
  //       console.log("could not fetch the category list");
  //     }
  //   };

  //   useEffect(() => {
  //     // fetchSubLinks();
  //   }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    return location.pathname === route;
  };
  return (
    <div className="flex items-center justify-center border-b bg-black py-2">
      <div className="flex justify-between w-11/12 max-w-maxContent text-center">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" width={160} height={42} loading="lazy" />
        </Link>
 
        {/* Nav Links */}

        <nav>
          <ul className="flex gap-x-6 text-white">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className=" relative flex flex-row gap-1 items-center group  ">
                    <p className="cursor-pointer">{link.title}</p>
                    <div className="mt-2">
                      <MdKeyboardArrowDown />
                    </div>
                    <div className=" invisible absolute left-[50%] -translate-x-1/2 translate-y-[80%] 
                     flex flex-col rounded-md bg-white p-4 text-richblack-900 
                      opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100
                      lg:w-[300px]  ">
                      <div className="absolute left-1/2 top-1 -translate-x-1/2 -translate-y-1/2 h-6 w-4 rotate-45  bg-white  "></div>

                      {
                        subLinks.length ? (
                          subLinks.map((subLinks,index) => (
                            <Link to={`${subLinks.link}`} key={index }>
                               <p className="text-black">{subLinks.title}</p>
                            </Link>
                          ) )
                        ): (<div>no links found </div>) 
                      }     
                      

                      

                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-500"
                          : "text-white"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* <nav>
          <ul>
            {
              NavbarLinks.map((link , index) => (
                <li>
                  {link.title === "catalog"? (
                    <div>
                      <p>{link.title}</p>
                    </div>
                  ): (
                    <Link to={link?.path}>
                      <p className={`${
                      matchRoute(link?.path) ? "text-yellow-100" : "text-richblack-25" }`}>
                        {link.title}
                      </p>
                    </Link>
                  )
                  })
                </li>
              )
            }
          </ul>
        </nav> */}

        {/* login signup dashboard */}

        <div className="flex gap-x-4 items-center ">
          {user && user?.accountType !== "instructor " && (
            <Link to="/dashboard/cart" className="relative ">
              {/* <AiOutlineShoppingCart /> */}
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700  px-[12px] py-[8px] text-white  rounded-xl  bg-black hover:bg-gray-600 ">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700  px-[12px] py-[8px] text-white  rounded-xl bg-black hover:bg-gray-600">
                sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
