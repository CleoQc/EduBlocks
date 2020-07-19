import React = require('preact');
import { Component } from 'preact';
import { getPlatform, getPlatformList } from '../platforms';
import { App, Capability, Extension, Platform, PlatformInterface } from '../types';
import * as firebase from 'firebase/app';
// import { AuthModal } from './Auth';
import AlertModal from './modals/AlertModal';


/// <reference path="screenshot.d.ts" />

import SettingsModal from './modals/SettingsModal';

import IEModal from './modals/IEModal';
import LoadModal from './modals/LoadModal';
import UploadModal from './modals/UploadModal';
import ExtensionModal from './modals/ExtensionModal';
import BlocklyView from './BlocklyView';
import StartModal from './modals/StartModal';
import ShareModal from './modals/ShareModal';
const copy = require('copy-text-to-clipboard');
import Nav from './Nav';


const Cookies = require("js-cookie")

import OverModal from './modals/OverwriteModal';
import PythonView from './PythonView';
import RemoteShellView from './RemoteShellView';
import SelectModal, { SelectModalOption } from './modals/SelectModal';
import FirebaseSelectModal from './modals/FirebaseSelectModal';

import TrinketView from './TrinketView';

type ShareOptions = 'Copy Shareable URL' | 'Copy Embed Code' | 'Share to Google Classroom' | 'Share to Microsoft Teams';
let ShareOptions: ShareOptions[] = ['Copy Shareable URL', 'Copy Embed Code', 'Share to Google Classroom', 'Share to Microsoft Teams'];

type Languages = 'English' | 'French' | 'German' | 'Welsh';
const Languages: Languages[] = ['English', 'French', 'German', 'Welsh'];

const ViewModeBlockly = 'blocks';
const ViewModePython = 'python';
const ViewModeSplit = 'python';


type ViewMode = typeof ViewModeBlockly | typeof ViewModePython | typeof ViewModeSplit;

interface Props {
    app: App;
}

interface DocumentState {
    xml: string | null;
    python: string | null;
    pythonClean: boolean;
}

interface FileFirebaseSelectModalOption {
    label: string;
    ref: firebase.storage.Reference;
}

interface State {
    platform?: PlatformInterface;
    currentPlatform: any;
    viewMode: ViewMode;
    isSaved: any;
    includeTurtle: boolean;
    output: null | 'trinket' | 'remote';
    prevOutput: null | 'trinket' | 'remote';
    modal: null | 'platform' | 'settings' | 'shareerror' | 'turtle' | 'IE' | 'generating' | 'extensionsnew' | 'share' | 'shareoptions' | 'terminal' | 'languages' | 'samples' | 'themes' | 'extensions' | 'functions' | 'pythonOverwritten' | 'https' | 'noCode' | 'codeOverwrite' | 'progress' | 'auth' | 'error' | 'files';
    prevModal: null | 'platform' | 'settings' | 'shareerror' |'turtle' | 'IE' | 'generating' | 'share' | 'extensionsnew' | 'shareoptions' | 'terminal' | 'languages' | 'samples' | 'themes' | 'extensions' | 'functions' | 'pythonOverwritten' | 'https' | 'noCode' | 'codeOverwrite' | 'progress' | 'auth' | 'error' | 'files';
    extensionsActive: Extension[];
    progress: number;
    shareURL: string;
    doc: Readonly<DocumentState>;
    fileName: string;
    files: FileFirebaseSelectModalOption[];
}


export class GlobalVars {
    public static openFiles: any = "Open";
    public static photoURL: any = "images/default-profile-image.png";
    public static userName: any = "";
}

export let split = false;

export let green = false;

export let classroom = "";


export let navLabels: string[] = new Array();
navLabels = ["New", "Open", "Save", "Samples", "Extras", "Run", "Login", "Untitled", "Download Hex", "Download", "Themes", "Share"];

export let generic: string[] = new Array();
generic = ["Open",
    "Go",
    "Select",
    "Close",
    "Delete",
    "Yes",
    "No",
    "Attention!",
    "There is no code to run!",
    "Changing mode will wipe your code, are you sure you want to change modes without saving your work?",
    "Uploading...",
    "Select your mode",
    "Files"];

export default class Page extends Component<Props, State> {


    public remoteShellView?: RemoteShellView;

    constructor() {
        super();

        this.state = {
            viewMode: ViewModeBlockly,
            modal: 'platform',
            output: null,
            prevOutput: null,
            currentPlatform: "",
            isSaved: "",
            includeTurtle: false,
            prevModal: null,
            extensionsActive: [],
            progress: 0,
            shareURL: "",
            fileName: 'Untitled',
            files: [],
            doc: {
                xml: null,
                python: null,
                pythonClean: true,
            },
        };
    }

    private isIE() {
        let ua = navigator.userAgent;

        var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

        return is_ie;
    }

    private async readBlocklyContents(xml: string) {
        if (this.state.doc.xml === xml) {
            return;
        }

        const doc: DocumentState = {
            xml,
            python: null,
            pythonClean: true,
        };

        this.setState({ doc });

        if (split === true) {
            this.switchView(ViewModeBlockly);

            await this.splitView(false);

            split = true
            this.splitView(true);
        }
        else {
            this.switchView(ViewModeBlockly);
        }
    }



    private updateFromBlockly(xml: string, python: string) {
        if (
            this.state.doc.xml === xml &&
            this.state.doc.python === python
        ) {
            return;
        }

        if (this.state.doc.python !== python && !this.state.doc.pythonClean) {
            this.setState({ modal: 'pythonOverwritten' });
        }

        const doc: DocumentState = {
            xml,
            python,
            pythonClean: true,
        };

        this.setState({ doc });
    }

