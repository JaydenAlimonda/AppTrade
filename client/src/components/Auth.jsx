import { useState } from "react";
import AuthForm from "./AuthForm";
import { useContext } from "react";
import { Context } from "../context/ContextProvider";


export default function Auth() {
    const { login, signup, errMsg } = useContext(Context)
    const [toggle, setToggle] = useState(true)

    const handleToggle = () => {
        setToggle(!toggle)
    }
    console.log(errMsg.response)
    return (
        <>
            {toggle ?
                <AuthForm
                    submit={login}
                    btnText="Login"
                    errMsg ={errMsg}
                />
                :
                <AuthForm
                    submit={signup}
                    btnText="Signup"
                    errMsg ={errMsg}
                />}
            <button onClick={handleToggle}>{toggle ? "Need to signup?" : "Need to Login?"}</button>
        </>


    )
}