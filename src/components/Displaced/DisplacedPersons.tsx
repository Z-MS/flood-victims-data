import "../../styles/DisplacedPersons.css"
import { auth } from '../../firebase-config'
import { useEffect, useRef, useState, useMemo } from "react"
import AddDisplaced from "./AddDisplaced"
import useDisplacedPersonsStore from '../../stores/displacedPersons'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Link } from "react-router-dom"

function DisplacedPersons() {
    const displacedPersons = useDisplacedPersonsStore((state: any) => state.displacedPersons)
    const { fetchDisplacedPersons, displacedDataLoading } = useDisplacedPersonsStore()
    
    const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false)
    const [userVerified, setUserVerified] = useState<boolean>(false)
    
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

    useEffect(() => {
        if(auth.currentUser) {
            setIsUserSignedIn(true)
            setUserVerified(auth.currentUser?.emailVerified)  
        }
    }, [])

    if(!isUserSignedIn) {
        return(
            <div>
                <p><Link to="/signin">Sign in</Link> to access this page.</p>
            </div>
        )
    }
 
    return (
        <div id="displaced-page-container">
            {   
                isUserSignedIn && !userVerified &&
                (<div>
                    <p>Please check your email inbox to verify your email address</p>
                    <button className="button notice">Resend link</button>
                </div>)
            }
            
            <div>
                { userVerified && 
                    (<> 
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
                    </>)
                }
            </div>
        </div>
    )
}

export default DisplacedPersons