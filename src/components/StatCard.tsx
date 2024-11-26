import "../styles/Statcard.css"
import { ReactNode } from "react"

type StatCardProps = {
    title: String,
    stats: number,
    children?: ReactNode
}

function StatCard({ title, stats, children }: StatCardProps) {
    return (
        <>
            <div className="stat-card">
                <p className="stat-title">{title}</p>
                <p className="number">{stats}</p>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default StatCard