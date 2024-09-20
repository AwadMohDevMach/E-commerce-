import {useState} from "react"
import axios from "axios";


type TStatus = "idel" | "checking" | "avilable" | "notAvilable" | "faild";


const useCheckEmailAvilability = () => {
    const [emailAvilabilitySatus , setEmailAvilabilitySatus] = useState<TStatus>("idel")

    const [entredEmail , setEntredEmail] = useState<null|string>(null)

    const checkEmailAvilability = async (email : string) => {
        setEntredEmail(email)
        setEmailAvilabilitySatus("checking")
        try {
            const response = await axios.get(`users?email=${email}`)
            if(!response.data.length){
                setEmailAvilabilitySatus("avilable")
            }else{
                setEmailAvilabilitySatus("notAvilable")
            }
        } catch (error) {
            setEmailAvilabilitySatus("faild")
        }
    }

    const resetCheckEmailAvilability = () => {
        setEmailAvilabilitySatus("idel")
        setEntredEmail(null)
    }
    return{emailAvilabilitySatus ,entredEmail , checkEmailAvilability , resetCheckEmailAvilability}
}

export default useCheckEmailAvilability

