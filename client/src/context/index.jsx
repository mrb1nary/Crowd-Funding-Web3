import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xDdb539b6852fA48fA91327E982dDda6F2796B470"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);

      console.log("Success");
    } catch (error) {
      console.log("Failure", error);
    }
  };

  const getCampaigns = async () => {
    try {
      const campaigns = await contract.call("getCampaigns");

      const parsedCampaings = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        pId: i,
      }));

      return parsedCampaings;
      
    } catch (error) {
      console.log("Failure", error);
    }
  };

  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await getCampaigns();
      const filteredCampaigns = allCampaigns.filter((campaign)=> campaign.owner === address);

      return filteredCampaigns;
    } catch (error) {
      console.log("Failure", error);
    }
  };


  return (
    <StateContext.Provider
      value={{
        createCampaign: publishCampaign,
        address,
        connect,
        getCampaigns,
        contract,
        getUserCampaigns
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
