// UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserDetails } from "../utils/apiCall";
import { useNavigate } from "react-router-dom";
// 1. Create Context
export const userContext = createContext();

// 2. Create Provider component (capitalize it!)
export function UserContextProvider({ children }) {
     const [token, setToken] = useState(null);
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();
     const updateUser = async (data) => {
          setUser(data.userDetails);
          localStorage.setItem("token", JSON.stringify(data.token));
     }
     const clearuser = () => {
          setUser(null);
          localStorage.removeItem("token");
     }
     // console.log(user);
     const Logout = () => {
          clearuser();
          navigate("/auth");
     }
     useEffect(() => {
          const loadUser = async () => {
               try {
                    setLoading(true);

                    const tkn = JSON.parse(localStorage.getItem("token"));
                    if (!tkn) return;

                    setToken(tkn);

                    const usrData = await getUserDetails(tkn);
                    await updateUser({ token: tkn, userDetails: usrData });

               } catch (error) {
                    console.error("Error fetching the user data. Please login again.", error);
                    toast.error("Error fetching user data. Please login again.");
                    navigate("/auth");
               } finally {
                    setLoading(false);
               }
          };

          loadUser();
     }, []);




     return (
          <userContext.Provider value={{
               user, setUser, updateUser, clearuser, loading, setLoading
               , token, setToken, Logout
          }}>
               {children}
          </userContext.Provider>
     );
}

// 3. Custom Hook to consume the context
export const useUserContext = () => {
     const context = useContext(userContext);
     if (!context) {
          throw new Error("useUserContext must be used within a UserContextProvider");
     }
     return context;
};

export default UserContextProvider;
