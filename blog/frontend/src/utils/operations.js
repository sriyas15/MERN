import toast from "react-hot-toast";
import { useFollowMutation } from "../features/auth/authApiSlice";

  

export const followBtn = async(blogAuthor)=>{
const [ follow,{followLoads} ] = useFollowMutation();
    try {
      
      const followData = await follow(blogAuthor._id).unwrap();
    //   console.log(userDetails)
      if(followData.message === "Following")
        toast.success(`${blogAuthor.name} added to following list`);

      else toast.success(`Unfollowed ${blogAuthor.name}`);
      
    } catch (error) {
      console.log(`Error in following`);
      toast.error(error?.data?.message);
    }
  }


  