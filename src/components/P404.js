import React from "react";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
const P404 = props => {
  return (
    <>
      <Container style={{ padding: "3em 0em" }}>
        <Segment placeholder>
          <Header as='h2' icon>
            <Icon name="file alternate" />
            404
            <Header.Subheader>
              <Link to="/">back</Link>
            </Header.Subheader>

          </Header>
        </Segment>
      </Container>
    </>
  );
};
export default P404;
