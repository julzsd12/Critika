import React from 'react'
import './App.css'
import { Card, Icon, Col, Row, Button } from 'antd'
import {Link} from 'react-router-dom'
class Profile extends React.Component{
    
  render(){
  return (
    <div>
      <Button.Group size={"small"}>
          <Button type="primary">
            <Icon type="left" />Return to Dashboard
          </Button>
      </Button.Group>

      {/* <Button style={{float: "right"}}> */}
      <Link style={{float:"right"}} to="/editProfile"><Icon type="edit" theme="filled" />Edit Profile</Link>
      {/* Edit Profile</Button> */}
      <h1>User Profile <Button type="primary" size="large">+ Add Friend</Button> <Button type="primary" size="large">Submissions</Button> </h1>
      
      <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={16}>
      <Col span={8}>
      <Card title="Critika Score" bordered={false} style={{ width: 250 }}>

<p><Icon type="star" theme="filled" />
<Icon type="star" theme="filled" />
<Icon type="star" theme="filled" />
<Icon type="star" theme="filled" />
<Icon type="star" theme="outlined" />
<h1> 4.0 </h1></p>


</Card>
      </Col>
      <Col span={8}>
      <Card title="Badges" bordered={false} style={{ width: 250 }}>

<p> Made 100 connections <Icon type="user" theme="outlined" /></p>
<p> Received 100 likes on comments<Icon type="like" theme="outlined" /></p>

</Card>
      </Col>
      <Col span={8}>
        <Card title="Personal Information" bordered={false}>
        <p>Member since: 9.24.18</p>
        <p>Number of friends: 30 </p>
        <p>Number of submissions: 3</p>
        <p>Number of critiques given: 16</p>
        <p>Number of critiques received: 8</p>
        </Card>
      </Col>
    </Row>
  </div>,
      
    </div>
  );
  }
} 

export default Profile