import { Navigate } from "react-router-dom"
import { useAppSelector } from "@store/hooks"

const ProtectedRout = ({children} : {children : React.ReactNode}) => {
    const {accessToken} = useAppSelector(state =>state.auth );

    if(!accessToken){
        return <Navigate to="/login?message=login_required" />
    }

    return (<>{children}</>)
}

export default ProtectedRout
