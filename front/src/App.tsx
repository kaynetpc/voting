
import {
  Routes,
  Route} from 'react-router-dom'
import { LandingPage } from './components/windows/landingPage/LandingPage';
import { Login } from './components/core/auth/Login';
import SkinPage  from './components/windows/landingPage/SkinPage';


function App() {  

  return (
      <Routes>
        <Route path={"/"}  element={<LandingPage page={<Login />}  />}  />
        <Route path={"/*"}  element={<LandingPage page={<Login />}  />}  />
        <Route path="/app"  element={<SkinPage  />} />
      </Routes>
  );
}

export default App;
