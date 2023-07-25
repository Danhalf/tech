import React from "react";
//import "../styles/table.css"

interface LayoutProps {
  firstRow: string;
  secondRow: string;
}

export const TableHead: React.FC<LayoutProps> = ({ firstRow, secondRow }) => {
  return (
    <thead>
      <tr>
        <th className="TopOfTable">#</th>
        <th className="TopOfTable">{firstRow}</th>
        <th className="TopOfTable">{secondRow}</th>
      </tr>
    </thead>
  );
};
