const http = require('http');
const fs = require('fs');

/* ============================ SERVER DATA ============================ */
let artists = JSON.parse(fs.readFileSync('./seeds/artists.json'));
let albums = JSON.parse(fs.readFileSync('./seeds/albums.json'));
let songs = JSON.parse(fs.readFileSync('./seeds/songs.json'));

let nextArtistId = 2;
let nextAlbumId = 2;
let nextSongId = 2;

// returns an artistId for a new artist
function getNewArtistId() {
  const newArtistId = nextArtistId;
  nextArtistId++;
  return newArtistId;
}

// returns an albumId for a new album
function getNewAlbumId() {
  const newAlbumId = nextAlbumId;
  nextAlbumId++;
  return newAlbumId;
}

// returns an songId for a new song
function getNewSongId() {
  const newSongId = nextSongId;
  nextSongId++;
  return newSongId;
}

/* ======================= PROCESS SERVER REQUESTS ======================= */
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    if (reqBody) {
      req.body = JSON.parse(reqBody);
      console.log(req.body);
    };

    /* ========================== ROUTE HANDLERS ========================== */

    if (req.method === "GET" && req.url === "/artists") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(artists));
    };

    if (req.method === "GET" && req.url.startsWith("/artists/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const artistId = Number(urlParts[2]);
        const artist = artists[artistId];
        if (artist) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(artist));
        };
      };
    };

    if (req.method === "POST" && req.url === "/artists") {
      const newArtistId = getNewArtistId();
      const newArtist = {
        artistId : newArtistId,
        name : req.body.name
      };
      artists[newArtistId] = newArtist;
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(newArtist));
    };

    if ((req.method === "PUT" || req.method === "PATCH") && req.url.startsWith("/artists/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const artistId = Number(urlParts[2]);
        const artist = artists[artistId];
        if (artist) {
          artist.name = req.body.name;
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(artist));
        };
      };
    };

    if (req.method === "DELETE" && req.url.startsWith("/artists/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const artistId = Number(urlParts[2]);
        const artist = artists[artistId];
        if (artist) {
          delete artists[artistId];
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({"state" : "successful deletion"}));
        };
      };
    };

    if (req.method === "GET" && req.url.startsWith("/artists/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 4) {
        const artistId = Number(urlParts[2]);
        const artist = artists[artistId];
        if (artist) {
          const resource = urlParts[3];
          let resBody;
          switch(resource) {
            case "albums":
              resBody = artist.albums;
              break;
            case "songs":
              resBody = {};
              for (let i = 1; i < nextAlbumId; i++) {
                const album = albums[i];
                const songs = album.songs;
                if (album && songs && album.artistId === artistId) {
                  resBody[album.name] = songs;
                };
              };
              break;
          };
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(resBody));
        };
      };
    };

    if (req.method === "GET" && req.url.startsWith("/albums/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const albumId = Number(urlParts[2]);
        const album = albums[albumId];
        if (album) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(album));
        };
      };
    };

    if (req.method === "POST" && req.url.startsWith("/artists/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 4) {
        const artistId = Number(urlParts[2]);
        const artist = artists[artistId];
        if (artist && urlParts[3] === "albums") {
          if (!artist.albums) {
            artist.albums = {};
          };
          const newAlbumId = getNewAlbumId();
          const newAlbum = {albumId : newAlbumId, name : req.body.name, artistId : artistId};
          albums[newAlbumId] = newAlbum;
          artist.albums[newAlbumId] = newAlbum;
          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(newAlbum));
        };
      };
    };

    if ((req.method === "PUT" || req.method === "PATCH") && req.url.startsWith("/albums/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const albumId = Number(urlParts[2]);
        const album = albums[albumId];
        if (album) {
          album.name = req.body.name;
          const artistOfTheAlbum = artists[album.artistId];
          artistOfTheAlbum.albums[albumId].name = req.body.name;
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(album));
        };
      };
    };

    if (req.method === "DELETE" && req.url.startsWith("/albums/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const albumId = Number(urlParts[2]);
        const album = albums[albumId];
        if (album) {
          delete albums[albumId];
          const artistOfTheAlbum = artists[album.artistId];
          delete artistOfTheAlbum.albums[albumId];
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({"state" : "successful deletion"}));
        };
      };
    };

    if (req.method === "GET" && req.url.startsWith("/albums/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 4) {
        const albumId = Number(urlParts[2]);
        const album = albums[albumId];
        if (album && urlParts[3] === "songs" && album.songs) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(album.songs));
        };
      };
    };

    if (req.method === "GET" && req.url.startsWith("/songs/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const songId = urlParts[2];
        const song = songs[songId];
        if (song) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(song));
        };
      };
    };

    if (req.method === "POST" && req.url.startsWith("/albums/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 4) {
        const albumId = Number(urlParts[2]);
        const album = albums[albumId];
        if (album && urlParts[3] === "songs") {
          if (!album.songs) {
            album.songs = {};
          };
          const newSongId = getNewSongId();
          const newSong = {songId: newSongId, name : req.body.name, albumId : albumId, trackNumber: req.body.trackNumber, lyrics: req.body.lyrics};
          songs[newSongId] = newSong;
          album.songs[newSongId] = newSong;
          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(newSong));
        };
      };
    };

    if ((req.method === "PUT" || req.method === "PATCH") && req.url.startsWith("/songs/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const songId = Number(urlParts[2]);
        const song = songs[songId];
        if (song) {
          song.name = req.body.name;
          const albumOfTheSong = albums[song.albumId];
          albumOfTheSong.songs[songId].name = req.body.name;
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(song));
        };
      };
    };

    if ((req.method === "PUT" || req.method === "PATCH") && req.url.startsWith("/songs/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
        const songId = Number(urlParts[2]);
        const song = songs[songId];
        if (song) {
          delete songs[songId];
          const albumOfTheSong = albums[song.albumId];
          delete albumOfTheSong.songs[songId];
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(song));
        };
      };
    };

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write("Endpoint not found");
    return res.end();
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
