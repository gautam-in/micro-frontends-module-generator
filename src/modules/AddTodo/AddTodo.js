import React from "react";
import { connect } from "react-redux";
import ExecutionEnvironment from "exenv";

import clientHydration from "../../clientHydration";
import { insertTaskAction } from "../../global/actions";
import { globalAction } from "redux-subspace";
import styled from "styled-components";

class AddTodo extends React.Component {
  onFormSubmit = event => {
    const { insertTask } = this.props;
    event.preventDefault();
    if (this.inputRef.value.trim()) insertTask(this.inputRef.value.trim());
    event.target.reset();
  };

  render = () => {
    const Text = styled.h4`
      font-size:1rem;
      color: red;
    `;
    const ComponentWrapper = styled.div`
      padding-left: 1rem!important;  
    `;
    return (
      <ComponentWrapper>
        <Text>Add new Task</Text>
        <form onSubmit={this.onFormSubmit}>
          <div className="row align-items-start">
            <div className="form-group col">
              <label className="sr-only" htmlFor="todoLabel">
                Add new Task
              </label>
              <input
                type="text"
                className="form-control"
                id="todoLabel"
                ref={element => (this.inputRef = element)}
              />
            </div>
            <button className="btn btn-primary col-auto" type="submit">
              Add
            </button>
          </div>
        </form>
      </ComponentWrapper>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  insertTask: task => {
    dispatch(globalAction(insertTaskAction(task)));
  }
});

const connectedAddTodo = connect(
  null,
  mapDispatchToProps
)(AddTodo);

export default connectedAddTodo;

if (ExecutionEnvironment.canUseDOM) {
  clientHydration({
    moduleName: "AddTodo",
    component: connectedAddTodo
  });
}
