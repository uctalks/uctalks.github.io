import { UsefulLink } from '../components/topics/useful-link.interface';

export interface ITopic {
  _id: string; // database id
  likes: number; // likes count
  likedByUser?: boolean, // liked by current user (if any)
  linkToSlides?: string, // link to the slides
  name: string; // topic's name
  presentationDate?: string | null, // date of the presentation
  presented: boolean, // flag indicating whether this topic was already presented or not
  speakerId?: string | null, // id of the speaker (if any)
  usefulLinks: Array<UsefulLink>, // array of useful links
  usersLikedIds: string[], // ids of users, who liked this topic or empty array
}

export default ITopic;
