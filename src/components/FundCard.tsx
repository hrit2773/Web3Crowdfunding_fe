import { tagType,thirdweb } from "../assets"
import { daysLeft } from "../utils"


const FundCard = (props:any) => {
    const remainingDays=daysLeft(props.deadline*1000)
    return (
        <div 
            className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" 
            onClick={props.handleClick}
        >
            <img src={props.image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>
            <div className="flex flex-col p-4">
                <div className="flex flex-row items-center mb-[18px]">
                    <img src={tagType} alt="tag" className="h-[17px] w-[17px] object-contain"/>
                    <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Campaign</p>
                </div>
                <div className="block">
                    <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{props.title}</h3>
                    <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{props.description}</p>
                </div>
                <div className="flex flex-wrap justify-between mt-[15px] gap-2">
                    <div className="flex flex-col">
                        <h4
                            className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]"
                        >{props.amountCollected}</h4>
                        <p
                            className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate"
                        >Raised of {props.target}</p>
                    </div>
                    <div className="flex flex-col">
                        <h4
                            className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]"
                        >{(remainingDays!=="NaN" && Number(remainingDays)>=0)? remainingDays:"0"}</h4>
                        <p
                            className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate"
                        >Days Left</p>
                    </div>

                </div>
                <div className="flex items-center mt-[20px] gap-[12px]">
                    <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
                        <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain"/>
                    </div>
                    <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{props.owner}</span></p>
                </div>
            </div>
        </div>
    )
}

export default FundCard
