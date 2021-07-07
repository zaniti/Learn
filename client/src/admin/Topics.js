import Template from "./Template";
import MaterialTable from "material-table";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';




const Topics = () => {

    const [data, setData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    let [countTopic, setCountTopic] = useState([]);

    const columns = [
      {title:"Name", field: "name"},
    ]

    useEffect(() => {

        // get all users
        axios({
          method: 'get',
          url: 'http://localhost:5000/topic',
          }).then((res) => {
              setData(res.data);
              setIsLoading(false)
              data.map(da => {
                let id = da._id;
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/topic/count',
                    data: {id}
                    }).then((res) => {
                        // setCountTopic(countTopic => [...countTopic, res.data])
                        // console.log(res.data)
                    }).catch(err => {
                        console.log(err.message)
                    });
              })
          }).catch(err => {
              console.log(err.message)
          });
    
      }, [])

    return ( 
        <div className="topics">
            <Template />

            <div className="main">

                <div className="container mt-5 text-center w-50">
                    <h1 className="text-danger mb-5">Topics page</h1>
                    {!isLoading && 
                <MaterialTable
            
                  title="Topic Table"
                  data={data}
                  columns={columns}
                  
                  editable={
                    {  
                      onRowAdd: newData =>
                      new Promise((resolve, reject) => {
                        
                        setTimeout(() => {
                          console.log(newData)
                          setData([...data, newData]);
                          axios({
                            method: 'post',
                            url: 'http://localhost:5000/topic',
                            data : {name: newData.name}
                            }).then((res) => {
                                console.log(res)
                            }).catch(err => {
                                console.log(err.message)
                            });
                          resolve();
                        }, 1000)
                      }),
                      onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          axios({
                            method: 'post',
                            url: 'http://localhost:5000/topicupdate',
                            data : {id: newData._id, name: newData.name}
                            }).then((res) => {
                                console.log(res)
                            }).catch(err => {
                                console.log(err.message)
                            });
                          setData(dataUpdate);
                          console.log(data)

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
                            url: 'http://localhost:5000/topicdelete',
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
 
export default Topics;
