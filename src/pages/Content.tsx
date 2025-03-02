import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Albums, Artists, MoreArtists } from "../DummyData";
import Footer from "../components/Footer";
import { Album, Artist, MoreArtist } from "../types/Interface";

const Content = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isHashed = localStorage.getItem("token");
    if (isHashed) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="spotify-clone ">
      <main className="main-content ">
        <div className="flex flex-wrap">
          <Navbar />
          <Sidebar />
          {!isLoggedIn ? (
            <div className="content-container bg-[#121212] rounded-md w-[73%] overflow-y-auto h-screen p-5">
              {/* Popular Artists */}
              <div className="popular-artists ">
                <div className="flex justify-between">
                  <button className="text-lg font-bold mb-4 hover:text-gray-600">
                    Popular artists
                  </button>
                  <button
                    className=" hover:text-slate-400"
                    onClick={() => {
                      navigate("/showall");
                    }}
                  >
                    Show all
                  </button>
                </div>
                <div className="artist-list  gap-4">
                  {Artists.map((artist: Artist, index: number) => (
                    <div
                      key={index}
                      className="artist hover:border bg-[#222222] text-center"
                    >
                      <img
                        src={artist.img}
                        alt={artist.name}
                        className="h-14 w-14 rounded-full "
                      />
                      <button
                        onClick={() => {
                          navigate(`/playlist/${artist.id}`); // Dynamically navigate using artist.id
                        }}
                      >
                        {artist.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Albums */}
              <div className="popular-albums mt-8">
                <div className="flex justify-between">
                  <button className="text-lg font-bold mb-4 hover:text-gray-600  ">
                    Popular albums and singles
                  </button>
                  <button className=" hover:text-slate-400 ">Show All</button>
                </div>

                <div className="album-list grid grid-cols-2 gap-4">
                  {Albums.map((album: Album, index: number) => (
                    <div
                      key={index}
                      className="album p-4 bg-gray-800 rounded-md shadow-md"
                    >
                      <img
                        src={album.img}
                        alt={album.title}
                        className="h-18 w-18 rounded-md"
                      />
                      <p>{album.artist}</p>
                      <p>{album.title}</p>
                    </div>
                  ))}
                </div>
                <div className="popular-albums mt-8">
                  <div className="flex justify-between">
                    <button className="text-lg font-bold mb-4 hover:text-gray-600  ">
                      Popular albums and singles
                    </button>
                    <button className="items-right hover:text-slate-400 ">
                      Show All
                    </button>
                  </div>

                  <div className="album-list grid grid-cols-2 gap-4">
                    {Albums.map((album: Album, index: number) => (
                      <div
                        key={index}
                        className="album p-4 bg-gray-800 rounded-md shadow-md"
                      >
                        <img
                          src={album.img}
                          alt={album.title}
                          className="h-18 w-18 rounded-md"
                        />
                        <p>{album.artist}</p>
                        <p>{album.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="popular-albums mt-8">
                  <div className="flex justify-between">
                    <button className="text-lg font-bold mb-4 hover:text-gray-600  ">
                      Popular albums and singles
                    </button>
                    <button className="items-right hover:text-slate-400 ">
                      Show All
                    </button>
                  </div>

                  <div className="album-list grid grid-cols-2 gap-4">
                    {Albums.map((album: Album, index: number) => (
                      <div
                        key={index}
                        className="album p-4 bg-gray-800 rounded-md shadow-md"
                      >
                        <img
                          src={album.img}
                          alt={album.title}
                          className="h-18 w-18 rounded-md"
                        />
                        <p>{album.artist}</p>
                        <p>{album.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="content-container bg-[#121212] rounded-md w-[73%] overflow-y-auto h-screen p-5">
              <div className="popular-artists ">
                <div className="flex justify-between">
                  <button className="text-lg font-bold mb-4 hover:text-gray-600">
                    Popular artists
                  </button>
                </div>
                <div className="artist-list  gap-4">
                  {MoreArtists.map((artist: MoreArtist, index: number) => (
                    <div
                      key={index}
                      className="artist hover:border bg-[#222222] text-center"
                    >
                      <img
                        src={artist.img}
                        alt={artist.name}
                        className="h-14 w-14 rounded-full"
                      />
                      <button
                        onClick={() => {
                          navigate(`/playlist/${artist.id}`); // Dynamically navigate using artist.id
                        }}
                      >
                        {artist.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      {!isLoggedIn ? <Footer /> : null}
    </div>
  );
};

export default Content;
