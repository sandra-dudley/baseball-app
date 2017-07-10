import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
      super(props);
      this.state = {
        currentPage: 1
      }
      this.pageNumber = this.pageNumber.bind(this)
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.page !== this.props.page) {
      
      this.setState({currentPage: this.props.page})
      this.pageNumber();
      console.log("Updated")
    }
  }
  pageNumber () {
    let totalPages;
    if (this.props.totalEvents > 24) {
      totalPages = Math.round(this.props.totalEvents/24);
    }
    let pagination = [];
    for (let i = 0; i < totalPages; i ++) {
      let isActive = (this.props.page == i+1);
      pagination.push(
        <button
          type="button"
          className={(isActive)? "btn": "btn btn-secondary"}
          onClick={this.props.changePage} 
          key = {i+1} 
          data-pageNum = {i+1} 
        >
        {i+1}
        </button>
      );
    }
    return pagination;
  }
  
  render() {
    return ( 
      <div className="btn-group" role="group" aria-label="Pagination"> 
        {this.pageNumber()}
      </div> 
    );
  }
}

export default Pagination;