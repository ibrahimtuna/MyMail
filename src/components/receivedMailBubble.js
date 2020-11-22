import React, {Component} from 'react';
import '../css/dashboard.css';

class ReceivedMailBubble extends Component {

    componentDidMount() {
        console.log(this.props,"received bubble")
    }


    render() {
        return (
            <div className={"mail-ctn"}>
                <div className={"receivedMailBox"}>
                    <span>{this.props.mail.text}</span>
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

export default ReceivedMailBubble;
