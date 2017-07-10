import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
      super(props);
      
      this.pageNumber = this.pageNumber.bind(this)
  }
  
  
  pageNumber () {
    var totalPages;
    if (this.props.totalEvents > 24) {
      totalPages = Math.round(this.props.totalEvents/24);
    }
    var pagination = [];
    for (var i = 0; i < totalPages; i ++) {
      pagination.push(
        <a href='#' 
          onClick={this.props.changePage} 
          key = {i+11} 
          data-pageNum = {i+1} 
          style={{
            padding:0.2+'em', 
            background: '#fff', 
            borderRadius: 3+"px", 
            marginRight: 0.5+'em'
          }}
        >
        {i+1}
        </a>
      );
    }
    
    return pagination;
  }
  
  render() {
    return ( 
      <div> 
        {this.pageNumber()}
      </div> 
    );
  }
}

export default Pagination;