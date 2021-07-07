import NavBar from "./NavBar";
import MaterialTable from "material-table";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import LoadingBar from "./LoadingBar";

const PaymentHistory = () => {

    const [data, setData] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const columns = [
        {title:"Status", field: "state",
        editComponent: props => (
            <select className="form-control w-75"  onChange={e => props.onChange(e.target.value)}>
                <option selected="true" disabled>select action</option>
                <option value="Payed">Payed</option>
                <option value="Rejected">Rejected</option>
            </select>
          )
        },
        {title:"Username", field: "id_user.username", editable: 'never'},
        {title:"Email", field: "id_user.email", editable: 'never'},
        {title:"Date", field: "created_at", editable: 'never'},
        {title:"Amount", field: "amount", editable: 'never',
        render: rowData => <p className="my-auto">{rowData.amount} Pnts/{(rowData.amount*0.0005).toFixed(2)}$</p>
        }]
        
     
        let token = localStorage.getItem('user');
        let decoded = jwt_decode(token);

      useEffect(() => {

        // get all payments
        axios({
          method: 'post',
          url: 'http://localhost:5000/payment/user',
          data: {id: decoded.id}
          }).then((res) => {
              setData(res.data);
              setIsLoading(false);
          }).catch(err => {
              console.log(err.message)
          });
  
      }, [])
    return ( 
        <div className="payment-history">
            <NavBar />
            {isLoading && <div> <LoadingBar /> </div>}
            <div className="container mt-5">
            <h4 className="text-danger mb-4">Payment History</h4>
                {!isLoading && 
                <MaterialTable

                    title="Payments Table"
                    data={data}
                    columns={columns}
                /> 

                }
            </div>
            
        </div>
     );
}
 
export default PaymentHistory;