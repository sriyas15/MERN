import { PenSquare,Trash2  } from "lucide-react";

const ListCard = ({list}) => {
  return (
    <div className="relative mt-5">
        <ul class="space-y-3">
            <li class="flex justify-center items-center gap-3 p-3 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 transition">
                <span class="flex font-serif text-primary">
                    {list.content} :  {list.amount}
                    <div className="flex gap-4 items-center absolute right-5 ">
                        <PenSquare className="w-4 h-4 text-primary cursor-pointer" />
                        <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                    </div>

                </span>
            </li>
        </ul>
    </div>
  )
}

export default ListCard