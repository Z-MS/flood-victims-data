import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase-config'
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Notification from "../Notification";

const schema = z.object({
    email: z.string().email(),  
})

type EmailFields = z.infer<typeof schema>

function ForgotPassword() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<EmailFields>({resolver: zodResolver(schema)})
    const [sentVerification, setSentVerification] = useState<boolean>(false)
    
    const appMode = import.meta.env.MODE
    const actionCodeUrl = appMode === 'development' ? "http://localhost:5173" : "https://flood-victims-data.vercel.app/reset"

    const sendPwReset: SubmitHandler<EmailFields> = async(data) => {
        try {
            const actionCodeSettings = {
                url: actionCodeUrl
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

    return (
        <>
            <div>
                <Notification
                    message="Verification email has been sent. Check your inbox."
                    type="info"
                    isVisible={sentVerification}/>
                {
                    !sentVerification && (
                        <form onSubmit={handleSubmit(sendPwReset)}>
                            <div className="form__container">
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input className={`input ` + (errors.email ? 'is-danger' : '')} {...register("email")} type="email" name="email" placeholder="Enter your email" />
                                    </div>
                                    {errors.email && (
                                        <div className="help is-danger">{errors.email.message}</div>
                                    )}
                                </div>
                                <div>
                                    <button className={`button is-rounded is-success submit__button ` + (isSubmitting ? "is-loading": "")} type="submit">Submit</button>
                                </div>
                            </div>
                        </form> 
                    )
                }
            </div>
        </>
    )
}

export default ForgotPassword