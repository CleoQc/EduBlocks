import React = require('preact');
import { Component } from 'preact';

interface AlertModalProps<T extends AlertModalOption> {
  title: string;
  visible: boolean;
  text: string;
  text2?: string;


  onCancel(): void;
  onButtonClick(key: string): void;
}

interface AlertModalState {

}

export interface AlertModalOption {
  title: string;
  text: string;
  text2?: string;
}



export default class AlertModal<T extends AlertModalOption> extends Component<AlertModalProps<T>, AlertModalState> {
  public render() {

    return (
      <div class='modal'>
        <input id='modal_1' type='checkbox' disabled={true} checked={this.props.visible} />
        <label for='modal_1' class='overlay'></label>
        <div class="float-container">

          <div class="float-child" style="height: 145px !important;">
            <h2>{this.props.title}</h2>
            <h4>{this.props.text}</h4>
          </div>

          <div class="float-child-2" id="buttons-ok">
            <a href="#" onClick={() => this.props.onButtonClick('close')}><img src="images/ok.png" ></img></a>
          </div>

        </div>
      </div>
    );
  }
}
