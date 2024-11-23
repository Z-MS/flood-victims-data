import "./DisplacedPersons.css"
import { auth } from '../../firebase-config'
import { useEffect, useRef, useState } from "react"
import AddDisplaced from "./AddDisplaced"
import useDisplacedPersonsStore from '../../stores/displacedPersons'

function DisplacedPersons() {
    const displacedPersons = useDisplacedPersonsStore((state: any) => state.displacedPersons)
    const fetchDisplacedPersons = useDisplacedPersonsStore((state: any) => state.fetchDisplacedPersons)
  
    const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false)
    const [userVerified, setUserVerified] = useState<boolean|undefined>(false)
    
    const dialog = useRef<HTMLDialogElement>(null)

    function openCreateForm() {
        dialog.current?.showModal()
    }

    function closeCreateForm(message: string) {
        if(message === 'create') {
            fetchDisplacedPersons()
        }
        dialog.current?.close()
    }

    useEffect(() => {
        if(auth.currentUser) {
            setIsUserSignedIn(true)
            setUserVerified(auth.currentUser?.emailVerified)  
        }
        fetchDisplacedPersons()
    }, [])
 
    return (
        <>
                {   
                    isUserSignedIn && !userVerified &&
                    (<div className="notice">
                        <p>Please check your email inbox to verify your email address</p>
                        <button>Resend link</button>
                    </div>)
                }
            
            <div>
                {isUserSignedIn && (<button onClick={openCreateForm}>Add displaced person</button>) }
                <dialog ref={dialog} id="add-displaced-dialog">
                    <AddDisplaced onDisplacedPersonAdded={closeCreateForm}/>
                </dialog>
                    
                {
                    displacedPersons.map((disp: any, index:any) => (
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