import { getFirestore, collection, getDocs } from "firebase/firestore"
import app, { auth } from '../../firebase-config'
import { useEffect, useState } from "react"
import Navbar from '../Navbar'

function DisplacedPersons() {
    const [displaced, setDisplaced] = useState([])
    const db = getFirestore(app)
    async function fetchDisplaced() {
        const querySnapshot: any = await getDocs(collection(db, "displaced"))
        
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
                    (!auth.currentUser?.emailVerified) &&
                    (<div className="notice">
                        <p>Please check your email inbox to verify your email address</p>
                        <button>Resend link</button>
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