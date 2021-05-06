import React from "react";
import { Card, Placeholder, Button } from "semantic-ui-react";
const PrdoctPlaceholder = () =>(
    <>
      <Card>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="very short" />
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
  
        <Card.Content extra>
          <Button disabled primary>
            Add to cart
          </Button>
        </Card.Content>
      </Card>
      
      <Card>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="very short" />
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
  
        <Card.Content extra>
          <Button disabled primary>
            Add to cart
          </Button>
        </Card.Content>
      </Card>
    </>
  )
  
export default PrdoctPlaceholder;