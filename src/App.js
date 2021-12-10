import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import AddPostView from './views/AddPostView';

// import views here
import HomeView from './views/HomeView'
import LoginView from './views/LoginView'
import PostDetailView from './views/PostDetailView';
import AuthRoute from './components/AuthRoute';
import SignupView from './views/SignupView';
import EditPostView from './views/EditPostView';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomeView/>} />
        <Route path="/login" element={<LoginView/>} />
        <Route path="/signup" element={<SignupView/>} />
        <Route path="/post/:id" element={<PostDetailView/>} />
        <Route element={<AuthRoute/>}>
          <Route path="/editPost/:id" element={<EditPostView/>} />
          <Route path="/addPost" element={<AddPostView/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
