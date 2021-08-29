import React from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Schedules from './Schedules'
import {Link} from 'react-router-dom'
import { useGlobalContext } from '../context'
import Loader from './Loader'

function Home() {
    const {fetchingState} = useGlobalContext()
    return (
        <div className='home'>
            {fetchingState.loading ? <Loader/> : <Schedules/>}
            <Link to='/schedules/add'><AiOutlinePlus className='btn-schedule'/></Link>
            <h1 className='home-text'>Add your work timimg</h1>
        </div>
    )
}

export default Home
