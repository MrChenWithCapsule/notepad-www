import React from "react";

/**
 * @param changeFilename(id, newName)
 * @param createFile()
 * @param deleteFile(id)
 * @param selectFile(id)
 */
export default class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.fileList,
            changingFilenameIndex: -1,
            fileSelectedIndex: -1
        };
        this.filenameInputRef = React.createRef();
    }
    onFilenameChange = (index, name) => {
        let fileList = this.state.list;
        fileList[index] = { name: name, id: fileList[index].id };
        this.setState({ list: fileList });
    };
    startChangeFilename = index => {
        this.setState({ changingFilenameIndex: index });
        window.addEventListener(
            "click",
            this.completeChangeFilenameIfClickedElsewhere
        );
    };
    completeChangeFilenameIfClickedElsewhere = ev => {
        if (this.filenameInputRef.current.contains(ev.target)) return;
        const index = this.state.changingFilenameIndex;
        this.setState({ changingFilenameIndex: -1 });
        this.props.changeFilename(
            this.state.list[index].id,
            this.state.list[index].name
        );
        window.removeEventListener(
            "click",
            this.completeChangeFilenameIfClickedElsewhere
        );
    };
    selectFile = index => {
        this.setState({ fileSelectedIndex: index });
        this.props.selectFile(this.state.list[index].id);
    };
    createFile = () => {
        const file = this.props.createFile();
        let fileList = this.state.list;
        const index = fileList.push(file) - 1;
        this.setState({ list: fileList });
        this.selectFile(index);
        this.startChangeFilename(index);
    };
    deleteFile = index => {
        let fileList = this.state.list;
        const lastSelect = this.state.fileSelectedIndex;
        this.props.deleteFile(this.state.list[index].id);
        fileList.splice(index, 1);
        this.setState({
            list: fileList,
            fileSelectedIndex:
                lastSelect < index
                    ? lastSelect
                    : lastSelect === index
                    ? -1
                    : lastSelect - 1
        });
    };
    render() {
        return (
            <div id="file-panel">
                <p>
                    Files
                    <button
                        className="new-file"
                        onClick={ev => {
                            this.createFile();
                            ev.stopPropagation();
                        }}
                    >
                        +
                    </button>
                </p>
                <ul id="file-list">
                    {this.state.list.map((file, index) => {
                        return (
                            <li
                                key={file.id}
                                className={
                                    this.state.fileSelectedIndex === index
                                        ? "selected"
                                        : ""
                                }
                                onClick={() => this.selectFile(index)}
                                onDoubleClick={() =>
                                    this.startChangeFilename(index)
                                }
                            >
                                {this.state.changingFilenameIndex !== index ? (
                                    file.name
                                ) : (
                                    <input
                                        value={file.name}
                                        onChange={ev =>
                                            this.onFilenameChange(
                                                index,
                                                ev.target.value
                                            )
                                        }
                                        onClick={ev => ev.stopPropagation()}
                                        onDoubleClick={ev =>
                                            ev.stopPropagation()
                                        }
                                        ref={this.filenameInputRef}
                                    ></input>
                                )}
                                <button
                                    className="delete-file"
                                    onClick={ev => {
                                        this.deleteFile(index);
                                        ev.stopPropagation();
                                    }}
                                >
                                    ×
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
