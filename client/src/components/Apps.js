import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Card,
  Image,
  Dropdown,
  Button,
  Divider,
} from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

import { getApps } from '../actions/apps';

class Apps extends Component {
  state = { category: '', hasMore: true }

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

  getNextPage = (e) => {
    const { pagination, dispatch } = this.props;
    if(pagination.totalPages) {
      if(e <= pagination.totalPages)
        dispatch(getApps(e));
      else
        this.setState({ hasMore: false });
    }
  }

  render() {
    const { category, hasMore } = this.state;
    return (
      <Container>
        <Header as='h3' textAlign='center'>Apps</Header>
        <Divider />
        <Button><Link to='apps/new'>Create New App</Link></Button>
        <Divider />
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
        <Divider />
          <div style={{ height: '700px', overflow: 'auto' }}>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.getNextPage}
              hasMore={hasMore}
              loader={<div className="loader">Loading ...</div>}
              useWindow={false}
            >
            <Grid columns={16}>
              <Grid.Row>
                  {this.apps()}
              </Grid.Row>
            </Grid>
          </InfiniteScroll>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { apps, pagination } = state.apps;
  const categories = [...new Set(apps.map( a => a.category ))];
  return { apps, categories, pagination }
}

export default connect(mapStateToProps)(Apps);