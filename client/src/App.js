import './App.css';
import {BrowserRouter as Router,Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipe from './pages/SavedRecipe';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
     <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='/create-recipe' element={<CreateRecipe/>}/>
        <Route path='/saved-recipe' element={<SavedRecipe/>}/>
    
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
