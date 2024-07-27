import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'
import { ethers } from 'ethers'
import { FundCard } from '.'

const DisplayCampaigns = (props:any) => {
    const navigate=useNavigate()
    const handleNavigate=(campaign:any,idx:number)=>{
        navigate(`/campaign-details/${idx}`,{state:campaign})
    }
    return (
        <div>
            {props.isLoading?(

                <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain mx-[500px]'/>
            ):(
                <>
                <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{props.title} ({props.campaigns?.length})</h1>
                <div className='flex flex-wrap mt-[20px] gap-[26px]'>
                    {props.campaigns.length===0 && (
                        <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>No Campaigns yet</p>
                    )}
                    {props.campaigns.length>0 && props.campaigns.map((campaign:any,idx:any)=>(
                        <FundCard
                            key={idx}
                            owner={campaign.owner}
                            name={campaign.name}
                            title={campaign.title}
                            description={campaign.description}
                            target={ethers.formatEther(campaign.target.toString())}
                            deadline={Number(campaign.deadline)}
                            amountCollected={ethers.formatEther(campaign.amountCollected.toString())}
                            image={campaign.image}
                            handleClick={()=>handleNavigate(campaign,idx)}
                        />
                    ))}
                </div>
                </>
            )}
        </div>
    )
}

export default DisplayCampaigns
