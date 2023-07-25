import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
    link: string;
    text: string;
    onClick?: () => void;
}


export const NavigationLink: React.FC<LayoutProps> = ({ link, text, onClick }) => {
    return(
        <div style={{
            margin: '10px'
        }}>
            <Link style={{textDecoration: "none"}} to={link} onClick={onClick ?? undefined}>
                {text}
            </Link>
        </div>
    )
}
