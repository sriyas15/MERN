import { useEffect, useState } from "react";
import NavBar from "../components/NavBar"
import ListCard from "../components/ListCard";
import axios from 'axios'
import toast from "react-hot-toast";
import {LoaderIcon} from 'lucide-react'

const HomePage = () => {

  const [ content,setContent ] = useState("");
  const [ amount,setAmount ] = useState(null);
  const [ loading,setLoading ] = useState(true);

  const [ list,setList ] = useState([]);
  const [ listTotal,setListTotal ] = useState(0);

  const formSubmitHandler = (e)=>{
    e.preventDefault();
    console.log(content,amount)
  }

  useEffect(()=>{

    const fetchList = async()=>{

      try {
        const res = await axios.get("http://localhost:5000/api/list/");
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

    fetchList();

  },[])

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
              placeholder="Type here"
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs" />

            </div>

            <div className="card-title">
              <label htmlFor="amount" >Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                placeholder="Type here"
                className="input input-bordered input-primary w-full max-w-xs" />
            </div>
            </div>

            <button className=" flex justify-center btn btn-secondary mt-5 ml-auto " type="submit">Add</button>
          </form>
          

        </div>
      {/* // <div data-theme="coffee" className="flex justify-between items-center">
    //   <button class="btn btn-neutral">Neutral</button> 
    //   <button class="btn btn-primary">Primary</button>
    //   <button class="btn btn-secondary">Secondary</button>
    //   <button class="btn btn-accent">Accent</button>
    //   <button class="btn btn-info">Info</button>
    //   <button class="btn btn-success">Success</button>
    //   <button class="btn btn-warning">Warning</button>
    //   <button class="btn btn-error">Error</button>
    // </div> */}
    </div>

    <div>
      <h1 className="text-primary font-bold text-4xl text-center mt-5">
        Total {listTotal} rs
      </h1>
    </div>

    {list.length === 0 && (
          <div class="flex mt-10 flex-col items-center justify-center text-center p-10 bg-base-100 rounded-xl ">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-primary opacity-80" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 4h6M7 8h10m1 12H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
            </svg>

            <h2 class="text-xl font-semibold mt-4 text-primary">No Lists Yet</h2>
            <p class="text-sm opacity-80">Start by adding your first task.</p>

          </div>
    )}

    {list.length > 0  && (
      <div className="max-w-xl mx-auto mt-5">
      {
        list.map((list)=>(
          <ListCard key={list.id} list={list}/>
        ))
      }
      </div>
    )}

  </>
  )
}

export default HomePage