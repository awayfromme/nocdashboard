import "./MainContent.scss";
import { DetailsView, FileManagerComponent, NavigationPane, Inject, Toolbar  } from '@syncfusion/ej2-react-filemanager';
import * as React from 'react';

export default class Filemanager extends React.Component {
    constructor() {
        super(...arguments);
        this.hostUrl = "http://localhost:8090/";
    }
    
    render() {
        return ( <div className="main-content">
            <div className="control-section">
      <FileManagerComponent ref={s => (this.fileObj = s)} id="file" view="Details" sortOrder="Ascending" height="1200" ajaxSettings={{
            url: this.hostUrl,
            downloadUrl: this.hostUrl + 'Download',
            getImageUrl: this.hostUrl + 'GetImage',
            uploadUrl: this.hostUrl + 'Upload',
        }}>
               <Inject services={[NavigationPane, DetailsView, Toolbar]}/>
               </FileManagerComponent>
  </div></div>);
    }
}
