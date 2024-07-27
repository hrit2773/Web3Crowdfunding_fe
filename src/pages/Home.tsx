import { useReadContract } from "thirdweb/react";
import { contract } from "../main";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Home = () => {
    const { data, isLoading } = useReadContract({ 
        contract, 
        method: "function getCampaigns() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations)[])", 
        params: [] 
    });
    return (
        <DisplayCampaigns
            title="All Campaigns"
            isLoading={isLoading}
            campaigns={data}
        />
    )
}

export default Home
