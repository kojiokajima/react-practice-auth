import './App.css';
import React, {useState, createContext} from 'react'
// import SignUp from './pages/SignUp';
import Router from './Router';

export const AuthContext = createContext([false, () => {}])

function App() {
  const [isAuth, setIsAuth] = useState(false)
  console.log("App.jsx -- isAuth is:", isAuth)

  return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
      <main>
        <Router />
      </main>
    </AuthContext.Provider>
  );
}

export default App;
