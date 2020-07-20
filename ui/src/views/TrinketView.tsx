import React = require('preact');
import { Component } from 'preact';
import fs = require('fs');

interface Props {
  visible: boolean;
  turtle: boolean;
  pythonCode: string;

  onClose(): void;
}

export let josh = "hi"

export default class TrinketView extends Component<Props, {}> {
  private escapeListener = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      this.close();
    }
  }

  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    window.addEventListener('keydown', this.escapeListener);
    
  }

  public componentDidUpdate() {

  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.escapeListener);
  }
 
  private getEscapedCode() {
    let newpy = this.props.pythonCode;
    let mlmodel = "";
    let mltext = "";
    let mlimages = "";
    let imagedata = "";
    let usrbin = "#!/usr/bin/python3 \n"

    newpy = newpy.replace('from mltext import *', '');
    newpy = newpy.replace('from mlmodel import *', '');
    newpy = newpy.replace('from mlimages import *', '');
    newpy = newpy.replace('from imagedata import *', '');

    if (this.props.pythonCode.indexOf("from mltext import *") !== -1){
      mltext = fs.readFileSync("mltext.py", "utf8") + "\n";
    }

    if (this.props.pythonCode.indexOf("from mlmodel import *") !== -1){
      mlmodel = fs.readFileSync("mlmodel.py", "utf8") + "\n";
    }

    if (this.props.pythonCode.indexOf("from mlimages import *") !== -1){
      mlimages = fs.readFileSync("mlimages.py", "utf8") + "\n";
    }

    if (this.props.pythonCode.indexOf("from imagedata import *") !== -1){
      imagedata = fs.readFileSync("imagedata.py", "utf8") + "\n";
    }

    return encodeURIComponent(usrbin + mlmodel + mltext + mlimages + imagedata + newpy);
  }

  public close() {
    this.props.onClose();
  }

  public render() {
    return (
      <div class='TrinketView' style={{ display: this.props.visible ? 'block' : 'none' }} id='terminal-dialog'>

        <div class='TrinketView__Container'>
          <div class='TrinketView__ContainerLoading' />

          {this.props.visible && 
            <iframe
              frameBorder={0}
              id="trinket"
              src={`https://trinket.io/tools/1.0/jekyll/embed/python?runOption=run&outputOnly=true&start=result#code=${this.getEscapedCode()}`}
            />
          }
          {this.props.turtle && 
            <iframe
              frameBorder={0}
              id="trinket"
              src={`https://trinket.io/tools/1.0/jekyll/embed/python3?runOption=run&outputOnly=true&start=result#code=${this.getEscapedCode()}`}
            />
          }
        </div>

      </div>
    );
  }
}