    private updateFromPython(python: string) {
        if (this.state.doc.python === python) {
            return;
        }

        const doc: DocumentState = {
            xml: this.state.doc.xml,
            python,
            pythonClean: false,
        };

        this.setState({ doc });
    }

    private async new() {
        const doc: DocumentState = {
            xml: null,
            python: null,
            pythonClean: true,
        };
        this.setState({ doc });

        (document.getElementById("filename") as HTMLInputElement).value = "";

        this.setState({ fileName: "Untitled", isSaved: "" });

        try { this.onTerminalClose() }
        catch (e) { }

    }



    public async componentDidMount() {
        this.selectPlatform("RaspberryPi");
        let currentTheme = Cookies.get("theme");
        this.activeButton("blocks");

        $(function () {
            $('.tab-title').on('click', function (e) {
                e.preventDefault();
                var _self = $(this);
                $('.tab').removeClass('active');
                _self.parent().addClass('active');
            });

            $('.lang').on('click', function (e) {
                var _self = $(this);
                $('.lang').removeClass('green-lang');
                _self.addClass('green-lang');
            });

            $('.theme').on('click', function (e) {
                var _self = $(this);
                $('.theme').removeClass('green-lang');
                _self.addClass('green-lang');
            });

            if (currentTheme === "Default") {
                $('.theme').removeClass('green-lang');
                $('.default').addClass('green-lang');
            }

            if (currentTheme === "Dark") {
                $('.theme').removeClass('green-lang');
                $('.dark').addClass('green-lang');
            }

            if (currentTheme === "Light") {
                $('.theme').removeClass('green-lang');
                $('.light').addClass('green-lang');
            }
        });

        if (this.isIE()) {
            this.setState({ modal: "IE" })
        }

        document.body.className = `theme-${currentTheme}`;

        var locURL = window.location.href.toString();

        if (locURL.indexOf('#share') >= 0) {
            // if (locURL.indexOf('?Python') >= 0) {
            //     this.selectPlatform("Python");
            // }

            // if (locURL.indexOf('?MicroBit') >= 0) {
            //     this.selectPlatform("MicroBit");
            // }

            // if (locURL.indexOf('?CircuitPython') >= 0) {
            //     this.selectPlatform("CircuitPython");
            // }

            // if (locURL.indexOf('?RaspberryPi') >= 0) {
                this.selectPlatform("RaspberryPi");
            // }

            let self = this;
            var loadShareURL = window.location.href.substring(window.location.href.lastIndexOf("?") + 1);
            const decoded = atob(loadShareURL);

            const xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.onload = function (event) {
                self.readBlocklyContents(xhr.responseText);
            };
            xhr.open('GET', decoded);
            xhr.send();
            this.setState({ modal: null });

            this.delay(400);
            history.pushState(null, "", location.href.split("#")[0]);

        }

        await this.splitView(false);

        await this.activeButton("blocks");
        await this.switchView("blocks")

        await this.setState({ modal: "platform" });

        

/*         try{
        if (window.location.hash) {
            const platformKey = window.location.hash.slice(1) as unknown as Platform;
            this.selectPlatform(platformKey);
            await this.closeModal();
        }
        }
        catch(e){console.log("Platform not found")} */

        if (locURL.indexOf('#mlstarter') >= 0) {
            this.selectPlatform("Python");
            let self = this;

            const xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.onload = function (event) {
                let mlfile = xhr.responseText;
                let apikey = window.location.href.substring(window.location.href.lastIndexOf("?") + 1);
                let keytext = '<field name="text">' + apikey + '</field>';
                mlfile = mlfile.replace('<field name="text">KEYHERE</field>', keytext);
                self.readBlocklyContents(mlfile);
            };
            xhr.open('GET', "https://firebasestorage.googleapis.com/v0/b/edublocks-38d74.appspot.com/o/blocks%2FKxirQcjaclMBi3dv0D2bI7GZnXt1%2FML%20Starter%20(Python)?alt=media&token=e2e3da3e-9533-4ca8-873f-759d00a6097a");
            xhr.send();
            this.setState({ modal: null });

            this.delay(400);
        }

        if (locURL.indexOf('#mlstarter') >= 0) {
            this.selectPlatform("Python");
            let self = this;

            const xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.onload = function (event) {
                let mlfile = xhr.responseText;
                let apikey = window.location.href.substring(window.location.href.lastIndexOf("?") + 1);
                let keytext = '<field name="text">' + apikey + '</field>';
                mlfile = mlfile.replace('<field name="text">KEYHERE</field>', keytext);
                self.readBlocklyContents(mlfile);
            };
            xhr.open('GET', "https://firebasestorage.googleapis.com/v0/b/edublocks-38d74.appspot.com/o/blocks%2FKxirQcjaclMBi3dv0D2bI7GZnXt1%2FML%20Starter%20(Python)?alt=media&token=e2e3da3e-9533-4ca8-873f-759d00a6097a");
            xhr.send();
            this.setState({ modal: null });

            this.delay(400);
        }

    }

