import { Route,Routes } from "react-router-dom"
import {Home,CampaignDetails,CreateCampaign,Profile} from "./pages"
import {Navbar,Sidebar} from "./components"

export const App = ()=>{
	return(

		<div className=" relative sm:-8 p-4 min-h-screen bg-[#13131a] flex flex-row">
			<div className=" sm:flex text-white hidden mr-10 relative">
				<Sidebar/>
			</div>

			<div className=" flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 text-white">
				<Navbar/>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/profile" element={<Profile/>}/>
					<Route path="/create-campaign" element={<CreateCampaign/>}/>
					<Route path="/campaign-details/:id" element={<CampaignDetails/>}/>
				</Routes>
			</div>
		</div>
	)
}
