import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { auth } from '../../firebase-config'
import Navbar from "../Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const schema = z.object({
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    repeatPassword: z.string().min(8).optional()  
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"]
})

type PasswordFields = z.infer<typeof schema>

function ResetPassword() {
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<PasswordFields>({resolver: zodResolver(schema)})
    const [sentVerification, setSentVerification] = useState<boolean>(false)
    
    const sendPwReset: SubmitHandler<PasswordFields> = async(data) => {
        try {
            const actionCodeSettings = {
                url: "http://localhost:5173/reset"
            }
            // reset password
            await sendPasswordResetEmail(auth, data.email!, actionCodeSettings)
            setSentVerification(true)
        } catch (error) {
            console.error(error)
            setError("root", {
                message: `${error}`
            })
        }
    }

    const resetUserPassword: SubmitHandler<PasswordFields> = async(data:any) => { 
        try {
            // reset password
            await confirmPasswordReset(auth, searchParams.get('oobCode')!, data.password)
            console.log("Success")
            navigate('/signin')
        } catch (error) {
            console.error(error)
            setError("root", {
                message: `${error}`
            })
        }
    }

    return (
        <>
            <Navbar/>
            <div>
            {
                !sentVerification && !searchParams.get('oobCode') ? (
                    <form onSubmit={handleSubmit(sendPwReset)}>
                        <div className="form__container">
                        <input {...register("email")} type="email" name="email" placeholder="Enter your email" />
                        {errors.email && (
                            <div className="error">{errors.email.message}</div>
                        )}
                        </div>
                        <div>
                            <input disabled={isSubmitting} className="submit__button" type="submit" value="Submit"/>
                        </div>
                    </form> 
                ) :
            
                (
                    <form onSubmit={handleSubmit(resetUserPassword)}>
                       <div className="form__container">
                            <div>
                                <input {...register("password")} type="password" name="password" placeholder="Create a new password" />
                                {errors.password && (
                                    <div className="error">{errors.password.message}</div>
                                )}
                            </div>
                            <div>
                                <input  {...register("repeatPassword")} type="password" name="repeatPassword" placeholder="Retype the new password" />
                                {errors.repeatPassword && (
                                    <div className="error">{errors.repeatPassword.message}</div>
                                )}
                            </div>
                            <div>
                                <input disabled={isSubmitting} className="submit__button" type="submit" value="Submit"/>
                            </div>
                            {errors.root && <div className="error">
                                { errors.root?.message }
                            </div>}
                        </div>
                    </form>
                )
            }
            </div>
        </>
    )
}

export default ResetPassword