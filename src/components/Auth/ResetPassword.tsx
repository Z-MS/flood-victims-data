import { confirmPasswordReset } from "firebase/auth";
import { auth } from '../../firebase-config'
import { useNavigate, useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    password: z.string().min(8),
    repeatPassword: z.string().min(8)  
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"]
})

type PasswordFields = z.infer<typeof schema>

function ResetPassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<PasswordFields>({resolver: zodResolver(schema)})

    const resetUserPassword: SubmitHandler<PasswordFields> = async(data:any) => { 
        try {
            // reset password
            await confirmPasswordReset(auth, location.state.confirmationCode, data.password)
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
            <div>
            {
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
            }
            </div>
        </>
    )
}

export default ResetPassword