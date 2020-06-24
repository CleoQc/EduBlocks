import React = require('preact');
import { Component } from 'preact';
import { getToolBoxXml } from '../blocks';
import { Extension } from '../types';
import _ = require('lodash');

interface BlocklyViewProps {
  visible: boolean;
  xml: string | null;
  extensionsActive: Extension[];

  onChange(xml: string, python: string): void;
}

export default class BlocklyView extends Component<BlocklyViewProps, {}> {
  private blocklyDiv?: Element;
  private workspace?: Blockly.WorkspaceSvg;
  private xml: string | null = null;

  public componentWillReceiveProps(nextProps: BlocklyViewProps) {
    if (nextProps.visible) {
      if (this.xml !== nextProps.xml) {
        this.setXml(nextProps.xml);
      }

      // Reload blockly if the extensions have changed
      if (!_.isEqual(this.props.extensionsActive, nextProps.extensionsActive)) {
        this.loadBlockly(nextProps.extensionsActive);
      }
    }
  }

  public async componentDidMount() {
    this.loadBlockly(this.props.extensionsActive);
  }

  

  private async loadBlockly(extensionsActive: Extension[]) {
    if (this.blocklyDiv) {
      // Kill the old workspace if it's already there...
      if (this.workspace) {
        this.workspace.dispose();
      }
      const toolbox = await getToolBoxXml(extensionsActive);


      this.workspace = Blockly.inject(this.blocklyDiv, {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true},
        zoom:
        {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
        },
        media: 'blockly/media/',
        collapse: false,
        toolbox,
      }) as Blockly.WorkspaceSvg;

      await this.workspace.addChangeListener(() => {
        const xml = this.getXml();

        const python = this.getPython();

        this.xml = xml;

        if (!this.workspace!.isDragging()) {
          this.props.onChange(xml, python);
        }
      });

      // disable blocks that aren't attached to the start block
      this.workspace.addChangeListener(Blockly.Events.disableOrphans);

      Blockly.svgResize(this.workspace);

      Blockly.Generator.prototype.INDENT = '\t';

      var start_block = null;
      start_block = this.workspace.getBlockById("DI_start_here");
      
      if (start_block == null) {
        var start_xml = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="events_start_here" id="DI_start_here" x="'+ 100 + '" y="43" deletable="false" movable="false"></block></xml>';
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(start_xml), this.workspace);
        console.log("adding default block")
      }
      else {
        this.setXml(this.xml);
      }
    }
  }

  private getXml(): string {
    if (!this.workspace) {
      throw new Error('No workspace!');
    }

    const xml = Blockly.Xml.workspaceToDom(this.workspace);

    return Blockly.Xml.domToPrettyText(xml);
  }

  private getPython(): string {
    if (!this.workspace) {
      throw new Error('No workspace!');
    }

    return Blockly.Python.workspaceToCode(this.workspace);
  }

  private setXml(xml: string | null) {
    if (!this.workspace) {
      throw new Error('No workspace!');
    }

    this.workspace.clear();

    if (typeof xml === 'string') {
      const textToDom = Blockly.Xml.textToDom(xml);
      Blockly.Xml.domToWorkspace(textToDom, this.workspace);
    }
  }

  public render() {
    return (
      <div
        style="display: block"
        id='blockly'
        ref={(div) => this.blocklyDiv = div}>
      </div>
    );
  }
}
