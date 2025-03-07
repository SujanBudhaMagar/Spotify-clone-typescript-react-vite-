import { useParams } from "react-router-dom";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import { MdBorderHorizontal } from "react-icons/md";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ArtistHere, Song } from "../types/Interface";
import FirstCard from "../Cards/FirstCard";
import Player from "../components/Player";
import { useAppContext } from "../components/AppContext";
import { Artist } from "../DummyData";

const Playlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artistData, setArtistData] = useState<ArtistHere | null>(null);
  const { currentSong, setCurrentSong } = useAppContext();
  // const [queue, setQueue] = useState(true);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleSongClick = (song: Song) => {
    setCurrentSong(song);
  };
  const handleNext = () => {
    if (!artistData || !currentSong) return;

    const currentIndex = artistData.songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextIndex = (currentIndex + 1) % artistData.songs.length;

    setCurrentSong(artistData.songs[nextIndex]);
  };

  const handlePrevious = () => {
    if (!artistData || !currentSong) return;

    const currentIndex = artistData.songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const previousIndex =
      (currentIndex - 1 + artistData.songs.length) % artistData.songs.length;

    setCurrentSong(artistData.songs[previousIndex]);
  };

  useEffect(() => {
    console.log("Artist ID from URL:", id);

    const selectedArtist = Artist.find((artist) => artist.id.toString() === id);

    if (selectedArtist) {
      setArtistData(selectedArtist);
    } else {
      console.log("Artist not found for ID:", id);
    }
  }, [id]);

  if (!artistData) {
    return <h1 className="text-white">Artist Not Found</h1>;
  }

  return (
    <div className="spotify-clone">
      <main className="main-content">
        <div className="flex flex-wrap w-full">
          <Navbar />
          <Sidebar />
          <div className="bg-gray-950 rounded-md mt-2 w-[73%] overflow-y-auto h-screen">
            <div
              className="relative w-full h-80 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url(${artistData.img})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-400 text-xl" />
                  <span className="text-sm">Verified Artist</span>
                </div>
                <FirstCard
                  name={artistData.name}
                  listeners={artistData.listeners}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <button className="bg-green-500 text-black px-6 py-2 rounded-full text-lg font-semibold flex items-center gap-2">
                <FaPlay size={20} /> Play
              </button>
              <button className="border border-gray-500 px-6 py-2 rounded-full text-lg">
                Follow
              </button>
              <MdBorderHorizontal size={24} className="cursor-pointer" />
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold">Popular Songs</h2>
              <div className="mt-4 space-y-4">
                {artistData.songs?.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                    onClick={() => handleSongClick(song)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 text-lg">{index + 1}</span>
                      <img
                        src={song.img}
                        alt={song.title}
                        className="w-12 h-12 rounded-md"
                      />
                      <div>
                        <p className="text-white font-semibold">{song.title}</p>
                        <p className="text-gray-400 text-sm">
                          {song.plays} plays
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-400">{song.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isLoggedIn
          ? currentSong && (
              <Player
                currentSong={currentSong}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )
          : null}
      </main>
    </div>
  );
};

export default Playlist;
