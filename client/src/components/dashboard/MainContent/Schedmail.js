import React from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  SearchPanel,
  Lookup,
  RequiredRule,
  Position,
  Form
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import CustomStore from 'devextreme/data/custom_store';
import "./MainContent.scss";









const impacts = [{
  'ID': 1,
  'Impact': 'imp1'
},{
  'ID': 2,
  'Impact': 'imp2'
},{
  'ID': 3,
  'Impact': 'imp3'
}
];
const dess = [{
  'ID': 1,
  'Description': 'des1'
},{
  'ID': 2,
  'Description': 'des2'
},{
  'ID': 3,
  'Description': 'des3'
}
];


const Locations = [{
  'ID': 1,
  'Location': 'loc1'
}, {
  'ID': 2,
  'Location': 'loc2'
}, {
  'ID': 3,
  'Location': 'loc3'
}, {
  'ID': 4,
  'Location': 'loc4'
},{
  'ID': 5,
  'Location': 'loc5'
},{
  'ID': 6,
  'Location': 'loc6'
},{
  'ID': 7,
  'Location': 'loc7'
},{
  'ID': 8,
  'Location': 'loc8'
},{
  'ID': 9,
  'Location': 'loc9'
},{
  'ID': 9,
  'Location': 'loc10'
},{
  'ID': 10,
  'Location': 'loc10'
},{
'ID': 11,
  'Location': 'loc11'
},{                                
'ID': 12,                          
'Location': 'loc12' 
}];

