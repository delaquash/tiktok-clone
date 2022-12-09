import axios from 'axios';
import { Video } from '../types';
import { BASE_URL } from '../utils';
import NoResults from './components/NoResults';
import VideoCard from './components/VideoCard';


interface IProps {
  videos: Video[]
}

/* A function that takes in a parameter called videos and it is of type IProps. */
const Home =({ videos }: IProps) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
        {videos.length ? (
          videos.map((video: Video)=> (
            <VideoCard key={video._id} post={video} />
          ))): (
            <NoResults text={"No video"} />
        )}
    </div>
  );
}

/* Fetching data from the server. */
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
};
