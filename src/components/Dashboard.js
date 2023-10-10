import React, { useState } from "react";
import { NavLink, useLocation, useMatch, Link } from 'react-router-dom'
import { MdOutlineAccountCircle, MdOutlineEdit, MdOutlineHistory } from "react-icons/md"
import { FaSoap, FaCog } from 'react-icons/fa'
import axios from "axios";
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';



export default function Dashboard(props) {

    const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [nav, setNav] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    };
    
    const admin = useSelector(state => state.admin);

    function navLinkStyles({isActive}){
        return {
            color: isActive ? `red` : `blue`, // editted
            textDecoration: "none",
            position: "relative",
            letterSpacing: "1.6px",
            fontSize: "0.9rem",
            width: "100%",// ediitted
            // fontWeight: headerActive ? `bolder` : ``,
        }
    }

    const matchProfile = useMatch('/dashboard');
    const matchUsers = useMatch('/dashboard/users/*');
    const matchBookings = useMatch('/dashboard/bookings/*');
    const matchPrices = useMatch('/dashboard/prices/*');
    const matchServices = useMatch('/dashboard/services/*');
    const matchManagement = useMatch('/profile/management');


    return (
        <div className='bg-whiteColor h-max w-full p-6 fixed z-40 drop-shadow-sm flex items-center justify-evenly'>
      <div className=''>
        <Link to='/'>
          <span className='logo text-secondaryColor font-bold text-3xl flex items-center max-sm:text-xl'>Fresh <span className='text-secondaryColor flex '>F <span><FaSoap className="text-secondaryColor" size={30} /></span> ld</span> </span>
        </Link>
      </div>

      <div className='flex gap-6 bg-shadColor p-3 rounded-md'>
        <NavLink to="/profile" isActive={matchProfile} className='flex items-center gap-2 text-mainColor'>
          <MdOutlineAccountCircle />
          <h1>My Account</h1>
        </NavLink>

        <NavLink to="editprofile" isActive={matchManagement} className='flex items-center gap-2 text-mainColor'>
          <MdOutlineEdit />
          <h1>Edit Account</h1>
        </NavLink>
      </div>

      {/* <div className='flex items-center gap-3'>
        <img src={ProfileImage} alt="" className='w-[70px] h-[70px] rounded-[50%]' />
        <h1 className='text-secondaryColor font-semibold text-xl'>
          {user.firstName} {user.lastName}
        </h1>
      </div> */}

      <div className='relative group' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} >
              <div className='flex gap-1 items-center'>
                <FaCog className='text-secondaryColor text-4xl' />
              </div>
              <div className={`${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 space-y-2 bg-secondaryColor text-textColor p-5 rounded-md w-max flex flex-col items-center gap-3`}>
                <button className='btnbtn w-full p-2 px-5 rounded-md text-center bg-textColor text-whiteColor hover:text-secondaryColor hover:bg-whiteColor'> Logout </button>
                <button className='btnbtn w-full p-2 px-5 rounded-md text-center bg-red-500 text-whiteColor hover:bg-red-600'>Delete Account</button>
              </div>
          </div>
    </div>
    )
}
