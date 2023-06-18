import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../context'

function Header() {
    const { utilsState, logout } = useGlobalContext()
    const [downbarOpen, setDownBar] = useState(false)
    const profileElement = useRef(null)
    const downbarElement = useRef(null)

    const changeDownbarPosition = () => {
        const position = profileElement.current.getBoundingClientRect()
        const { top, left, right } = position
        const center = (left + right) / 2
        downbarElement.current.style.left = `${center - 58}px`
        downbarElement.current.style.top = `${top + 30}px`
    }

    useEffect(() => {
        window.addEventListener('resize', changeDownbarPosition)

        return () => window.removeEventListener('resize', changeDownbarPosition)
    }
    )

    useEffect(changeDownbarPosition, [utilsState.fullName])

    return (
        <>
            <div className='header'>
                <h1>Daily Apps scheduler</h1>
                <p className='btn-name' onMouseEnter={() => setDownBar(true)} ref={profileElement} onMouseLeave={() => setDownBar(false)}>{utilsState.fullName ? utilsState.fullName : 'Login'}</p>
            </div>
            <ul className={`profile-downbar ${downbarOpen ? 'open' : ''}`} ref={downbarElement} onMouseEnter={() => setDownBar(true)} onMouseLeave={() => setDownBar(false)}>
                <li>View profile</li>
                <li onClick={logout}>Logout</li>
            </ul>
        </>
    )
}

export default Header
