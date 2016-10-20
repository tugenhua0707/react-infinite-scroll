
import React from 'react';
import ReactDom from 'react-dom';
import InfiniteScroll from '../common/js/infiniteScroll';
var css = require('./index.styl');

class Item extends React.Component {
  render() {
    return (
      <p>{this.props.text}</p>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    var num = Math.floor(Math.random() * 100);
    var arrs = [];
    for(var i = 0; i < num; i++) {
      arrs.push(Math.random());
    }
    this.state = {
      items: arrs
    }
  }

  render() {
    return (
      <InfiniteScroll onLoad = {this.loadMore.bind(this)} hasMore = {true} retry = {this.retry.bind(this)} >
        {(() => {
          return this.state.items.map((item,index) => {
            return <Item text = {item} key={index}/>
          });
        })()}
      </InfiniteScroll>
    )
  }
  loadMore() {
    var num = 10;
    var me = this;
    return new Promise((resolve, reject) => {
      var arrs = [];
      for(var i = 0; i < num; i++) {
        arrs.push(Math.random());
      }
      setTimeout(() => {
        me.setState({
          items: me.state.items.concat(arrs)
        });
        resolve();
        //reject(new Error("请求超时，点击重试"));
      },3000);
    })
  }
  retry() {
    var num = 10;
    var me = this;
    return new Promise((resolve, reject) => {
      var arrs = [];
      for(var i = 0; i < num; i++) {
        arrs.push(Math.random());
      }
      setTimeout(() => {
        me.setState({
          items: me.state.items.concat(arrs)
        });
        resolve();
      },3000)
    });
  }
}

ReactDom.render(<App />, document.getElementById("app"));