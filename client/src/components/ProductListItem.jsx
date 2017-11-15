import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ListItem } from 'material-ui/List';
import Delete from 'material-ui/svg-icons/action/delete';
import { deleteProduct } from '../redux/actionCreators';

class ProductLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  handleRedirectClick = () => {
    this.setState({ redirect: true });
  };
  render() {
    const { name, id, deleteProduct } = this.props;
    if (this.state.redirect) {
      return <Redirect push to={`products/${id}`} />;
    }
    const deleteButton = (
      <Delete
        onClick={e => {
          e.stopPropagation();
          deleteProduct(id);
        }}
      />
    );
    return (
      <ListItem
        primaryText={name}
        onClick={this.handleRedirectClick}
        rightIcon={deleteButton}
      />
    );
  }
}

ProductLineItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  deleteProduct: PropTypes.func,
};

ProductLineItem.defaultProps = {
  deleteProduct: () => '',
};

const mapStateToProps = state => ({
  isFetching: state.isFetching,
});

const mapDispatchToProps = dispatch => ({
  deleteProduct(id) {
    dispatch(deleteProduct(id));
  },
});

export const Unwrapped = ProductLineItem;

export default connect(mapStateToProps, mapDispatchToProps)(ProductLineItem);
