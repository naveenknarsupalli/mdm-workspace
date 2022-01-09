import { BUTTON, DELETE_BUTTON } from '../../styles/bootstrap';
import { Link, Redirect } from 'react-router-dom';
import React, { Fragment } from 'react';
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

        for (const key in response.data) {
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
        }

        this.setState({
          conceptClasses: loadedConceptClasses,
          classesCheckedToDelete: classesCheckedToDelete,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showRetired !== this.state.showRetired) {
      const classesCheckedToDelete = [];
      getConceptClasses()
        .then((response) => {
          const loadedConceptClasses = [];
          for (const key in response.data) {
            if (this.state.showRetired) {
              loadedConceptClasses.push({
                conceptClassId: key,
                name: response.data[key].name,
                description: response.data[key].description,
              });

              classesCheckedToDelete.push({
                conceptClassId: key,
                isChecked: false,
              });
            } else {
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
            }
          }

          this.setState({
            conceptClasses: loadedConceptClasses,
            classesCheckedToDelete: classesCheckedToDelete,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  toggleRetired(event) {
    event.preventDefault();
    this.setState({ showRetired: !this.state.showRetired });
  }

  checkboxChangeHandler(event) {
    const { classesCheckedToDelete } = this.state;
    const index = classesCheckedToDelete.findIndex(
      (obj) => obj.conceptClassId === event.target.id
    );
    classesCheckedToDelete[index].isChecked = event.target.checked;
    this.setState({ classesCheckedToDelete: classesCheckedToDelete });
  }

  deleteCheckedConceptClassesHandler(event) {
    event.preventDefault();
    const conceptClassesToDelete = this.state.classesCheckedToDelete.filter(
      (obj) => obj.isChecked === true
    );

    const len = conceptClassesToDelete.length;

    for (let i = 0; i < len; i++) {
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
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <Fragment>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={this.deleteCheckedConceptClassesHandler.bind(this)}
            className={DELETE_BUTTON}
          >
            Delete Checked Concept Classes
          </button>
          <button
            type="button"
            onClick={this.toggleRetired.bind(this)}
            className={BUTTON}
          >
            Toggle Retired
          </button>
        </div>

        <table>
          <thead>
            <tr></tr>
            <tr>
              <th colSpan="3">Concept Classes</th>
            </tr>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {this.state.conceptClasses.map((conceptClass) => {
              return (
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
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default ConceptClassList;
