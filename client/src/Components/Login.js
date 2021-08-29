import React from 'react'
import {useGlobalContext} from '../context'
import {CSSTransition} from 'react-transition-group'
import Form from './Form'

function Login() {
    const {utilsState} = useGlobalContext()

    const {loginPageOpen} = utilsState
    return (
            <div className='login'>
                
                <CSSTransition timeout={{enter: 500, exit: 200}} classNames='form' in={loginPageOpen} unmountOnExit>
                    <Form/>
                </CSSTransition>

            </div>
    )
}

export default Login
