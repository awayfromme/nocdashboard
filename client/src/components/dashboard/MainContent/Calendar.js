import * as React from 'react';

import Scheduler  from 'devextreme-react/scheduler';

import CustomStore from 'devextreme/data/custom_store';

import "./MainContent.scss";




function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}
//Fetch data
const customDataSource = new CustomStore({
  key: '_id',
  load: () => {
    return fetch('/api/blogpost')
      .then(handleErrors)
      .then(response => response.json());
  },
  //Insert data
  insert: (values) => {
      return fetch('/api/blogpost/save', {
          method: 'POST',
          body: JSON.stringify(values),
          headers:{
              'Content-Type': 'application/json'
          }
      })
  },
//Remove data
  remove: (id) => {
      return fetch(`api/blogpost/delete/${encodeURIComponent(id)}`, {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json'
        }
      })
  },
  //Update Data
  update: (id, values) => {
      return fetch(`api/blogpost/update/${encodeURIComponent(id)}`, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers:{
              'Content-Type': 'application/json'
          }
      })
  }
});


const currentDate = new Date();
const views = ['day', "agenda"]

class Calendar extends React.Component {

  render() {

    return (
      <div className="main-content">
                  <Scheduler
        dataSource={customDataSource}
        views={views}
        showCurrentTimeIndicator={true}
        defaultCurrentView="day"
        defaultCurrentDate={currentDate}
        height={2000}
        width={1300}
        agendaDuration= {1}
        cellDuration={15}
        startDayHour={0}
        endDayHour={24}
        dateSerializationFormat="yyyy-MM-dd HH:mm:ss"
        textExpr="Text"
        startDateExpr="StartDate"
        endDateExpr="EndDate"
        allDayExpr="AllDay" 
        recurrenceRuleExpr="RecurrenceRule"
        recurrenceExceptionExpr="RecurrenceException"
        descriptionExpr= "Notes"
        id="AppointmentId"/>
         </div>
    );
  }
}

export default Calendar;
