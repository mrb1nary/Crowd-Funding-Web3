import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
import { useState } from "react";
import { useStateContext } from "../context";

function Navbar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[450px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[20px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="w-full flex text-[14px] placeholder:text-[#4b5264] outline-none text-white bg-transparent"
        />
        <div className="flex justify-center items-center h-full w-[72px] rounded-[20px] bg-[#4acd8d] cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address == "" ? "Connect" : "Create a campaign"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) {
              navigate("/create-campaign");
            } else {
              connect();
            }
          }}
        />
        <Link to="./profile">
          <div className="flex justify-center items-center h-[52px] w-[52px] bg-[#2c2f32] rounded-full cursor-pointer ml-6">
            <img
              src={thirdweb}
              alt="profile"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>
      {/*Small screen navigation*/}

      <div className="sm:hidden flex justify-between items-center relative">
        <div className="flex justify-center items-center h-[40px] w-[40px] bg-[#2c2f32] rounded-[10px] cursor-pointer">
          <img
            src={logo}
            alt="profile"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
        <div className="flex justify-center items-center h-[40px] w-[40px] bg-[#2c2f32] rounded-[10px] cursor-pointer ml-6">
          <img
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer(!toggleDrawer)}
          />

          <div
            className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
              !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
            } transition-all duration-700`}
          >
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`${
                    isActive === link.id ? "bg-[#3a3a43] rounded-[10px]" : ""
                  } px-4 py-2 cursor-pointer hover:bg-[#3a3a43] rounded-[10px]`}
                  onClick={() => {
                    setIsActive(link.id);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${
                      isActive === link.name ? "grayscale-0" : "grayscale"
                    }`}
                  />
                  <p
                    className={`ml-[20px] font-semibold text-[14px] ${
                      isActive === link.name
                        ? "text-[#1dc071]"
                        : "text-[#808191]"
                    }`}
                  >
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex mx-4">
              <CustomButton
                btnType="button"
                title={!address ? "Connect" : "Create a campaign"}
                styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
                handleClick={() => {
                  if (address) {
                    navigate("/create-campaign");
                  } else {
                    connect();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
