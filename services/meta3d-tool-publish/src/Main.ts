import fs from "fs"
import { generateContribute, generateExtension } from "meta3d";
import * as CloudbaseService from "meta3d-tool-utils/src/publish/CloudbaseService";
import * as _4everlandService from "meta3d-tool-utils/src/publish/4everlandService";
import { buildReadJsonFunc } from "meta3d-tool-utils/src/publish/PublishUtils"
import { env } from "meta3d-tool-utils/src/publish/PublishType"
import { publish } from "./Publish";

// let _getFuncArrForExtension = (env: env, packageFilePath: string): [any, any, any, any, any, any, any, any, any, any, any] => {
// 	switch (env) {
// 		case "local":
// 			return [
// 				fs.readFileSync,
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				CloudbaseService.init,
// 				CloudbaseService.hasAccount,
// 				CloudbaseService.getMarketProtocolCollection,
// 				CloudbaseService.isContain,
// 				CloudbaseService.addDataToMarketProtocolCollection,
// 				CloudbaseService.addMarketProtocolDataToDataFromMarketProtocolCollectionData,
// 				CloudbaseService.getDataFromMarketProtocolCollection
// 			]
// 		case "production":
// 			return [
// 				fs.readFileSync,
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				_4everlandService.init, _4everlandService.hasAccount, _4everlandService.getMarketProtocolCollection, _4everlandService.isContain, _4everlandService.addDataToMarketProtocolCollection,
// 				_4everlandService.addMarketProtocolDataToDataFromMarketProtocolCollectionData,
// 				_4everlandService.getDataFromMarketProtocolCollection
// 			]
// 		default:
// 			throw new Error("unknown env")
// 	}
// }

export function publishExtension(env: env, packageFilePath: string, distFilePath: string) {
	let funcArr = null

	switch (env) {
		case "local":
			funcArr = [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				generateExtension,
				CloudbaseService.initLocal,
				CloudbaseService.hasAccount,
				CloudbaseService.uploadFile,
				CloudbaseService.getMarketImplementAccountData,
				CloudbaseService.updateMarketImplementData,
				CloudbaseService.getDataFromMarketImplementAccountData,
				CloudbaseService.isContain,
				CloudbaseService.buildMarketImplementAccountData,
				CloudbaseService.addMarketImplementDataToDataFromMarketImplementCollectionData,
				CloudbaseService.getFileID,
				CloudbaseService.parseMarketCollectionDataBodyForNodejs,
			]
			break;
		case "production":
			// funcArr = [
			// 	fs.readFileSync,
			// 	console.log,
			// 	console.error,
			// 	buildReadJsonFunc(packageFilePath),
			// 	generateExtension,
			// 	_4everlandService.init,
			// 	_4everlandService.hasAccount,
			// 	_4everlandService.uploadFile,
			// 	_4everlandService.getMarketImplementAccountData,
			// 	_4everlandService.updateMarketImplementData,
			// 	_4everlandService.getDataFromMarketImplementAccountData,
			// 	_4everlandService.isContain,
			// 	_4everlandService.buildMarketImplementAccountData,
			// 	_4everlandService.addMarketImplementDataToDataFromMarketImplementCollectionData,
			// 	_4everlandService.getFileID,
			// 	_4everlandService.parseMarketCollectionDataBodyForNodejs,
			// ]
			funcArr = [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				generateExtension,
				CloudbaseService.initProduction,
				CloudbaseService.hasAccount,
				CloudbaseService.uploadFile,
				CloudbaseService.getMarketImplementAccountData,
				CloudbaseService.updateMarketImplementData,
				CloudbaseService.getDataFromMarketImplementAccountData,
				CloudbaseService.isContain,
				CloudbaseService.buildMarketImplementAccountData,
				CloudbaseService.addMarketImplementDataToDataFromMarketImplementCollectionData,
				CloudbaseService.getFileID,
				CloudbaseService.parseMarketCollectionDataBodyForNodejs,
			]
			break;
		default:
			throw new Error("unknown env")
	}

	return publish(funcArr, packageFilePath, distFilePath, "extension")
}

export function publishContribute(env: env, packageFilePath: string, distFilePath: string) {
	let funcArr = null

	switch (env) {
		case "local":
			funcArr = [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				generateContribute,
				CloudbaseService.initLocal,
				CloudbaseService.hasAccount,
				CloudbaseService.uploadFile,
				CloudbaseService.getMarketImplementAccountData,
				CloudbaseService.updateMarketImplementData,
				CloudbaseService.getDataFromMarketImplementAccountData,
				CloudbaseService.isContain,
				CloudbaseService.buildMarketImplementAccountData,
				CloudbaseService.addMarketImplementDataToDataFromMarketImplementCollectionData,
				CloudbaseService.getFileID,
				CloudbaseService.parseMarketCollectionDataBodyForNodejs,
			]
			break;
		case "production":
			// funcArr = [
			// 	fs.readFileSync,
			// 	console.log,
			// 	console.error,
			// 	buildReadJsonFunc(packageFilePath),
			// 	generateContribute,
			// 	_4everlandService.init,
			// 	_4everlandService.hasAccount,
			// 	_4everlandService.uploadFile,
			// 	_4everlandService.getMarketImplementAccountData,
			// 	_4everlandService.updateMarketImplementData,
			// 	_4everlandService.getDataFromMarketImplementAccountData,
			// 	_4everlandService.isContain,
			// 	_4everlandService.buildMarketImplementAccountData,
			// 	_4everlandService.addMarketImplementDataToDataFromMarketImplementCollectionData,
			// 	_4everlandService.getFileID,
			// 	_4everlandService.parseMarketCollectionDataBodyForNodejs
			// ]
			funcArr = [
				fs.readFileSync,
				console.log,
				console.error,
				buildReadJsonFunc(packageFilePath),
				generateContribute,
				CloudbaseService.initProduction,
				CloudbaseService.hasAccount,
				CloudbaseService.uploadFile,
				CloudbaseService.getMarketImplementAccountData,
				CloudbaseService.updateMarketImplementData,
				CloudbaseService.getDataFromMarketImplementAccountData,
				CloudbaseService.isContain,
				CloudbaseService.buildMarketImplementAccountData,
				CloudbaseService.addMarketImplementDataToDataFromMarketImplementCollectionData,
				CloudbaseService.getFileID,
				CloudbaseService.parseMarketCollectionDataBodyForNodejs,
			]
			break;
		default:
			throw new Error("unknown env")
	}

	return publish(funcArr, packageFilePath, distFilePath, "contribute")
}


// publishExtension(path.join(__dirname, "../mine/test_data/", "package.json"), path.join(__dirname, "../mine/test_data/", "main.js"))
// publishExtension(path.join(__dirname, "../mine/t/", "package.json"), path.join(__dirname, "../mine/t/", "main.js"))