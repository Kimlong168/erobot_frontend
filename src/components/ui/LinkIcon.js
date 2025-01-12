import {
  FaGlobe,
  FaPhone,
  FaGithub,
  FaTelegram,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLine,
  FaPinterest,
  FaSnapchat,
  FaYoutube,
  FaReddit,
  FaTumblr,
  FaTiktok,
} from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import { MdMailOutline } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri";

const IconSelector = ({ title, size }) => {
  let lowerCaseTitle = title;
  lowerCaseTitle = lowerCaseTitle.toLowerCase().trim();
  const iconMapping = {
    line: FaLine,
    twitter: FaTwitter,
    facebook: FaFacebook,
    instagram: FaInstagram,
    website: FaGlobe,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    pinterest: FaPinterest,
    snapchat: FaSnapchat,
    reddit: FaReddit,
    tumblr: FaTumblr,
    tiktok: FaTiktok,
    github: FaGithub,
    telegram: FaTelegram,
    phone: FaPhone,
    google: SiGoogle,
    mail: MdMailOutline,
    x: RiCloseCircleLine,
    // Add more mappings as needed
  };

  const IconComponent = iconMapping[lowerCaseTitle] || FaGlobe;

  return <IconComponent size={size} />; //size 24
};

const LinkIcon = ({ title, size = 24 }) => {
  return (
    <>
      <IconSelector title={title} size={size} />
    </>
  );
};


export default LinkIcon;
