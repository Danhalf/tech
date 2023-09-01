import { useEffect, useState } from 'react'
import * as MicroservicesService from './service'
import { Microservice, stopService } from './service'
import { Link } from 'react-router-dom'
import { ActionStatus } from 'common/interfaces/IActionStatus'
import { TableHead } from 'components/dashboard/helpers/renderTableHelper'
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper'

enum MicroserviceColumns {
    Microservice = 'Microservice',
    Actions = 'Actions',
}

const microserviceColumnsArray: string[] = Object.values(MicroserviceColumns) as string[]

function Microservices() {
    const [listOfServices, setListOfServices] = useState<Microservice[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    useEffect(() => {
        if (!loaded) {
            MicroservicesService.listServices().then((response) => {
                setListOfServices(response)
                setLoaded(true)
            })
        }
    })

    const stop = (uid: string) => {
        stopService(uid).then((response: ActionStatus) => {
            if (response.status) {
            }
        })
    }

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table
                            id='kt_table_users'
                            className='table align-middle table-row-dashed fs-6 gy-2 no-footer'
                        >
                            <TableHead columns={microserviceColumnsArray} />
                            <tbody className='text-gray-600 fw-bold'>
                                {listOfServices.map((service) => {
                                    return (
                                        <tr key={service.uid}>
                                            <td>
                                                <Link
                                                    to={`microservices/${service.uid}`}
                                                    className='text-gray-800 text-hover-primary mb-1'
                                                >
                                                    {service.name}
                                                </Link>
                                            </td>
                                            <td>
                                                <CustomDropdown
                                                    title='Actions'
                                                    items={[
                                                        {
                                                            menuItemName: 'Restart',
                                                            menuItemAction: () => stop(service.uid),
                                                        },
                                                    ]}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Microservices
