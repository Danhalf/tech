import React, { useEffect, useState } from "react";
import * as MicroservicesService from "../../services/microservices.service";
import { Microservice } from "../../services/microservices.service";

interface MicroserviceCard {
  services: Microservice[];
}

function MCCard({ services }: MicroserviceCard) {
  return (
    <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-4">
      {services &&
        services.map((service) => {
          return (
            <div key={service.uid} className="card card-custom">
              <div className="card-header pt-5">
                <h3 className="card-title fw-bold text-dark">{service.name}</h3>
              </div>
              <div className="card-body d-flex flex-column justify-content-end pe-0">
                <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">
                  Service started: {service.started}
                </span>
                <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">
                  Ipv4: {service.ipv4}
                </span>
                <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">
                  Port: {service.port}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

function Microservices() {
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

  return (
    <>
      <h1 className="mb-5">Microservices</h1>
      <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
        <MCCard services={listOfServices} />
      </div>
    </>
  );
}

export default Microservices;
