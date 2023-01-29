import axios from 'axios';
import Joi from 'joi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResgisterHook() {
    const [loading, setloading] = useState(false);
    const [validerror, setvaliderror] = useState([]);
    const [apierror, setapierror] = useState([])
let navigat = useNavigate()
    const [user, setuser] = useState({
        name:"",
    email:"",
    password:"",
    age:0
    });

    // when change input
    const handleChangeInpute = (e) =>{
        setvaliderror([]);
        setapierror([]);
        let newUser = {...user}
        newUser[e.target.name] = e.target.value;
        setuser(newUser)
    }
        // when register
    const handleRegister = (e) =>{
        e.preventDefault()
        setloading(true);
       let validate = validation();
     
       if (validate.error) {
        setvaliderror(validate.error.details);
        setloading(false);

       }else{
        setvaliderror([])
        sendApi(user)
       }
    }

    // validation 
function validation () {
    const schema = Joi.object({
        name: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
          password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
          email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
          age:Joi.number()
          .min(10)
          .max(70)
          .required(),
  
  
    });
    return  schema.validate(user,{abortEarly:false});
}

// send data to api 
const sendApi =async (userdata) =>{
    const {data} = await axios.post('http://localhost:3000/api/v1/user/adduser',userdata);
console.log(data);
if (data.message === 'success') {
    setTimeout(() => {
        setloading(false);
        navigat('/')
    }, 2000);
   

  

}else{
    setapierror(data.error.errors);
    setloading(false);
}
}

  return[loading,validerror,apierror,handleChangeInpute,handleRegister]
}
