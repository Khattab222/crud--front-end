
import Joi from "joi";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginHook() {
 
    let navigate = useNavigate()
    const [loading, setloading] = useState(false);
    const [validerror, setvaliderror] = useState([]);
    const [apierror, setapierror] = useState('');
    const [user, setuser] = useState({
      email: "",
      password: "",
    });
    // get user data
    const handlechange = (e) => {
      setvaliderror([]);
      setapierror('')
      let newuser = { ...user };
      newuser[e.target.name] = e.target.value;
      setuser(newuser);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setloading(true);
      let validate = validation();
  
    
      if (validate.error) {
        setvaliderror(validate.error.details);
        setloading(false);
      } else {
        setvaliderror([]);
         sendApi(user)
      }
    };
  
      // send data to api
    const sendApi =async (userdata) =>{
      const {data} = await axios.post('http://localhost:3000/api/v1/user/login',userdata);
      if (data.message === 'success') {
       
        localStorage.setItem('userinfo',JSON.stringify(data.data));
        setTimeout(() => {
          setloading(false);
          navigate('/home')
        }, 2000);
        
       
      }else{
      
        setapierror(data.message);
        setloading(false)
      }
  
    }
  
    // validation
    function validation() {
      const schema = Joi.object({
        password: Joi.string(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
      });
      return schema.validate(user, { abortEarly: false });
    }
 
 
 
    return [loading,validerror,apierror,handleSubmit,handlechange]
}
