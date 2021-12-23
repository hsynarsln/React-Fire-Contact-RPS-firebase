import React from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';

const FormComponent = ({ info, setInfo }) => {
  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ width: 300 }}>
        <div className='ui piled segments'>
          <div className='ui segment brand'>
            <a href='https://github.com/clarusway' className='design' target='_blank' rel='noopener noreferrer'>
              <code>{'<Clarusway/> '}</code>
            </a>
            <span className='design header'>design</span>
          </div>
        </div>
        <h2 className='contact-header'>Add Contact</h2>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid name='username' icon='user' iconPosition='left' placeholder='Name' value={info.username} onChange={null} required />
            <Form.Input fluid name='phoneNumber' icon='phone' iconPosition='left' placeholder='Phone Number' value={info.phoneNumber} onChange={null} required />
            <Form.Dropdown options={null} onChange={null} placeholder='Gender' name='gender' fluid selection value={info.gender} required />
            <Button color='teal' fluid size='large'>
              Add
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default FormComponent;
