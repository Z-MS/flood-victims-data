import { useEffect, useRef } from 'react'
import '../styles/Notification.css'

type NotificationProps = {
    message: String,
    type: String,
    includeButton?: boolean,
    isVisible: boolean | undefined
}

function Notification ({ message, type, includeButton, isVisible }: NotificationProps) {
    const notificationBox = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(isVisible) {
            notificationBox.current?.classList.remove("fade-out")
            notificationBox.current?.classList.add("fade-in")
        } else {
            notificationBox.current?.classList.remove("fade-in")
            notificationBox.current?.classList.add("fade-out")
        }
    }, [isVisible])

    return (
        <div className={"notification is-light " + "is-" + type} ref={notificationBox}>
            { includeButton && <button className="delete"></button>}
            <p>{message}</p>
        </div>
    )
}

export default Notification