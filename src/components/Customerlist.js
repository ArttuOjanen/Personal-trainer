import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact, AgGridColumn } from 'ag-grid-react/lib/agGridReact';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('');

    const [gridApi, setGridApi] = useState();
    const [gridColumnApi, setGridColumnApi] = useState();


    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
      };

      const onBtnExport = () => {
        gridApi.exportDataAsCsv();
      };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
       fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCustomer = newCustomer => {
        fetch('https://customerrest.herokuapp.com/api/customers', 
        {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(newCustomer)
        }
        )
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }

    const deleteCustomer = url => {
        if (window.confirm('Are you sure?')) {
       fetch(url, { method: 'DELETE' })
       .then(response => {
        if (response.ok) {
            fetchCustomers();
            setMsg("Customer deleted");
            setOpen(true);
        }
         else
         alert('Poisto ei onnistunut')
       })
       .catch(err => console.error(err))
     }
    }

    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(_ => {
            fetchCustomers();
            setMsg("Customer updated");
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', 
        {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(training)
        }
        )
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: 120},
        {field: 'city', sortable: true, filter: true, width: 120},
        {field: 'email', sortable: true, filter: true, width: 120},
        {field: 'phone', sortable: true, filter: true, width: 120},
        {
            headerName: '',
            width: 170,
            cellRendererFramework: params => <AddTraining addTraining={addTraining} customer={params.data} />
        },
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            field: 'links.0.href',
            cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} customer={params} />
        },
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            field: 'links.0.href',
            cellRendererFramework: params => <Button size="small" color="error" onClick={() => deleteCustomer(params.value)}>Delete</Button>   
        }
        
    ]

    return(
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <Button variant="outlined" onClick={() => onBtnExport()}>
            Export file
          </Button>
        <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '80%', margin: 'auto'}}>
            <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            suppressCellSelection={true}
            onGridReady={onGridReady}
            />
        </div>
        <Snackbar 
          open={open}
          message={msg}
          autoHideDuration={3000}
          onClose={handleClose}
          />
        </div>
    );
}

export default Customerlist;