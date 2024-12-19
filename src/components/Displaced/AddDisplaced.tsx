import "../../styles/AddDisplaced.css";
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
    occupation: z.string().min(4).max(60),
    qualification: z.string().min(4).max(60),
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
            <button className="button danger__button" onClick={cancel}>Cancel</button>
            <form onSubmit={handleSubmit(addDisplacedPerson)}>
                <div className="form__container">
                        <div className="field">
                            <label className="label">Full name</label>
                            <div className="control">
                                <input className={`input ` + (errors.fullName ? 'is-danger' : '')} type="text" placeholder="Full name" {...register("fullName")} />
                            </div>
                            {errors.fullName && (
                                <div className="help is-danger">{errors.fullName.message}</div>
                            )}
                        </div>

                        <div id="displaced-form-grid">
                            <div className="field">
                                <label className="label">Gender</label>
                                <div className="control">
                                    <div className="select">
                                        <select {...register("gender")} defaultValue="placeholder">
                                            <option disabled value="placeholder">Select a gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        {errors.gender && (
                                            <div className="help is-danger">{errors.gender.message}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Age</label>
                                <div className="control">
                                    <input className={`input ` + (errors.age ? 'is-danger' : '')} type="number" placeholder="Age" {...register("age", { valueAsNumber: true })} />
                                </div>
                                {errors.age && (
                                    <div className="help is-danger">{errors.age.message}</div>
                                )}
                            </div>
                            <div className="field">
                                <label className="label">Phone number</label>
                                <div className="control">
                                    <input className={`input ` + (errors.phone ? 'is-danger' : '')} type="number" placeholder="Phone number" {...register("phone", { valueAsNumber: true })} />
                                </div>
                                {errors.phone && (
                                    <div className="help is-danger">{errors.phone.message}</div>
                                )}
                            </div>
                            
                            <div className="field">
                                <label className="label">Employment status</label>
                                <div className="control">
                                    <div className="select">
                                        <select {...register("employmentStatus")} defaultValue="placeholder">
                                            <option disabled value="placeholder">Select employment status</option>
                                            <option value="Employed">Employed</option>
                                            <option value="Unemployed">Unemployed</option>
                                        </select>
                                        {errors.employmentStatus && (
                                            <div className="help is-danger">{errors.employmentStatus.message}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Occupation</label>
                                <div className="control">
                                    <input className={`input ` + (errors.occupation ? 'is-danger' : '')} type="text" placeholder="Occupation" {...register("occupation")} />
                                    {errors.occupation && (
                                        <div className="help is-danger">{errors.occupation.message}</div>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Qualification</label>
                                <div className="control">
                                    <input className={`input ` + (errors.qualification ? 'is-danger' : '')} type="text" placeholder="Qualification" {...register("qualification")} /> 
                                    {errors.qualification && (
                                        <div className="help is-danger">{errors.qualification.message}</div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="field">
                                <label className="label">Marital status</label>
                                <div className="select ">
                                    <div className="control">
                                        <select {...register("maritalStatus")} defaultValue="placeholder">
                                            <option disabled value="placeholder">Select marital status</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Divorced">Divorced</option>
                                        </select>
                                        {errors.maritalStatus && (
                                            <div className="help is-danger">{errors.maritalStatus.message}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Number of children</label>
                                <div className="control">
                                    <input className={`input ` + (errors.numberOfChildren ? 'is-danger' : '')} type="number" placeholder="Number of children" {...register("numberOfChildren", { valueAsNumber: true })} />
                                    {errors.numberOfChildren && (
                                        <div className="help is-danger">{errors.numberOfChildren.message}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    {errors.root && <div className="error">
                        { errors.root?.message }
                    </div>}
                    <div className="field">
                        <input disabled={isSubmitting} className="submit__button" type="submit" value="Submit"/>
                    </div>
                </div>
            </form>
        </div>
    )
}