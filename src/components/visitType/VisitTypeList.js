import React from 'react';
import { Link } from 'react-router-dom';
import { getVisitTypes } from '../../api/services';

class VisitTypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitTypes: [],
    };
  }

  componentDidMount() {
    getVisitTypes()
      .then((response) => {
        this.setState({ visitTypes: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { visitTypes } = this.state;

    if (visitTypes.length === 0)
      return <p>no visit types exist. create a new one.</p>;

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>Current Visit Types</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Name</td>
              <td>Description</td>
            </tr>
            {visitTypes.map((visitType) => (
              <tr key={visitType.visitTypeId}>
                <td>
                  <Link to={`/visitType/${visitType.uuid}`}>
                    {visitType.name}
                  </Link>
                </td>
                <td>{visitType.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default VisitTypeList;