    private switchView(viewMode: ViewMode): 0 {
        switch (viewMode) {
            case ViewModeBlockly:
                let blocklyEditor = document.getElementById('blockly') as HTMLBodyElement;
                let pythonEditor = document.getElementById('editor') as HTMLBodyElement;
                pythonEditor.style.display = "none";
                blocklyEditor.style.display = "block";
                this.setState({ viewMode: 'blocks' });

                return 0;

            case ViewModePython:
                let blockEditor = document.getElementById('blockly') as HTMLBodyElement;
                let pyEditor = document.getElementById('editor') as HTMLBodyElement;
                blockEditor.style.display = "none";
                pyEditor.style.display = "block";
                this.setState({ viewMode: 'python' });
                let zoomin = document.getElementById('zoomin') as HTMLBodyElement;
                let zoomout = document.getElementById('zoomout') as HTMLBodyElement;

                zoomin.style.display = "block";
                zoomout.style.display = "block";

                return 0;

            case ViewModeSplit:
                let blocksEditor = document.getElementById('blockly') as HTMLBodyElement;
                this.setState({ viewMode: 'blocks' });
                this.setState({ viewMode: 'python' });
                blocksEditor.style.display = "block";
                return 0;
        }
    }

    private openTerminal() {
        if (!this.state.doc.python) {
            this.setState({ modal: 'noCode' });

            return;
        }

        this.setState({ output: 'trinket' });

        if (this.state.doc.python.indexOf("requests") !== -1 || this.state.doc.python.indexOf("mlmodel") !== -1 || this.state.doc.python.indexOf("mltext") !== -1) {
            this.setState({ includeTurtle: true })
        }
        else {
            this.setState({ includeTurtle: false })
        }

        let workspace = document.getElementById('workspace') as HTMLBodyElement;
        let splitview = document.getElementById('splitview') as HTMLBodyElement;
        let run = document.getElementById('run') as HTMLBodyElement;
        let stop = document.getElementById('stop') as HTMLBodyElement;

        run.style.display = "none";
        stop.style.display = "block";
        workspace.style.width = "60%";
        splitview.style.pointerEvents = "none";

        this.activeButton("blocks")
        this.switchView("blocks");
        this.hideZoomControls();
        this.splitView(false);

        window.dispatchEvent(new Event('resize'))

        if (this.remoteShellView) {
            this.remoteShellView.focus();
            this.remoteShellView.reset();

            this.props.app.runCode(this.state.doc.python);

            setTimeout(() => this.remoteShellView!.focus(), 250);
        }
    }

    private onBlocklyChange(xml: string, python: string) {
        this.updateFromBlockly(xml, python);
    }

    private onPythonChange(python: string) {
        this.updateFromPython(python);
    }

    private showZoomControls() {
        let zoomin = document.getElementById('zoomin') as HTMLBodyElement;
        let zoomout = document.getElementById('zoomout') as HTMLBodyElement;

        zoomin.style.display = "block";
        zoomout.style.display = "block";
        return ""
        console.log("Hi")
    }

    private hideZoomControls() {
        let zoomin = document.getElementById('zoomin') as HTMLBodyElement;
        let zoomout = document.getElementById('zoomout') as HTMLBodyElement;

        zoomin.style.display = "none";
        zoomout.style.display = "none";
        return ""

    }

    private async openFile() {
        const user = null
        if (user) {
            // let self = this;
            // const ref = firebase.storage().ref(`blocks/${user.uid}`);
            // ref.listAll().then(function (res) {
            //     self.setState({
            //         files: res.items.map((i) => ({
            //             label: i.name,
            //             ref: i,
            //         })),
            //         modal: 'files',
            //     });
            // }).catch(function (error) {
            //     self.setState({
            //         modal: 'error',
            //     });
            //     console.error(error);
            // });

        } else {
            const xml = await this.props.app.openFile();
            this.readBlocklyContents(xml);
        }
    }

    private async openLocalFile() {
        const xml = await this.props.app.openFile();
        this.readBlocklyContents(xml);
        await this.closeModal();
        this.onTerminalClose();
    }

    private async openFirebaseFile(file: firebase.storage.Reference) {
        this.closeModal();
        let self = this;
        let newFileName = "";

        this.setState({ isSaved: file });

        await console.log("Opening file...")
        if (file.name.indexOf("(Python)") !== -1 && this.state.platform!.key !== "Python") {
            this.selectPlatform("Python");
            newFileName = file.name.replace(" (Python)", "");

        }
        if (file.name.indexOf("(RPi)") !== -1 && this.state.platform!.key !== "RaspberryPi") {
            this.selectPlatform("RaspberryPi");
            newFileName = file.name.replace(" (RPi)", "");

        }
        if (file.name.indexOf("(microbit)") !== -1 && this.state.platform!.key !== "MicroBit") {
            this.selectPlatform("MicroBit");
            newFileName = file.name.replace(" (microbit)", "");

        }
        if (file.name.indexOf("(CircuitPython)") !== -1 && this.state.platform!.key !== "CircuitPython") {
            this.selectPlatform("CircuitPython");
            newFileName = file.name.replace(" (CircuitPython)", "");

        }

        if (file.name.indexOf("(Python)") !== -1 && this.state.platform!.key === "Python") {
            newFileName = file.name.replace(" (Python)", "");

        }
        if (file.name.indexOf("(RPi)") !== -1 && this.state.platform!.key === "RaspberryPi") {
            newFileName = file.name.replace(" (RPi)", "");

        }
        if (file.name.indexOf("(microbit)") !== -1 && this.state.platform!.key === "MicroBit") {
            newFileName = file.name.replace(" (microbit)", "");

        }
        if (file.name.indexOf("(CircuitPython)") !== -1 && this.state.platform!.key === "CircuitPython") {
            newFileName = file.name.replace(" (CircuitPython)", "");
        }

        (document.getElementById("filename") as HTMLInputElement).value = newFileName;

        this.setState({ fileName: newFileName });

        this.onTerminalClose();
        file.getDownloadURL().then(function (url) {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'text';
            xhr.onload = function (event) {
                self.readBlocklyContents(xhr.responseText);
            };
            xhr.open('GET', url);
            xhr.send();
        }).catch(function (error) {
            self.setState({
                modal: 'error',
            });
            console.error(error);
        });

    }

