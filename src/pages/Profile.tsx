import React from 'react'
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { contract } from '../main';
import DisplayCampaigns from '../components/DisplayCampaigns';

const Profile = () => {
    const { data, isLoading } = useReadContract({ 
        contract, 
        method: "function getCampaigns() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations)[])", 
        params: [] 
    });

    const account=useActiveAccount()
    return (
        <div>
            <DisplayCampaigns
                title="My Campaigns"
                isLoading={isLoading}
                campaigns={data?.filter((campaign)=>campaign.owner===account?.address)}
            />
        
        </div>
    )
}

export default Profile