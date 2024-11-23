import { collection, addDoc } from "firebase/firestore"
import { auth, db } from '../../firebase-config'
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const schema = z.object({
    fullName: z.string().min(3).max(100),
    gender: z.string().min(4).max(6),
    age: z.number().min(0).max(150),
    phone: z.number().max(11111111111),
    employmentStatus: z.string().max(10),
    occupation: z.string().max(60),
    qualification: z.string().max(60),
    maritalStatus: z.string().max(8),
    numberOfChildren: z.number().min(0)
})

type DisplacedPersonFields = z.infer<typeof schema>

export default function AddDisplaced({ onDisplacedPersonAdded }: any) {
    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<DisplacedPersonFields>({resolver: zodResolver(schema)})
    
    const addDisplacedPerson: SubmitHandler<DisplacedPersonFields> = async(data) => {
        try {
            await addDoc(collection(db, "displaced"), {
                ...data, addedBy: auth.currentUser?.uid
            })
            onDisplacedPersonAdded("create")
        } catch(error) {
            console.log(error)
            setError("root", {
                message: `${error}`
            })
        }
    }

    useEffect(() => {
        reset()
    }, [isSubmitSuccessful])

    function cancel() {
        reset()
        onDisplacedPersonAdded("cancel")
    }

    return (
        <div>
            <button className="error" onClick={cancel}>Cancel</button>
            <form onSubmit={handleSubmit(addDisplacedPerson)}>
                <div className="form__container">
                    <div>
                        <label>Full name</label>
                        <input type="text" placeholder="Full name" {...register("fullName")} />
                        {errors.fullName && (
                            <div className="error">{errors.fullName.message}</div>
                        )}

                        <label>Gender</label>
                        <select {...register("gender")} defaultValue="placeholder">
                            <option disabled value="placeholder">Select a gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && (
                            <div className="error">{errors.gender.message}</div>
                        )}

                        <label>Age</label>
                        <input type="number" placeholder="age" {...register("age", { valueAsNumber: true })} />
                        {errors.age && (
                            <div className="error">{errors.age.message}</div>
                        )}

                        <label>Phone number</label>
                        <input type="number" placeholder="Phone number" {...register("phone", { valueAsNumber: true })} />
                        {errors.phone && (
                            <div className="error">{errors.phone.message}</div>
                        )}
                    </div>
                    <div>
                        <label>Employment status</label>
                        <select {...register("employmentStatus")} defaultValue="placeholder">
                            <option disabled value="placeholder">Select employment status</option>
                            <option value="Employed">Employed</option>
                            <option value="Unemployed">Unemployed</option>
                        </select>
                        {errors.employmentStatus && (
                            <div className="error">{errors.employmentStatus.message}</div>
                        )}

                        <label>Occupation</label>
                        <input type="text" placeholder="Occupation" {...register("occupation")} />
                        {errors.occupation && (
                            <div className="error">{errors.occupation.message}</div>
                        )}

                        <label>Qualification</label>
                        <input type="text" placeholder="Qualification" {...register("qualification")} /> 
                        {errors.qualification && (
                            <div className="error">{errors.qualification.message}</div>
                        )}
                    </div>
                    <div>
                        <label>Marital status</label>
                        <select {...register("maritalStatus")} defaultValue="placeholder">
                            <option disabled value="placeholder">Select marital status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                        {errors.maritalStatus && (
                            <div className="error">{errors.maritalStatus.message}</div>
                        )}

                        <label>Number of children</label>
                        <input type="number" placeholder="Number of children" {...register("numberOfChildren", { valueAsNumber: true })} />
                        {errors.numberOfChildren && (
                            <div className="error">{errors.numberOfChildren.message}</div>
                        )}
                    </div>
                    {errors.root && <div className="error">
                        { errors.root?.message }
                    </div>}
                    <input disabled={isSubmitting} className="submit__button" type="submit" value="Add Displaced Person"/>
                </div>
            </form>
        </div>
    )
}