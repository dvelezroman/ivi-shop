import React from "react";
import { Dimmer, Loader, Placeholder } from "semantic-ui-react";

const Loaders = props => {
  return (
    <>
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
      <Placeholder fluid>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </>
  );
};
export default Loaders;
