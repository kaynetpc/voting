import axios from "axios";




export const JHttp = {
    put: function (updateAddress, id, updateData, processSucceed, processFail, params = "") {
        //Update DB
        axios.put(`${updateAddress}/${id}?${params}`, updateData).then((d) => {
            return processSucceed(d.data);
        }).catch(ca => {
            return processFail(ca);
        });
    },

    get: function (getAddress, dataRetrieved, dataNotRetrieve) {
        axios.get(getAddress).then((data) => {
            return dataRetrieved(data.data);
        }).catch(error => {
            if (dataNotRetrieve !== undefined) {
                return dataNotRetrieve(error);
            }
        });
    },

    getSingle: function (getAddress, searchString, dataRetrieved, dataNotRetrieve) {
        axios.get(`${getAddress}/${searchString}`).then((data) => {
            return dataRetrieved(data.data);
        }).catch((ca) => {
            if (dataNotRetrieve !== undefined) {
                return dataNotRetrieve(ca);
            }
        })
    },

    post: function (postAddress, formData, processSucceed, processFail) {
        //Post to DB
        axios.post(postAddress, formData).then((d) => {
            return processSucceed(d.data);
        }).catch((ca) => {
            if (processFail !== undefined) {
                return processFail(ca);
            }
        });
    },

    request: function (postAddress, processSucceed, processFail) {
        //Post to DB
        axios.request(postAddress).then((d) => {
            return processSucceed(d.data);
        }).catch((ca) => {
            if (processFail !== undefined) {
                return processFail(ca);
            }
        });
    },

    check: function (getAddress, searchString, ifSearchStringIsEmpty, dataNotExist, dataExist, processFail) {
        if (searchString !== "") {
            // Check for existence in DB
            axios.get(`${getAddress}/${searchString}`).then((d) => {
                if ((d.data) == null) {
                    //Proceed
                    return dataNotExist();
                }
                else {
                    return dataExist();
                }
            }).catch((ca) => {
                //Error Info
                return processFail(ca);
            });
        }
        else {
            return ifSearchStringIsEmpty();
        }
    },

    indexedDB: {
        save: function (DBName = "", DBVersion = 0, data, dataType = "", key = "", DBType = "readwrite", onError, onSuccess) {
            // In the following line, you should include the prefixes of implementations you want to test.
            window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            // DON'T use "var indexedDB = ..." if you're not in a function.
            // Moreover, you may need references to some window.IDB* objects:
            window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
            window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
            // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
            if (!window.indexedDB) {
                console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
            }

            var request = window.indexedDB.open(DBName, DBVersion);
            request.onerror = function (e) {
                if (onError) {
                    onError(e);
                }
            }

            request.onupgradeneeded = function (e) {
                var db = e.target.result;
                var objStore = db.createObjectStore(key, { autoIncrement: true });

                switch (dataType) {
                    case "array":
                        data.forEach(element => {
                            objStore.add(element);
                        });
                        break;
                    case "object":
                        objStore.add(data);
                        break;
                    default:
                        break;
                }
            }
            request.onsuccess = function (e) {
                var db = e.target.result;
                var transaction = db.transaction([key], DBType);
                var objStore = transaction.objectStore(key);

                switch (dataType) {
                    case "array":
                        data.forEach(element => {
                            objStore.add(element);
                        });
                        break;
                    case "object":
                        objStore.add(data);
                        break;
                    default:
                        break;
                }

                if (onSuccess) {
                    onSuccess(e);
                }
            }

        }
    }
}
