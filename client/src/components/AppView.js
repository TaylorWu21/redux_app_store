import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Image, Container, Table, Button, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deleteApp } from '../actions/apps';

class AppView extends Component {
  state = { open: false }

  show = () => this.setState({ open: true })

  handleConfirm = (id) => {
    this.props.dispatch(deleteApp(id));
    this.props.history.push('/apps');
    this.setState({ open: false });
  }

  handleCancel = () => this.setState({ open: false })

  render() {
    const { app, dispatch, history} = this.props;
    if(!app) {
      return <div>Loading</div>
    }
    return (
      <Container>
        <Link to="/apps">View All Apps</Link>
        <Header as="h3" textAlign="center">{app.name}</Header>
        <Image src={app.logo} />
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Actions</Table.Cell>
              <Table.Cell>
                <Link to={`/apps/edit/${app.id}`}><Button color='orange'>Update</Button></Link>
                <Button color='red' onClick={this.show}>Delete</Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Description</Table.Cell>
              <Table.Cell>{app.description}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Author</Table.Cell>
              <Table.Cell>{app.author}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Version</Table.Cell>
              <Table.Cell>{app.version}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Price</Table.Cell>
              <Table.Cell>${app.price}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Category</Table.Cell>
              <Table.Cell>{app.category}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Confirm
          open={this.state.open}
          onCancel={this.handleCancel}
          onConfirm={ () => this.handleConfirm(app.id)}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { app: state.apps.apps.find(a => a.id === parseInt(props.match.params.id, 10)) }
}

export default connect(mapStateToProps)(AppView);