import React, {Component} from 'react';
import '../css/dashboard.css';

class TabBar extends Component {
    render() {
        return (
                <div className={"topBar"}>
                    <div
                        onClick={()=>this.props.history.push('/')}
                        className={"logo"}>
                        <h1>MyMail</h1>
                    </div>
                    <div className={"searchContainer"}>
                        <div className={"searchBox"}>
                            <div
                                onClick={()=>{
                                    alert('Şuan için arama fonksiyonu çalışmamaktadır.')
                                }}
                                className={"searchIcon"}>
                                <i className={"fa fa-search"}></i>
                            </div>
                            <input
                                className={"searchInput"} type={"text"}/>
                        </div>
                    </div>
                    <div className={"profileArea"}>
                        <div className={"profileIcon"}>
                            <span style={{fontWeight:'bold',fontSize:24}}>İ</span>
                        </div>
                    </div>
                </div>
        );
    }
}

export default TabBar;
