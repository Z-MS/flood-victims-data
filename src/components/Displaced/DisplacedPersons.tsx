import "./DisplacedPersons.css"
import { collection, getDocs } from "firebase/firestore"
import { auth, db } from '../../firebase-config'
import { useEffect, useRef, useState } from "react"
import AddDisplaced from "./AddDisplaced"

function DisplacedPersons() {
    const dialog = useRef<HTMLDialogElement>(null)
    const [displaced, setDisplaced] = useState([])
    const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false)
    const [userVerified, setUserVerified] = useState<boolean|undefined>(false)

    function openCreateForm() {
        dialog.current?.showModal()
    }

    function closeCreateForm(message: string) {
        if(message === 'create') {
            fetchDisplaced()
        }
        dialog.current?.close()
    }

    async function fetchDisplaced() {
        try {
            const querySnapshot: any = await getDocs(collection(db, "displaced"))
            setDisplaced(querySnapshot.docs.map((doc: any) => doc.data()))
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if(auth.currentUser) {
            setIsUserSignedIn(true)
            setUserVerified(auth.currentUser?.emailVerified)  
            fetchDisplaced()
        }
    }, [])
 
    return (
        <>
                {
                // we should hide this when it's loading    
                    isUserSignedIn && !userVerified &&
                    (<div className="notice">
                        <p>Please check your email inbox to verify your email address</p>
                        <button>Resend link</button>
                    </div>)
                }
            
            <div>
                <button onClick={openCreateForm}>Add displaced person</button>
                {
                    
                    (
                        <dialog ref={dialog} id="add-displaced-dialog">
                            <AddDisplaced onDisplacedPersonAdded={closeCreateForm}/>
                        </dialog>
                    )
                }
                {
                    displaced.map((disp: any, index) => (
                        <div key={index}>
                            <p>{disp.fullName}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default DisplacedPersons