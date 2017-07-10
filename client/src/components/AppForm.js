import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  Container, 
  Button, 
  Form, 
  Select, 
} from 'semantic-ui-react'

import { addApp, updateApp } from '../actions/apps';

class AppForm extends Component {
  state = {}
  defaultState = { 
    name: '', description: '', logo: '', category: '', 
    price: '', version: '', featured: false, author: ''
  } 

  componentDidMount() {
    this.setState(this.defaultState);
    if(this.props.app) {
      this.setState(this.props.app)
    }
  }

  options = () => {
    return this.props.categories.map( (category, i) => {
      return { key: i, text: category, value: category }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.props.app) {
      this.props.dispatch(updateApp(this.state));
      this.setState(this.defaultState);
      this.props.history.push(`/apps/${this.props.app.id}`)
    } else {
      this.props.dispatch(addApp(this.state));
      this.setState(this.defaultState);
      this.props.history.push('/apps');
    }
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              id='name'
              label='Name' 
              placeholder='Name'
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Form.Input 
              id='logo'
              label='Logo Url' 
              placeholder='Logo Url'
              value={this.state.logo}
              onChange={this.handleChange}
            />
            <Form.Input 
              id='author'
              label='Author' 
              placeholder='Author'
              value={this.state.author}
              onChange={this.handleChange}
            />
            <Form.Input 
              id='price'
              label='Price' 
              placeholder='Price'
              value={this.state.price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              id='version'
              label='Version' 
              placeholder='Version'
              value={this.state.version}
              onChange={this.handleChange}
            />
            <Form.Field 
              control={Select}
              label='Category'
              options={this.options()} 
              placeholder='Category'
              value={this.state.category}
              onChange={ (e, data) => this.setState({ category: data.value }) }
            />
          </Form.Group>
          <Form.TextArea
            id='description'
            label='Description' 
            placeholder='Description' 
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Form.Checkbox 
            label='Featured App'
            checked={this.state.featured}
            onChange={ (e) => this.setState({ featured: !this.state.featured }) }
          />
          <Form.Group>
            <Form.Button>Submit</Form.Button>
            <Button type='button'><Link to='/apps'>Back</Link></Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  const categories = [...new Set(state.apps.apps.map( a => a.category ))];
  if(props.match.params.id)
    return {  
      app: state.apps.apps.find(a => a.id === parseInt(props.match.params.id, 10)), 
      categories 
    }
  return { categories }
}

export default connect(mapStateToProps)(AppForm);