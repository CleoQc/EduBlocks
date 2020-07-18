import React = require('preact');
import { Component } from 'preact';

interface StartModalProps<T extends StartModalOption> {
  title: string;
  visible: boolean;
  options: T[];

  onCancel(): void;
  onSelect(option: T): void;
}

interface StartModalState {

}

export interface StartModalOption {
  title: string;
  image: string;
  help: string;
}

export default class StartModal<T extends StartModalOption> extends Component<StartModalProps<T>, StartModalState> {
  public render() {
    const getOptions = () => (
      this.props.options.map((option) => (
        <div className='ImageModalOption' onClick={() => this.props.onSelect(option)} style="position: relative; cursor: pointer;">
          <img src={option.image} />
          <div className='ImageModalOptionButtonContainer'>
            <button className="ImageSelectButton" onClick={() => this.props.onSelect(option)}>{option.title}</button>
            <div className='ImageHelpIconContainer' style="text-align: center;">
              <a class='icon-help-circled' style='color: rgba(255, 255, 255, 0.8);font-size: 23px;' href={option.help}></a>
            </div>
          </div>
        </div>
      ))
    );

    return (
      <div class='modal'>
      <input id='modal_1' type='checkbox' disabled={true} checked={this.props.visible} />
      <label for='modal_1' class='overlay'></label>
      <div id="wrapper" style="width: 750px !important">
        <div id="left">
          <div id="inner-div-image">
            <img id="mode-logo" src="images/weblogo.png"></img>
            <h1 style="padding: 10px; font-size: 28px; line-height: 33px; padding-top: 10px !important; font-weight: 600;">Welcome!</h1>
            <h1 style="padding: 25px; font-size: 28px; line-height: 33px; padding-top: 10px !important; font-weight: 500;">Select a mode to continue</h1>
          </div>
        </div>
        <div id="right">
          <div id="inner-div-right" style="margin-left: 0px !important;">
          <section class='content' id="imagecontent">
            <div class='ImageModalOptionContainer'>
              {getOptions()}
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
    );
  }
}
