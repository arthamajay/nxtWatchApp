import {createContext} from 'react'

const SavedVideosContext = createContext({
  savedVideos: [],
  addVideo: () => {},
  removeVideo: () => {},
})

export default SavedVideosContext
