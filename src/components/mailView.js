import React, {Component} from 'react';
import '../css/dashboard.css'
import TabBar from "./tabBar";
import NavBar from "./navBar";
import ReceivedMailBubble from "./receivedMailBubble";
import SendedMailBubble from "./sendedMailBubble";
import axios from 'axios';
import {API_URI} from "../constants";

class MailView extends Component {

    state = {
        mails:'',
        loading:true,
        sending:false
    }

    sendMail = () => {
        let mailText = document.getElementById("mailText").value;
        this.setState({sending:true});
        if(mailText.trim() !== "") {
            const id = localStorage.getItem("id")
            axios.post(API_URI+'/newMail',{
                sender_id:id,
                text:mailText.trim(),
                mail_id:this.props.match.params.id
            }).then(()=>{
                this.state.mails.contents.push({
                    text:mailText.trim(),
                    sender_id:id,
                    createdAt: new Date(Date.now()),
                    isRead:false
                })
                document.getElementById("mailText").value = '';
                this.setState({sending:false});
            }).catch((err)=>{
                alert('mail gönderilemedi, bağlantı hatası')
                console.log(err)
            })
        } else {
            alert('Boş mail gönderilemez!')
        }
    }

    mailSeen = () => {
        const mails = JSON.parse(localStorage.getItem("mails"));
        const id = localStorage.getItem("id")
        const filteredMails = mails.filter(x => {
            return x._id === this.props.match.params.id
        })
        if (
            !filteredMails[0].contents[filteredMails[0].contents.length-1].isRead &&
            filteredMails[0].contents[filteredMails[0].contents.length-1].sender_id !== id
        ) {
            axios.put(API_URI+'/mailSeen',{
                mail_id:this.props.match.params.id
            }).then((res)=>{
                filteredMails[0].contents[filteredMails[0].contents.length-1].isRead = true;
                localStorage.setItem("mails",JSON.stringify(mails))
                let countMail = localStorage.getItem("unReadMails")
                localStorage.setItem("unReadMails",countMail-1)
            }).catch((err)=>{
                console.log(err,"isRead veri tabanına yazılamadı")
            })
        } else {
            return;
        }
    }

    componentDidMount() {
        const mails = JSON.parse(localStorage.getItem("mails"))
        if(mails === null) {
            alert('yetkisiz giriş')
            this.props.history.push('/')
            localStorage.clear()
        }
        const filteredMail = mails.filter(x => {
            return x._id === this.props.match.params.id
        })
        if(filteredMail === null || filteredMail === undefined || filteredMail.length === 0) {
            alert('yetkisiz giriş')
            this.props.history.push('/')
            localStorage.clear()
        }
        this.setState({mails:filteredMail[0],loading:false});
        this.mailSeen()

    }


    render() {
        if(!this.state.loading) {
        return (
            <div className={"background"}>
                <TabBar history={this.props.history}/>
                <div className={"mailContainer"}>
                    <NavBar history={this.props.history}/>


                    <div className={"mailsViewContainer"}>


                        <div className={"subjectMail"}>
                            <div className={"senderIcon"}>
                                <span style={{fontWeight:'bold',fontSize:24}}>
                                    {
                                        this.state.mails.sender_id === localStorage.getItem("id") ?
                                            this.state.mails.receiver_name.toUpperCase().substr(0,1)
                                            : this.state.mails.sender_name.toUpperCase().substr(0,1)
                                    }
                                </span>
                            </div>
                            <div className={"senderName"}>
                                <span>
                                    {
                                        this.state.mails.sender_id === localStorage.getItem("id") ?
                                            this.state.mails.receiver_name : this.state.mails.sender_name
                                    }
                                </span>
                                <span>
                                    {
                                        this.state.mails.sender_id === localStorage.getItem("id") ?
                                            this.state.mails.receiver_username : this.state.mails.sender_username
                                    }
                                </span>
                            </div>
                            <h3 className={"subjectHeader"}>
                                {
                                    this.state.mails.subject
                                }
                            </h3>

                        </div>

                        <div className={"content"}>

                            {
                                this.state.mails.contents.map(x => {
                                    if(x.sender_id === localStorage.getItem("id")) {
                                        return (
                                            <SendedMailBubble mail={x} />
                                        )
                                    } else {
                                        return (
                                            <ReceivedMailBubble mail={x} />
                                        )
                                    }
                                })
                            }


                        </div>

                        <div className={"sendMail"}>
                            <div className={"ml-cnt"}>
                                <textarea id={"mailText"} placeholder={"Mail Yaz..."} className={"mailInput"}/>
                                <div className={"btn-cnt"}>
                                    <button
                                        onClick={this.sendMail}
                                        className={"send-button"}>Gönder</button>
                                </div>
                            </div>
                        </div>
                    </div>








                </div>
            </div>
        )
        } else {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            )
        }
    }
}

export default MailView;
