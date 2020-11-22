import React, {Component} from 'react';
import '../css/dashboard.css';

class SendedMailBubble extends Component {

    componentDidMount() {
        console.log(this.props,"bubble")
    }


    render() {
        return (
            <div className={"mail-ctn"}>
                <div className={"sendedMailBox"}>
                    <span>
                        {
                            this.props.mail.text
                        }
                    </span>
                    <span className={"sendedMailDate"}>
                        {
                            `${new Date(this.props.mail.createdAt).getDate()}/${new Date (this.props.mail.createdAt).getMonth()+1}`
                        }
                    </span>
                </div>
            </div>
        );
    }
}

export default SendedMailBubble;
