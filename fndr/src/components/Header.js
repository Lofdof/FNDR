import React from 'react';
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <header>
                <div className="container">
                    <div className="inner-content">
                            <Link to="/">f_nd_r</Link>
                    </div>
                </div>
            </header>
        </div>
    )
}
