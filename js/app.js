(async () => {
    const API_URL = 'http://ws.audioscrobbler.com/2.0/';
    const API_KEY = 'e5a9b3dff61b3f80b401c4d5373357fe';
    const API_USER_NAME = 'brunoher24';

    const url = `${API_URL}?method=chart.gettopartists&api_key=${API_KEY}&user=${API_USER_NAME}&format=json`;

    try {
        const res = await ajaxGetPostXhr(url, 'GET', null);
        console.log('success', res);
        
        const slides = res.artists.artist.map(artist => {
            return {
                txt : artist.name,
                img :  artist.image[2]['#text']
            }
        });

        new MySlider('#slider-ctnr', slides);
    } catch(error) {
        console.log('error', error);
    }
})();





