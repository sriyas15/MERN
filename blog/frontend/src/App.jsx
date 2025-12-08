
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import './App.css'
import HomePage from './pages/HomePage'
import AfterRegistraion from './pages/AfterRegistraion'
import FeedsPage from './pages/FeedsPage'
import PostBlog from './components/PostBlog'
import UserProfileUpdate from './pages/UserProfileUpdate'
import ProfilePage from './pages/ProfilePage'
import Followers from './pages/Followers'
import Following from './pages/Following'
import ReadBlog from './pages/ReadBlog'
import OthersProfile from './pages/OthersProfile'
import AllUsersPage from './pages/AllUsersPage'
import EditBlogPage from './pages/EditBlogPage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/admin/allUsers' element={<AllUsersPage/>}/>
      <Route path='/post' element={<PostBlog/>}/>
      <Route path='/edit-blog' element={<EditBlogPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/userDetails' element={<AfterRegistraion/>}/>
      <Route path='/feeds' element={<FeedsPage/>}/>
      <Route path='/feeds/blog/:id' element={<ReadBlog/>}/>
      <Route path='/profile' element={<OthersProfile/>}/>
      <Route path='/my-profile' element={<ProfilePage/>}/>
      <Route path='/my-profile/update' element={<UserProfileUpdate/>}/>
      <Route path='/profile/followers' element={<Followers/>}/>
      <Route path='/profile/following' element={<Following/>}/>
    </Routes>
    </>
  )
}


export default App
