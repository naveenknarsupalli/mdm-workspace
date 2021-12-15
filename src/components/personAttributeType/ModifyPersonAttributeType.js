import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Select from 'react-select';
import FORMATS from '../../constants/formats';
import {
  deletePersonAttributeTypeById,
  getPersonAttributeTypeById,
  createPersonAttributeType,
  updatePersonAttributeTypeById,
} from '../../api/services';

class ModifyPersonAttributeType extends React.Component {
  constructor(props) {
    super(props);

    const initialPersonAttributeType = {
      name: '',
      description: '',
      editPrevilige: '',
      foreignKey: '',
      format: '',
      retireReason: '',
      retired: false,
      searchable: false,
    };

    this.state = {
      personAttributeType: initialPersonAttributeType,
      personAttributeTypeId: this.props.match.params.id,
      redirect: null,
      formatOptions: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const { personAttributeTypeId } = this.state;
    this.setState({ formatOptions: FORMATS });
    if (personAttributeTypeId !== 'add') {
      getPersonAttributeTypeById(personAttributeTypeId)
        .then((response) => {
          this.setState({
            personAttributeType: response.data,
            isLoading: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  nameChangeHandler(event) {
    const { personAttributeType } = this.state;
    personAttributeType.name = event.target.value;
    this.setState({ personAttributeType });
  }
  // [`${personAttributeType}`]

  descriptionChangeHandler(event) {
    const { personAttributeType } = this.state;
    personAttributeType.description = event.target.value;
    this.setState({ personAttributeType });
  }

  savePersonAttributeType() {
    const { personAttributeTypeId, personAttributeType } = this.state;
    if (personAttributeTypeId === 'add') {
      createPersonAttributeType(personAttributeType)
        .then(() => {
          this.setState({ redirect: '/personAttributeType' });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updatePersonAttributeTypeById(personAttributeTypeId, personAttributeType)
        .then(() => {
          this.setState({ redirect: '/personAttributeType' });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  retireReasonChangeHandler(event) {
    const { personAttributeType } = this.state;
    personAttributeType.retireReason = event.target.value;
    this.setState({ personAttributeType: personAttributeType });
  }

  retirePersonAttributeType() {
    const { personAttributeTypeId, personAttributeType } = this.state;
    personAttributeType.retired = true;
    this.setState({ personAttributeType: personAttributeType }, () => {
      updatePersonAttributeTypeById(personAttributeTypeId, personAttributeType)
        .then(() => {
          this.setState({ redirect: '/personAttributeType' });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  unretirePersonAttributeType() {
    const { personAttributeTypeId, personAttributeType } = this.state;
    personAttributeType.retireReason = '';
    personAttributeType.retired = false;
    this.setState({ personAttributeType: personAttributeType }, () => {
      updatePersonAttributeTypeById(personAttributeTypeId, personAttributeType)
        .then(() => {
          this.setState({ redirect: '/personAttributeType' });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  deletePersonAttributeType() {
    const { personAttributeTypeId } = this.state;
    deletePersonAttributeTypeById(personAttributeTypeId)
      .then(() => {
        this.setState({ redirect: '/personAttributeType' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  formatChangeHandler(selectedOption) {
    const { personAttributeType } = this.state;
    personAttributeType.format = selectedOption.value;
    this.setState({ personAttributeType });
  }

  searchableChangeHandler(event) {
    const { personAttributeType } = this.state;
    personAttributeType.searchable = event.target.checked;
    this.setState({ personAttributeType });
  }

  render() {
    const {
      personAttributeType,
      personAttributeTypeId,
      formatOptions,
      redirect,
      isLoading,
    } = this.state;

    const {
      nameChangeHandler,
      descriptionChangeHandler,
      savePersonAttributeType,
      retireReasonChangeHandler,
      retirePersonAttributeType,
      unretirePersonAttributeType,
      deletePersonAttributeType,
      formatChangeHandler,
      searchableChangeHandler,
    } = this;

    if (redirect) return <Redirect to={redirect} />;

    const getDefaultFormatValue = formatOptions.filter(
      (option) => option.value === personAttributeType.format
    );

    if (!isLoading || personAttributeTypeId === 'add') {
      return (
        <React.Fragment>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={personAttributeType.name}
              onChange={nameChangeHandler.bind(this)}
            />
            <br />

            <label htmlFor="format">Format: </label>
            <div style={{ width: '300px', display: 'inline-block' }}>
              <Select
                id="format"
                name="format"
                defaultValue={getDefaultFormatValue}
                onChange={formatChangeHandler.bind(this)}
                options={formatOptions}
              />
            </div>
            <br />

            <label htmlFor="searchable">Searchable: </label>
            <input
              type="checkbox"
              id="searchable"
              name="searchable"
              onChange={searchableChangeHandler.bind(this)}
              value={personAttributeType.searchable}
            />
            <br />

            <label htmlFor="description">Description: </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              cols="20"
              value={personAttributeType.description}
              onChange={descriptionChangeHandler.bind(this)}
            />
            <br />

            {/* SELECT -- Edit Privilege */}

            <button type="button" onClick={savePersonAttributeType.bind(this)}>
              Save Person Attribute Type
            </button>
            <br />
          </div>

          {personAttributeTypeId !== 'add' && !personAttributeType.retired && (
            <div>
              <hr />
              <p>Retire Person Attribute Type</p>
              <label htmlFor="retireReason">Reason: </label>
              <input
                type="text"
                id="retireReason"
                name="retireReason"
                value={personAttributeType.retireReason}
                onChange={retireReasonChangeHandler.bind(this)}
              />
              <br />

              <button
                type="button"
                onClick={retirePersonAttributeType.bind(this)}
              >
                Retire Person Attribute Type
              </button>
              <br />
            </div>
          )}

          {personAttributeTypeId !== 'add' && personAttributeType.retired && (
            <div>
              <hr />

              <p>Unretire Person Attribute Type</p>

              <button
                type="button"
                onClick={unretirePersonAttributeType.bind(this)}
              >
                Unretire Person Attribute Type
              </button>
              <br />
            </div>
          )}

          {personAttributeTypeId !== 'add' && (
            <div>
              <hr />

              <p>Delete Person Attribute Type Forever</p>
              <button
                type="button"
                onClick={deletePersonAttributeType.bind(this)}
              >
                Delete Person Attribute Type Forever
              </button>
            </div>
          )}
        </React.Fragment>
      );
    }

    return <p>Loading...</p>;
  }
}
export default withRouter(ModifyPersonAttributeType);
