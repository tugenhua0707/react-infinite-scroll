
import React from 'react';
import InlineLoading from './inlineLoading';
import shallowCompare from 'react-addons-shallow-compare';

class InfiniteScroll extends React.Component {

  constructor(props) {
    
    super(props);
    
    this.state = {
      loadCompleted: false,  // 是否已经加载完成
      errorMsg: '',          // 错误消息提示
      isShowLoad: false      //首次加载时不显示loading
    };
    this.isLoading = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this,nextProps, nextState);
  }

  render() {
    var me = this;
    const { height, langNoMore, langLoading} = me.props;
    return (
      <ul onScroll={me.scrollHandle.bind(me)} className={me.props.className + ' infinite-scroll'} style={{"height":height, "overflowY":"auto"}}>
        {me.props.children}
        {(() => {
          if(me.state.isShowLoad === false) {
            return null;
          }
          if(me.state.errorMsg.length > 0) {
            return <InlineLoading hasMore = {false} text = {me.state.errorMsg} retry = {me.retry.bind(me)} />
          }
          if(me.props.hasMore === true && me.state.loadCompleted === false) {
            return <InlineLoading hasMore = {true} text = {langLoading} />
          }
          return <InlineLoading hasMore={false} text={langNoMore} />
        })()}
      </ul>
    )
  }
  scrollHandle(e) {
    var me = this;
    let clientHeight = e.target.clientHeight;
    let scrollHeight = e.target.scrollHeight;
    let scrollTop = e.target.scrollTop;
    //误差0.05以内
    if((scrollHeight - clientHeight) / scrollTop <= 1.05 && me.props.hasMore === true && me.isLoading === false) {
      me.isLoading = true; // 加载中状态， 避免重复发出 onLoad
      if(!me.props.onLoad) {
        throw new Error("need onLoad");
      }
      // onLoad 返回Promise 对象
      let result = me.props.onLoad();
      me.setState(Object.assign({},me.state, {loadCompleted: false,isShowLoad: true}));

      if(typeof result.then === 'function') {
        return result.then(() => {
          me.setState(Object.assign({},me.state, {loadCompleted: true}));
          me.isLoading = false;
        })
        .catch((errorMsg) => {
          me.setState(Object.assign({},me.state, {loadCompleted: true,errorMsg: errorMsg.message}));
        });
      }
    }
  }
  retry() {
    if(me.props.retry) {
      me.isLoading = true;
      let result = me.props.retry();
      me.setState(Object.assign({},me.state, {loadCompleted: false,hasMore: true,errorMsg:''}));
      if(typeof result.then === 'function') {
        me.then(() => {
          me.setState(Object.assign({},me.state, {loadCompleted: true}));
          me.isLoading = false;
        })
        .catch((errorMsg) => {
          me.setState(Object.assign({},me.state, {loadCompleted: true,errorMsg: errorMsg.message}));
        });
      }
    }else {
      throw new Error("no retry props");
    }
  }
}

InfiniteScroll.defaultProps = {
  hasMore: true,
  height: '100%',
  className: '',
  langNoMore: '没有更多了...',
  langLoading: '加载中...',
  onLoad: () => {
    console.log("Need onload method");
  }
};

InfiniteScroll.propTypes = {
  hasMore: React.PropTypes.bool,
  height: React.PropTypes.string,  // 显示设置高度以便产生滚动事件
  className: React.PropTypes.string,
  onLoad: React.PropTypes.func,   // 加载更多
  retry: React.PropTypes.func,    // 失败后的点击重试方法
  langNoMore: React.PropTypes.string, 
  langLoading: React.PropTypes.string,
}

export default InfiniteScroll;