import React, { useEffect, useState } from 'react'
import * as MicroservicesService from './service'
import { Microservice, stopService } from './service'
import { Link } from 'react-router-dom'
import { ActionStatus } from '../../../common/models'
import { CustomDropdown } from '../helpers/helpers'

const MicroservicesTableHead = (): JSX.Element => (
    <thead>
        <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
            <th>Microservice</th>
            <th>Actions</th>
        </tr>
    </thead>
)

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
                <div className='card-header d-flex flex-column justify-content-end pb-0'>
                    <h1 className='mb-5'>Microservices</h1>
                </div>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table
                            id='kt_table_users'
                            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                        >
                            <MicroservicesTableHead />
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

// <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-4' key={service.uid}>
// <div className='card card-custom'>
//     <div className='card-header'>
//         <h3 className='card-title fw-bold text-dark'>
//             {service.name}
//         </h3>
//     </div>
//     <div className='card-body d-flex flex-column justify-content-end pe-0'>
//         <span className='fs-6 fw-bolder text-gray-800 d-block mb-2'>
//             Service started: {service.started}
//         </span>
//         <span className='fs-6 fw-bolder text-gray-800 d-block mb-2'>
//             Ipv4: {service.ipv4}
//         </span>
//         <span className='fs-6 fw-bolder text-gray-800 d-block mb-2'>
//             Port: {service.port}
//         </span>
//     </div>
//     <div className='card-footer d-flex justify-content-end'>
//         <button
//             onClick={() => stop(service.uid)}
//             className='btn btn-primary me-2'
//         >
//             Restart
//         </button>
//         <Link
//             to={`microservices/${service.uid}`}
//             className='btn btn-info'
//         >
//             Show info
//         </Link>
//     </div>
// </div>
// </div>
