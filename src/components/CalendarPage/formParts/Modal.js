import React from "react";
import { FormattedMessage} from 'react-intl'
import PropTypes from "prop-types";

class Modal extends React.Component {
  state = {
    show: this.props.show
  };

  showModal = () => {
    this.setState({
      show: true
    });
  };

  closeModal = () => {
    this.setState({
      show: false
    });
  };



  render() {
    // Render nothing if the "show" prop is false
    if (!this.state.show) {
      return <button className="info-button" onClick={this.showModal}>{this.props.buttonText}</button>;
    }

    // The gray background
    const backdropStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: "#fff",
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: "0 auto",
      padding: 30
    };

    return <div className="backdrop" style={{ backdropStyle }}>
        <div className="bukazu-modal" style={{ modalStyle }}>
          <div className="bukazu-modal-content">{this.props.children}</div>

          <div className="footer">
            <button onClick={this.closeModal}>
              <FormattedMessage id="close" />
            </button>
          </div>
        </div>
      </div>;
  }
}

Modal.defaultProps = {
  show: false
};

Modal.propTypes = {
  // onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
