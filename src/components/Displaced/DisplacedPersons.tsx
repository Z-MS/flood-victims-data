import { getFirestore, collection, getDocs } from "firebase/firestore"
import app from '../../firebase-config'
import { useEffect, useState } from "react"
import Navbar from '../Navbar'

function DisplacedPersons() {
    const [displaced, setDisplaced] = useState([])
    const db = getFirestore(app)

    async function fetchDisplaced() {
        const querySnapshot: any = 
            await getDocs(collection(db, "displaced"))
        
        setDisplaced(querySnapshot.docs.map((doc: { data: () => any }) => doc.data()))
    }

    useEffect(() => {
        fetchDisplaced()
    })

    return (
        <>
        <Navbar />
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