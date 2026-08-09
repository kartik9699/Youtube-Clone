# Video Upload using Multer + Save URL in DB

## Plan Steps
- [x] Backend: Install `multer`
- [x] Backend: Create `upload.middleware.js` (multer disk storage for video + thumbnail)
- [x] Backend: Create `uploads/videos` and `uploads/thumbnails` dirs
- [x] Backend: Serve `uploads` as static in `server.js`
- [x] Backend: Update `.gitignore` for `Backend/uploads`
- [x] Backend: Update `video.controller.js` (createVideo/updateVideo use uploaded file paths)
- [x] Backend: Update `video.routes.js` (POST/update use upload middleware)
- [x] Frontend: Update `Utils/videoUrl.js` (resolveMediaUrl helper)
- [x] Frontend: Update `UploadVideoModal.jsx` (file inputs + FormData)
- [x] Frontend: Update `VideoPlayer.jsx` (native <video> for local files)
- [x] Frontend: Update `VideoCard.jsx` (resolve local thumbnails)
- [x] Frontend: Update `ChannelProfile.jsx` (edit modal thumbnail file upload)
- [ ] Test upload + playback
