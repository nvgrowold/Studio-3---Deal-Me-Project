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
            url: "products",
            i_class: "bx bxs-shopping-bag-alt ",
            link_title: "Products",
            key: 1
        },
        {
            url: "users",
            i_class: "bx bxs-user ",
            link_title: "Users",
            key: 2
        },
        {
            url: "sales",
            i_class: "bx bxs-wallet ",
            link_title: "Sales",
            key: 3
        },
        {
            url: "deliveries",
            i_class: "bx bxs-truck ",
            link_title: "Deliveries",
            key: 4
        },
        {
            url: "messages",
            i_class: "bx bxs-message-dots ",
            link_title: "Messages",
            key: 5
        },
        {
            url: "settings",
            i_class: "bx bxs-cog ",
            link_title: "Settings",
            key: 6
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