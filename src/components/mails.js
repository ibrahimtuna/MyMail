import React, {Component} from 'react';

class Mails extends Component {

    render() {
        return (
            <div
                className={"mailsContainer"}>
                <div
                    onClick={()=>this.props.history.push(`/mail/${this.props.mail._id}`)}
                    className={"mail"}>
                    <div className={"senderName"}>
                        <span
                        style={
                        !this.props.mail.contents[this.props.mail.contents.length-1].isRead
                            &&
                        this.props.mail.contents[this.props.mail.contents.length-1].sender_id !== localStorage.getItem("id")
                            ? {fontWeight:'bold',color:'black'} : {color:'gray'}
                        }
                        >
                            {
                                this.props.mail.sender_id === localStorage.getItem("id") ?
                                    this.props.mail.receiver_name : this.props.mail.sender_name
                            }
                        </span>
                    </div>
                    <div className={"subject"}>
                        <span
                            style={
                                !this.props.mail.contents[this.props.mail.contents.length-1].isRead
                                &&
                                this.props.mail.contents[this.props.mail.contents.length-1].sender_id != localStorage.getItem("id")
                                    ? {fontWeight:'bold',color:'black'} : {color:'gray'}
                            }
                        >{this.props.mail.subject}</span>
                    </div>
                    <div
                        style={
                            !this.props.mail.contents[this.props.mail.contents.length-1].isRead
                            &&
                            this.props.mail.contents[this.props.mail.contents.length-1].sender_id != localStorage.getItem("id")
                                ? {fontWeight:'bold',color:'black'} : {color:'gray'}
                        }
                        className={"date"}>
                        <span>
                            {
                                new Date(this.props.mail.contents[this.props.mail.contents.length-1].createdAt).getDate() + '/' +
                                new Date(this.props.mail.contents[this.props.mail.contents.length-1].createdAt).getMonth() + '/' +
                                new Date(this.props.mail.contents[this.props.mail.contents.length-1].createdAt).getFullYear()
                            }
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mails;
