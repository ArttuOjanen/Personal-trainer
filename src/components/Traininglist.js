import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import dayjs from 'dayjs';

function Traininglist() {

    const [training, setTraining] = useState([]); 

    useEffect(() => {
       fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTraining(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'date', sortable: true, filter: true, valueFormatter: (params) => {return dayjs(params.value).format('DD.MM.YYYY hh:mm')}},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true}
    ]

    return(
        <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '50%', margin: 'auto'}}>
            <AgGridReact
            rowData={training}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            suppressCellSelection={true}
            columns
            />
        </div>
    );
}

export default Traininglist;