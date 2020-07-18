import React = require('preact');
import { Component } from 'preact';

interface SettingsModalProps<T extends SettingsModalOption> {
  title: string;
  selectLabel: string;
  visible: boolean;

  darkTheme(): void;
  lightTheme(): void;
  defaultTheme(): void;

  greenScreen(toggle: boolean): void;

  selectLanguage(lang: string): void;

  downloadPython(): void;

  buttons: SettingsModalButton[];
  options: T[];

  onButtonClick(key: string): void;
  onSelect(option: T): void;

  onSampleSelect(option: T): void;
}

interface SettingsModalState {

}

function playAudio(url: any) {
  new Audio(url).play();
}

export interface SettingsModalOption {
  label: string;
}

export interface SettingsModalButton {
  key: string;
  label: string;
  position: 'left' | 'right';
}

export default class SettingsModal<T extends SettingsModalOption> extends Component<SettingsModalProps<T>, SettingsModalState> {
  public render() {
    const getOptions = () => this.props.options.map((option) => ([
      <a onClick={() => this.props.onSampleSelect(option)}>
        <div class="settings-column">
          <div class="settings-card samples-card">
            <img src={"images/" + option.label + ".png"}></img>
            <h3>{option.label}</h3>
          </div>
        </div>
      </a>,
    ]));

    return (
      <div class='modal'>
        <input id='modal_1' type='checkbox' disabled={true} checked={this.props.visible} />
        <label for='modal_1' class='overlay' onClick={() => this.props.onButtonClick('close')}></label>
        <div class="settings-container" style="background-color: #1b173d !important;">
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
              <div class="tabs-container">
                <div class="tab">
                  <h1>Settings</h1>
                </div>
                <div class="tab active"><a href="" class="tab-title button">General</a></div>
                <div class="tab-content" id="">
                  <h1 style="padding-bottom: 5px;">General</h1>
                  <a class='file__close close' style="top: 32px !important;" onClick={() => this.props.onButtonClick('close')}>Close</a>
                  <b>Extras</b>
                  <div class="settings-row general" style="padding-top: 10px;">
                    <a onClick={() => this.props.downloadPython()}>
                      <div class="settings-column">
                        <div class="settings-card">
                          <img src="images/export.png"></img>
                          <h3>Export .py</h3>
                        </div>
                      </div>
                    </a>

                    <a onClick={() => this.props.greenScreen(true)}>
                      <div class="settings-column" id="camera-on">
                        <div class="settings-card">
                          <img src="images/greenscreen.png"></img>
                          <h3>Camera On</h3>
                        </div>
                      </div>
                    </a>

                    <a onClick={() => this.props.greenScreen(false)}>
                      <div class="settings-column" style="display: none;" id="camera-off">
                        <div class="settings-card">
                          <img src="images/greenscreen.png"></img>
                          <h3>Camera Off</h3>
                        </div>
                      </div>
                    </a>
                  </div>
                  <b>Appearance</b>
                  <div class="settings-row general" style="padding-top: 10px;">
                    <a onClick={() => this.props.defaultTheme()}>
                      <div class="settings-column">
                        <div class="settings-card theme default green-lang">
                          <img src="images/default.png"></img>
                          <h3>Default</h3>
                        </div>
                      </div>
                    </a>

                    <a onClick={() => this.props.lightTheme()}>
                      <div class="settings-column">
                        <div class="settings-card theme light">
                          <img src="images/light.png"></img>
                          <h3>Light</h3>
                        </div>
                      </div>
                    </a>

                    <a onClick={() => this.props.darkTheme()}>
                      <div class="settings-column">
                        <div class="settings-card theme dark">
                          <img src="images/dark.png"></img>
                          <h3>Dark</h3>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div class="tab"><a href="" class="tab-title button">Samples</a></div>
                <div class="tab-content" id="">
                  <h1>Samples</h1>
                  <a class='file__close close' style="top: 32px !important;" onClick={() => this.props.onButtonClick('close')}>Close</a>
                  <div class="settings-row samples">
                    {getOptions()}
                  </div>
                </div>

                <div class="tab"><a href="" class="tab-title button">Language</a></div>
                <div class="tab-content" id="">
                  <h1>Language</h1>
                  <a class='file__close close' style="top: 32px !important;" onClick={() => this.props.onButtonClick('close')}>Close</a>
                  <div class="settings-row large-height">
                    <a onClick={() => this.props.selectLanguage("English")}>
                      <div class="settings-column">
                        <div class="settings-card lang green-lang">
                          <img src="images/english.png"></img>
                          <h3>English</h3>
                        </div>
                      </div>
                    </a>

                    <a onClick={() => this.props.selectLanguage("French")}>
                      <div class="settings-column">
                        <div class="settings-card lang">
                          <img src="images/french.png"></img>
                          <h3>French</h3>
                        </div>
                      </div>
                    </a>

                    <a onClick={() => this.props.selectLanguage("German")}>
                      <div class="settings-column">
                        <div class="settings-card lang">
                          <img src="images/german.png"></img>
                          <h3>German</h3>
                        </div>
                      </div>
                    </a>

                    <a onClick={() => this.props.selectLanguage("Welsh")}>
                      <div class="settings-column">
                        <div class="settings-card lang">
                          <img src="images/welsh.png"></img>
                          <h3>Welsh</h3>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div class="tab"><a href="" class="tab-title button">About</a></div>
                <div class="tab-content" id="">
                  <h1>About</h1>
                  <a class='file__close close' style="top: 32px !important;" onClick={() => this.props.onButtonClick('close')}>Close</a>
                  <b>Version: </b>4.0.0

                          <div class="settings-row" style="margin-top: 20px;">
                    <a href="https://edublocks.org/#contact">
                      <div class="settings-column">
                        <div class="settings-card">
                          <img src="images/contact.png"></img>
                          <h3>Support</h3>
                        </div>
                      </div>
                    </a>
                    <a href="https://feedback.userreport.com/cd3e2d46-4e22-400d-9f52-f5e9460ddf8b/#ideas/recent">
                      <div class="settings-column">
                        <div class="settings-card">
                          <img src="images/feedback.png"></img>
                          <h3>Feedback</h3>
                        </div>
                      </div>
                    </a>
                    <a href="https://github.com/allaboutcode/edublocks">
                      <div class="settings-column">
                        <div class="settings-card">
                          <img src="images/github.png"></img>
                          <h3>GitHub</h3>
                        </div>
                      </div>
                    </a>
                  </div>
                  <a class="pseudo button" onClick={() => playAudio("https://edublocks.org/honk.mp3")}>Click me!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
