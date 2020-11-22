import React, {Component} from 'react';

class NavBar extends Component {


    logout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }
    render() {
        return (
            <div className={"navBarContainer"}>
                <div
                    onClick={()=>{
                        this.props.history.push('/dashboard')
                    }}
                    className={"row1"}>
                    <span style={{marginLeft:20}}>Gelen Kutusu</span>
                    {
                        localStorage.getItem("unReadMails") > 0 ?
                            <span className={"notifyMails"}>
                                {
                                    localStorage.getItem("unReadMails")
                                }
                            </span>
                            : null
                    }
                </div>
                <div onClick={this.logout} className={"logOut"}>
                    <span>Çıkış Yap</span>
                    <span style={{
                        color:'gray'
                    }}>Coded By Halil İbrahim Tuna</span>
                </div>
            </div>
        );
    }
}

export default NavBar;
