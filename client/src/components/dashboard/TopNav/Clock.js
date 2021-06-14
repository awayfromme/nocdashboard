import React, {Component} from 'react';
import './style.css';
class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }
componentDidMount(){
        this.timer = setInterval(
            () => this.setState({date: new Date()}),
            1000
        );
    }
componentWillUnmount(){
        clearInterval(this.timer);
    }
render(){
        return( 
            <div className="clock">
                <div className="timer">{this.state.date.toLocaleTimeString()}</div>
            </div>
        )
    }
}
export default Clock