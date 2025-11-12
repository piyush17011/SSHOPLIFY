import './App.css';
import { BrowserRouter as Router,Route,Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import About from './components/About';
import Home from './components/Home';
import Admin from './components/Admin';
import Category from './components/Category';
import Cart from './components/Cart';
import AllProducts from './components/AllProducts';
import SingleProductPage from './components/SingleProductPage';
import Orders from './components/Orders';
import { AuthContext } from './auth/AuthContext';
import { useContext } from 'react'; 

function App() {
const { user } = useContext(AuthContext);   
const ValidateRoute = ({ children }) => {
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};
  return (

    
    <Router>
      <div className="App"></div>
      
      <Routes>
        <Route path="/" element={ <Home />}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<LogIn/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/men" element={<Category category={"men"}/>}></Route>
        <Route path="/women" element={<Category category={"women"}/>}></Route>
        <Route path="/kids" element={<Category category={"kids"}/>}></Route>
        <Route path="/cart" element={<ValidateRoute><Cart /></ValidateRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/single/:id" element={<SingleProductPage />}></Route>
        <Route path="/allproducts" element={<AllProducts/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
        
      </Routes>
    </Router>
 



    
  );
}

export default App;
