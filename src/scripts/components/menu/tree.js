import React, {Component} from 'react';

/* ========================
var treeNodes = {
  text: 'root',
  nodes: [{
    isLeaf: true,
    text: 'leaf1'
  }, {
    isLeaf: false,
    text: 'root1',
    nodes: [{
      isLeaf: true,
      text: 'leaf2'
    }, {
      isLeaf: true,
      text: 'leaf3'
    }]
  }]
};
<Tree
  text={treeNodes.text}
  nodes={treeNodes.nodes} />
======================== */
class Tree extends Component {
  render() {
    return (
      <div
        className='Tree'>
        <Root
          text={this.props.text} />
        {
          this.props.nodes.map((item) => (
            item.isLeaf ?
              <Leaf
                text={item.text} />
              :
              <Tree
                text={item.text}
                nodes={item.nodes} />
          ))
        }
      </div>
    )
  }
};

class Root extends Component {
  render() {
    return (
      <div
        className='Root'>
        {this.props.text}
      </div>
    )
  }
};

class Leaf extends Component {
  render() {
    return (
      <div
        className='Leaf'>
        {this.props.text}
      </div>
    )
  }
}

export default Tree;