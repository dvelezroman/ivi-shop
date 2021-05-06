import React from "react";
import axios, { post } from "axios";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// Import the plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Register the plugin
registerPlugin( FilePondPluginImagePreview);

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately

const AUTH_TOKEN = "auth-token";

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      complete: undefined,
      files: []
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handleInit = this.handleInit.bind(this);
  }
  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(response => {
      console.log(response.data.error);
      if (response.data.name) {
        this.setState({ complete: true });
        this.props.refetch();
      }
    });
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  fileUpload(file) {
    const url = "http://localhost:4000/upload";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("product", this.props.product.id);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN)
      }
    };
    return post(url, formData, config);
  }
  render() {
    console.log(this.props.product);
    if (this.state.complete) return <>Complete</>;
    return (
        <FilePond
          server={{
            url: "http://localhost:4000",
            process: (
              fieldName,
              file,
              metadata,
              load,
              error,
              progress,
              abort
            ) => {
              // set data
              const formData = new FormData();
              formData.append("image", file);
              formData.append("product", this.props.product.id);
              // related to aborting the request
              const CancelToken = axios.CancelToken;
              const source = CancelToken.source();

              // the request itself
              axios({
                method: "post",
                url: "http://localhost:4000/upload",
                headers: {
                  "content-type": "multipart/form-data",
                  Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN)
                },
                data: formData,
                cancelToken: source.token,
                onUploadProgress: e => {
                  // updating progress indicator
                  progress(e.lengthComputable, e.loaded, e.total);
                }
              })
                .then(response => {
                  // passing the file id to FilePond
                  this.props.refetch()
                  //load(response.data.data.id)
                  load(file);
                })
                .catch(thrown => {
                  if (axios.isCancel(thrown)) {
                    console.log("Request canceled", thrown.message);
                  } else {
                    // handle error
                  }
                });

              // Setup abort interface
              return {
                abort: () => {
                  source.cancel("Operation canceled by the user.");
                }
              };
            },
            fetch: "./images/",
            revert: null
          }}
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          allowMultiple={false}
          oninit={() => this.handleInit()}
          onupdatefiles={fileItems => {
            // Set currently active file objects to this.state
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
          }}
        />
    );
  }
}

export default SimpleReactFileUpload;
