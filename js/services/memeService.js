const memeService = (() => {
    function getAllMemes() {
        const endpoint = 'memes?query={}&sort={"_kmd.ect": -1}';
        return remote.get('appdata', endpoint, 'kinvey');
    }

    return {
        getAllMemes
    }
})();