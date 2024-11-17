import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config'
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)   
})

type SignInFields = z.infer<typeof schema>

function Signin() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignInFields>({resolver: zodResolver(schema)})
    
    const loginUser: SubmitHandler<SignInFields> = async(data) => {
        
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)            
        } catch (error) {
            // check if error is due to network or invalid credentials
            setError("root", {
                message: "Invalid email or password"
            })
        }
    }

    return (
        <>
            <Navbar />
            <div>
               <form onSubmit={handleSubmit(loginUser)}>
               <div className="form__container">
                    <div>
                        <input {...register("email")} type="email" name="email" placeholder="Your email" />
                        {errors.email && (
                            <div className="error">{errors.email.message}</div>
                        )}
                    </div>        
                    <div>
                        <input {...register("password")} type="password" name="password" placeholder="Create a password" />
                        {errors.password && (
                            <div className="error">{errors.password.message}</div>
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
                <p>Don't have an account? <Link to="/signin">Sign up</Link></p>
            </div>
        </>
    )
}

export default Signin