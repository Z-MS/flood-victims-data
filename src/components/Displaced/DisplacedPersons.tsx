import { getFirestore, collection, getDocs } from "firebase/firestore"
import app, { auth } from '../../firebase-config'
import { useEffect, useState } from "react"
import Navbar from '../Navbar'
import { useLocation } from "react-router-dom"

function DisplacedPersons() {
    const location = useLocation()
    const [displaced, setDisplaced] = useState([])
    const db = getFirestore(app)
    async function fetchDisplaced() {
        const querySnapshot: any = 
            await getDocs(collection(db, "displaced"))
        
        setDisplaced(querySnapshot.docs.map((doc: { data: () => any }) => doc.data()))
    }
    // should track the emailVerified prop for changes so we can display an "Email Verified" banner when it changes
    useEffect(() => {
        fetchDisplaced()
    })

    return (
        <>
        <Navbar />
                {
                    (location.state?.fromSignUp && !auth.currentUser?.emailVerified ) &&
                    (<div className="notice">
                        <p>Please check your email inbox to verify your email address</p>
                    </div>)
                }
            
            <div>
                {
                    displaced.map((disp: any, index) => (
                        <div key={index}>
                            <p>{disp.name}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default DisplacedPersons