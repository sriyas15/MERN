
const NavBar = () => {
  return (
    <div className="flex justify-between items-center bg-base-100 max-w-6xl">
        <h1 className="text-primary text-xl font-bold">Blog</h1>
        <div>
            <button>Log In</button>
            <button>Sign Up</button>
        </div>
    </div>
  )
}

export default NavBar