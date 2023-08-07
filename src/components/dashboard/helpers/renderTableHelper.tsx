import { IMicroserviceServerData } from '../interfaces/interfaces'

const TableHeader = ({ data }: { data: IMicroserviceServerData[] }) => {
    const columns = new Set<string>()

    data.forEach((obj: IMicroserviceServerData): void => {
        Object.keys(obj).forEach((key: string): void => {
            columns.add(key)
        })
    })
    return (
        <thead>
            <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200'>
                {[...columns].map((column: string, index: number) => (
                    <th key={`${column}-${index}`}>{column}</th>
                ))}
            </tr>
        </thead>
    )
}

const TableBody = ({ data }: { data: IMicroserviceServerData[] }) => (
    <tbody>
        {data.map((row: IMicroserviceServerData, index: number) => (
            <tr key={`${data}-${index}`}>
                {Object.values(row).map((cell: string) => (
                    <td key={`${Math.random()}-${cell}-${index}`}>{cell}</td>
                ))}
            </tr>
        ))}
    </tbody>
)

export const renderTable = (data: IMicroserviceServerData[] | any[]) => {
    return (
        <div className='w-100 table-responsive table-responsive-horizontal'>
            <table className='table table-row-dashed table-row-gray-300 gy-7'>
                <TableHeader data={data} />
                <TableBody data={data} />
            </table>
        </div>
    )
}
