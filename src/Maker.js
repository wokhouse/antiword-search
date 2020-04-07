import React, { Component } from 'react';
import words from 'an-array-of-english-words';

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generate = ({ width, height }) => {
  const emptyMatrix = Array(height).fill(0);
  const matrix = emptyMatrix.map(() => {
    const emptyRow = Array(width).fill(0);
    const row = emptyRow.map(() => charset[Math.floor(Math.random() * charset.length)]);
    return row;
  });
  return matrix;
};

class Maker extends Component {
  constructor (props) {
    super(props);
    // init state
    this.state = {
      width: 10,
      height: 10,
      matrix: [],
    };
    // bind this to helper functions
    this.handleDimensionChange = this.handleDimensionChange.bind(this);
  }

  // called when word search dimensions are changed, stores in state, updates input vals
  handleDimensionChange (event) {
    const dimension = event.target.id; 
    const value = event.target.value;
    switch (dimension) {
      case ('width'): {
        return this.setState({ width: value });
      }
      case ('height'): {
        return this.setState({ height: value });
      }
      default: {
        return console.error('unknwon dimension!');
      }
    }
  }

  componentDidMount () {
    const { width, height } = this.state;
    const matrix = generate({ width, height }); 
    this.setState({ matrix });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <label htmlFor="width">width</label>
            <input 
              type="number" 
              className="form-control" 
              id="width" 
              value={this.state.width}
              onChange={this.handleDimensionChange}
            />
          </div>
          <div className="col-6">
            <label htmlFor="height">height</label>
            <input 
              type="number" 
              className="form-control" 
              id="height" 
              value={this.state.height}
              onChange={this.handleDimensionChange}
            />
          </div>
        </div>
        <div className="row">
          {JSON.stringify(this.state.matrix)}
        </div>
      </div>
    );
  }
}

export default Maker;
