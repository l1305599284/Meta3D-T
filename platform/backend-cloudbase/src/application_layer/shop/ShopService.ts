import { empty, from, fromPromise, mergeArray } from "most"
import { satisfies } from "semver";

export let getAllPublishProtocolData = (
    getDataFunc: any,
    collectionName: string) => {
    return fromPromise(getDataFunc(collectionName)).map((res: any) => {
        return res.data.reduce((result, { protocols }) => {
            return result.concat(protocols.map(({ name, version, iconBase64 }) => {
                return { name, version, iconBase64 }
            }, []))
        }, [])
    })
}

export let getAllPublishData = (
    [getDataFunc, getFileFunc]: [any, any],
    collectionName: string, protocolName: string, protocolVersion: string) => {
    return fromPromise(getDataFunc(collectionName)).flatMap((res: any) => {
        return fromPromise(mergeArray(
            res.data.map(({ fileData }) => {
                let result = fileData.filter(data => {
                    return data.protocolName === protocolName &&
                        satisfies(
                            protocolVersion,
                            data.protocolVersion
                        )
                })

                if (result.length === 0) {
                    return empty()
                }

                return from(result.map(({ fileID, version }) => {
                    return [fileID, version]
                })).flatMap(([fileID, version]) => {
                    return getFileFunc(fileID).map(arrayBuffer => {
                        return { id: fileID, file: arrayBuffer, version }
                    })
                })
            })
        ).reduce(
            (result, data) => {
                result.push(data)

                return result
            }, []
        )
        )
    })
}