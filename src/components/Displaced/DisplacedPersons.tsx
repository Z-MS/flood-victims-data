import "./DisplacedPersons.css"
import { collection, getDocs } from "firebase/firestore"
import { auth, db } from '../../firebase-config'
import { useEffect, useState } from "react"
import Navbar from '../Navbar'

function DisplacedPersons() {
    const [displaced, setDisplaced] = useState([])
    const [userVerified, setUserVerified] = useState<boolean|undefined>(false)

    async function fetchDisplaced() {
        try {
            const querySnapshot: any = await getDocs(collection(db, "displaced"))
            setDisplaced(querySnapshot.docs.map((doc: any) => doc.data()))
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setUserVerified(auth.currentUser?.emailVerified)  
        fetchDisplaced()
    }, [])

    return (
        <>
        <Navbar />
                {
                    (auth.currentUser && !userVerified) &&
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