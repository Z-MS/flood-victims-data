import "../../styles/DisplacedPersons.css"
import { useRef, useState, useMemo } from "react"
import AddDisplaced from "./AddDisplaced"
import useDisplacedPersonsStore from '../../stores/displacedPersons'
import useAuthenticationStore from "../../stores/auth"
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Link } from "react-router-dom"

function DisplacedPersons() {
    const { isUserSignedIn, isUserEmailVerified, authStateLoading } = useAuthenticationStore()
    const displacedPersons = useDisplacedPersonsStore((state: any) => state.displacedPersons)
    
    const { fetchDisplacedPersons, displacedDataLoading } = useDisplacedPersonsStore()
    
    const dialog = useRef<HTMLDialogElement>(null)

    const defaultColDef = useMemo(() => ({
        filter: true
    }), [])

    const [colDefs] = useState([
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
            // fetch data from Firebase
            fetchDisplacedPersons()
        }
        dialog.current?.close()
    }

    if(!authStateLoading) {
        if(!isUserSignedIn) {
            return (
                <div>
                    <p><Link to="/signin">Sign in</Link> to access this page.</p>
                </div>
            )
        } 
        
        if(!isUserEmailVerified) {
            return (
                <div>
                    <p>Please check your email inbox to verify your email address</p>
                    <button className="button notice">Resend link</button>
                </div>
            )
        }
    }
 
    return (
        <div id="displaced-page-container">
            {
                authStateLoading ? (
                    <p>Checking login status...</p>
                )
                :
                (<div>    
                    <button className="button add__button" onClick={openCreateForm}>Add displaced person</button>
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
                </div>)
            }
        </div>
    )
}

export default DisplacedPersons