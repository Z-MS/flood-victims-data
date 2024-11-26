import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../../firebase-config'
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const schema = z.object({
    email: z.string().email(),
    fullName: z.string(),
    password: z.string().min(8).regex(passwordRegex, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" }),
    repeatPassword: z.string().min(8)   
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"]
})

type SignUpFields = z.infer<typeof schema>

function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignUpFields>({resolver: zodResolver(schema)})
    
    const createNewUser: SubmitHandler<SignUpFields> = async(data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password)
            // Send confirmation email
            sendEmailVerification(auth.currentUser!)
            navigate('/displaced')
        } catch (error) {
            setError("root", {
                message: `${error}`
            })
        }
    }

    return (
        <>
            <div>
               <form onSubmit={handleSubmit(createNewUser)}>
               <div className="form__container">
                    <div>
                        <input {...register("email")} type="email" name="email" placeholder="Your email" />
                        {errors.email && (
                            <div className="error">{errors.email.message}</div>
                        )}
                    </div>
                    <div>
                        <input {...register("fullName")} type="text" name="fullName" placeholder="Your full name" />
                        {errors.fullName && (
                            <div className="error">{errors.fullName.message}</div>
                        )}
                    </div>
                    <div>
                        <input {...register("password")} type="password" name="password" placeholder="Create a password" />
                        {errors.password && (
                            <div className="error">{errors.password.message}</div>
                        )}
                    </div>
                    <div>
                        <input  {...register("repeatPassword")} type="password" name="repeatPassword" placeholder="Repeat your password" />
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
                <p>Already have an account? <Link to="/signin">Sign In</Link></p>
            </div>
        </>
    )
}

export default Signup