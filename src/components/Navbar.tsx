import {useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {CustomButton} from "./"
import { navlinks } from '../constants'
import { logo,menu,search,thirdweb } from '../assets'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { client } from '../main'
const Navbar = () => {
    const navigate=useNavigate()
    const [isActive,setIsActive]=useState("Dashboard")
    const [toggleDrawer,setToggleDrawer]=useState(false)
    const account=useActiveAccount()
    
    return (
        <div className=' flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
            

            <div className=' sm:flex hidden font-epilogue flex-row justify-between gap-4'>
                {account?.address && (
                    <CustomButton
                        btnType="button"
                        title={account.address? "Create a campaign":"Connect"}
                        styles={account.address? "bg-[#1dc071]":"bg-[#8c6dfd]"}
                        handleClick={()=>{
                            navigate("create-campaign");
                        }}
                    />
                )}
                <ConnectButton client={client}/>
                <Link to="/profile">
                    <div className='w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
                        <img
                            src={thirdweb}
                            alt='user'
                            className='w-[60%] h-[60%] object-contain'
                        />
                    </div>
                </Link>
                
            </div>

            {/*small screen navigation */}
            <div className='sm:hidden font-epilogue flex justify-between items-center relative'>
                <div className='w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
                    <img
                        src={logo}
                        alt='user'
                        className='w-[60%] h-[60%] object-contain'
                    />
                </div>
                    
                <img
                    src={menu}
                    alt='menu'
                    className='w-[34px] h-[34px] object-contain cursor-pointer'
                    onClick={()=>setToggleDrawer((prev)=>!prev)}
                />
                <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-lg py-4 ${!toggleDrawer ? '-translate-y-[100vh]':'translate-y-0'} transition-all duration-700`}>
                    <ul className='mb-4'>
                        {navlinks.map((link:any)=>(
                            <li
                                key={link.name}
                                className={`flex p-4 ${isActive===link.name && 'bg-[#3a3a43]'} cursor-pointer`}
                                onClick={()=>{
                                    setIsActive(link.name)
                                    setToggleDrawer(false)
                                    navigate(link.link)
                                }}
                            >
                                <img
                                    src={link.imgUrl}
                                    alt={link.name}
                                    className={`w-[24px] h-[24px] object-contain ${isActive===link.name? 'grayscale-0':'grayscale'}`}
                                />
                                <p className={`ml-[20px] font-semibold text-[14px] ${isActive===link.name? 'text-[#1dc071]':'text-[#808191]'}`}>
                                    {link.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className='flex mx-4'>
                    {account?.address&& (
                        <CustomButton
                            btnType="button"
                            title={account.address? "Create a campaign":"Connect"}
                            styles={account.address? "bg-[#1dc071]":"bg-[#8c6dfd]"}
                            handleClick={()=>{
                                navigate("create-campaign");
                            }}
                        />
                    )}
                    
                    <ConnectButton client={client}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
