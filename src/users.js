import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import User from './user';
const Users = () => (
  <Query
    query={gql`
		{
		  users {
			id
			firstName
			lastName
			email
			created
		  }
		}
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :${error.message}</p>;
		return data.users.map((currentUser) => (
			   <User key={currentUser.id} user={currentUser} />
		));

    }}
  </Query>
	);
export default Users;
