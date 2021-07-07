import Template from "./Template";
import React from "react";
import MaterialTable from "material-table";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const Users = () => {


    const [data, setData] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const columns = [
      {title:"Name", field: "name"},
      {title: "Username", field: "username"},
      {title: "Email", field: "email"},
      {title: "Role", field: "role", lookup: { user: 'User', admin: 'Admin' }}
    ]



    useEffect(() => {

      // get all users
      axios({
        method: 'get',
        url: 'http://localhost:5000/',
        }).then((res) => {
            setData(res.data);
            setIsLoading(false)
        }).catch(err => {
            console.log(err.message)
        });

    }, [])
  
    return ( 
        <div className="users">
          <Template />
          <div className="main">
            <div className="container mt-5">
                  <h1 className="text-danger text-center mb-5">Users page</h1>
                {!isLoading && 
                <MaterialTable

                  title="User Table"
                  data={data}
                  columns={columns}
                  
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
                            url: 'http://localhost:5000/adminupdate',
                            data : {id: newData._id, name: newData.name, username: newData.username, email: newData.email, role: newData.role}
                            }).then((res) => {
                                console.log(res)
                            }).catch(err => {
                                console.log(err.message)
                            });
                          setData(dataUpdate);

                          resolve();
                        }, 1000)
                      }),
                      onRowDelete: oldData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...data];
                          const index = oldData.tableData.id;
                          let id = oldData._id;
                          dataDelete.splice(index, 1);
                          setData([...dataDelete]);
                          axios({
                            method: 'post',
                            url: 'http://localhost:5000/admindelete',
                            data : {id: id}
                            }).then((res) => {
                                console.log(res)
                            }).catch(err => {
                                console.log(err.message)
                            });
                          
                          resolve()
                        }, 1000)
                      }),
                    
                    }
                  }
                />
              }
                </div>
                
            </div>
        </div>
     );
}
 
export default Users;