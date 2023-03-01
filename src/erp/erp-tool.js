export class ErpTool {

    constructor(emitter) {
        this.emitter = emitter;
    }

    getERPUrl() {
        /* CHANGE THIS */
        return "https://saz.noserp.de";
    }

    buildRestPath() {
        return `${this.getERPUrl()}/sys/tools/rest/Timerecord`;
    }

    setLoading(value) {
        value;
    }

    requestError(error) {
        error;

        alert("REQUEST ERROR")
    }

    systemError() {
        alert("SYSTEM ERROR!!!");
    }

    disconnectERP() {

    }

    getEmployees(adminRFID) {
        return new Promise((resolve, reject) => {
            this.setLoading(true);

            try {
                fetch(`${this.buildRestPath()}/get_user_list`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        admin_rfid: adminRFID,
                    })
                }).then(result => {
                    result.json().then(response => {
                        if (response['success'] === true) {
                            let responseData = response['data'];
                            resolve(responseData);
                        } else {
                            switch (response['msg']) {
                                case "not authorized":
                                    reject(response);
                                    break;
                                default:
                                    reject({error: 'default case'});
                                    break;
                            }
                        }

                        this.setLoading(false);
                    });
                }).catch(error => {
                    this.requestError(error);
                });

            } catch (error) {
                reject({error: 'catch'});
            }
        });
    }

    unlinkEmployeeFromCard(rfid, adminRFID) {
        return new Promise((resolve, reject) => {
            this.setLoading(true);

            try {
                fetch(`${this.buildRestPath()}/remove_card_from_user`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        admin_rfid: adminRFID,
                        rfid: rfid,
                    })
                }).then(result => {
                    result.json().then(response => {

                        if (response['success'] === true) {
                            let responseData = response['data'];
                            resolve(responseData);
                        } else {
                            switch (response['msg']) {
                                case "not authorized":
                                    reject(response);
                                    break;
                                default:
                                    reject({error: 'default case'});
                                    break;
                            }
                        }

                        this.setLoading(false);
                    });
                }).catch(error => {
                    this.requestError(error);
                });

            } catch (error) {
                reject({error: 'catch'});
            }
        });
    }

    getEmployeeInfo(rfid, adminRFID) {
        return new Promise((resolve, reject) => {
            this.setLoading(true);

            try {
                fetch(`${this.buildRestPath()}/get_chip_user`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        admin_rfid: adminRFID,
                        rfid: rfid,
                    })
                }).then(result => {
                    result.json().then(response => {

                        if (response['success'] === true) {
                            let responseData = response['data'];
                            resolve(responseData);
                        } else {
                            switch (response['msg']) {
                                case "not authorized":
                                    reject(response);
                                    break;
                                default:
                                    reject({error: 'default case'});
                                    break;
                            }
                        }

                        this.setLoading(false);
                    });
                }).catch(error => {
                    this.requestError(error);
                });

            } catch (error) {
                reject({error: 'catch'});
            }
        });
    }

    linkEmployeeWithRFID(employee, rfid, adminRFID) {
        return new Promise((resolve, reject) => {
            this.setLoading(true);

            try {
                fetch(`${this.buildRestPath()}/add_card_to_user`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        admin_rfid: adminRFID,
                        rfid: rfid,
                        from_adress: employee['from_adress'],
                    })
                }).then(result => {
                    result.json().then(response => {

                        if (response['success'] === true) {
                            let responseData = response['data'];
                            resolve(responseData);
                        } else {
                            switch (response['msg']) {
                                case 'Karte ist schon vergeben':
                                    reject(response);
                                    break;
                                default :
                                    reject({error: 'default case'});
                                    break;
                            }
                        }

                        this.setLoading(false);
                    });
                }).catch(error => {
                    this.requestError(error);
                });

            } catch (error) {
                reject({error: 'catch'});
            }

        });
    }

    getUserFromRFID(rfidCard) {
        return new Promise(((resolve, reject) => {

            this.setLoading(true);

            try {
                fetch(`${this.buildRestPath()}/login_user`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        rfid: rfidCard,
                    })
                }).then(result => {
                    result.json().then(response => {

                        if (response['success'] === true) {
                            let responseData = response['data'];
                            resolve(responseData);
                        } else {
                            switch (response['msg'] || response['error']['msg']) {
                                case "time too early":
                                case "time too late":
                                case "unknown rfid":
                                    reject(response);
                                    break;
                                default:
                                    reject({error: 'default case'});
                                    break;
                            }
                        }

                        this.setLoading(false);
                    });
                }).catch(error => {
                    this.requestError(error);
                });

            } catch (error) {
                reject({error: 'catch'});
            }
        }));
    }

}