import React, { Component } from "react";
import draftToHtml from "draftjs-to-html";
import { Container, Header, Form, Segment, TextArea } from "semantic-ui-react";
import Editor from "./Editor";
var HtmlToReactParser = require("html-to-react").Parser;
var htmlToReactParser = new HtmlToReactParser();
class EditorConvertToHTML extends Component {
  state = {
    text: ""
  };

  editorText = Function = htmltext => {
    this.setState({
      text: htmltext
    });
    console.log(htmltext);
  };

  render() {
    const { editorState } = this.state;
    return (
      <Container>
        <Segment className="editor">
          {htmlToReactParser.parse(
            this.state.text
          )}
          <Editor htmltext={this.editorText} />
        </Segment>
      </Container>
    );
  }
}
export default EditorConvertToHTML;
