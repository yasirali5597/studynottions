import React ,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operation/authAPI';
import { useLocation } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'



const UpdatePassword = () => {

    const dispatch=useDispatch();
    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const [loading] = useSelector((state) =>state.auth);
    const [password , confirmPassword ] =formData;

    const handleOnChange = (e) =>{
        setFormData((prevData) =>(
            {
                ...prevData, 
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleOnSubmit=(e)=>{
        e.preventDafoult();
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password,confirmPassword,token) )
    }





  return (
    <div className='text-white'>
    {
        loading ?(
            <div>
                Loading....
            </div>

        ):(
            <div>
                <h1>Chose New Password</h1>
                <p>Almost done . enter your new password and your all set</p>

                <form onSubmit={handleOnSubmit}>

                    <lebel>
                        <p>new passwords </p>
                        <input 
                        type={showPassword ? "text" : "password"}
                        name='password'
                        value={password}
                        onChange={handleOnChange}/>
                        <span
                        onClick={() => setShowPassword((prev) => !prev)}>
                            {
                                showPassword 
                                ? <FaEyeSlash fontSize={24}/>
                                :<IoEyeSharp fontSize={24}/>

                            }
                        </span>

                    </lebel>


                     <lebel>
                        <p>Confirm New Password</p>
                        <input 
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name='confirmPassword'
                        value={password}
                        onChange={handleOnChange}/>
                        <span
                        onClick={() => setshowConfirmPassword((prev) => !prev)}>
                            {
                                showConfirmPassword 
                                ? <FaEyeSlash fontSize={24}/>
                                :<IoEyeSharp fontSize={24}/>

                            }
                        </span>

                    </lebel>
                    <button type="Submit">
                        Reset Password
                    </button>
                </form>

                <div>
                    <Link to="/login">
                        <p>Back to Login</p>
                    </Link>
                </div>
            </div>
        )
    }
    
    
    
    
    </div>
  )
}

export default UpdatePassword