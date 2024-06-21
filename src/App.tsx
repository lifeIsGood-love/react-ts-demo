// import React ,{Component} from 'react' ;
// import LoginPage from 'pages/loginPage';
// import FunPage from 'pages/funPage';
// import DataFormPage  from 'pages/dataFormPage';
// import Gateway  from 'pages/gateway';
// import ApiPage from 'pages/apiPage';
import HomePage from 'pages/homePage'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom' ;
import './App.scss'

function App() {
  return (
       <HashRouter>
         <Routes>
          <Route path="/" element={<HomePage  />} />
          {/* <Route path="/DataFormPage" element={<DataFormPage  />} />
          <Route path="/loginPage" element={<LoginPage  />} />
          <Route path="/funCom" element={<FunPage />} />
          <Route path="/apiPage" element={<ApiPage />} />
          <Route path="/gateway" element={<Gateway />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          /> */}
         </Routes>
       </HashRouter>
  );
}

export default App;
