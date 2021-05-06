import React from "react";
import Loader from "../Loader";
import { Container, Segment, Grid, Responsive } from "semantic-ui-react";
import Products from "./Products"
import Category from  "../Category/Categories"
const Slide = React.lazy(() => import("../Slide/Slide"));
const HomepageHeading = () => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Segment padded basic>
      <Grid columns={2}>
        <Grid.Column width={5}>
          <Category />
        </Grid.Column>
        <Grid.Column width={11}>
          <React.Suspense fallback={<Loader />}>
            <Slide />
          </React.Suspense>
        </Grid.Column>
      </Grid>
    </Segment>
  </Responsive>
);

const ShowAllProduct = () => (
  <Container>
    <HomepageHeading />
    <Segment basic style={{ paddingBottom: "3em", paddingTop: "3em" }}>
      <Products />
    </Segment>
  </Container>
);
export default ShowAllProduct;
