import React, { useState } from 'react'
import "./Header.css"
import {Link} from "react-router-dom"
import {
    Home,
    HomeOutlined,
    Add,
    AddOutlined,
    Search,
    SearchOutlined,
    AccountCircle,
    AccountCircleOutlined,
  } from "@mui/icons-material";

const Header = () => {

    // console.log(window.location.pathname)
    const [tab,setTab] = useState(window.location.pathname);

  return (
    <div className='header'>
      <Link to = "/" onClick={() => setTab("/")} >
        {tab === "/" ? <Home style={{ color: "#635976"}} /> : <HomeOutlined />}
      </Link>

      <Link to="/newpost" onClick={() => setTab("/newpost")} >
        {tab === "/newpost" ? <Add style={{ color: "#635976"}} /> : <AddOutlined />}
      </Link>

      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? <Search style={{ color: "#635976"}} /> : <SearchOutlined />}
      </Link>

      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? <AccountCircle style={{ color: "#635976"}} /> : <AccountCircleOutlined />}
      </Link>
    </div>
  )
}

export default Header
