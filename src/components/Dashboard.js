import React, {Component} from 'react';
import TabBar from "./tabBar";
import NavBar from "./navBar";
import Mails from "./mails";
import axios from 'axios';
import {API_URI} from "../constants";
class Dashboard extends Component {

    state = {
        loading:true
    }

    componentDidMount() {
        if(localStorage.getItem("username") === null) {
            this.props.history.push('/')
        }


        axios.post(API_URI+'/getMails',{
            user_id:localStorage.getItem("id")
        }).then((res)=>{
            localStorage.setItem("mails",JSON.stringify(res.data))
            console.log(res.data)
            let a = 0;
            for(let i = 0; i <= res.data.length; i ++) {
                if (i === res.data.length) {
                    localStorage.setItem("unReadMails", a);
                    this.setState({loading:false});
                } else {
                    if (
                        !res.data[i].contents[res.data[i].contents.length - 1].isRead &&
                        res.data[i].contents[res.data[i].contents.length - 1].sender_id !== localStorage.getItem("id")
                    ) {
                        // Okunmayan mail var
                        a += 1
                    }
                }
            }
        }).catch((err)=>{
            alert('Bağlantı hatası')
            localStorage.clear()
            this.props.history.push('/')
            console.log(err)
        })
    }


    render() {
        if(this.state.loading) {
            return (
                <div>
                    <h3>Yükleniyor...</h3>
                </div>
            )
        } else {
            return (
                <div className={"background"}>
                    <TabBar history={this.props.history}/>
                    <div className={"mailContainer"}>
                        <NavBar history={this.props.history}/>
                        <div className={"mailList"}>


                            {
                                JSON.parse(localStorage.getItem("mails")).map(x => {
                                    return(
                                        <Mails
                                            mail={x}
                                            history={this.props.history}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Dashboard;
