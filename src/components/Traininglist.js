import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

function Traininglist() {

    const [training, setTraining] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState(''); 

    const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
       fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTraining(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = url => {
        if (window.confirm('Are you sure?')) {
       fetch(url, { method: 'DELETE' })
       .then(response => {
        if (response.ok) {
            fetchTrainings();
            setMsg("Training deleted");
            setOpen(true);
        }
         else
         alert('Poisto ei onnistunut')
       })
       .catch(err => console.error(err))
    }
}

    const columns = [
        {field: 'date', sortable: true, filter: true, valueFormatter: (params) => {return dayjs(params.value).format('DD.MM.YYYY hh:mm')}},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {
            headerName: "Customer",
            cellRendererFramework: params => params.data.customer.firstname + " " + params.data.customer.lastname
        },
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            field: 'links.0.href',
            cellRendererFramework: params => <Button size="small" color="error" onClick={() => deleteTraining("https://customerrest.herokuapp.com/api/trainings/" + params.data.id)}>Delete</Button>
        }
    ]

    return(
        <div>
        
        <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '50%', margin: 'auto'}}>
            <AgGridReact
            rowData={training}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            suppressCellSelection={true}
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

export default Traininglist;