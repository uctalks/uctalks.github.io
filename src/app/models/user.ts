export interface IUser {
  name: string; // full name
  sub?: string; // google auth's id
  _id?: string, // database id
  picture: string; // link to google's avatar image
}

export default IUser;
