import { collection, addDoc } from "firebase/firestore"
import { auth, db } from '../../firebase-config'
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const schema = z.object({
    fullName: z.string().min(3).max(100),
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
        onDisplacedPersonAdded("cancel")
    }

    return (
        <div>
            <button className="error" onClick={cancel}>Cancel</button>
            <form onSubmit={handleSubmit(addDisplacedPerson)}>
                <div className="form__container">
                    <div>
                        <input type="text" placeholder="Full name" {...register("fullName")} />
                        {errors.fullName && (
                            <div className="error">{errors.fullName.message}</div>
                        )}
                        <input type="number" placeholder="age" {...register("age", { valueAsNumber: true })} />
                        {errors.age && (
                            <div className="error">{errors.age.message}</div>
                        )}
                        <input type="number" placeholder="phone" {...register("phone", { valueAsNumber: true })} />
                        {errors.phone && (
                            <div className="error">{errors.phone.message}</div>
                        )}
                    </div>
                    <div>
                        <input type="text" placeholder="employmentStatus" {...register("employmentStatus")} />
                        {errors.employmentStatus && (
                            <div className="error">{errors.employmentStatus.message}</div>
                        )}
                        <input type="text" placeholder="occupation" {...register("occupation")} />
                        {errors.occupation && (
                            <div className="error">{errors.occupation.message}</div>
                        )}
                        <input type="text" placeholder="qualification" {...register("qualification")} /> 
                        {errors.qualification && (
                            <div className="error">{errors.qualification.message}</div>
                        )}
                    </div>
                    <div>
                        <input type="text" placeholder="maritalStatus" {...register("maritalStatus")} />
                        {errors.maritalStatus && (
                            <div className="error">{errors.maritalStatus.message}</div>
                        )}
                        <input type="number" placeholder="numberOfChildren" {...register("numberOfChildren", { valueAsNumber: true })} />
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