import { useEffect, useState } from "react"
import { Sun,Moon,Coffee,Trees } from 'lucide-react'


const NavBar = () => {

    const [ theme,setTheme ] = useState("light");

    useEffect(()=>{

        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme",savedTheme);

    },[])

    const toggleTheme = (newTheme)=>{
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme",newTheme);
        localStorage.setItem("theme",newTheme);
    }

    const Theme = ()=>{
        if(theme === "light") return <Sun className="w-4 h-4 text-yellow-500"/>
        if(theme === "dark") return <Moon className="w-4 h-4 text-gray-500"/>
        if(theme === "coffee") return <Coffee className="w-4 h-4 text-amber-600"/>
        if(theme === "forest") return <Trees className="w-4 h-4 text-green-500"/>
    }

  return (
    <header className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">Money Calculator</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><a>Favourite</a></li>
            <li>
                <details>
                <summary>Theme <Theme/></summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                        <button className="relative btn text-yellow-500"
                        onClick={()=>toggleTheme("light")}>
                        Light <Sun className="absolute right-0 w-4 h-4" />
                        </button>
                    </li>
                    <li>
                        <button className="relative btn text-gray-500"
                        onClick={()=>toggleTheme("dark")}>
                        <Moon className="absolute right-0 w-4 h-4" />
                        Dark
                        </button>
                    </li>
                    <li>
                        <button className="relative btn  text-amber-600"
                        onClick={()=>toggleTheme("coffee")}>
                        <Coffee className="absolute right-0 w-4 h-4" />
                        Coffee
                        </button>
                    </li>
                    <li>
                        <button className="relative btn text-green-500"
                        onClick={()=>toggleTheme("forest")}>
                        <Trees className="absolute right-0 w-4 h-4" />
                        Forest
                        </button>
                    </li>
                </ul>
                </details>
            </li>
            </ul>
        </div>
    </header>
  )
}

export default NavBar