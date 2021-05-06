import React, { Component } from "react";
import { EditorState, convertToRaw , ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';

import { Container, Segment } from "semantic-ui-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const html_draft =(html) =>{
  const blocksFromHtml = htmlToDraft(html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return contentState
}

class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createWithContent(html_draft(this.props.html||""))
  };

  render() {
    const { editorState } = this.state;
    return (
      <Container>
        <Segment className="editor">
          <Editor
            editorStyle={{minHeight:340}}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={editorState =>{
              this.setState({
                editorState
              })
              if (this.props.htmltext) {
                this.props.htmltext(
                  draftToHtml(convertToRaw(editorState.getCurrentContent()))
                )
              }}
            }
            
            toolbar={{
              link: { inDropdown: false }
            }}
          />
        </Segment>
      </Container>
    );
  }
}
export default EditorConvertToHTML;
