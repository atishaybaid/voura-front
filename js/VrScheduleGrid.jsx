import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchSheduleData} from './actionCreators.js';
import '../less/vrScheduleGrid.less'

class VrScheduleGrid extends Component{
    constructor(props){
        super(props);
        this.generateHead = this.generateHead.bind(this);

    }
    componentDidMount(){
        console.log("componentDidMount called");
        this.props.getInitialData(this.props.apiurl);
    }
    generateHead(){
        if(this.props.data.wsch){
            let tableHead  = this.props.data.wsch.map((item)=>(
                <th>
                    {item.hl}
                </th>
               )) 
        return tableHead; 
        }
       
    }

    generateCell(){
       if(this.props.data.wsch){
            let tableCell  = this.props.data.wsch.map((item)=>(
                    <ul className="hour-list">
                        {
                            item.dsch.map((dayItem)=>(
                                <li className="hour-item">{dayItem.t}</li>
                            ))
                        }
                    </ul>
               )) 
        return tableCell; 
        } 
    }


    render(){
        return (
               <div className="Vr-Schedule-grid">
               {/*<table>
                   <tr>
                        {this.generateHead()}
                    </tr>
                    
               </table>*/}
               <div className="sch-table">
                {this.generateCell()}
               </div>

               </div>
            )
     
    
        }
}
const mapStateToProps = (state) =>({data:state.VrScheduleGrid.data})
const mapDispatchToProps = (dispatch) =>({
    getInitialData:function(apiurl){
        dispatch(fetchSheduleData(apiurl));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(VrScheduleGrid);