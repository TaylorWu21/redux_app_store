import React from 'react';
import { connect } from 'react-redux';
import { Header, Image, Container, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const AppView = ({ app = {} }) => {
  return (
    <Container>
      <Link to="/apps">View All Apps</Link>
      <Header as="h3" textAlign="center">{app.name}</Header>
      <Image src={app.logo} />
      <Table definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
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
    </Container>
  );
};

const mapStateToProps = (state, props) => {
  return { app: state.apps.find( a => a.id === parseInt(props.match.params.id )) }
}

export default connect(mapStateToProps)(AppView);