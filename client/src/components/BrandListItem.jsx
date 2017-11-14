import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ListItem } from 'material-ui/List';
import Delete from 'material-ui/svg-icons/action/delete';
import { deleteBrand } from '../redux/actionCreators';

class BrandLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  handleRedirectClick = () => {
    this.setState({ redirect: true });
  };
  render() {
    const { name, id } = this.props;
    if (this.state.redirect) {
      return <Redirect push to={`brands/${id}`} />;
    }
    const deleteButton = (
      <Delete
        onClick={e => {
          e.stopPropagation();
          if (window.confirm('Delete this brand?')) {
            this.props.deleteBrand(id);
          }
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

BrandLineItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  deleteBrand: PropTypes.func,
};

BrandLineItem.defaultProps = {
  deleteBrand: () => '',
};

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  brands: state.brands,
});

const mapDispatchToProps = dispatch => ({
  deleteBrand(id) {
    dispatch(deleteBrand(id));
  },
});

export const Unwrapped = BrandLineItem;

export default connect(mapStateToProps, mapDispatchToProps)(BrandLineItem);