    private async deleteFirebaseFile(file: firebase.storage.Reference) {
        file.delete();
        await this.closeModal();
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async pythonZoom(direction: string) {
        if (direction === "in") {
            let python = document.getElementById('editor') as HTMLBodyElement;
            var style = window.getComputedStyle(python, null).getPropertyValue('font-size');
            var fontSize = parseFloat(style);
            python.style.fontSize = (fontSize + 3) + 'px';
        }
        if (direction === "out") {
            let python = document.getElementById('editor') as HTMLBodyElement;
            var style = window.getComputedStyle(python, null).getPropertyValue('font-size');
            var fontSize = parseFloat(style);
            python.style.fontSize = (fontSize - 3) + 'px';
        }
    }


    private async shareFirebaseFile(file: firebase.storage.Reference) {



        if (this.state.isSaved.length < 1) {
            this.setState( {modal: "shareerror"} );
        }
        else {

            let filePlatform = ""
            if (file.name.indexOf("(Python)") !== -1) {
                filePlatform = "Python"
            }
            if (file.name.indexOf("(RPi)") !== -1) {
                filePlatform = "RaspberryPi"
            }
            if (file.name.indexOf("(microbit)") !== -1) {
                filePlatform = "MicroBit"
            }
            if (file.name.indexOf("(CircuitPython)") !== -1) {
                filePlatform = "CircuitPython"
            }
            let fileURL = await this.state.isSaved.getDownloadURL();
            let newFileURL = fileURL.substring(0, fileURL.indexOf('&token='));
            const encoded = btoa(newFileURL);
            const edublocksLink = "https://app.edublocks.org/#share?" + filePlatform + "?" + encoded;
            await this.setState({ shareURL: edublocksLink });
            await console.log(this.state.shareURL);
            await this.setState({ modal: "shareoptions", prevModal: null });
        }
    }

    private async runShareOptions(func: string) {
        if (func === 'Share to Google Classroom') {
            let shareableURL = "https://api.shrtco.de/v2/shorten?url=" + encodeURIComponent(this.state.shareURL);
            this.setState({ modal: "generating" });

            const response = await fetch(
                shareableURL
            );

            const body = await response.json();

            console.log(this.state.shareURL)
            await this.closeModal()
            if (response.ok) {
                const shortLink = "https://share.edublocks.org/" + body.result.code
                await console.log(this.state.shareURL)
                await this.setState({ shareURL: shortLink });
                window.open("https://classroom.google.com/u/0/share?url=" + encodeURIComponent(this.state.shareURL) + "&usegapi=1&id=I0_1591303124637&parent=https%3A%2F%2Fwww.gstatic.com&pfname=%2FI0_1591303123749&rpctoken=58755424&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.utl9jrRztb8.O%2Fam%3DwQE%2Fd%3D1%2Fct%3Dzgms%2Frs%3DAGLTcCOUgIiKp6EMsn7UOgLQFm23i5pjzQ%2Fm%3D__features__", '1591307119253', 'width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=600,top=300')
                this.closeModal()
            }

            else { console.log(console.error()); }
        }
        if (func === 'Share to Microsoft Teams') {
            let shareableURL = "https://api.shrtco.de/v2/shorten?url=" + encodeURIComponent(this.state.shareURL);
            this.setState({ modal: "generating" });

            const response = await fetch(
                shareableURL
            );

            const body = await response.json();

            console.log(this.state.shareURL)
            await this.closeModal()
            if (response.ok) {
                const shortLink = "https://share.edublocks.org/" + body.result.code
                await console.log(this.state.shareURL)
                await this.setState({ shareURL: shortLink });
                window.open("https://teams.microsoft.com/share?href=" + encodeURIComponent(this.state.shareURL), '1591307119253', 'width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=600,top=300')
                this.closeModal()
            }

            else { console.log(console.error()); }
        }
        if (func === 'Copy Shareable URL') {
            let shareableURL = "https://api.shrtco.de/v2/shorten?url=" + encodeURIComponent(this.state.shareURL);
            this.setState({ modal: "generating" });

            const response = await fetch(
                shareableURL
            );

            const body = await response.json();

            console.log(this.state.shareURL)
            await this.closeModal()
            if (response.ok) {
                const shortLink = "https://share.edublocks.org/" + body.result.code
                await console.log(this.state.shareURL)
                await this.setState({ shareURL: shortLink });
                await copy(this.state.shareURL)
                await this.closeModal()
                await this.setState({ modal: "share" });
            }

            else { console.log(console.error()); }
        }

        if (func === 'Copy Embed Code') {
            let shareableURL = "https://api.shrtco.de/v2/shorten?url=" + encodeURIComponent(this.state.shareURL);
            this.setState({ modal: "generating" });

            const response = await fetch(
                shareableURL
            );

            const body = await response.json();

            console.log(shareableURL)

            if (response.ok) {
                const embedLink = '<iframe src="https://share.edublocks.org/' + body.result.code + '" height="600px" width="900px"></iframe>'
                await console.log(embedLink)
                await this.setState({ shareURL: embedLink });
                await copy(this.state.shareURL)
                await this.setState({ modal: "share" });
            }

            else { console.log(console.error()); }
        }
    }

    private async saveFile() {
        const xml = this.state.doc.xml;

        if (this.state.extensionsActive.length > 1) {
            await this.setState({ modal: "error", "prevModal": null });
        }

        else {
            if (xml) {
                const user = null
    
                if (user) {
                    // let self = this;
                    // this.setState({
                    //     modal: 'progress',
                    // });
                    // let plat = "";
    
                    // if (this.state.platform!.key === "Python"){
                    //     plat = " (Python)"
                    // }
                    // if (this.state.platform!.key === "MicroBit"){
                    //     plat = " (microbit)"
                    // }
                    // if (this.state.platform!.key === "RaspberryPi"){
                    //     plat = " (RPi)"
                    // }
                    // if (this.state.platform!.key === "CircuitPython"){
                    //     plat = " (CircuitPython)"
                    // }
    
                    // const ref = firebase.storage().ref(`blocks/${user.uid}/${this.state.fileName}${plat}`);
                    // const task = ref.putString(xml, undefined, {
                    //     contentType: 'text/xml',
                    // });
                    // task.on('state_changed', function (snapshot) {
                    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
                    //     self.setState({
                    //         progress: progress,
                    //     });
                    // }, function (error) {
                    //     self.setState({
                    //         modal: 'error',
                    //     });
                    //     console.error(error);
                    // }, function () {
                    //     self.closeModal();
                    // });
                } else {
                    await this.props.app.saveFile(this.state.fileName, xml, 'xml', 'text/xml;charset=utf-8');
                }
            }
        }
    }

    private async downloadPython() {
        const python = this.state.doc.python;

        if (python) {
            await this.props.app.exportPython(this.state.fileName, python, this.state.extensionsActive);
        }
    }

    private async downloadHex() {
        const python = this.state.doc.python;

        if (python) {
            this.props.app.saveHex(this.state.fileName, python, this.state.extensionsActive);
        }
    }

    private greenscreen(togglegreen: boolean) {
        let blocklySVG = document.getElementsByClassName("blocklySvg") as HTMLCollectionOf<HTMLElement>;
        let cameraon = document.getElementById("camera-on") as HTMLBodyElement;
        let cameraoff = document.getElementById("camera-off") as HTMLBodyElement;

        if (togglegreen === true) {
            greenScreen();
            var blocklybackground = blocklySVG[0];
            blocklybackground.style.background = "none";

            cameraon.style.display = "none";
            cameraoff.style.display = "block";

            green = true;

            this.closeModal();
        }

        if (togglegreen === false) {
            greenScreenOff();
            var blocklybackground = blocklySVG[0];
            blocklybackground.style.background = "white";

            cameraon.style.display = "block";
            cameraoff.style.display = "none";

            green = false;

            this.closeModal();
        }
    }


    private async selectPlatform(platformKey: Platform) {
        this.closeModal()
        const platform = await getPlatform(platformKey);

        if (platformKey === "CircuitPython") {
            let filebox = document.getElementById("filename");
            this.setState({ "fileName": "code" });
            filebox!.style.display = "none";
        }

        else {
            let filebox = document.getElementById("filename");
            filebox!.style.display = "block";
        }

        if (platformKey === 'RaspberryPi') {
            let ip: string | null = null;

            if (window.location.protocol === 'https:') {
                alert('Need to switch to HTTP to access Raspberry Pi mode...');
                window.location.protocol = 'http:';
                return;
            }

            if (navigator.platform.indexOf('arm') !== -1) {
                await this.props.app.initConnection('localhost');
            } else {
                ip = location.hostname;
                console.log(ip)

                if (!ip) return;

                try {
                    await this.props.app.initConnection(ip);
                } catch (err) {
                    console.error(err);
                }
            }
        }

        this.setState({
            platform,
            currentPlatform: platformKey,
            modal: null,
            extensionsActive: platform.defaultExtensions,
        });

        if (green === true){
            await this.greenscreen(false);
            await this.greenscreen(true);
        }

        if (window.innerWidth < 980) {
            this.switchView(ViewModeBlockly);
            this.activeButton("blocks");
        }
        else {
            this.switchView(ViewModeBlockly);
            await this.splitView(false);

            split = true
            this.splitView(true);

            this.activeButton("split");
        }
    }


    private closeModal() {
        this.setState({ modal: this.state.prevModal, prevModal: null });

    }

    private closeOutput() {
        this.setState({ output: null });

    }


    // private openAuth() {
    //     this.setState({ modal: 'auth', prevModal: this.state.modal });
    // }


    private openSamples() {
        this.setState({ modal: 'samples' });
    }

    private async selectSample(file: string) {
        this.new()
        await this.setState({ modal: null });

        const xml = this.props.app.getSample(this.state.platform!.key, file);

        await this.readBlocklyContents(xml);


    }


    private openThemes() {
        this.setState({ modal: 'themes' });
    }

    private async selectTheme(theme: string) {

        Cookies.set("theme", theme, { expires: 100000 })

        document.body.className = `theme-${theme}`;

        await this.closeModal();
    }


    private openExtensions() {
        this.splitView(false)
        this.setState({ modal: 'extensionsnew' });
    }

    private async selectExtension(extension: Extension) {

        const { extensionsActive } = this.state;

        this.switchView("blocks");

        await this.setState({
            extensionsActive: [...extensionsActive, extension],
        });

        await this.splitView(true);

        await this.closeModal();
    }


    private onTerminalClose() {
        let workspace = document.getElementById('workspace') as HTMLBodyElement;
        let splitview = document.getElementById('splitview') as HTMLBodyElement;
        let run = document.getElementById('run') as HTMLBodyElement;
        let stop = document.getElementById('stop') as HTMLBodyElement;

        run.style.display = "block";
        stop.style.display = "none";

        workspace.style.width = "100%";
        splitview.style.pointerEvents = "auto";
        window.dispatchEvent(new Event('resize'))
        this.closeOutput();

        if (window.innerWidth < 980) {
            this.switchView(ViewModeBlockly);
            this.activeButton("blocks");
        }
        else {
            this.switchView(ViewModeBlockly);
            this.splitView(false);

            split = true
            this.splitView(true);

            this.activeButton("split");
        }

    }

    private hasCapability(capability: Capability) {
        if (!this.state.platform) return false;

        return this.state.platform.capabilities.indexOf(capability) !== -1;

    }

    private getExtensions() {
        if (!this.state.platform) return [];

        return this.state.platform.extensions;
    }


    private initTerminal(terminalView: RemoteShellView) {
        if (this.remoteShellView !== terminalView) {
            this.remoteShellView = terminalView;

            this.props.app.assignTerminal(terminalView);
        }
    }


    private getPythonCode() {
        return this.state.doc.python || '';
    }


    private openAdvancedFunctionDialog() {
        this.setState({ modal: 'functions' });
    }



    private fileChange(fileName: string) {
        this.setState({ fileName });
    }


    private async openPlatforms() {
        await this.splitView(false);
        await this.switchView("blocks");
        const doc: DocumentState = {
            xml: null,
            python: null,
            pythonClean: true,
        };

        this.setState({ doc });

        await this.new();

        await this.splitView(true);

        this.setState({ modal: 'platform' });
    }

    private modeQuestion() {
        this.setState({ modal: 'codeOverwrite' });
    }

    private getLanguagesList(): SelectModalOption[] {
        let languages = Languages;

        return languages.map((func) => ({
            label: func,
            obj: func,
        }));
    }

    private async runLanguages(func: Languages) {
        if (func === 'English') {
            GlobalVars.openFiles = "Open";

            navLabels = ["New", "Open", "Save", "Samples", "Extras", "Run", "Login", "Untitled", "Download Hex", "Download", "Themes", "Share"];

            generic = ["Open",
                "Go",
                "Select",
                "Close",
                "Delete",
                "Yes",
                "No",
                "Attention!",
                "There is no code to run!",
                "Changing mode will wipe your code, are you sure you want to change modes without saving your work?",
                "Uploading...",
                "Select your mode",
                "Files"];

            document.getElementById("menubar")!.innerHTML = navLabels[0];
            document.getElementById("menubar")!.innerHTML = generic[0];
            await this.closeModal();
        }

        if (func === 'French') {
            GlobalVars.openFiles = "Ouvrir";

            navLabels = ["Nouveau", "Ouvrir", "Sauvegarder", "Exemples", "Préférences", "Exécuter", "S'identifier", "Sans Titre", "Télécharger Hex", "Télécharger", "Thèmes", "Partager"];

            generic = ["Ouvert",
                "Aller",
                "Sélectionner",
                "Fermer",
                "Effacer",
                "Oui",
                "Non",
                "Attention!",
                "Il n’y a pas de code à exécuter!",
                "Changer le mode te fera perdre ton code, souhaites-tu continuer?",
                "Téléchargement...",
                "Sélectionnez votre mode",
                "Des dossiers"];

            document.getElementById("menubar")!.innerHTML = generic[0];
            document.getElementById("menubar")!.innerHTML = navLabels[0];
            await this.closeModal();
        }

        if (func === 'German') {
            GlobalVars.openFiles = "Öffnen";

            navLabels = ["Neu", "Öffnen", "Speichern", "Proben", "Extras", "Ausführen", "Login", "Unbetitelt", "Herunterladen Hex", "Herunterladen", "Themen", "Teilen"];

            generic = ["Öffnen",
                "Los",
                "Markieren",
                "Schließen",
                "Löschen",
                "Ja",
                "Nein",
                "Achtung!",
                "Es ist kein Code zum Ausführen!",
                "Wenn sie den Modus ändern, wird ihr Code gelöscht. Möchten sie fortfahren?",
                "Wird hochgeladen...",
                "Wählen sie ihren Modus aus",
                "Dateien"];

            document.getElementById("menubar")!.innerHTML = generic[0];
            document.getElementById("menubar")!.innerHTML = navLabels[0];
            await this.closeModal();
        }

        if (func === 'Welsh') {
            GlobalVars.openFiles = "Agor";

            navLabels = ["Newydd", "Agor", "Cadw", "Samplau", "Yn ychwanegol", "Rhedeg", "Mewngofnodi", "Heb enw", "Lawrlwython Hex", "Lawrlwython", "Themâu", "Rhannu"];

            generic = ["Agor",
                "Mynd",
                "Dewis",
                "Cau",
                "Dileu",
                "Ie",
                "Na",
                "Eich sylw!",
                "Nid oes cod i'w redeg!",
                "Fe fydd newid modd yn achosi colled cod, ydych chi esiau parhau?",
                "Yn lanlwytho...",
                "Dewiswch eith modd",
                "Ffeiliau"];

            document.getElementById("menubar")!.innerHTML = generic[0];
            document.getElementById("menubar")!.innerHTML = navLabels[0];
            await this.closeModal();
        }
    }

    private activeButton(view: string) {
        if (view === "blocks") {
            let blockview = document.getElementById('blocksview') as HTMLBodyElement;
            let pythonview = document.getElementById('pythonview') as HTMLBodyElement;
            let splitview = document.getElementById('splitview') as HTMLBodyElement;

            blockview.classList.add("active-mode");
            pythonview.classList.remove("active-mode");
            splitview.classList.remove("active-mode");
        }

        if (view === "pythonview") {
            let blockview = document.getElementById('blocksview') as HTMLBodyElement;
            let pythonview = document.getElementById('pythonview') as HTMLBodyElement;
            let splitview = document.getElementById('splitview') as HTMLBodyElement;

            blockview.classList.remove("active-mode");
            pythonview.classList.add("active-mode");
            splitview.classList.remove("active-mode");
        }

        if (view === "split") {
            let blockview = document.getElementById('blocksview') as HTMLBodyElement;
            let pythonview = document.getElementById('pythonview') as HTMLBodyElement;
            let splitview = document.getElementById('splitview') as HTMLBodyElement;

            blockview.classList.remove("active-mode");
            pythonview.classList.remove("active-mode");
            splitview.classList.add("active-mode");
        }
        return "Activebutton"
    }

    private async splitView(toggle: boolean) {
        if (toggle === true) {
            split = true;
            let blocklyEditor = document.getElementById('blockly') as HTMLBodyElement;
            let pythonEditor = document.getElementById('python') as HTMLBodyElement;
            let editorElement = document.getElementById('editor') as HTMLBodyElement;
            let video = document.getElementById("video") as HTMLBodyElement;

            blocklyEditor.style.width = "60%";
            editorElement.style.width = "40%";

            video.style.width = "60%";

            window.dispatchEvent(new Event('resize'))

            pythonEditor.classList.add("show-editor");

            this.switchView(ViewModeSplit)

            blocklyEditor.style.display = "block";

            this.closeModal()

        }

        if (toggle === false) {
            split = false;
            let editorElement = document.getElementById('editor') as HTMLBodyElement;
            let blocklyEditor = document.getElementById('blockly') as HTMLBodyElement;
            let video = document.getElementById("video") as HTMLBodyElement;

            video.style.width = "100%";

            video.style.transform = "scale(1.4)";

            window.dispatchEvent(new Event('resize'))

            blocklyEditor.style.width = "100%";
            editorElement.style.width = "100%";

            window.dispatchEvent(new Event('resize'))

            this.switchView(ViewModeBlockly);

        }
    }

    private async hexflashing() {
        const python = this.state.doc.python;

        if (python) {
            this.setState({ modal: 'progress', progress: 0 });

            try {
                await this.props.app.flashHex(python, this.state.extensionsActive, (progress) => {
                    this.setState({ progress });
                });
            } finally {
                this.setState({ modal: null });
            }
        }
    }


    public render() {
        const availablePlatforms = getPlatformList();

        return (
            <div id='page'>
                <StartModal
                    title={generic[11]}
                    options={availablePlatforms}
                    visible={this.state.modal === 'platform'}
                    onSelect={(platform) => this.selectPlatform(platform.platform) && this.new()}
                    onCancel={() => {
                    }}
                />

                {/* <AuthModal
                    visible={this.state.modal === 'auth'}
                    onClose={() => this.closeModal()}
                /> */}

                <AlertModal
                    title={generic[7]}
                    visible={this.state.modal === 'pythonOverwritten'}
                    text={generic[8]}
                    onCancel={() => {
                    }}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <AlertModal
                    title="Whoops..."
                    visible={this.state.modal === 'shareerror'}
                    text="Please save this file to your account first before sharing it!"
                    onCancel={() => {
                    }}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <OverModal
                    title={generic[7]}
                    visible={this.state.modal === 'codeOverwrite'}
                    text={generic[9]}
                    onCancel={() => {
                    }}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                    onYes={(key1) => key1 === 'yes' && this.openPlatforms()}
                />

                <AlertModal
                    title={generic[7]}
                    visible={this.state.modal === 'https'}
                    text='Need to switch to HTTPS...'
                    onCancel={() => {
                    }}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <IEModal
                    title="We're Sorry"
                    visible={this.state.modal === 'IE'}
                    text='EduBlocks no longer supports Internet Explorer. Please use Chrome or Firefox instead.'
                    onCancel={() => {
                    }}
                />

                <AlertModal
                    title="Whoops..."
                    visible={this.state.modal === 'noCode'}
                    text="There is no code to run! Drag and drop some blocks into the workspace before pressing the run button!"
                    onCancel={() => {
                    }}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <LoadModal
                    title="Generating shareable URL"
                    visible={this.state.modal === 'generating'}
                    onCancel={() => {
                    }}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <AlertModal
                    title='Uh oh!'
                    visible={this.state.modal === 'error'}
                    text='Something went wrong'
                    onCancel={() => {
                    }}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                {this.getExtensions().length > 0 &&
                    <ExtensionModal
                        title='Extensions'
                        options={this.getExtensions().map((label) => ({ label }))}
                        selectLabel={generic[2]}
                        buttons={[]}
                        visible={this.state.modal === 'extensionsnew'}
                        onSelect={async (extension) => this.selectExtension(extension.label as Extension)}
                        onButtonClick={(key) => key === 'close' && this.closeModal()}
                    />
                }

                <AlertModal
                    title={navLabels[11]}
                    visible={this.state.modal === 'share'}
                    text={this.state.shareURL}
                    text2="Copied to clipboard"
                    onCancel={() => {
                    }}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <UploadModal
                    title={generic[10]}
                    visible={this.state.modal === 'progress'}
                    text={`${(this.state.progress * 100) | 0}%`}
                    progress={this.state.progress * 100}
                    onCancel={() => {
                    }}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <Nav
                    platformImg={this.state.platform && this.state.platform.image}
                    sync={this.state.doc.pythonClean}
                    openPlatforms={() => this.openPlatforms()}
                    modeQuestion={() => this.modeQuestion()}
                    openTerminal={this.hasCapability('RemoteShell') || this.hasCapability('TrinketShell') ? () => this.openTerminal() : undefined}
                    downloadPython={this.hasCapability('PythonDownload') ? () => this.downloadPython() : undefined}
                    downloadHex={this.hasCapability('HexDownload') ? () => this.downloadHex() : undefined}
                    openCode={() => this.openFile()}
                    saveCode={() => this.saveFile()}
                    pyzoomin={() => this.pythonZoom("in")}
                    share={() => this.shareFirebaseFile(this.state.isSaved)}
                    pyzoomout={() => this.pythonZoom("out")}
                    openExtensions={() => this.openExtensions()}
                    flashHex={() => this.hexflashing()}
                    closeTerminal={() => this.onTerminalClose()}
                    blocks={() => this.splitView(false) && window.dispatchEvent(new Event('resize')) && this.activeButton("blocks") && this.hideZoomControls() && this.switchView("blocks")}
                    python={() => this.splitView(false) && this.activeButton("pythonview") && this.switchView("python")}
                    splitview={() => this.splitView(true) && window.dispatchEvent(new Event('resize')) && this.activeButton("split") && this.showZoomControls()}
                    newCode={() => this.selectPlatform(this.state.currentPlatform) && this.new()}
                    openSamples={() => this.openSamples()}
                    openThemes={() => this.openThemes()}
                    onFunction={() => this.openAdvancedFunctionDialog()}
                    onFileChange={(fileName) => this.fileChange(fileName)}
                    // openAuth={() => this.openAuth()}
                    // closeAuth={() => this.closeModal()}
                />

                <section id='workspace'>
                    {/*                     <button
                        id='toggleViewButton'
                        class='toggleViewButton'
                        onClick={() => this.toggleView()}
                    >

                        {this.state.viewMode}

                    </button>

                    <button
                        id='ExitSplit'
                        class="toggleViewButton"
                        style="display: none;"
                        onClick={() => this.splitView(false)}
                    >

                        Exit Split View

                    </button> */}


                    <BlocklyView
                        visible={this.state.viewMode === 'blocks'}
                        xml={this.state.doc.xml}
                        extensionsActive={this.state.extensionsActive}
                        onChange={(xml, python) => this.onBlocklyChange(xml, python)}
                    />

                    <PythonView
                        visible={this.state.viewMode === 'python'}
                        python={this.state.doc.python}
                        onChange={(python) => this.onPythonChange(python)}
                    />
                </section>

                {this.hasCapability('RemoteShell') &&
                    <RemoteShellView
                        ref={(c) => this.initTerminal(c)}
                        visible={this.state.output === 'remote'}
                        onClose={() => this.onTerminalClose()}
                    />
                }

                {this.hasCapability('TrinketShell') &&
                    <TrinketView
                        pythonCode={this.getPythonCode()}
                        visible={this.state.output === 'trinket'}
                        turtle={this.state.includeTurtle === true}
                        onClose={() => this.onTerminalClose()}
                    />
                }

                <FirebaseSelectModal
                    title={generic[12]}
                    options={this.state.files}
                    selectLabel='Open'
                    buttons={[]}
                    visible={this.state.modal === 'files'}
                    localFile={() => this.openLocalFile()}
                    onSelect={(file: FileFirebaseSelectModalOption) => this.openFirebaseFile(file.ref)}
                    onDelete={(file: FileFirebaseSelectModalOption) => this.deleteFirebaseFile(file.ref)}
                    onShare={(file: FileFirebaseSelectModalOption) => this.shareFirebaseFile(file.ref)}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <SelectModal
                    title={navLabels[3]}
                    options={this.state.platform ? this.props.app.getSamples(this.state.platform.key).map((label) => ({ label })) : []}
                    selectLabel={generic[0]}
                    buttons={[]}
                    visible={this.state.modal === 'samples'}
                    onSelect={(file) => this.selectSample(file.label)}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <SelectModal
                    title={navLabels[10]}
                    options={this.props.app.getThemes().map((label) => ({ label }))}
                    selectLabel={generic[2]}
                    buttons={[]}
                    visible={this.state.modal === 'themes'}
                    onSelect={(theme) => this.selectTheme(theme.label)}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <SettingsModal
                    title={navLabels[4]}
                    visible={this.state.modal === 'functions'}
                    defaultTheme={() => this.selectTheme('Default')}
                    selectLabel="Settings"
                    darkTheme={() => this.selectTheme("Dark")}
                    greenScreen={(toggle) => this.greenscreen(toggle)}
                    lightTheme={() => this.selectTheme('Light')}
                    downloadPython={() => this.downloadPython()}
                    selectLanguage={(lang) => this.runLanguages(lang as Languages)}
                    buttons={[]}
                    onSelect={(theme) => this.selectTheme(theme.label)}
                    onSampleSelect={(file) => this.selectSample(file.label)}
                    options={this.state.platform ? this.props.app.getSamples(this.state.platform.key).map((label) => ({ label })) : []}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />

                <ShareModal
                    title={generic[11]}
                    visible={this.state.modal === 'shareoptions'}
                    share={(share) => this.runShareOptions(share)}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                    onCancel={() => {
                    }}
                />

                <SelectModal
                    title='Switch Language'
                    selectLabel={generic[2]}
                    buttons={[]}
                    visible={this.state.modal === 'languages'}
                    options={this.getLanguagesList()}
                    onSelect={(func) => this.runLanguages(func.label as Languages)}
                    onButtonClick={(key) => key === 'close' && this.closeModal()}
                />


                {this.getExtensions().length > 0 &&
                    <SelectModal
                        title='Extensions'
                        options={this.getExtensions().map((label) => ({ label }))}
                        selectLabel={generic[2]}
                        buttons={[]}
                        visible={this.state.modal === 'extensions'}
                        onSelect={(extension) => this.selectExtension(extension.label as Extension)}
                        onButtonClick={(key) => key === 'close' && this.closeModal()}
                    />
                }

            </div>
        );
    }
}
