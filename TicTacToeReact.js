import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square(props) {
      return (
      <div
        className="square"
        style={squareStyle}
        onClick={props.onClick}>
        {props.value}
      </div>
    );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentValueArray: Array(9).fill(null),
      toX: true
    }
  }
  handleClick(key) {
    console.log(this);
    const currentValueArray = this.state.currentValueArray.slice();
    currentValueArray[key] =  this.state.toX ? 'X' : 'O';
    this.setState({currentValueArray: currentValueArray, toX: !this.state.toX})
  }
  
  onResetClick() {  
    this.setState({currentValueArray: Array(9).fill(null), toX: null})
  }
  render() {
    const winner = andTheWinnerIs(this.state.currentValueArray);
    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>Next player: {this.state.toX ? 'X' : 'O'}</div>
        <div className="winner" style={instructionsStyle}>Winner: {winner}</div>
        <button style={buttonStyle}
        onClick={()=> this.onResetClick()}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square 
            key = {1}
            value={this.state.currentValueArray[1]}
            onClick={() => this.handleClick(1)}/>
            <Square 
            key = {2}
            value={this.state.currentValueArray[2]}
            onClick={() => this.handleClick(2)}/>
            <Square 
            key = {3}
            value={this.state.currentValueArray[3]}
            onClick={() => this.handleClick(3)}/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square 
            key = {4}
            value={this.state.currentValueArray[4]}
            onClick={() => this.handleClick(4)}/>
            <Square 
            key = {5}
            value={this.state.currentValueArray[5]}
            onClick={() => this.handleClick(5)}/>
            <Square 
            key = {6}
            value={this.state.currentValueArray[6]}
            onClick={() => this.handleClick(6)}/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square 
            key = {7}
            value={this.state.currentValueArray[7]}
            onClick={() => this.handleClick(7)}/>
            <Square 
            key = {8}
            value={this.state.currentValueArray[8]}
            onClick={() => this.handleClick(8)}/>
            <Square 
            key = {9}
            value={this.state.currentValueArray[9]}
            onClick={() => this.handleClick(9)}/>
          </div>
        </div>
      </div>
    );
  }
}

function andTheWinnerIs(grid){
  const winStrokes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(var i=0; i< winStrokes.length; i++)
  {
    const [x,y,z] = winStrokes[i];
    if(grid){
    if(grid[x] && grid[x] === grid[y] && grid[x] === grid[z]){
      return grid[x];
    }
    }
  }
  return null;
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);