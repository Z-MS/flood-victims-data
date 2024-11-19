import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function EmailAction() {
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()

    useEffect(() => {
        if(searchParams.get('mode') === 'verifyEmail') {
            navigate('/displaced')
        }
        
        if(searchParams.get('mode') === 'resetPassword') {
            // verify password
            navigate('/resetpassword', { state: { confirmationCode: searchParams.get('oobCode') } })
        } else {
            navigate('/')
        }
    }, [])

    return (
        <></>
    )
}