const Subjects = [{
  'ID': 1,
  'Subject': 'sub1'
}, {
  'ID': 2,
  'Subject': 'sub2'
}, {
  'ID': 3,
  'Subject': 'sub3'
}
];




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
    return fetch('/api/mail')
      .then(handleErrors)
      .then(response => response.json())
      },
  //Insert data
  insert: (values) => {
      return fetch(`/api/mail/save`, {
          method: 'POST',
          body: JSON.stringify(values),
          headers:{
              'Content-Type': 'application/json'
          }
      })
  },
  //Update Data
  update: (id, values) => {
      return fetch(`/api/mail/update/${encodeURIComponent(id)}`, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers:{
              'Content-Type': 'application/json'
          }
      })
  },
  remove: (id) => {
    return fetch(`/api/mail/delete/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
      }
    })
}
});


const notesEditorSendingOptions = { height: 50 , width: 480};
const notesEditorHeadOptions = { height: 50 , width: 800};
const notesEditorBodyOptions = { height: 200 , width: 1400};


class Schedmail extends React.Component {
  constructor(props) {
    super(props);
    this.onInitNewRow = this.onInitNewRow.bind(this);
    this.getDefaultData = this.getDefaultData.bind(this);
}


  onInitNewRow(e) {
    e.promise = this.getDefaultData().then(data => {
        e.data.d1 = false;
        e.data.d2 = false;
        e.data.d3 = false;
        e.data.d4 = false;
        e.data.d5 = false;
        e.data.d6 = false;
        e.data.d7 = false;
        e.data.d8 = false;
        e.data.send = false;
        e.data.week = false;
        e.data.day = false;
        e.data.started = false;
    });
}
getDefaultData() {
  return fetch("/api/mail")
      .then(response => response.json())
      .then((data) => {
          return data;
      }) 
      .catch(() => { throw 'Data Loading Error' });
}




        render() {
            return (
              <div className="main-content">
                    <React.Fragment>
<div id="data-grid-demo">
<DataGrid
dataSource={store}
keyExpr="ID"
showBorders={true}
allowColumnReordering={true}
RequiredRule
width={1500}
allowColumnResizing={true}
onInitNewRow={this.onInitNewRow}

>
<Paging enabled={false} />
<SearchPanel visible={true} />
<Editing
mode="popup" 
allowAdding={true}  
allowUpdating={true}
allowDeleting={true} 
>
<Popup title="Email Informations" showTitle={true} fullScreen={true}  width={1800} resizeEnabled={true} shading={true} height={925}>
<Position my="center" at="center" of={window} />
</Popup>
<Form>
<Item itemType="group" colCount={2} colSpan={2} >
<Item dataField="send"  caption="Leave this blank for send it now!" dataType="boolean" visible={false}/>
</Item>
<Item itemType="group" caption="Choose Recipients:" colCount={2} colSpan={2} />
<Item itemType="group" colCount={2} colSpan={2} >
<Item dataField="d1"  dataType="boolean"/>
<Item dataField="d2"  dataType="boolean"/>
<Item dataField="d3"  dataType="boolean"/>
<Item dataField="d4"  dataType="boolean"/>
<Item dataField="d5"  dataType="boolean"/>
<Item dataField="d6"  dataType="boolean"/>
<Item dataField="ToWho"   caption="Add manually different recipients(email1@domain.com,email2@domain.com,ecc)"  dataType="string" placeholder="Type a text here..." />
</Item>
<Item itemType="group" caption="Select Scheduled Notification:" colCount={2} colSpan={2} >
<Item dataField="week"  dataType="boolean"/>
<Item dataField="day"  dataType="boolean"/>
<Item dataField="started"  dataType="boolean"/>
<Item itemType="group" colCount={2} colSpan={2} >
<Item dataField="when"   dataType="datetime" visible={false} />
</Item>
</Item>
<Item itemType="group" caption="Email Head Part" colCount={2} colSpan={2} >
<Item dataField="Sub"  colSpan={2} editorOptions={notesEditorHeadOptions}/>
</Item>
<Item itemType="group" colCount={2} colSpan={2} >
<Item dataField="loc" caption="Location" editorOptions={notesEditorHeadOptions}/>
</Item>
<Item dataField="Start" caption="Start Date" dataType="datetime" format="d/MM/y, HH:mm" colSpan={2} editorOptions={notesEditorSendingOptions}/>
<Item dataField="complete" caption="End Date" dataType="datetime" format="d/MM/y, HH:mm" colSpan={2} editorOptions={notesEditorSendingOptions}/>
<Item itemType="group" caption="Email Body Part" colCount={2} colSpan={2} >
<Item dataField="des" caption="Description"  colSpan={2} editorOptions={notesEditorBodyOptions} />
<Item dataField="imp" caption="Impact"  colSpan={2} editorOptions={notesEditorBodyOptions}/>
<Item dataField="notes"   caption="Notes" dataType="string" editorOptions={notesEditorBodyOptions} allowEditing={false} />
</Item>
</Form>
</Editing>
<Column dataField="send" caption="Email Status" width={70} groupIndex={0} trueText="These emails have been sent!" falseText="These emails are ready to be sent!" allowEditing={false} visible={false}/>
<Column dataField="Sub" caption="Email Subject" width={250} >
<Lookup dataSource={Subjects} valueExpr="Subject" displayExpr="Subject" dataType="string" />
<RequiredRule message="Subject has not been specified"/>
</Column> 
<Column dataField="loc" caption="Location" width={170} >
<Lookup dataSource={Locations} valueExpr="Location" displayExpr="Location" />
<RequiredRule message="Location has not been specified"/>
</Column>    
<Column dataField="des" caption="Description" width={170} visible={false} >
<Lookup dataSource={dess} valueExpr="Description" displayExpr="Description" />
<RequiredRule message="Description box is missing!"/>
</Column> 
<Column dataField="d1"  caption="Team Manager" dataType="boolean" visible={false}/>
<Column dataField="d2" caption="Another NOC" dataType="boolean"  visible={false}/>
<Column dataField="d3"  caption="NOC TEAM" dataType="boolean" visible={false}/>
<Column dataField="d4"   caption="SYS" dataType="boolean" visible={false}/>
<Column dataField="d5"   caption="HD Department" dataType="boolean" visible={false}/>
<Column dataField="d6"   caption="OPS" dataType="boolean" visible={false}/>
<Column dataField="d7"   caption="Team Leader" dataType="boolean" visible={false}/>
<Column dataField="d8"   caption="Another Department" dataType="boolean" visible={false}/>
<Column dataField="ToWho"   caption="Add manually different recipients(email1@domain.com,email2@domain.com,ecc)"  colSpan={2} dataType="string" visible={false} /> 
<Column dataField="Start" caption="Start" dataType="datetime" format="d/MM/y, HH:mm" width={170}>
<RequiredRule message="Start date of the maintenance has not been specified!"/>
</Column> 
<Column dataField="week"   caption="Notification 7 days before" dataType="boolean" visible={false}/>
<Column dataField="day"   caption="Notification 1 day before" dataType="boolean" visible={false}/>
<Column dataField="started"   caption="Notification when started" dataType="boolean" visible={false}/>
<Column dataField="complete" caption="End" dataType="datetime"  format="d/MM/y, HH:mm" width={170} >
<RequiredRule message="End date of the maintenance has not been specified!"/>
</Column> 
<Column dataField="when"   caption="Due Date" dataType="datetime" format="d/MM/y, HH:mm" width={240} visible={false}>
</Column> 
<Column dataField="notes"   caption="Notes" dataType="string" width={1000} />
<Column dataField="imp" caption="Expected Impact" width={170} visible={false}>
<Lookup dataSource={impacts} valueExpr="Impact" displayExpr="Impact" wrapItemText={true} />
<RequiredRule message="Impact box is missing!"/>
</Column> 

</DataGrid>
</div>
</React.Fragment>
</div>
    );
  }
}


export default Schedmail;
