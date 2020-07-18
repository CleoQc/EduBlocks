import React = require('preact');
import { Component } from 'preact';


interface LoadModalProps<T extends LoadModalOption> {
  title: string;
  visible: boolean;

  onCancel(): void;
  onButtonClick(key: string): void;
}

interface LoadModalState {

}

export interface LoadModalOption {
  title: string;
}

export default class LoadModal<T extends LoadModalOption> extends Component<LoadModalProps<T>, LoadModalState> {
  public render() {

    return (
      <div class='modal'>
        <input id='modal_1' type='checkbox' disabled={true} checked={this.props.visible} />
        <label for='modal_1' class='overlay'></label>
        <article style="border-radius: 50%; background-color: #1B173D !important; padding: 16px;"> 
          <section style="padding: 0px !important;" id="modaltext">
            <div class="loader" style="margin: 0 auto;"></div>
          </section>
        </article>
      </div>
    );
  }
}
