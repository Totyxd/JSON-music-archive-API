# DOCUMENTATION FOR MUSIC ARCHIVE API

- Uses REST architecture.

- It's a web API server but it doesn't use a real database.

- Manages requests dynamically, and can perform CRUD (only using the core nodeJS http module and JSON seeds, which made it a bit challenging).

- Uses lots of nested urls to perform CRUD operations on nested resources.

- The music archive server receives JSON request bodies and returns JSON response bodies.

- There are no redirections.

- Code may not be in it's most efficient possible version in some cases, because of the extremely narrow set of tools used for this project.

- Responds to all errors with the same general message.

- Project assumes most inputs will be valid and not misintentioned.

- Docs only contain most important headers.

## Resources

Below is a list of all the resources for this music archive server.

- Artists:
  - artistId: unique identifier
  - name
- Albums:
  - albumId: unique identifier
  - name
  - artistId: of the artist that released the album
- Songs:
  - songId: unique identifier
  - name
  - lyrics
  - albumId: of the album that the song was released with


- Below is a list of operations on the music archive server that you can perform.

## DOCS

### Get all the artists

Request components:
  - Method: GET
  - URL: /artists
  - Headers: none
  - Body: none

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about all the artists

### Get a specific artist's details based on artistId

Request components:
  - Method: GET
  - URL: /artists/:artistId
  - Headers: none
  - Body: none

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about a particular artist


### Add an artist

Request components:
  - Method: POST
  - URL: /artists
  - Headers:
    - Content-Type: application/json
  - Body: JSON with key value pairs that contain the information of the new artist.

Response components:
  - Status code: 201
  - Headers:
    - Content-Type: application/json
  - Body: information about the artist just created


### Edit a specified artist by artistId

Request components:
  - Method: PUT / PATCH
  - URL: /artists/:artistId
  - Headers:
    - Content-Type: application/json
  - Body: JSON with key value pairs that contain the information of what you want to edit from artist.

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about the artist just edited.


### Delete a specified artist by artistId

Request components:
  - Method: DELETE
  - URL: /artists/:artistId
  - Headers: None
  - Body: None

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about the outcome of the delete request.


### Get all albums of a specific artist based on artistId

Request components:
  - Method: GET
  - URL: /artists/:artistId/albums
  - Headers: None
  - Body: None

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about all the albums of the artist associated with the id in the URL.


### Get a specific album's details based on albumId

Request components:
  - Method: GET
  - URL: /albums/:albumId
  - Headers: None
  - Body: None

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about a specific album.


### Add an album to a specific artist based on artistId

Request components:
  - Method: POST
  - URL: /artists/:artistId/albums
  - Headers:
    - Content-Type: application/json
  - Body: JSON with key value pairs of the album you want to add.

Response components:
  - Status code: 201
  - Headers:
    - Content-Type: application/json
  - Body: information about the specific album just created.


### Edit a specified album by albumId

Request components:
  - Method: PUT / PATCH
  - URL: /albums/:albumId
  - Headers:
    - Content-Type: application/json
  - Body: JSON with key value pairs of the album you want to edit.

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about the specific album just edited.


### Delete a specified album by albumId

Request components:
  - Method: DELETE
  - URL: /albums/:albumId
  - Headers: None
  - Body: None

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about the outcome of the request.


### Get all songs of a specific artist based on artistId

Request components:
  - Method: GET
  - URL: /artists/:artistId/songs
  - Headers: None
  - Body: None

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about the songs of the specific artist.


### Get all songs of a specific album based on albumId

Request components:
  - Method: GET
  - URL: /albums/:albumId/songs
  - Headers: None
  - Body: None

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about the songs of the specific album.


### Get a specific song's details based on songId

Request components:
  - Method: GET
  - URL: /songs/:songId
  - Headers: None
  - Body: None

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about the particular song.


### Add a song to a specific album based on albumId

Request components:
  - Method: POST
  - URL: /albums/:albumId/songs
  - Headers:
    - Content-Type: application/json
  - Body: info about the song you want to add.

Response components:
  - Status code: 201
  - Headers:
    - Content-Type: application/json
  - Body: information about the particular song that was just created.


### Edit a specified song by songId

Request components:
  - Method: PUT / PATCH
  - URL: /songs/:songId
  - Headers:
    - Content-Type: application/json
  - Body: info about the song you want to edit.

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about the particular song you edited.


### Delete a specified song by songId

Request components:
  - Method: DELETE
  - URL: /songs/:songId
  - Headers: None
  - Body: None

Response components:
  - Status code: 200
  - Headers:
    - Content-Type: application/json
  - Body: information about the outcome of the delete request.
