
import React from 'react';
import DataGrid, { Column, Editing,} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import authenticatedFetch from '../../../utils/authenticatedFetch';
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
    return authenticatedFetch('/api/setconf')
      .then(handleErrors)
      .then(response => response.json())
      },
  //Insert data
  insert: (values) => {
      return authenticatedFetch('/api/setconf/save', {
          method: 'POST',
          body: JSON.stringify(values),
          headers:{
              'Content-Type': 'application/json'
          }
      })
  },
  //Update Data
  update: (id, values) => {
      return authenticatedFetch(`/api/setconf/update/${encodeURIComponent(id)}`, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers:{
              'Content-Type': 'application/json'
          }
      })
  },
  remove: (id) => {
    return authenticatedFetch(`/api/setconf/delete/${encodeURIComponent(id)}`, {
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
      width="100%"
      wordWrapEnabled={true}
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
      width="100%"
      wordWrapEnabled={true}
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
        allowUpdating={true} />
      <Column
      dataField="main1d"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
        allowUpdating={true} />
      <Column
      dataField="main1hs"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
        allowUpdating={true} />
      <Column
      dataField="main1he"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
        allowUpdating={true} />
      <Column
      dataField="main1ms"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
        allowUpdating={true} />
      <Column
      dataField="main1me"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
        allowUpdating={true} />
      <Column
      dataField="loc1"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
        allowUpdating={true} />
      <Column
      dataField="tables1"
      caption="Affected Areas-Circuits for Maintenance"
      />
    </DataGrid><p>Insert planned Affected Areas-Circuits for Maintenance</p>
    <DataGrid
      id="gridContainer"
      dataSource={store}
      allowColumnReordering={true}
      showBorders={true}
      wordWrapEnabled={true}
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
        allowUpdating={true} />
      <Column
      dataField="chk1h"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
      width="100%"
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
      width="100%"
      height={200}
      columnAutoWidth={false}>
      <Editing
        mode="cell"
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
