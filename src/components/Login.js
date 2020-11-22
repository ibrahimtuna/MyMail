import React, {Component} from 'react';
import '../css/main.css';
import '../css/util.css';
import axios from 'axios';
import {API_URI} from "../constants";


const mailData = [
    {
        _id:'123',
        subject:'İş Görüşmesi Hk.',
        sender_id:'1',
        sender_name:'Berke Özdemir',
        sender_username:'berke.ozdemir@mymail.com',
        receiver_id:'2',
        receiver_name:'İbrahim Tuna',
        receiver_username:'ibrahim.tuna@mymail.com',
        contents:[
            {
                text:'Merhabalar, İş görüşmesi hakkında yazıyorum.',
                createdAt:new Date(Date.now())-(60*60*24*1000),
                sender_id:'1',
                isRead:false
            },
            {
                text:"Cv'nizi bekliyorum",
                createdAt: new Date(Date.now()),
                sender_id: '2',
                isRead: false
            }
        ]
    },
    {
        _id:'456',
        subject:'Cumartesi Çalışma Saatleri',
        sender_id:'3',
        sender_name:'Alihan Kazal',
        sender_username:'alihan.kazal@mymail.com',
        receiver_id:'2',
        receiver_name:'İbrahim Tuna',
        receiver_username:'ibrahim.tuna@mymail.com',
        contents:[
            {
                text:'Merhabalar',
                createdAt:new Date(Date.now())-(60*60*24*1000),
                sender_id:'3',
                isRead:false
            },
            {
                text:"cevabınızı bekliyorum",
                createdAt: new Date(Date.now()),
                sender_id: '2',
                isRead: false
            }
        ]
    }
]


class Login extends Component {
    state = {
        loading:false,
    }

    login = () => {
        this.setState({loading:true});
            let email = document.getElementById("email").value;
            let pass = document.getElementById("pass").value;
            axios.post(API_URI+'/login',{
                username:email,
                password:pass
            }).then((res)=>{
                console.log(res.data)
                if(res.data.status) {
                    // giriş başarılı
                    this.setState({loading:false});
                    localStorage.setItem("id",res.data._id);
                    localStorage.setItem("username",res.data.username);
                    localStorage.setItem("name",res.data.name);
                    this.props.history.push('/dashboard');
                } else {
                    alert(res.data.message)
                }
            }).catch((err)=>{
                alert('bağlantı sorunu !',err)
            })
    }

    render () {
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
					<span className="login100-form-title p-b-26">
						MyMail
					</span>
                            <span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"></i>
					</span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                <input id ="email" className="input100" type="text" name="email"/>
                                <span className="focus-input100" data-placeholder="Kullanıcı Adı"></span>
                            </div>



                            <div className="wrap-input100 validate-input" data-validate="Enter password">
						<span className="btn-show-pass">
							<i className="zmdi zmdi-eye"></i>
						</span>
                                <input id="pass" className="input100" type="password" name="pass"/>
                                <span className="focus-input100" data-placeholder="Şifre"></span>
                            </div>
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                    <button
                                        onClick={this.login}
                                        className="login100-form-btn">
                                        {this.state.loading ?
                                            <i
                                                className="fas fa-spinner"
                                                style={{ marginRight: "5px" }}
                                            /> : <span>Giriş</span>}
                                    </button>

                                </div>
                                <span>Coded By Halil İbrahim Tuna</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="dropDownSelect1"></div>
            </div>
        )
    }
}

export default Login;
