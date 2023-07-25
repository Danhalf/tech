import React, { useCallback, useEffect, useState } from 'react';
import './styles/microservices.css';
import { Card } from './small-components/CardComponent';
import * as MicroservicesService from './../services/microservices.service';

//MC means microservices
interface MCCardProps {
  services: any[];
  onRestartSerice: (id: number) => void;
}
// Adding cards and names and descriptions for them
function MCCard({ services, onRestartSerice }: MCCardProps) {
  return (
    <div>
      {services &&
        services.map((service, index) => {
          return (
            <Card
              key={index}
              name={service.name}
              description={'Service started: ' + service.started}
              ipv4={'Ipv4: ' + service.ipv4}
              port={'Port: ' + service.port}
              index={service.index}
              uid={service.uid}
              onRestartSerice={onRestartSerice}
            />
          );
        })}
    </div>
  );
}

// MCs page component
const Microservices: React.FC = () => {
  const [listOfServices, setListOfServices] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!loaded) {
      const microservices = MicroservicesService.listServices().then(
        (response) => {
          setListOfServices(response.data);
          setLoaded(true);
          return response.data;
        },
        (error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

          //setLoading(false);
          //setMessage(resMessage);
        }
      );
    }
  }, [listOfServices]);

  const onRestartSerice = useCallback((id: number) => {
    const response = MicroservicesService.restartService(id).then((response) => {
      return response.data;
    });
  }, []);

  return (
    <div>
      <p className="about">Microservices</p>
      <MCCard onRestartSerice={onRestartSerice} services={listOfServices} />
    </div>
  );
};

export default Microservices;
