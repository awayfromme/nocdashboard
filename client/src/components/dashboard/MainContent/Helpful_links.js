
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
    return authenticatedFetch('/api/link')
      .then(handleErrors)
      .then(response => response.json())
      },
  //Insert data
  insert: (values) => {
      return authenticatedFetch('/api/link/save', {
          method: 'POST',
          body: JSON.stringify(values),
          headers:{
              'Content-Type': 'application/json'
          }
      })
  },
  //Update Data
  update: (id, values) => {
      return authenticatedFetch(`/api/link/update/${encodeURIComponent(id)}`, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers:{
              'Content-Type': 'application/json'
          }
      })
  },
  remove: (id) => {
    return authenticatedFetch(`/api/link/delete/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
      }
    })
}
});



class Links extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
    this.logEvent = this.logEvent.bind(this);
    this.onEditingStart = this.logEvent.bind(this, 'EditingStart');
    this.onInitNewRow = this.logEvent.bind(this, 'InitNewRow');
    this.onRowInserting = this.logEvent.bind(this, 'RowInserting');
    this.onRowInserted = this.logEvent.bind(this, 'RowInserted');
    this.onRowUpdating = this.logEvent.bind(this, 'RowUpdating');
    this.onRowUpdated = this.logEvent.bind(this, 'RowUpdated');
    this.onRowRemoving = this.logEvent.bind(this, 'RowRemoving');
    this.onRowRemoved = this.logEvent.bind(this, 'RowRemoved');
    this.onSaving = this.logEvent.bind(this, 'Saving');
    this.onSaved = this.logEvent.bind(this, 'Saved');
    this.onEditCanceling = this.logEvent.bind(this, 'EditCanceling');
    this.onEditCanceled = this.logEvent.bind(this, 'EditCanceled');

    this.clearEvents = this.clearEvents.bind(this);
  }

  logEvent(eventName) {
    this.setState((state) => {
      return { events: [eventName].concat(state.events) };
    });
  }

  clearEvents() {
    this.setState({ events: [] });
  }


  render() {
    return (
      <div className="main-content">
      <React.Fragment>
        <DataGrid
          id="gridContainer"
          dataSource={store}
          allowColumnReordering={true}
          showBorders={true}
          wordWrapEnabled={true}
          columnAutoWidth={false}
          onEditingStart={this.onEditingStart}
          onInitNewRow={this.onInitNewRow}
          onRowInserting={this.onRowInserting}
          onRowInserted={this.onRowInserted}
          onRowUpdating={this.onRowUpdating}
          onRowUpdated={this.onRowUpdated}
          onRowRemoving={this.onRowRemoving}
          onRowRemoved={this.onRowRemoved}
          onSaving={this.onSaving}
          onSaved={this.onSaved}
          onEditCanceling={this.onEditCanceling}
          onEditCanceled={this.onEditCanceled}>

          <Editing
            mode="form"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true} />

          <Column 
          dataField="Text" 
          caption="Title" 
          />
          <Column 
          dataField="URL" 
          />
          <Column dataField="Description" />
        </DataGrid>
      </React.Fragment>
      </div>
    );
  }
}


export default Links;
