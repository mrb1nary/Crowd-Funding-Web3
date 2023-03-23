import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";

function DisplayCampaigns({ title, isLoading, campaigns }) {
  const navigate = useNavigate();

  function handleNavigate(campaign) {
    return () => {
      navigate(`/campaign/${campaign.title}`, { state: { campaign } });
    };
  }

  return (
    <div>
      <h1 className="text-[18px] text-white text-left font-semibold">
        {title}: ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!isLoading && campaigns.length === 0 && (
          <h1 className="text-[18px] text-white text-left font-semibold">
            No campaigns found
          </h1>
        )}

        {!isLoading && campaigns.length > 0 && (
          <>
            {campaigns.map((campaign) => (
              <FundCard
                key={campaign.id}
                {...campaign}
                handleClick={handleNavigate(campaign)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default DisplayCampaigns;
