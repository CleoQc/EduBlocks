import React = require('preact');
import {Component} from 'preact';
import Auth from './Auth';
import {navLabels} from './Page';
import { GlobalVars } from './Page';

interface Props {
    platformImg?: string;

    openSamples(): void;

    openExtensions?(): void;

    openThemes(): void;

    blocks(): void;

    flashHex(): void;

    python(): void;

    splitview(): void;

    pyzoomin(): void;

    pyzoomout(): void;

    share(): void;

    // downloadPython(): void;
    downloadHex?(): void;

    downloadPython?(): void;

    onFunction(): void;

    openPlatforms(): void;

    closeTerminal(): void;

    modeQuestion(): void;

    newCode(): void;

    openCode(): void;

    saveCode(): void;

    openTerminal?(): void;

    onFileChange(fileName: string): void;

    openAuth(): void;

    closeAuth(): void;

    sync: boolean;
}

export default class Nav extends Component<Props, {}> {
    public render() {
        const {downloadHex, openTerminal: sendCode, downloadPython, flashHex, closeTerminal} = this.props;

        return (
            <>
            <nav>
                <a class='brand' onClick={() => this.props.modeQuestion()} data-tooltip='Change Mode'>
                    {/* {this.props.platformImg && <img src={this.props.platformImg} class='Nav__platformImg' height={50}/>} */}
                    <img class='logo' src='https://i.ibb.co/2Zp0pyw/weblogo.png'/>
                </a>
                <Auth openAuth={this.props.openAuth} closeAuth={this.props.closeAuth}/>
                <input id="filename" class='brand' placeholder={navLabels[7]}
                       style='width: 210px; color:black; margin-left: 5px; border-radius: 10px;'
                       onChange={(e) => this.props.onFileChange((e.target as any).value)}/>

                <a class='button icon-floppy margin-button button-green' title='Save a file' href='javascript:void(0)' style="border: solid white 0px !important;"
                    onClick={() => this.props.saveCode()}>
                    {navLabels[2]}
                </a>

                <a class='button icon-share margin-button button' title='Save a file' href='javascript:void(0)'
                    onClick={() => this.props.share()}>
                    Share
                </a>

                <a class='button icon-folder-open margin-button' title='Open a file' href='javascript:void(0)'
                    onClick={() => this.props.openCode()}>
                    {GlobalVars.openFiles}
                </a>

                <a class='button icon-plus margin-button' id="new" title='Create new file' href='javascript:void(0)'
                    onClick={() => this.props.newCode()}>
                    {navLabels[0]}
                </a>


                

             {/*    <input id='bmenub' type='checkbox' class='show'/>
                <label for='bmenub' id="burgermenu" class='burger pseudo button icon-menu'/> */}


                <div class='menu' id="menubar">
                    


                    {/*<a class='button' title='Themes' href='javascript:void(0)' onClick={() => this.props.openThemes()}>
            Themes
          </a>*/}

                   
{/* 
                    <a class='button icon-book' title='Samples' href='javascript:void(0)'
                       onClick={() => this.props.openSamples()}>
                        {navLabels[3]}
                    </a> */}

                    <a class='button icon-cog settings' title='Settings' href='javascript:void(0)'
                       onClick={() => this.props.onFunction()}>
                    </a>

                    

                </div>
            </nav>


            <div class="toolbar">
                <div class="toolbar-column">
                    <a class='tab-button icon-blocks toolbar-opacity' id="blocksview" title='Settings' href='javascript:void(0)' style="background-color: #D63664;"
                        onClick={() => this.props.blocks()}>
                        Blocks
                    </a>
                    <a class='tab-button icon-python toolbar-opacity' title='Settings' id="pythonview" href='javascript:void(0)' style="background-color: #4457A0;"
                        onClick={() => this.props.python() }>
                        Python
                    </a>
                    <a class='tab-button icon-view-mode toolbar-opacity' title='Settings' id="splitview" href='javascript:void(0)' style="background-color: #EB9A40;"
                        onClick={() => this.props.splitview()}>
                        Split 
                    </a>
                </div>
                <div class="toolbar-column">
                    {sendCode &&
                    <a class='button icon-play button-green ' title='Run your code' href='javascript:void(0)' style="float:right; margin-right: 0px !important; margin-left: 10px;" id="run"
                       onClick={() => sendCode()}>
                        {navLabels[5]}
                    </a>
                    }

                    {sendCode &&
                    <a class='button icon-cancel-circled button-red' title='Run your code' href='javascript:void(0)' style="float:right; margin-right: 0px !important; display:none; margin-left: 10px;" id="stop"
                       onClick={() => closeTerminal()}>
                        Stop
                    </a>
                    }

                    {downloadHex &&
                    <a class='button icon-flash button-green' id="HexFlashButton" title='Download file to flash to micro:bit' href='javascript:void(0)' style="float:right; margin-right: 0px !important; background-color: #644A9E !important;"
                       onClick={() => flashHex()}>
                        Flash Hex
                    </a>
                    }      

                    {downloadHex &&
                    <a class='button icon-download button-green' title='Download file to flash to micro:bit' href='javascript:void(0)' style="float:right; margin-right: 12px !important; margin-left: 10px;"
                       onClick={() => downloadHex()}>
                        {navLabels[8]}
                    </a>
                    }   

                    {downloadPython &&
                    <a class='button icon-download button-green' title='Download Python Source Code' href='javascript:void(0)' style="float:right; margin-right: 0px !important; margin-left: 10px;"
                       onClick={() => downloadPython()}>
                        {navLabels[9]}
                    </a>
                    }

                    <a class='button icon-zoom-out zoomControls' id="zoomout" title='Run your code' href='javascript:void(0)'  
                       onClick={() => this.props.pyzoomout()}>
                        Zoom Out
                    </a>

                    <a class='button icon-zoom-in zoomControls' id="zoomin" title='Run your code' href='javascript:void(0)'
                       onClick={() => this.props.pyzoomin()}>
                        Zoom In
                    </a>
                </div>
                
            </div>
            
            </>
        );
    }
}
