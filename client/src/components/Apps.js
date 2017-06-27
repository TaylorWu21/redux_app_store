import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getApps } from '../actions/apps';
import {
  Container,
  Grid,
  Header,
  Card,
  Image,
} from 'semantic-ui-react';

class Apps extends Component {

  componentDidMount() {
    this.props.dispatch(getApps());
  }

  apps = () => {
    return this.props.apps.map( app => {
      const { id, logo, name, author, category } = app;
      return(
        <Grid.Column key={id} computer={4} tablet={8}>
          <Card>
            <Image src={logo} />
            <Card.Content>
              <Card.Header>
                {name}
              </Card.Header>
              <Card.Meta>
                <span>{author}</span>
              </Card.Meta>
              <Card.Description>
                {category}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to={`/apps/${id}`}>View App</Link>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  }

  render() {
    return (
      <Container>
        <Header as='h3' textAlign='center'>Apps</Header>
        <Grid columns={16}>
          <Grid.Row>
            {this.apps()}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { apps: state.apps }
}

export default connect(mapStateToProps)(Apps);