import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Layout from './components/Layout .jsx';
import Dashboard from "./pages/Dashboard.jsx";
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import axios from 'axios';
import Income from './pages/Income.jsx';
import Expense from './pages/Expense.jsx';
import Profile from './pages/Profile.jsx';

const API_URL = "http://localhost:4000"

const getTransactionFromStorage = () =>{
  const saved = localStorage.getItem("Transactions");
  return saved ? JSON.parse(saved) : [];
}

// to protect the routes.
const ProtectedRoute = ({user, children}) =>{
  const localToken = localStorage.getItem("token");
  const sessionToken = sessionStorage.getItem("token");
  const hasToken = localToken || sessionToken ;

  if( !user || !hasToken){
    return <Navigate to='/login' replace />
  }
  return children;
}

// to scroll to top when page gets reload or new page is visited
const ScrollToTop = () =>{
  const location = useLocation();
  useEffect(()=>{
    window.scrollTo({ top:0, left:0, behavior:"auto"});
  },[location.pathname]);

  return null;
}

function App() {
  const [ user, setUser ] = useState(null);
  const [ token, setToken ] = useState(null);
  const [ Transactions, setTransactions ] = useState([]);
  const [ isLoading, setIsLoading  ] = useState(true);
  const navigate = useNavigate();

  // to save the token
  function persistAuth(userObj, tokenStr, remember=false){
    try {
      if (remember) {
        if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) localStorage.setItem("token", tokenStr);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      } else {
        if (userObj) sessionStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) sessionStorage.setItem("token", tokenStr);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setUser(userObj || null);
      setToken(tokenStr || null);
    } catch (err) {
      console.error("persistAuth error:", err);
    }
  }

  const clearAuth = () =>{
    try{
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    }
    catch(error){
      console.log("clearAuth error:",error);
    }
    setUser(null);
    setToken(null);

  }

  // to update user data both in state and storage.
  const updateUserData  = (updateUser) => {
    setUser(updateUser);

    const localToken = localStorage.getItem("token");
    const sessionToken = localStorage.getItem("token");

    if(localToken){
      localStorage.setItem("user", JSON.stringify(updateUser));
    }else if(sessionToken){
      sessionStorage.setItem("user", JSON.stringify(updateUser));
    }
  };

  //try to load user with token when mounted
  useEffect(()=>{
    (async() =>{
      try{
          const localUserRaw = localStorage.getItem("user");
          const sessionUserRaw = sessionStorage.getItem("user");
          const localToken = localStorage.getItem("token");
          const sessionToken = sessionStorage.getItem("token");

          const storedUser = localUserRaw ? JSON.parse(localUserRaw) : sessionUserRaw ? 
          JOSN.parse(sessionUserRaw) : null ;

          const storedToken = localToken || sessionToken || null ;
          const tokenFromLocal = !!localToken ;
          if (storedUser){
            setUser(storedUser);
            setToken(storedToken);
            setIsLoading(false);
            return;
          }

          if(storedToken){
            try{
              const res = await axios.get(`${API_URL}/api/user/me`,{
                header: {Authorization:`Bearer ${storedToken}` }
              })
            }
            catch(fetchErrror){
              console.warn("Could not fetch profile with stored token.", fetchErrror);
              clearAuth();
            }
          }

      }catch(error){
        console.error("Error bootstrapping auth:",error);
      }finally{
        setIsLoading(false);

        try{
            setTransactions(getTransactionFromStorage());
        }catch(txErr){
          console.log("Error loading Transactions:",txErr);
        }
      }
    })();
  },[])

  useEffect(()=>{
    try{
    localStorage.setItem("transactions",JSON.stringify(Transactions));
    }catch(error){
      console.error("Error saving transactions",error);
    }
  },[Transactions]);


  function handleSignup(userData, remeber = false, tokenFromApi){
    persistAuth(userData, tokenFromApi, remeber);
    navigate("/"); 

  }
  
  
  function handleLogin(userData, remember = false, tokenFromApi = null){
    persistAuth(userData, tokenFromApi, remember);
    console.log("handle login")
    navigate("/");
  }



  const handleLogout = () =>{
    clearAuth();
    navigate("/login");
  };

    // Transactions helpers
  const addTransaction = (newTransaction) =>
    setTransactions((p) => [newTransaction, ...p]);
  const editTransaction = (id, updatedTransaction) =>
    setTransactions((p) =>
      p.map((t) => (t.id === id ? { ...updatedTransaction, id } : t)),
    );
  const deleteTransaction = (id) =>
    setTransactions((p) => p.filter((t) => t.id !== id));
  const refreshTransactions = () =>
    setTransactions(getTransactionsFromStorage());


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route element={
        <ProtectedRoute user={user}>
        <Layout user={user} 
                onLogout={handleLogout} 
                transactions ={Transactions} 
                addTransaction={addTransaction} 
                editTransaction={editTransaction}
                deleteTransaction={deleteTransaction}
                refreshTransactions={refreshTransactions}  
        />
        </ProtectedRoute>
      }>
      
      <Route path='/' element = {<Dashboard/>} 
                      transactions ={Transactions} 
                      addTransaction={addTransaction} 
                      editTransaction={editTransaction}
                      deleteTransaction={deleteTransaction}
                      refreshTransactions={refreshTransactions}

      />

      <Route path='/income' 
             element={<Income />} 
             transactions ={Transactions} 
             addTransaction={addTransaction} 
             editTransaction={editTransaction}
             deleteTransaction={deleteTransaction}
             refreshTransactions={refreshTransactions}
      />

       <Route path='/expense' 
             element={<Expense />} 
             transactions ={Transactions} 
             addTransaction={addTransaction} 
             editTransaction={editTransaction}
             deleteTransaction={deleteTransaction}
             refreshTransactions={refreshTransactions}
      />
      
      <Route path='/profile' 
             element={<Profile
                       user={user}
                       onUpdateProfile={updateUserData}
                       onLogout={handleLogout}
                      />
                    }
      />
      
      
      </Route>

      <Route path='/signup' element={<Signup onSignup={handleSignup} />}/>
      <Route path='/login' element={<Login onLogin={handleLogin} />}/>
      <Route path='*' element={<Navigate to={user ? "/":"/login"} replace  />} />
    </Routes>

    
    </>
  )
}

export default App
