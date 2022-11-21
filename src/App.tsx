import React ,{Component} from 'react' ;
import ClassPage from './pages/classPage';
import FunPage from './pages/funPage'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom' ;

function App() {
  return (
       <HashRouter>
         <Routes>
          <Route path="/" element={<ClassPage  />} />
          <Route path="/classCom" element={<ClassPage  />} />
          <Route path="/funCom" element={<FunPage />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
         </Routes>
       </HashRouter>
  );
}

export default App;
