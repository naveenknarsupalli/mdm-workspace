import { Component } from 'react';

class Mappings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mappings: this.props.mappings,
    };
  }

  render() {
    return <p>Mappings</p>;
  }
}

export default Mappings;
