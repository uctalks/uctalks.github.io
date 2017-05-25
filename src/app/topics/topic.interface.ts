interface Topic {
  name: string;
  likes: number;
  usersLikedIds: string[],
  likedByUser?: boolean,
  _id: string;
}

export default Topic;
