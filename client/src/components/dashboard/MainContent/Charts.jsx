import "./MainContent.scss";
import "./charts.css"
import React ,{ Component } from 'react';
import Iframe from 'react-iframe'
import Draggable from 'react-draggable';
 

class Charts extends Component {
    render() {
      const  url1 = `https://widget.coinlib.io/widget?type=single_v2&theme=light&coin_id=859&pref_coin_id=1505`
      const  url2 = `https://widget.coinlib.io/widget?type=single_v2&theme=light&coin_id=6&pref_coin_id=1505`
      const  url3 = `https://widget.coinlib.io/widget?type=single_v2&theme=light&coin_id=359&pref_coin_id=1505`
      const  url4 = `https://widget.coinlib.io/widget?type=single_v2&theme=light&coin_id=229&pref_coin_id=1505`
        return (
            <main className="main-content">
              <header className="page-heading">
                <p className="dashboard-eyebrow">MONITORING</p>
                <h1>Grafici</h1>
                <p>Indicatori e widget di monitoraggio.</p>
              </header>
                 <div id="block-container">
                <Draggable>
                <div id="bloc1">
        <Iframe url= {url1}
        width= "100%"
        height= "400"
        display= "inline"
        />
        </div>
        </Draggable>
        <Draggable>
                <div id="bloc2">
        <Iframe url={url2}
        width= "100%"
        height= "400"
        display= "inline"
        />
        </div>
        </Draggable>
        <Draggable>
                <div id="bloc2">
        <Iframe url={url3}
        width= "100%"
        height= "400"
        display= "inline"
        />
        </div>
        </Draggable>
        <Draggable>
                <div id="bloc2">
        <Iframe url={url4}
        width= "100%"
        height= "400"
        display= "inline"
        />
        </div>
        </Draggable>
        </div>
</main>
        )}
}

export default Charts;
