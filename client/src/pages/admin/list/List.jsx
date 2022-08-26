import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
 import EditUser from "../../../components/editModal/EditModal";
import DataTable from 'react-data-table-component'
import axios from 'axios'
import AdminNav from '../../../components/adminMainNav/AdminMainNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee ,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import CreateUser from '../../../components/createUsers/CreateUser';

function AdminHome() {
    const [users, setusers] = useState([]);
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState([]);
    
    const getusers = async () => {
        try {
            const response = await axios.get("/admin/users")
            // console.log(response);
            setusers(response.data)
             setFilter(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async(id)=>{
        try{
            
            const deleteUsers = await axios.delete(`/admin/delete/${id}`)
        
             getusers()
        }
       catch(err){
            console.log(err)
       }
    }
  

    const columns = [
        
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: " Email",
            selector: (row) => row.email,
        },
        {
            name: " Edit",
             selector: (row) =>  <EditUser name = {row.name} email={row.email} id={row._id} reload ={getusers}/>
        },
        {
            name: " Delete",
            selector: (row) => <FontAwesomeIcon  className='delete-icon' onClick={()=>{deleteUser(row._id)}}  icon={faTrashAlt} color='red' font-size='large' ></FontAwesomeIcon>,
        },
       
    ]
    useEffect(() => {
        getusers();
    }, [users])

    useEffect(() => {
        const result = users.filter(country => {
            return country.name.toLowerCase().match(search.toLowerCase());
        })
        setFilter(result)
    }, [search])
    return (
        <>
        <AdminNav/>
        <div className='data-card' style={{ "padding": "100px 200px" }}>
        
            <button className='btn' style={{backgroundColor:"#e8e8e8"}} name='Create' >
            <h5>Add User</h5>
            <CreateUser />
            </button>
            <DataTable columns={columns}
                data={filter}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='900px'          
                selectableRowsHighlight
                highlightOnHover
                persistTableHead
                subHeader
                style={{ "border": "1px solid"}}
                subHeaderComponent={<input type='text' placeholder='Search Here' className='w-25 form-control' value={search} onChange={(e) => setSearch(e.target.value)} />} />
        </div>
        </>
    )
}


export default AdminHome