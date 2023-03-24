import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const campaigns = await getUserCampaigns();
      setCampaigns(campaigns);
      setIsLoading(false);
      console.log(campaigns);
    } catch (error) {
      console.log("Failure", error);
    }
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [contract, address]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
}

export default Profile;
