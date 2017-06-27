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
  Dropdown,
  Divider,
  Button,
} from 'semantic-ui-react';

class Apps extends Component {
  state = { category: '' }

  componentDidMount() {
    this.props.dispatch(getApps());
  }

  apps = () => {
    const { apps } = this.props;
    const { category } = this.state;
    let visible = apps;
    if(category)
      visible = apps.filter(a => a.category === category);
    return visible.map( app => {
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

  categoryOptions = () => {
    const { categories } = this.props;
    return categories.map( (c, i) => {
      return {key: i, text: c, value: c}
    });
  }

  render() {
    const { category } = this.state;
    return (
      <Container>
        <Header as='h3' textAlign='center'>Apps</Header>
        <Dropdown
          placeholder='Filter By Category'
          fluid
          selection
          options={this.categoryOptions()}
          onChange={ (e, data) => this.setState({ category: data.value}) }
          value={category}
        />
        { category &&
          <Button
            fluid
            basic
            onClick={ () => this.setState({ category: '' }) }
          >
            Clear Filter: {category}
          </Button>
        }
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
  const apps = state.apps;
  const categories = [...new Set(apps.map( a => a.category ))];
  return { apps, categories }
}

export default connect(mapStateToProps)(Apps);