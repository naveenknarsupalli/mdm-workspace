/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { deleteConceptById, getConceptClasses } from '../../api/services';

class ConceptClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conceptClasses: [],
      showRetired: false,
      classesCheckedToDelete: [],
      redirect: null,
    };
  }

  componentDidMount() {
    getConceptClasses()
      .then((response) => {
        const loadedConceptClasses = [];
        const classesCheckedToDelete = [];

        Object.keys(response.data).forEach((key) => {
          if (!response.data[key].retired) {
            loadedConceptClasses.push({
              conceptClassId: key,
              name: response.data[key].name,
              description: response.data[key].description,
            });

            classesCheckedToDelete.push({
              conceptClassId: key,
              isChecked: false,
            });
          }
        });

        this.setState({
          conceptClasses: loadedConceptClasses,
          classesCheckedToDelete,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    const { showRetired } = this.state;
    if (prevState.showRetired !== showRetired) {
      const classesCheckedToDelete = [];
      getConceptClasses()
        .then((response) => {
          const loadedConceptClasses = [];
          Object.keys(response.data).forEach((key) => {
            if (showRetired) {
              loadedConceptClasses.push({
                conceptClassId: key,
                name: response.data[key].name,
                description: response.data[key].description,
              });

              classesCheckedToDelete.push({
                conceptClassId: key,
                isChecked: false,
              });
            } else if (!response.data[key].retired) {
              loadedConceptClasses.push({
                conceptClassId: key,
                name: response.data[key].name,
                description: response.data[key].description,
              });

              classesCheckedToDelete.push({
                conceptClassId: key,
                isChecked: false,
              });
            }
          });

          this.setState({
            conceptClasses: loadedConceptClasses,
            classesCheckedToDelete,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  toggleRetired() {
    const { showRetired } = this.state;
    this.setState({ showRetired: !showRetired });
  }

  checkboxChangeHandler(event) {
    const { classesCheckedToDelete } = this.state;
    const index = classesCheckedToDelete.findIndex(
      (obj) => obj.conceptClassId === event.target.id,
    );
    classesCheckedToDelete[index].isChecked = event.target.checked;
    this.setState({ classesCheckedToDelete });
  }

  deleteCheckedConceptClassesHandler() {
    const { classesCheckedToDelete } = this.state;
    const conceptClassesToDelete = classesCheckedToDelete.filter(
      (obj) => obj.isChecked === true,
    );

    const len = conceptClassesToDelete.length;

    for (let i = 0; i < len; i += 1) {
      const deleteId = conceptClassesToDelete[i].conceptClassId;
      deleteConceptById(deleteId)
        .then(() => {
          if (i === len - 1) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const { redirect, conceptClasses } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <>
        <h3>Manage Concept Classes</h3>
        <button type="button" onClick={this.toggleRetired.bind(this)}>
          Toggle Retired
        </button>
        <table>
          <thead>
            <tr>
              <th>..</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {conceptClasses.map((conceptClass) => (
              <tr key={conceptClass.conceptClassId}>
                <td>
                  <input
                    type="checkbox"
                    id={conceptClass.conceptClassId}
                    onChange={this.checkboxChangeHandler.bind(this)}
                  />
                </td>
                <td>
                  <Link to={`/conceptClass/${conceptClass.conceptClassId}`}>
                    {conceptClass.name}
                  </Link>
                </td>
                <td>{conceptClass.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={this.deleteCheckedConceptClassesHandler.bind(this)}
        >
          Delete Checked Concept Classes
        </button>
      </>
    );
  }
}

export default ConceptClassList;
