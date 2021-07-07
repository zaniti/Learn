import Template from "./Template";
import MaterialTable from "material-table";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const Payments = () => {

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
        
     

      useEffect(() => {

        // get all payments
        axios({
          method: 'get',
          url: 'http://localhost:5000/payment',
          }).then((res) => {
              setData(res.data);
              setIsLoading(false);
          }).catch(err => {
              console.log(err.message)
          });
  
      }, [])

      
    return ( 
        <div className="payments">
            <Template />

            <div className="main">
      
            <div className="container mt-5">
                  <h1 className="text-danger mb-5 text-center">Payments Page</h1>
                {!isLoading && 
                <MaterialTable

                  title="Payments Table"
                  data={data}
                  columns={columns}
                  options={{
                    exportButton: true
                  }}
                  
                  editable={
                    {  
                      // onRowAdd: newData =>
                      // new Promise((resolve, reject) => {
                        
                      //   setTimeout(() => {
                      //     console.log(newData)
                      //     setData([...data, newData]);
                      //     resolve();
                      //   }, 1000)
                      // }),
                      onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          axios({
                            method: 'post',
                            url: 'http://localhost:5000/payment/update/state',
                            data : {id: newData._id, state: newData.state }
                            }).then((res) => {
                              console.log("updated!")
                            }).catch(err => {
                                console.log(err.message)
                            });
                          setData(dataUpdate);
                          
                  
                          resolve();
                        }, 1000)
                      }),
                    //   onRowDelete: oldData =>
                    //   new Promise((resolve, reject) => {
                    //     setTimeout(() => {
                    //       const dataDelete = [...data];
                    //       const index = oldData.tableData.id;
                    //       let id = oldData._id;
                    //       dataDelete.splice(index, 1);
                    //       setData([...dataDelete]);
                    //       axios({
                    //         method: 'post',
                    //         url: 'http://localhost:5000/admindelete',
                    //         data : {id: id}
                    //         }).then((res) => {
                    //             console.log(res)
                    //         }).catch(err => {
                    //             console.log(err.message)
                    //         });
                          
                    //       resolve()
                    //     }, 1000)
                    //   }),
                    
                    }
                  }
                />
              }
                </div>
     
            </div>
        </div>
     );
}
 
export default Payments;