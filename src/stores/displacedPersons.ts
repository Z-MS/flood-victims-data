import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore"
import { db } from '../firebase-config'

// this should be in a set() function in the store
/* async function fetchDisplaced() {
    try {
        const querySnapshot = await getDocs(collection(db, "displaced"))
        const displacedDocs = querySnapshot.docs.map((doc) => doc.data())
        return displacedDocs
    } catch(error) {
        console.error(error)
    }
} */

const displacedPersonsStore = (set: any) => ({
    displacedPersons: [],
    fetchDisplacedPersons: async() => {
        try {
            const querySnapshot = await getDocs(collection(db, "displaced"))
            const displacedDocs = querySnapshot.docs.map((doc) => doc.data())
            set(() => ({displacedPersons: displacedDocs}))  
        } catch(error) {
            console.error(error)
        }        
    }
})

const useDisplacedPersonsStore = create(displacedPersonsStore)
export default useDisplacedPersonsStore
