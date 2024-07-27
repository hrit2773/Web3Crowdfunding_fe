import { prepareContractCall,sendTransaction } from "thirdweb"
import { contract } from "../main";
import { Account } from "thirdweb/wallets";

export const publishCampaign =  async (form:any,account:Account) => {
  const deadline=BigInt(Math.floor(new Date(form.deadline).getTime()/1000))
  try {
    const transaction:any = prepareContractCall({ 
      contract, 
      method: "function createCapaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, uint256 _amountCollected, string _image) returns (uint256)", 
      params: [account?.address!, form.title, form.description, BigInt(form.target), deadline as any,BigInt(0), form.image] 
    });
    await sendTransaction({
      transaction,
      account
    });
  } catch (error) {
    alert(error)
  }
}

export const donateCampaign= async (amount:bigint,id:number,account:Account)=>{
  try {
    const transaction = prepareContractCall({ 
      contract, 
      method: "function donateToCampaign(uint256 _id) payable", 
      params: [BigInt(id)],
      value: amount
    });
    await sendTransaction({ 
      transaction, 
      account 
    });
  } 
  catch (error) {
    alert(error)
  }
}