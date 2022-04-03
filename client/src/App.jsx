 import Topbar from './components/topbar/Topbar'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoute';
const App = () => {
  return (
    <BrowserRouter>
      <Topbar/>
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/register'  element={<Register/>} />
        <Route path='/login'  element={ <Login/>} />
        <Route path='/settings'  element={
        <PrivateRoute redirectPath='/login'>
              <Settings/>
          </PrivateRoute>} />
        <Route path='/write'  element={
        <PrivateRoute redirectPath='/login'>
              <Write/>
          </PrivateRoute>} />
        <Route path='/post/:postId'  element={
           <PrivateRoute redirectPath='/login'>
           <Single/>
       </PrivateRoute>}/>
       <Route path='*' element={
         <h1 style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh"}}> Nothing to see here for now</h1>
       }/>
      </Routes>
     
     </BrowserRouter>
  )
};

export default App;