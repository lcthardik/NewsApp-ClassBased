import React, { Component } from 'react'

export class NewsComponent extends Component {
  render() {
    let {title,desc,imgUrl,url,author,date,source}=this.props;
    return (
      <div>
        <div className="card my-2">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-dark" style={{left:"90%",zIndex:1}}>{source}</span>
          <img src={imgUrl?imgUrl:"https://www.skrewitup.com/metalogo.jpg"} className="card-img-top" alt={imgUrl}/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsComponent
