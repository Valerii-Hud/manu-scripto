import './_video.scss';
import video from '../../assets/dummy/video.mp4';
import {
  LuHeart,
  LuMessageSquare,
  LuRepeat2,
  LuSend,
  LuBookmark,
} from 'react-icons/lu';
const Video = () => {
  return (
    <div className="video">
      <video src={video} className="video__background"></video>
      <div className="video__numbers">
        <div className="video__number">
          <LuHeart className="video__number_icon" />
          <div>50.9k</div>
        </div>
        <div className="video__number">
          <LuMessageSquare className="video__number_icon" />
          <div>122</div>
        </div>
        <div className="video__number">
          <LuRepeat2 className="video__number_icon" />
          <div>880</div>
        </div>
        <div className="video__number">
          <LuSend className="video__number_icon" />
          <div>4 447</div>
        </div>
        <div className="video__number">
          <LuBookmark className="video__number_icon" />
          <div>4 582</div>
        </div>
      </div>
    </div>
  );
};

export default Video;
