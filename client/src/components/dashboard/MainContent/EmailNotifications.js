
import React from 'react';
import DataGrid, { Column, Editing,} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import "./MainContent.scss";



function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}
//Fetch data
const store = new CustomStore({
  key: '_id',
  load: () => {
    return fetch('/api/setconf')
      .then(handleErrors)
      .then(response => response.json())
      },
  //Insert data
  insert: (values) => {
      return fetch('/api/setconf/save', {
          method: 'POST',
          body: JSON.stringify(values),
          headers:{
              'Content-Type': 'application/json'
          }
      })
  },
  //Update Data
  update: (id, values) => {
      return fetch(`api/setconf/update/${encodeURIComponent(id)}`, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers:{
              'Content-Type': 'application/json'
          }
      })
  },
  remove: (id) => {
    return fetch(`api/setconf/delete/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
      }
    })
}
});



class emanot extends React.Component {
  render() {
    return (
  <div className="main-content">
  <React.Fragment>
  <DataGrid
      id="gridContainer"
      dataSource={store}
      showBorders={true}
      width={600}
      wordWrapEnabled={true}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="enabled" 
      dataType="boolean"
      caption="Enable notification sending" 
      />
      </DataGrid>
      <p>Enable or disable scheduled notification</p> 
    <DataGrid
      id="gridContainer"
      dataSource={store}
      showBorders={true}
      width={600}
      wordWrapEnabled={true}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="recipients" 
      caption="Recipients" 
      />
    </DataGrid>
    <p>Insert recipients for notification maintenance.</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={600}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="maind" 
      caption="Day Maintenance" 
      dataType="Time"
      />
    </DataGrid>
    <p>Insert planned day for Maintenance</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={600}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="mainhs" 
      caption="Starting Hour Maintenance" 
      />
    </DataGrid>
    <p>Insert planned Hour Start for  Maintenance</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={600}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="mainhe" 
      caption="Ending Hour Maintenance" 
      />
    </DataGrid>
    <p>Insert planned Hour End for Maintenance</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={600}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="mainms" 
      caption="Starting Minutes Maintenance " 
      />
    </DataGrid>
    <p>Insert planned Minutes Start for Maintenance</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={600}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="mainme" 
      caption="Ending Minutes Maintenance" 
      />
    </DataGrid>
    <p>Insert planned Minutes End for Maintenance</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={600}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="ETAH" 
      caption="Duration of work (Hours)" 
      />
    </DataGrid>
    <p>Insert planned Hours Duration of Work for maintenance</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={600}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="ETAM" 
      caption="Duration of work (Minutes)" 
      />
    </DataGrid>
    <p>Insert planned Minutes Duration of Work for maintenance</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={600}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="loc" 
      caption="Location for Maintenance" 
      />
    </DataGrid>
    <p>Insert planned Location for Maintenance</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={600}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="utc" 
      caption="Set TimeZone" 
      />
    </DataGrid><p>Insert TimeZone to be added into notifications</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={600}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="circu" 
      caption="Affected Areas-Circuits for Maintenance" 
      />
    </DataGrid><p>Insert planned Affected Areas-Circuits for Maintenance</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={400}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} 
        />
      <Column 
      dataField="chk72" 
      dataType="boolean"
      caption="Enable Mail 72 Hours before Maintenance" 
      />
    </DataGrid><p>Enable or disable 72 hours previous maintenances notification </p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={400}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="chk24" 
      dataType="boolean"
      caption="Enable Mail 24 Hours before Maintenance" 
      />
    </DataGrid><p>Enable or disable 24 hours previous maintenances notification </p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={400}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="chk24" 
      dataType="boolean"
      caption="Enable Mail 1 Hour before Maintenance" 
      />
    </DataGrid><p>Enable or disable 1 hour previous maintenances notification </p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={400}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="chk5mas" 
      dataType="boolean"
      caption="Enable Mail 5 Minutes after Maintenance started" 
      />
    </DataGrid><p>Enable or disable 5 minutes after started maintenance notification </p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={400}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="logo1" 
      dataType="string"
      caption="Logo1 / Base64" 
      />
    </DataGrid><p>Head logo1 in base64 to be added in the notification</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={400}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="logo2" 
      dataType="string"
      caption="Logo2 / Base64" 
      />
    </DataGrid><p>Head logo2 in base64 to be added in the notification</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width={800}
      height={200}
      columnAutoWidth={false}>
      <Editing
        mode="batch"
        allowUpdating={true} />
      <Column 
      dataField="mdes" 
      dataType="string"
      caption="Main Description Notification Mail" 
      />
    </DataGrid><p>Reason of the maintenance to be added in the notification</p>
  </React.Fragment>
  </div>
);
}
}
export default  emanot 
