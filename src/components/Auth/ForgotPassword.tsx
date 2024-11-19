import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase-config'
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
    email: z.string().email(),  
})

type EmailFields = z.infer<typeof schema>

function ForgotPassword() {
    const navigate = useNavigate()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<EmailFields>({resolver: zodResolver(schema)})
    const [sentVerification, setSentVerification] = useState<boolean>(false)
    
    const sendPwReset: SubmitHandler<EmailFields> = async(data) => {
        try {
            const actionCodeSettings = {
                url: "http://localhost:5173/reset"
            }
            // reset password
            await sendPasswordResetEmail(auth, data.email!, actionCodeSettings)
            setSentVerification(true)
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
            <div>
            {
                !sentVerification && (
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
                )
            }
            </div>
        </>
    )
}

export default ForgotPassword