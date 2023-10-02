/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Microservice, listServices, stopService } from './service';
import { Link } from 'react-router-dom';
import { TableHead } from 'components/dashboard/helpers/renderTableHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { Status } from '../users/user.service';
import { AxiosError } from 'axios';
import { useToast } from '../helpers/renderToastHelper';

enum MicroserviceColumns {
    ID = 'Index',
    MICROSERVICE = 'Microservice',
    STARTED = 'Started',
    ACTIONS = 'Actions',
}

const microserviceColumnsArray: string[] = Object.values(MicroserviceColumns) as string[];

export const Microservices = () => {
    const [listOfServices, setListOfServices] = useState<Microservice[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const { handleShowToast } = useToast();

    const updateMicroservices = (): void => {
        listServices().then((response) => {
            setListOfServices(response);
            setLoaded(true);
        });
    };

    useEffect(() => {
        if (!loaded) {
            updateMicroservices();
        }
    });

    const handleStopService = async (uid: string): Promise<void> => {
        try {
            if (uid) {
                const response = await stopService(uid);
                if (response.status === Status.OK) {
                    updateMicroservices();
                    handleShowToast({
                        message: 'Microservice successfully stopped',
                        type: 'success',
                    });
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
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
                                            <td className='text-gray-800'>{service.started}</td>
                                            <td>
                                                <CustomDropdown
                                                    title='Actions'
                                                    items={[
                                                        {
                                                            menuItemName: 'Restart',
                                                            menuItemAction: () =>
                                                                handleStopService(service.uid),
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
