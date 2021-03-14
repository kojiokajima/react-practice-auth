import './App.css';
import React, {useState, createContext, useContext} from 'react'
// import SignUp from './pages/SignUp';
import Router from './Router';

export const AuthContext = createContext([false, () => {}])

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
      {/* <Header /> */}
      <main>
        <Router />
      </main>
        {/* <SignUp /> */}

      {/* <Footer /> */}
    </AuthContext.Provider>
  );
}

export default App;
