

const NavBar = () => {
  return (
    <header className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">To-Do List</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><a>Favourite</a></li>
            <li>
                <details>
                <summary>Theme</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                    <li><a>Light</a></li>
                    <li><a>Dark</a></li>
                    <li><a>Coffee</a></li>
                    <li><a>Forest</a></li>
                </ul>
                </details>
            </li>
            </ul>
        </div>
    </header>
  )
}

export default NavBar