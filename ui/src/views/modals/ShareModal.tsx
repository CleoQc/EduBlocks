import React = require('preact');
import { Component } from 'preact';

interface ShareModalProps<T extends ShareModalOption> {
  title: string;
  visible: boolean;

  share(share: string): void;

  onCancel(): void;
  onButtonClick(key:string): void;
}

interface ShareModalState {

}

export interface ShareModalOption {
  title: string;
  image: string;
  help: string;
}

export default class ShareModal<T extends ShareModalOption> extends Component<ShareModalProps<T>, ShareModalState> {
  public render() {
    return (
      <div class='modal'>
        <input id='modal_1' type='checkbox' disabled={true} checked={this.props.visible} />
        <label for='modal_1' class='overlay' onClick={() => this.props.onButtonClick('close')}></label>
        <div id="wrapper" style="width: 750px !important">
          <div id="left">
            <div id="inner-div-image" style="margin-top: 52%;">
              <img id="mode-logo" src="images/share/share.png"></img>
              <h1 style="padding: 10px; font-size: 28px; line-height: 33px; padding-top: 0px !important; font-weight: 600;"></h1>
              <h1 style="padding: 25px; font-size: 28px; line-height: 33px; padding-top: 10px !important; font-weight: 500;">Select an option to continue</h1>
            </div>
          </div>
          <div id="right">
            <div id="inner-div-right" style="margin-left: 0px !important;">
              <section class='content' id="imagecontent">
                <div class='ImageModalOptionContainer'>

                  <div className='ImageModalOption' onClick={() => this.props.share("Copy Shareable URL")} style="position: relative; cursor: pointer;">
                    <img src="/images/share/link.png"></img>
                    <div className='ImageModalOptionButtonContainer'>
                      <button className="ShareSelectButton" onClick={() => this.props.share("Copy Shareable URL")}>Copy Link</button>
                    </div>
                  </div>

                  <div className='ImageModalOption' onClick={() => this.props.share("Copy Embed Code")} style="position: relative; cursor: pointer;">
                    <img src="/images/share/embed.png"></img>
                    <div className='ImageModalOptionButtonContainer'>
                      <button className="ShareSelectButton" onClick={() => this.props.share("Copy Embed Code")}>Copy Embed Code</button>
                    </div>
                  </div>

                  <div className='ImageModalOption' onClick={() => this.props.share("Share to Google Classroom")} style="position: relative; cursor: pointer;">
                    <img src="/images/share/classroom.png"></img>
                    <div className='ImageModalOptionButtonContainer'>
                      <button className="ShareSelectButton" onClick={() => this.props.share("Share to Google Classroom")}>Google Classroom</button>
                    </div>
                  </div>

                  <div className='ImageModalOption' onClick={() => this.props.share("Share to Microsoft Teams")} style="position: relative; cursor: pointer;">
                    <img src="/images/share/teams.png"></img>
                    <div className='ImageModalOptionButtonContainer'>
                      <button className="ShareSelectButton" onClick={() => this.props.share("Share to Microsoft Teams")}>Microsoft Teams</button>
                    </div>
                  </div>
                  
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
