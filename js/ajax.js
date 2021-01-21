const ajaxGetPostXhr = (url, method, data) => {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        let dataToSend = null;
        
        if(method === 'POST' && data) {
            dataToSend = JSON.stringify(data);
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(dataToSend);

        xhr.addEventListener('load', function() {
            if(xhr.status === 200 || xhr.status === 201) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(xhr.status);
            }
        });

        xhr.addEventListener('error', function(err) {
            reject(err);
        });
    });
};


const ajaxGetPostFetch = async (url, method, dataToSend) => {
    try {
        const myInit = {
            method: method,
        };

        if(dataToSend && method === 'POST') {
            myInit.body =  JSON.stringify(obj),
            myInit.headers =  new Headers({
                'Content-Type': 'application/json'
            });
        }

        const promiseResponse = await window.fetch(url, myInit);
        if(promiseResponse.status !== 200 && promiseResponse.status !== 201) {
            throw promiseResponse.status;
        } else {
            const dataResponse = await promiseResponse.json();
            return dataResponse;
        }
    } catch(error) {
        console.log('Une erreur est survenue !', error);
    }
}


const ajaxGetPostFetchNotAsync = (url, method, dataToSend) => {
    return new Promise((resolve, reject) => {
        const myInit = {
            method: method,
        };
    
        if(dataToSend && method === 'POST') {
            myInit.body =  JSON.stringify(obj),
            myInit.headers =  new Headers({
                'Content-Type': 'application/json'
            });
        }
    
        window.fetch(url, myInit)
        .then(promiseResponse => {
            if(promiseResponse.status !== 200 && promiseResponse.status !== 201) {
                reject(promiseResponse.status);
            }
            promiseResponse.json().then(dataResponse => {
                resolve(dataResponse);
            });
        })
        .catch(error => {
            reject(error);
        });
    })
}
