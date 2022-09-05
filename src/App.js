import React, { Fragment, useState } from "react";
import Button from "./Button";
import './App.css';
import axios from "axios";

const App = () => {


  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(false)
  const [activeLink, setActiveLink] = useState(0)

  const onClickHandler = () => {
    setLoading(true);
    axios.get('https://randomuser.me/api/')
    .then((response)=>{
      console.log(response.data.results)
      setUserData(response.data.results);
    }).catch((error)=>{
      console.log(error);
      setLoading(true);
    }).finally(()=>{
      setLoading(false);
      setActiveUser(true)
    })
  }


  const icons =[
    'fas fa-user fa-4x',
    'fas fa-envelope fa-4x',
    'fas fa-calender-alt fa-4x',
    'fas fa-map-marker fa-4x',
    'fas fa-phone fa-4x',
    'fas fa-lock fa-4x',
  ];

  const PhraseGenerator = ({user})=>{
    const phrases = [
      'Hi My Name Is ${user.name.first} ${user.name.last}',
      'My Email Is ${user.email.first}',
      'Date Of Birth ${user.dob.date.slice(0,10)}',
      'I Am From ${user.location.state} ${user.location.country}',
      'PHONE NUMBER ${user.phone}',
      'Login Details ${user.login.password} ${user.login.username}',
    ];
    return
      <h2>{phrases[activeLink]}</h2>
  }

  const activeLinkHandler =(index)=>{
    setActiveLink(index);
  }




  return (
    <div className="App">
      <h1>The Best User Generator App</h1>
      <Button 
        isActive={activeUser} clicked={onClickHandler}
      />
      {loading ? (
        <h2>Please wait</h2>
      ):(
        <div className="app__user">
          {userData.map((user,index)=>{
            return(
              <Fragment key={user.cell}> 
                <img src={user.picture.large}alt="#"></img>
                <PhraseGenerator user={user}/>
                  <div className="app__icons">
                    {icons.map((icon,index)=>{
                      return
                        <i className="{icon} key={index}" 
                        onMouseEnter={()=>activeLinkHandler(index)}/>
                    })}
                  </div>
              </Fragment>
            )
          })}
        </div> 
      )}
    </div>
  );
}

export default App;
