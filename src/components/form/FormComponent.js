import React from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { options } from '../../utils/constants';

const FormComponent = ({ info, setInfo, handleFormSubmit, isEditing }) => {
  const handleInputChange = e => {
    // const name=e.target.name
    // const value=e.target.value
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  //! semantic ui 2 parametre alıyor
  const handleOptionChange = (e, values) => {
    const { name, value } = values || e.target;
    setInfo({ ...info, [name]: value });
  };

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
        <Form size='large' onSubmit={handleFormSubmit}>
          <Segment stacked>
            <Form.Input fluid name='username' icon='user' iconPosition='left' placeholder='Name' value={info.username} onChange={handleInputChange} required />
            <Form.Input fluid name='phoneNumber' icon='phone' iconPosition='left' placeholder='Phone Number' value={info.phoneNumber} onChange={handleInputChange} required />
            <Form.Dropdown placeholder='Gender' options={options} onChange={handleOptionChange} name='gender' fluid selection value={info.gender} required />
            {isEditing ? (
              <Button color='teal' fluid size='large'>
                Update
              </Button>
            ) : (
              <Button color='teal' fluid size='large'>
                Add
              </Button>
            )}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default FormComponent;
