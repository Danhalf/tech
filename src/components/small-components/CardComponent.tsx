import React, { useCallback } from 'react';
// import CardMenu from './CardMenu';

interface CardLayoutProps {
  name: string;
  description: string;
  ipv4: string;
  port: string;
  index: number;
  uid: string;
  onRestartSerice: (id: number) => void;
}

export const Card: React.FC<CardLayoutProps> = ({ name, description, onRestartSerice, index, ipv4, port, uid }) => {
  const restart = useCallback(() => {
    onRestartSerice(index);
  }, []);
  return (
    <>
      <div className="card mc-cards">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">{ipv4}</p>
          <p className="card-text">{port}</p>
          {/* <CardMenu id={index} uid={uid} /> */}
          <button onClick={restart}>Restart</button>
        </div>
      </div>
    </>
  );
};
