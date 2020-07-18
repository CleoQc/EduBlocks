import React = require('preact');
import { Component } from 'preact';
import { GlobalVars } from '../Page';

interface FirebaseSelectModalProps<T extends FirebaseSelectModalOption> {
  title: string;
  selectLabel: string;
  visible: boolean;

  buttons: FirebaseSelectModalButton[];
  options: T[];

  onButtonClick(key: string): void;
  onSelect(option: T): void;
  onDelete(option: T): void;
  onShare(option: T): void;

  localFile(): void;
}

interface FirebaseSelectModalState {

}

export interface FirebaseSelectModalOption {
  label: string;
}

export interface FirebaseSelectModalButton {
  key: string;
  label: string;
  position: 'left' | 'right';
}

export default class FirebaseSelectModal<T extends FirebaseSelectModalOption> extends Component<FirebaseSelectModalProps<T>, FirebaseSelectModalState> {

  public render() {
    const getOptions = () => this.props.options.map((option) => ([
      /*<div class='SelectModal__cell SelectModal__cell--text'>
        <span>{option.label}</span>
      </div>,
      <div class='SelectModal__cell SelectModal__cell--action'>
         <button style="background-color: #49B04D" id="sharebutton" class="buttonMenu icon-share" onClick={() => this.props.onShare(option)}>{navLabels[11]}</button> 
        <button class="buttonMenu error" id="deletebutton" onClick={() => this.props.onDelete(option)}>{generic[4]button>}</
        <button onClick={() => this.props.onSelect(option)}>{generic[0]}</button>
      </div>*/

      <tr>
        <td>{option.label}</td>
        <td id="file-buttons">
          <a href="#" title="Open" onClick={() => this.props.onSelect(option)}><i class="far fa-folder-open open-button green"></i></a>
          <a href="#" title="Delete" onClick={() => this.props.onDelete(option)}><i class="far fa-times-circle red"></i></a></td>
      </tr>,
    ]));

    return (
      <div class='modal'>
        <input id='modal_1' type='checkbox' disabled={true} checked={this.props.visible} />
        <label for='modal_1' class='overlay' onClick={() => this.props.onButtonClick('close')}></label>
        <div id="wrapper">
          <div id="left">
            <div id="inner-div">
              {GlobalVars.photoURL ? <img class="modal-pfp" src={GlobalVars.photoURL}></img> : <img class="modal-pfp" src="images/default-profile-image.png"></img>}
              <h1>Hello,</h1>
              <h2>{GlobalVars.userName}</h2>
              <button class="pink-button" onClick={() => this.props.localFile()}>Open Local File</button>
            </div>
          </div>
          <div id="right">
            <div id="inner-div-right">
              <div>
                <h1>My Files</h1>
                <a class='file__close close' style="top: 2.4em !important;" onClick={() => this.props.onButtonClick('close')}>Close</a>
              </div>
              <div id="file-list">
                <table type="primary">
                  <tbody>
                    {getOptions()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
