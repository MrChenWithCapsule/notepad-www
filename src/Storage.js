import { v4 as uuid } from "uuid";
export class BrowserLocalStorage {
    readFile(id) {
        return JSON.parse(localStorage.getItem(id));
    }
    saveFile(file) {
        localStorage.setItem(file.id, JSON.stringify(file));
    }
    createFile() {
        let file = {
            id: uuid(),
            name: "",
            value: ""
        };
        localStorage.setItem(file.id, JSON.stringify(file));
        return file;
    }
    deleteFile(id) {
        localStorage.removeItem(id);
    }
    getFileList() {
        let fileList = [];
        for (let i = 0; i < localStorage.length; ++i) {
            const id = localStorage.key(i);
            fileList.push({
                id: id,
                name: this.readFile(id).name
            });
        }
        return fileList;
    }
}
