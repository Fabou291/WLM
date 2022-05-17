import React, {useState} from 'react';
//COMPONENTS
import {RegisterMail, 
    RegisterPassword, 
    RegisterIdentity,
    RegisterCountry,
    RegisterRegion,
    RegisterZipOrBirth,
    RegisterGender,
    RegisterCaptcha
} from "./register_components"
//DATA
import * as region from "../../data.js/french_departments"

const Register = () => {
    const [user, setUser]=useState([{
        email : "",
        password : "",
        firstName : "",
        lastName : "",
        gender : "",
        birthYear : 0,
        alternateEmail : "",
        state : "",
        zipCode : ""
    }])
    const allDepartments = Object.entries(region.departments)
    const [isPassConfirmed]=useState([{create : ""}])
    return (
        <div className='register-wrapper'>
            <form className='register'>
                <RegisterMail 
                label={"first"} 
                user={user} 
                setUser={setUser}
                />
                <RegisterPassword 
                whichOne={"create"} 
                user={user} 
                setUser={setUser}
                isPassConfirmed={isPassConfirmed}
                />
                <RegisterPassword 
                whichOne={"reType"} 
                user={user} 
                setUser={setUser}
                isPassConfirmed={isPassConfirmed}
                />
                <RegisterMail 
                label={"alternate"} 
                user={user} 
                setUser={setUser}/>
                <RegisterIdentity 
                whichOne={"firstName"} 
                user={user} 
                setUser={setUser}
                />
                <RegisterIdentity 
                whichOne={"lastName"} 
                user={user} 
                setUser={setUser}
                />
                <RegisterCountry/>
                <RegisterRegion 
                allDepartments={allDepartments} 
                user={user} 
                setUser={setUser}
                />
                <RegisterZipOrBirth 
                isZip={true} 
                user={user} 
                setUser={setUser}
                />
                <RegisterGender 
                user={user} 
                setUser={setUser}
                />
                <RegisterZipOrBirth 
                isZip={false} 
                user={user} 
                setUser={setUser}
                />
                <RegisterCaptcha/>
                <button type='submit' name="userInfos">Envoyer</button>
            </form>
        </div>
    );
};

export default Register;