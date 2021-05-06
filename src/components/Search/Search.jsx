import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Redirect } from 'react-router-dom'
import { Search } from "semantic-ui-react";
import _ from 'lodash'
class SearchBox extends Component {
  state = {
    value: "",
    redirect:null
  };
  handleResultSelect = (e, { result }) => {
    this.setState({redirect:"/p/"+result.slug });
  };
  search = (e) => {
    this.setState({ value: e.target.value });
    this.props.data.refetch({
      keyword: e.target.value
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
        //this.setState({ redirect:null })
  
      return <Redirect to={this.state.redirect} />;
    }
  };
  render() {
    const { value } = this.state;
    return (
      <>
        {this.renderRedirect()}
        <Search
            loading={this.props.data.loading}
          placeholder="Search..."
          size="small"
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.search, 10000, {
            leading: true,
          })}
          results={this.props.data.productSearch}
          value={value}
        />
      </>
    );
  }
}

const productQuery = gql`
  query products($keyword: String) {
    productSearch(keyword: $keyword) {
      id
      slug
      title
    }
  }
`;

export default graphql(productQuery)(
  SearchBox
);
