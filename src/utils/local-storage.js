import PrivateKeys from "../private/private-keys";

class LocalStorage {
	constructor() {
		this.maxHistory = 50
		this.maxVisible = 30
		this.data = localStorage.getItem(PrivateKeys.localStorageKey) ? JSON.parse(localStorage.getItem(PrivateKeys.localStorageKey)) : { fileNamesUploaded: [], historyItems: [] }
	}

	addFileNameUploaded(fileName) {
		this.data.fileNamesUploaded.push(fileName)
		localStorage.setItem(PrivateKeys.localStorageKey, JSON.stringify(this.data))
	}

	addHistoryItem(historyItem) {
		this.data.historyItems.push(historyItem)
		localStorage.setItem(PrivateKeys.localStorageKey, JSON.stringify(this.data))
	}

	cleanupHistory() {
		this.data.historyItems = this.data.historyItems.reverse().slice(0, this.maxHistory).reverse()
		this.data.fileNamesUploaded = this.data.fileNamesUploaded.reverse().slice(0, this.maxHistory).reverse()
		localStorage.setItem(PrivateKeys.localStorageKey, JSON.stringify(this.data))
	}
}

export default LocalStorage