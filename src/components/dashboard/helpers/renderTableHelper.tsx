import { IMicroserviceServerData } from 'common/interfaces/IMicroserviceServerData'

const getUniqValues = ({ values }: { values: IMicroserviceServerData[] }) => {
    const columns = new Set<string>()

    values.forEach((obj: IMicroserviceServerData): void => {
        Object.keys(obj).forEach((key: string): void => {
            columns.add(key)
        })
    })

    return [...columns]
}

export const TableHead = ({ columns }: { columns: string[] }): JSX.Element => (
    <thead>
        <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200'>
            {columns.map((column: string) => (
                <th key={column}>{column}</th>
            ))}
        </tr>
    </thead>
)

const TableBody = ({ data }: { data: IMicroserviceServerData[] }) => (
    <tbody>
        {data.map((row: IMicroserviceServerData, index: number) => (
            <tr key={index}>
                {Object.values(row).map((cell: string, cellIndex: number) => (
                    <td key={`${index}-${cellIndex}`}>{cell}</td>
                ))}
            </tr>
        ))}
    </tbody>
)

export const renderTable = (data: IMicroserviceServerData[]) => {
    const columns = getUniqValues({ values: data })
    return (
        <div className='w-100 table-responsive table-responsive-horizontal'>
            <table className='table table-row-dashed table-row-gray-300 gy-7'>
                <TableHead columns={columns} />
                <TableBody data={data} />
            </table>
        </div>
    )
}
