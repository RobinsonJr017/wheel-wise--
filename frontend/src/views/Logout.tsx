import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    window.supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
    })
    localStorage.clear();
    window.supabase.auth.signOut()
  })
  return (
    null
  )
}

export default Logout