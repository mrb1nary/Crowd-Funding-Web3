import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";



const StateContext = createContext();


export const StateProvider = ({ children }) => {
    const {contract} = useContract('0xa56F56a84b6fe470dDDf271Ca50e615Db3335508')
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect= useMetamask();

    const publishCampaign = async(form)=>{
      const data = await(createCampaign[
        
      ])
    }
}
