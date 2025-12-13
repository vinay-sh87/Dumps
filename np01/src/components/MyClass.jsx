import { Component } from "react";

class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    console.log("Component Mounted!");
  }
  render() {
    return (
      <>
        <h1>Class Component</h1>
        <p>Count : {this.state.count}</p>
        <button
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >Increment</button>
      </>
    );
  }
}
export default MyClass
