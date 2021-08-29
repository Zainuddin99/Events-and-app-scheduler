import React from 'react'
import { Button } from 'react-bootstrap'
import { useGlobalContext } from '../context'

function Form() {
    const {utilsState, utilsStateDispatch, handleChange, inputs, handleSubmit, formError, formSuccessMessage} = useGlobalContext()

    const {loginPageState} = utilsState
    const {firstName, lastName, userName, password} = inputs
    return (
        <form onSubmit={handleSubmit}>

                    <h5>{loginPageState ? 'Please Login to continue...' : 'Sign up'}</h5>

                    { !loginPageState && <input type='text' placeholder='First name' name='firstName' value={firstName} onChange={handleChange}/> }
                    { !loginPageState && <input type='text' placeholder='Last name' name='lastName'value={lastName} onChange={handleChange} /> }
                    <input type="text" placeholder="Username" name="userName" value={userName} onChange={handleChange} autoComplete="off" />
                    <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange}/>
                    {formError && <h6>{formError}</h6>}

                    <Button style={{padding: "0px"}} type="submit">{loginPageState ? 'Login' : 'Signup'}</Button>

                    {formSuccessMessage && <h3>{formSuccessMessage}</h3>}

                    <p className='btn-login-state' onClick={()=>utilsStateDispatch({type: 'CHANGE_LOGIN_STATE'})}>{loginPageState ? "New User? Sign up" : "Back to login"}</p>
        </form>
    )
}

export default Form
