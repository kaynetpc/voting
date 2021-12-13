
import {
  Routes,
  Route} from 'react-router-dom'
import { LandingPage } from './components/windows/landingPage/LandingPage';
import { useDispatch } from 'react-redux';
import {MdErrorOutline} from 'react-icons/md'
import { Login } from './components/core/auth/Login';
import { KNT } from "./dependencies/js/knt";
import SkinPage  from './components/windows/landingPage/SkinPage';


function App() {  

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage page={<Login />}  />} />
        <Route path="/app" element={<SkinPage  />} />
        <Route path="*" element={<LandingPage title="ERROR 404" page={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} > <h1> Page Not found <MdErrorOutline /> </h1> </div>} />} />
      </Routes>
    </div>
  );
}

export default App;
