
import React from 'react'
import {  Link } from 'react-router-dom';
import ResgisterHook from '../Hook/Resgister-Hook';

export default function Register() {
   const [loading,validerror,apierror,handleChangeInpute,handleRegister] =  ResgisterHook()

  return (
    <div className='container d-flex flex-column justify-content-center vh-100'>
<div className='row justify-content-center  px-5'>
    <div className="col-md-12">
    <form onSubmit={handleRegister} >
        {

           validerror.length>0?validerror.map((item,index) => <div key={index} className=' alert alert-danger'> {
            item.context.label === 'password'? 'please enter valid password':
            item.message}</div>) :'' 
        }
        {
             apierror.length>0?apierror.map((item,index) => <div key={index} className=' alert alert-danger'> {
                item.message === 'email must be unique'? 'email already exists':
                item.message}</div>) :''
        }
    <div className="form-floating mb-3 ">

<input type="text" className="form-control "name='name' onChange={handleChangeInpute} id="floatingInput" placeholder="name@example.com"/>
<label htmlFor="floatingInput">your Name :</label>
</div>
    <div className="form-floating mb-3 ">
<input type="email" className="form-control" name='email' onChange={handleChangeInpute} id="floatingInput2" placeholder="name@example.com"/>
<label htmlFor="floatingInput2">your Email address :</label>
</div>
<div className="form-floating mb-3">
<input type="password" className="form-control" name='password' onChange={handleChangeInpute} id="floatingPassword" placeholder="Password"/>
<label htmlFor="floatingPassword">Password :</label>
</div>
<div className="form-floating mb-3">
<input type="number" className="form-control" name='age' onChange={handleChangeInpute} id="floatingPassword2" placeholder="Password"/>
<label htmlFor="floatingPassword2">age :</label>
</div>

<button type="submit" className=" form-control btn btn-primary"> {loading ===  true? <i className='fas fa-spinner fa-spin'></i>: 'Sign Up'}</button>
</form>
    </div>

    

</div>
<div className="row justify-content-center px-5">
<div className="col-md-12">
    <div className=' mt-3 text-white align-self-center'>
 <span > have account ?</span>
 <Link to='/' >
 <button type="submit" className=" form-control btn btn-info">Login Now</button>
 </Link>
 
 </div>

    </div>
</div>
</div>
  )
}
