import * as yup from "yup";

const SchemaValidation = yup.object().shape({
    userName: yup.string().min(5),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});
  
 
export default SchemaValidation;