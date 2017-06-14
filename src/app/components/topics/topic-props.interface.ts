import { UsefulLink } from './useful-link.interface';

interface TopicProps {
  linkToSlides?: string | null;
  name?: string | null;
  presentationDate?: Date | null;
  presented?: boolean;
  speakerId?: string | null;
  usefulLinks?: Array<UsefulLink>;
}

export default TopicProps;
