import React from "react";
import FileList from "./FileList";
import { BrowserLocalStorage } from "./Storage";
import "./App.css";

function TextArea(props) {
    return (
        <textarea
            id="editor"
            value={props.value}
            onChange={ev => props.changeText(ev.target.value)}
            disabled={props.disabled}
        ></textarea>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        const storage = new BrowserLocalStorage();
        const fileList = storage.getFileList();
        this.state = {
            storage: storage,
            fileList: fileList,
            currentFile: null
        };
    }
    changeFilename = (id, newName) => {
        let file = this.state.storage.readFile(id);
        this.state.storage.saveFile({
            id: file.id,
            name: newName,
            value: file.value
        });
        this.setState({
            fileList: this.state.storage.getFileList(),
            currentFile:
                this.state.currentFile && id === this.state.currentFile.id
                    ? {
                          id: id,
                          name: newName,
                          value: this.state.currentFile.value
                      }
                    : this.state.currentFile
        });
    };
    createFile = () => {
        const file = this.state.storage.createFile();
        this.setState({ fileList: this.state.storage.getFileList() });
        return file;
    };
    deleteFile = id => {
        this.state.storage.deleteFile(id);
        this.setState({
            fileList: this.state.storage.getFileList(),
            currentFile:
                this.state.currentFile && id === this.state.currentFile.id
                    ? null
                    : this.state.currentFile
        });
    };
    selectFile = id => {
        if (this.state.currentFile !== null)
            this.state.storage.saveFile(this.state.currentFile);
        const currentFile = this.state.storage.readFile(id);
        this.setState({
            currentFile: currentFile
        });
    };
    changeText = text => {
        this.setState({
            currentFile: {
                id: this.state.currentFile.id,
                name: this.state.currentFile.name,
                value: text
            }
        });
    };
    render() {
        return (
            <div id="notepad">
                <FileList
                    fileList={this.state.fileList}
                    changeFilename={this.changeFilename}
                    createFile={this.createFile}
                    deleteFile={this.deleteFile}
                    selectFile={this.selectFile}
                ></FileList>
                <TextArea
                    value={
                        this.state.currentFile
                            ? this.state.currentFile.value
                            : ""
                    }
                    changeText={this.changeText}
                    disabled={!this.state.currentFile}
                ></TextArea>
            </div>
        );
    }
}

export default App;
