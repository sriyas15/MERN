import { useState } from "react";
import NavBar from "../components/NavBar"

const HomePage = () => {

  const [ content,setContent ] = useState("");
  const [ amount,setAmount ] = useState(null);

  const formSubmitHandler = (e)=>{
    e.preventDefault();
    console.log(content,amount)
  }

  return (
    <>
    {/* <NavBar/> */}
    
      <div className="card bg-base-200 shadow-2xl max-w-2xl mx-auto ">

      <div className="card-body">
        
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

          <button className="flex justify-center btn btn-accent mt-5 " type="submit">Add</button>
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
  </>
  )
}

export default HomePage