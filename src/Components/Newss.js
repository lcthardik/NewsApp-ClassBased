import React, { Component } from "react";
import NewsComponent from "./NewsComponent";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class Newss extends Component {
  static defaultProps = {
    country: "in",
    PageLimit: 12,
  };

  static propTypes = {
    country: PropTypes.string,
    PageLimit: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArt: 0,
    };
  }

  async getNews(props) {
    
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ApiKey}&page=${this.state.page}&pageSize=${this.props.PageLimit}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      page: this.state.page,
      articles: parsedData.articles,
      loading: false,
      totalArt: parsedData.totalResults,
    });
    this.props.setProgress(100);
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidMount() {
    this.getNews();
    document.title="GodNews: ".concat(this.capitalizeFirstLetter(this.props.category));
  }

  // prevAction = async()=>{
  //   this.setState({page:this.state.page -1});
  //   this.getNews();
  // }

  // nextAction = async()=>{
  //   this.setState({page:this.state.page +1});
  //   this.getNews();
  // }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.ApiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.PageLimit}`;
    this.setState({ page: this.state.page + 1 });
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      //totalArt:parsedData.totalResults
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center " style={{ margin: "35px 0px" }}>
          <strong style={{lineHeight: "2.2",fontSize: "3.5rem"}}>Latest News</strong>
        </h1>
        
          <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalArt}
            loader={<Spinner />}
          >
            {/* {this.state.loading && <Spinner/>} */}
            <div className="container">
              <div className="row">
                {this.state.articles.map((ele) => {
                  return (
                    <div className="col-md-4" key={ele.url}>
                      <NewsComponent
                        title={ele.title ? ele.title : ""}
                        desc={ele.description ? ele.description : ""}
                        imgUrl={ele.urlToImage}
                        url={ele.url}
                        author={ele.author}
                        date={ele.publishedAt}
                        source={ele.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-dark" onClick={this.prevAction} disabled={this.state.page === 1}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.nextAction} disabled={Math.ceil(this.state.totalArt/this.props.PageLimit) <= this.state.page}>  Next &rarr;  </button>
        </div> */}
          </InfiniteScroll>
        
      </>
    );
  }
}

export default Newss;
