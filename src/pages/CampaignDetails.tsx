import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ethers } from "ethers"
import { calculateBarPercentage, daysLeft } from "../utils"
import { contract } from "../main"
import { useActiveAccount, useReadContract } from "thirdweb/react"
import { CountBox, CustomButton, Loader } from "../components"
import { loader, thirdweb } from "../assets"
import { useState } from "react"
import { donateCampaign } from "../context"

const CampaignDetails = () => {
    const navigate=useNavigate()
    const {state}=useLocation()
    const {id}=useParams()
    const remainingDays=daysLeft(Number(state.deadline)*1000)
    const { data:donators, isLoading } = useReadContract({ 
        contract, 
        method: "function getDonators(uint256 _id) view returns (address[], uint256[])", 
        params: [BigInt(Number(id))] 
    });
    const [transactionLoading,setTransactionLoading]=useState(false)
    const [amount,setAmount]=useState("")
    const account= useActiveAccount()
    const handleDonate=async ()=>{
        if (amount){
            setTransactionLoading(true)
            await donateCampaign(ethers.parseUnits(amount),Number(id),account!)
            setTransactionLoading(false)
            navigate('/')
        }
        else{
            alert("Enter an amount to fund")
        }
    }
    return (
        <div>

            {isLoading ?(
                <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain mx-[500px]'/>
            ):(
                <div>
                    {transactionLoading && <Loader/>}
                    <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
                        <div className="flex-1 flex-col">
                            <img src={state.image} alt="campaign" className="w-full h-[410px] object-fill rounded-xl"/>
                            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                                <div 
                                    className="absolute h-full bg-[#4acd8d]"
                                    style={{width:`${calculateBarPercentage(Number(ethers.formatEther(state.target)),Number(ethers.formatEther(state.amountCollected)))}`}}
                                >
        
                                </div>
                            </div>
                        </div>
                        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                            <CountBox title="Days Left" value={Number(remainingDays)>=0?remainingDays:"0"}/>
                            <CountBox title={`Raised of ${ethers.formatEther(state.target)}`} value={ethers.formatEther(state.amountCollected)}/>
                            <CountBox title="Total Donators" value={donators? donators[0].length.toString():"0"}/>
                        </div>
                    </div>
                    <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                        <div className="flex-[2] flex flex-col gap-[40px]">
                            <div>
                                <h4 className="font-epilogue font-semibold text-white text-[18px] uppercase">
                                    Creator
                                </h4>
                                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                                    <div className="h-[52px] w-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                                        <img
                                            src={thirdweb}
                                            alt="user"
                                            className="w-[60%] h-[60%] object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h4
                                            className="font-epilogue font-semibold text-14px text-white break-all"
                                        >{state.owner}</h4>
                                        <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191] ">Crowdfunding campaign</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-white text-[18px] uppercase">
                                    Story
                                </h4>
                                <div className="mt-[20px]">
                                    <p
                                        className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify"
                                    >
                                        {state.description}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-white text-[18px] uppercase">
                                    Donators
                                </h4>
                                <div className="mt-[20px] flex flex-col gap-4">
                                    {donators && donators[0].length>0 ? (donators[0].map((item,idx)=>(
                                        <div key={`${item}-${idx}`} className="flex justify-between items-center gap-4">
                                            <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">{idx+1}. {item}</p>
                                        </div>
                                    ))):(
                                        <p
                                            className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify"
                                        >
        
                                            No Donators yet. Be the first one!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-epilogue font-semibold text-white text-[18px] uppercase">
                                Fund
                            </h4>
                            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                                <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
                                    Fund the campaign
                                </p>
                                <div className="mt-[30px]">
                                    <input
                                        type="number"
                                        placeholder="ETH 0.1"
                                        step={0.01}
                                        className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                                        value={amount}
                                        onChange={(e)=>setAmount(e.target.value)}
                                    />
                                    <div className="mt-20 p-4 bg-[#13131a] rounded-[10px]">
                                        <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                                        <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you</p>
                                    </div>
                                    <CustomButton
                                        btnType="button"
                                        title="Fund campaign"
                                        styles="w-full bg-[#8c6dfd]"
                                        handleClick={handleDonate}
                                    />
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
    
            )}
        
        </div>
    )
}

export default CampaignDetails
