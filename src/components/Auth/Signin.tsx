import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config'
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)   
})

type SignInFields = z.infer<typeof schema>

function Signin() {
    const navigate = useNavigate()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignInFields>({resolver: zodResolver(schema)})
    const loginUser: SubmitHandler<SignInFields> = async(data) => {
        
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            // set user signed in from store
            navigate('/displaced')         
        } catch (error) {
            // check if error is due to network or invalid credentials
            setError("root", {
                message: "Invalid email or password"
            })
        }
    }

    return (
        <>
            <div>
               <form onSubmit={handleSubmit(loginUser)}>
               <div className="form__container">
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className={`input ` + (errors.email ? 'is-danger' : '')} {...register("email")} type="email" name="email" placeholder="Your email" />
                        </div>
                        {errors.email && (
                            <div className="help is-danger">{errors.email.message}</div>
                        )}
                    </div>        
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className={`input ` + (errors.password ? 'is-danger' : '')} {...register("password")} type="password" name="password" placeholder="Your password" />
                        </div>
                        {errors.password && (
                            <div className="help is-danger">{errors.password.message}</div>
                        )}
                    </div>
                    <div>
                        <button className={`button is-rounded is-success submit__button ` + (isSubmitting ? "is-loading": "")} type="submit">Submit</button>
                    </div>
                    {errors.root && <div className="help is-danger">
                        { errors.root?.message }
                    </div>}
                </div>
                </form>
                <p><Link to="/forgotpassword">Forgot password?</Link></p>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </>
    )
}

export default Signin