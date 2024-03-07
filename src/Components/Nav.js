import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../Styling/Nav.modules.css'

const Nav = ({children}) => {

    const [show, setShow ] = useState(false)

    const showSideBar = () => {
        setShow(!show)
    }

    const links = [
        {
            url: '/app/dashboard',
            i_class: 'bx bxs-dashboard',
            link_title: 'Dashboard',
            key: 0
        },
        {
            url: "reports",
            i_class: "bx bxs-reports ",
            link_title: "Reports",
            key: 1
        },
        {
            url: "settings",
            i_class: "bx bxs-cog ",
            link_title: "Settings",
            key: 3
        },
    ]


    return (
    <div className='Sidebar'>
        <div className='header_toggle'>
            <i className={`bx bx-menu ${show ? "bx-x" : " "}`} id="header-toggle" onClick={showSideBar}></i>
            </div>
        <aside className={`sidebar ${show ? "review" : " "} `} id="admin-dash-nav">
                    <nav className="admin-dash-nav">
                        <div>
                            <div className="nav_list">
                                { links.map((link)=> ( 
                                <NavLink to={link.url} className="nav_link " key={link.key}>
                                <i className={`${link.i_class}  nav_icon`}></i> <span className="nav_name">{link.link_title}</span>{" "}

                                </NavLink>
                            ))}
                            </div>
                        </div>
                    </nav>
                </aside>

                    <main className={` ${show ? "add_body_padding" : "main"} `}> {children} </main> 
    
    </div>
    )
};

export default Nav;