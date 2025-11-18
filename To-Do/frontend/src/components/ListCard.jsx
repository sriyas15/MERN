import { PenSquare,Trash2  } from "lucide-react";
import { api } from "../lib/api";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils";

const ListCard = ({list,fetchList,setContent,setAmount,setEditBtn,setEditId}) => {

    const deleteList = async()=>{

        if(!window.confirm("This List will be deleted!"));

        try {
            
            await api.delete(`/list/${list._id}`);
            toast.success("List Deleted");
            fetchList();

        } catch (error) {
            console.log("Error in delete ",error);
            toast.error("Note was not found");
        }
    }

    const editList = async()=>{

        setEditBtn(true);
        setContent(list.content);
        setAmount(list.amount);
        setEditId(list._id);
    }

  return (
    <div className="relative mt-5 mb-5">
        <ul className="space-y-3">
            <li className="flex justify-center items-center gap-3 p-3 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 transition">
                <span className="flex font-serif text-primary">
                    {list.content} :  {list.amount}
                    <div className="flex gap-4 items-center absolute right-5 ">
                        <PenSquare className="w-4 h-4 text-primary cursor-pointer" onClick={editList}/>
                        <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" onClick={deleteList} />
                    </div>
                    <p className="absolute right-24 my-auto text-sm text-gray-500">{formatDate(new Date(list.updatedAt))}</p>
                </span>
            </li>
        </ul>
    </div>
  )
}

export default ListCard