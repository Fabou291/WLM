import React, { useState } from 'react';
//COMPONENTS
import {
    RegisterMail,
    RegisterPassword,
    RegisterIdentity,
    RegisterCountry,
    RegisterRegion,
    RegisterZipOrBirth,
    RegisterGender,
    RegisterCaptcha
} from "./register_components";
//DATA
import * as region from "../../data/french_departments";

const Register = () => {
    //USER INFOS TO BE REGISTERED
    const [user, setUser] = useState([{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthYear: "",
        alternateEmail: "",
        state: "",
        zipCode: ""
    }]);
    //STATE LIST
    const allDepartments = Object.entries(region.departments);
    //STATE ALLOWS TO COMPARE PASSWORDS PROVIDED BY USER
    const [isPassConfirmed] = useState([{ create: "" }]);
    //STATE ALLOWS TO MAKE SURE CAPTCHA IS RIGHT
    const [captchaString, setCaptchaString] = useState("");
    //ALLOW TO SEND FORM IF CAPTCHA STORED IS THE SAME THAN 
    //PROVIDED IN RELATED INPUT
    const [isCaptchaOk, setIsCaptchaOk] = useState(false);
    const submitForm = (e, data) => {
        e.preventDefault();
        console.log("Voici le formulaire : ", data);
    };
    // console.log("le state global : ", user)
    return (
        <div className='register-wrapper'>
            <form className='register' onSubmit={(e) => submitForm(e, user)}>
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
                    setUser={setUser} />
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
                <RegisterCountry />
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
                <RegisterCaptcha
                    captchaString={captchaString}
                    setCaptchaString={setCaptchaString}
                    isCaptchaOk={isCaptchaOk}
                    setIsCaptchaOk={setIsCaptchaOk}

                />
                <button type='submit' name="userInfos">Envoyer</button>
            </form>
        </div>
    );
};

export default Register;