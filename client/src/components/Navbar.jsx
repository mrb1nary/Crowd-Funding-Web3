import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const address = "";

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
              navigate("/connect");
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
    </div>
  );
}

export default Navbar;
