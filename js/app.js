const API_URL = 'http://ws.audioscrobbler.com/2.0/';
const API_KEY = 'e5a9b3dff61b3f80b401c4d5373357fe';
const API_USER_NAME = 'brunoher24';


const getUrlWithPageNumber = pageNumber => {
    return `${API_URL}?method=chart.gettopartists&api_key=${API_KEY}&user=${API_USER_NAME}&format=json&page=${pageNumber}&limit=20`;
}


const getArtistsOnLastFmAPI = async pageNumber => {
    try {
        const res = await ajaxGetPostXhr(getUrlWithPageNumber(pageNumber), 'GET', null);
        console.log('success', res);
        
        const slides = res.artists.artist.map(artist => {
            return {
                txt : artist.name,
                img :  artist.image[2]['#text']
            }
        });

        // const slides = [];
        // res.artists.artist.forEach(artist => {
        //     const formatedArtist = {
        //         src: artist.image[2]["#text"],
        //         txt:artist.name
        //     }
        //     slides.push(formatedArtist);
        // });

        return slides;
      
    } catch(error) {
        console.log('error', error);
    }
};

getArtistsOnLastFmAPI(1).then(slides => {
    new MySlider('#slider-ctnr', slides);
    new MyPagination('#slider-pagination', 190021, 20, function(pageNumber) {
        getArtistsOnLastFmAPI(pageNumber).then(slides_ => {
            new MySlider('#slider-ctnr', slides_);
        });
        
    });
})



