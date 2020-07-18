import React = require('preact');
import { Component } from 'preact';
import { generic } from '../Page';

interface OverModalProps<T extends OverModalOption> {
  title: string;
  visible: boolean;
  text: string;

  onCancel(): void;
  onButtonClick(key: string): void;
  onYes(key1: string): void;

}

interface OverModalState {

}

export interface OverModalOption {
  title: string;
  text: string;
}

export default class OverModal<T extends OverModalOption> extends Component<OverModalProps<T>, OverModalState> {
  public render() {

    return (
      <div class='modal'>
        <input id='modal_1' type='checkbox' disabled={true} checked={this.props.visible} />
        <label for='modal_1' class='overlay'></label>
        <div class="float-container">

          <div class="float-child">
            <h2>Just to check...</h2>
            <h4>{generic[9]}</h4>
          </div>

          <div class="float-child-2">
            <a href="#" onClick={() => this.props.onYes('yes')}><img src="images/yes.png"></img></a>
            <a href="#" onClick={() => this.props.onButtonClick('close')}><img src="images/no.png" ></img></a>
          </div>

        </div>
      </div>
    );
  }
}
