import Template from "./Template";
import MaterialTable from "material-table";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';




const Answers = () => {

    const [data, setData] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const [columns, setColumns] = useState([
        {title:"Status", field: "state",
        editComponent: props => (
            <select className="form-control w-75"  onChange={e => props.onChange(e.target.value)}>
                <option selected="true" disabled>select action</option>
                <option value="Validated">Validated</option>
                <option value="Invalid">Invalid</option>
            </select>
          )
        },
        {title:"Username", field: "id_user.username", editable: 'never'},
        {title:"Comment", field: "message", editable: 'never'},
        {title:"Post link", field: "id_problem._id", editable: 'never', render: rowData => <a href={'http://localhost:3000/task/'+ rowData.id_problem._id} target="_blank">View post</a>},
        {title:"Repo link", field: "link", editable: 'never', render: rowData => <a href={'http://' + rowData.link} target="_blank">Repository link</a>}
        
      ]);
      
    useEffect(() => {

        // get all answers
        axios({
          method: 'get',
          url: 'http://localhost:5000/answer',
          }).then((res) => {
              setData(res.data);
              setIsLoading(false);
          }).catch(err => {
              console.log(err.message)
          });
  
      }, [])
    

    return ( 
        <div className="answer">
            <Template />

            <div className="main">
            
            <div className="container mt-5">
            
                  <h1 className="text-danger mb-5 text-center">Answers Page</h1>
                {!isLoading && 
                <MaterialTable

                  title="Answers Table"
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
                            url: 'http://localhost:5000/answer/update',
                            data : {id: newData._id, state: newData.state, reward: newData.id_problem.reward,
                               userId: newData.id_user._id, points: newData.id_user.points, reviewed: newData.reviewed }
                            }).then((res) => {
                               window.location.reload();
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

 
export default Answers;