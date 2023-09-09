/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import * as MicroservicesService from './service';
import { Microservice, stopService } from './service';
import { Link } from 'react-router-dom';
import { TableHead } from 'components/dashboard/helpers/renderTableHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';

enum MicroserviceColumns {
    ID = 'Index',
    Microservice = 'Microservice',
    Actions = 'Actions',
}

const microserviceColumnsArray: string[] = Object.values(MicroserviceColumns) as string[];

export const Microservices = () => {
    const [listOfServices, setListOfServices] = useState<Microservice[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    useEffect(() => {
        if (!loaded) {
            MicroservicesService.listServices().then((response) => {
                setListOfServices(response);
                setLoaded(true);
            });
        }
    });

    const stop = (uid: string) => {
        stopService(uid).then();
    };

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table className='table align-middle table-row-dashed fs-6 gy-3 no-footer'>
                            <TableHead columns={microserviceColumnsArray} />
                            <tbody className='text-gray-600 fw-bold'>
                                {listOfServices.map((service) => {
                                    return (
                                        <tr key={service.uid}>
                                            <td className='text-gray-800'>{service.index}</td>
                                            <td>
                                                <Link
                                                    to={`microservices/${service.uid}`}
                                                    className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
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
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
