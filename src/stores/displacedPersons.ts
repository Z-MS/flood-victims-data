import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore"
import { db } from '../firebase-config'

const displacedPersonsStore = (set: any) => ({
    displacedDataLoading: false,
    displacedPersons: [],
    totalDisplacedCount: 0,
    numberOfChildren: 0,
    totalFemalesCount: 0,
    numberOfWidows: 0,
    numberOfDivorcees: 0,
    fetchDisplacedPersons: async() => {
        try {
            set(() => ({ displacedDataLoading: true, displacedDataLoaded: false }))
            const querySnapshot = await getDocs(collection(db, "displaced"))
            const displacedDocs = querySnapshot.docs.map((doc) => doc.data())
            
            function getCounts() {
                let totalCount = 0;
                let childrenCount = 0;
                let totalFemalesCount = 0;
                let widowsCount = 0;
                let divorceesCount = 0;

                displacedDocs.forEach((person: any) => {
                    totalCount++;
                    if(person.age < 13) {
                        childrenCount++
                    }
                    if(person.gender === 'Female') {
                        totalFemalesCount++
                    }
                    if(person.maritalStatus === 'Widowed') {
                        widowsCount++
                    }
                    if(person.maritalStatus === 'Divorced') {
                        divorceesCount++
                    }
                })
                return { totalCount, childrenCount, totalFemalesCount, widowsCount, divorceesCount }
            }

            const counts = getCounts()

            set(() => ({
                displacedDataLoading: false,
                displacedPersons: displacedDocs,
                totalDisplacedCount: counts.totalCount,
                numberOfChildren: counts.childrenCount,
                totalFemalesCount: counts.totalFemalesCount,
                numberOfWidows: counts.widowsCount,
                numberOfDivorcees: counts.divorceesCount
             }))
        } catch(error) {
            console.error(error)
        } finally {
            set({
                displacedDataLoading: false
            })
        }
    }
})

const useDisplacedPersonsStore = create(displacedPersonsStore)
export default useDisplacedPersonsStore
