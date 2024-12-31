import { useEffect, useRef } from 'react'
import '../styles/Notification.css'

type NotificationProps = {
    message: String,
    type: String,
    includeButton?: boolean,
    isOpen: boolean | undefined
}

function Notification ({ message, type, includeButton, isOpen }: NotificationProps) {
    const notificationBox = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(isOpen) {
            notificationBox.current?.classList.remove("fade-out")
            notificationBox.current?.classList.add("fade-in")
        } else {
            notificationBox.current?.classList.remove("fade-in")
            notificationBox.current?.classList.add("fade-out")
        }
    }, [isOpen])

    return (
        <div className={"notification is-light " + "is-" + type} ref={notificationBox}>
            { includeButton && <button className="delete"></button>}
            <p>{message}</p>
        </div>
    )
}

export default Notification