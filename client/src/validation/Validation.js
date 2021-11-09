import * as yup from "yup";

const SchemaValidation = yup.object().shape({
    userName: yup.string().required().min(4).label('Username'),
    email: yup.string().email().label('Email').required(),
    password: yup.string().required().min(8).
    max(30).matches(/^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/ , 'Your password must include numbers, uppercase and special characters')
    .label('Password'),
    passwordTwo: yup.string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
});
  
 
export default SchemaValidation;