import { React , createContext , useState, useContext} from 'react'
// Auth => Authentication مصادقة

const AuthContext = createContext(null) 

export const AuthProvider = ({children}) => {

    // const [emailOrPhone , setEmailOrPhone] = useState(null)
    const [password , setPassword]     = useState("null")
    // const navigate=useNavigate();

    const login =  (password)=>{
        setPassword(password)
       // or setEmailOrPhone(emailOrPhone)

    }
   const logout = ()=>{
    setPassword(null)

    
   
    // window.location.href = 'http://localhost:3000';
    // window.location.replace('http://localhost:3000');


    // return(
    // redirect("/")
    // )    
}

  return (
        <AuthContext.Provider value={{password , login , logout}}>
            {children}
        </AuthContext.Provider>
  )
}
export const useAuth = ()=>{
    return useContext(AuthContext)
} 