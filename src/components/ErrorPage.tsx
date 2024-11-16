import { Link } from "react-router-dom"

export default function ErrorPage() {
    return(
        <div>
            Page not found. Go to <Link to="/">the homepage</Link>
        </div>
    )
}