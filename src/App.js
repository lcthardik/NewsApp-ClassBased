import './App.css';
import Navbar from './Components/Navbar';
import React, { Component } from 'react'
import Newss from './Components/Newss';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API 
  ArticlePerPage=12;

  state={
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>        
        <Router>
          <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        
        <Routes>
          <Route exact  path="/" element={<Newss setProgress={this.setProgress} key="general" PageLimit={this.ArticlePerPage} country={"in"} category={"general"} ApiKey={this.apiKey} />}/>
          <Route exact  path="/business" element={<Newss setProgress={this.setProgress} key="business" PageLimit={this.ArticlePerPage} country={"in"} category={"business"} ApiKey={this.apiKey}/>}/>
          <Route exact path="/entertainment" element={<Newss setProgress={this.setProgress} key="entertainment" PageLimit={this.ArticlePerPage} country={"in"} category={"entertainment"} ApiKey={this.apiKey}/>}/>
          <Route exact path="/health" element={<Newss setProgress={this.setProgress} key="health" PageLimit={this.ArticlePerPage} country={"in"} category={"health"} ApiKey={this.apiKey}/>}/>
          <Route exact path="/science"  element={<Newss setProgress={this.setProgress} key="science" PageLimit={this.ArticlePerPage} country={"in"} category={"science"} ApiKey={this.apiKey}/>}/>
          <Route exact path="/sports" element={<Newss setProgress={this.setProgress} key="sports" PageLimit={this.ArticlePerPage} country={"in"} category={"sports"} ApiKey={this.apiKey}/>}/>
          <Route exact path="/technology" element={<Newss setProgress={this.setProgress} key="technology" PageLimit={this.ArticlePerPage} country={"in"} category={"technology"} ApiKey={this.apiKey}/>}/>
        </Routes>
        </Router>
      </div>
    )
  }
}
