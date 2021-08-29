import React from 'react'
import { Button } from 'react-bootstrap'
import { useGlobalContext } from '../context'

function Weeks({days}) {
    const {weeks, handleWeeks} = useGlobalContext()

    return (
        <div className='weeks'>
            {
                Object.entries(weeks).map(([key, value])=><Button key={key} variant='outline-info' className={`week ${value || days?.includes(key) ? 'active': ''}`} onClick={!days ? ()=>handleWeeks(key) : null}>
                    {key}
                    </Button>)
            }
        </div>
    )
}

export default Weeks
