import { useEffect, useState } from "react";
import NavBar from "../components/NavBar"
import ListCard from "../components/ListCard";
import axios from 'axios'
import toast from "react-hot-toast";
import {LoaderIcon} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import { api } from "../lib/api";

const HomePage = () => {

  const [ content,setContent ] = useState("");
  const [ amount,setAmount ] = useState(undefined);
  const [ loading,setLoading ] = useState(true);

  const [ list,setList ] = useState([]);
  const [ listTotal,setListTotal ] = useState(0);
  const [ editBtn,setEditBtn ] = useState(false);
  const [editId, setEditId] = useState(null);


  const navigate = useNavigate();

  const fetchList = async()=>{

    try {
      const res = await api.get("/list");
      setList(res.data);
      setListTotal(res.data.map(item => item.amount).reduce((acc,tot)=>acc+tot,0));
    } catch (error) {
      console.log("Error in Fetching ",error);
      toast.failed("Cannot fetch the notes");
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  const formSubmitHandler = async(e)=>{
    e.preventDefault();

    if( !amount.trim() || !content.trim() ){
      toast.error("Please fill all the fields");
      return;
    }

    try {
      
      if(editBtn){

        await api.put(`/list/${editId}`,{content,amount});
        toast.success("List successfully updated");
        setEditBtn(false);
        setEditId(null);
      }
      else{
        await api.post(`/list`,{content,amount});
        toast.success("List successfully added");
      }

      setContent("");
      setAmount("");
      fetchList();

    } catch (error) {
      console.log("Error in Adding ",error);
      toast.error("Something was wrong");
    }

  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <>
    
      <div className="card bg-base-200 shadow-2xl max-w-2xl mx-auto ">

        <div className=" card-body">
          
          <form onSubmit={formSubmitHandler}>

            <div className="flex justify-between items-center gap-5">
              <div className="card-title">
              <label  htmlFor="content">Content</label>
              <input
              type="text"
              placeholder="Type Content..."
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs" />

            </div>

            <div className="card-title">
              <label htmlFor="amount" >Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                placeholder="Type Amount..."
                className="input input-bordered input-primary w-full max-w-xs" />
            </div>
            </div>

            <button className=" flex justify-center btn btn-secondary mt-5 ml-auto " 
              type="submit">
                {editBtn ? "Update" : "Add"}
             </button>
          </form>
        
        </div>
    
    </div>

    <div>
      <h1 className="text-primary font-bold text-4xl text-center mt-5">
        Total {listTotal} rs
      </h1>
    </div>

    {list.length === 0 && (
          <div className="flex mt-10 flex-col items-center justify-center text-center p-10 bg-base-100 rounded-xl ">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-primary opacity-80" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 4h6M7 8h10m1 12H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
            </svg>

            <h2 className="text-xl font-semibold mt-4 text-primary">No Lists Yet</h2>
            <p className="text-sm opacity-80">Start by adding your first task.</p>

          </div>
    )}

    {list.length > 0  && (
      <div className="max-w-xl mx-auto mt-5">
      {
        list.map((list)=>(
          <ListCard 
            key={list._id} list={list} fetchList={fetchList} 
            content={content} amount={amount} setContent={setContent} 
            setAmount={setAmount} setEditBtn={setEditBtn}
            setEditId={setEditId}/>
        ))
      }
      </div>
    )}

  </>
  )
}

export default HomePage