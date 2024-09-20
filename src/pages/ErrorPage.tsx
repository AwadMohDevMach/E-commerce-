import { useRouteError , isRouteErrorResponse} from "react-router-dom";
import { Link } from "react-router-dom";
import LottieHandler from "@components/feedback/LottieHanler/LottieHanler";

const ErrorPage = () => {
    const error = useRouteError();

    let errorMessage 
    let errorTextState  

    if(isRouteErrorResponse(error)){
      errorMessage = error.status
      errorTextState = error.statusText
    }else{
      errorMessage = 404
      errorTextState = "not found page"
    }
    
  return (
    <div className="error-page">
    <p>{errorTextState}</p>
    <Link to="/" replace={true}>
    <LottieHandler message="How about going back to safety?" type="notFound" />
    </Link>
  </div>
  )
}

export default ErrorPage
