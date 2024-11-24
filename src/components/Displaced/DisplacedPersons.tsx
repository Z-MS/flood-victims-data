import "./DisplacedPersons.css"
import { auth } from '../../firebase-config'
import { useEffect, useRef, useState, useMemo } from "react"
import AddDisplaced from "./AddDisplaced"
import useDisplacedPersonsStore from '../../stores/displacedPersons'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function DisplacedPersons() {
    const displacedPersons = useDisplacedPersonsStore((state: any) => state.displacedPersons)
    const { fetchDisplacedPersons, setUpdateStatus, displacedDataLoading } = useDisplacedPersonsStore()
  
    const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false)
    const [userVerified, setUserVerified] = useState<boolean|undefined>(false)
    
    const dialog = useRef<HTMLDialogElement>(null)

    const defaultColDef = useMemo(() => ({
        filter: true
    }), [])

    const [colDefs, setColDefs] = useState([
        {
            field: "fullName",
            headerName: "Name"
        },
        { field: "age" },
        { field: "gender" },
        { field: "phone" },
        { field: "employmentStatus" },
        { field: "occupation" },
        { field: "qualification" },
        { field: "maritalStatus" },
        { field: "numberOfChildren" }
    ])


    function openCreateForm() {
        dialog.current?.showModal()
    }

    function closeCreateForm(message: string) {
        if(message === 'create') {
            setUpdateStatus(true)
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
                <div className="ag-theme-quartz"style={{height: 500}}>
                    <AgGridReact
                        loading={displacedDataLoading}
                        rowData={displacedPersons}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={10}
                        paginationPageSizeSelector={[10, 20, 50]}
                    />
                </div>
            </div>
        </>
    )
}

export default DisplacedPersons