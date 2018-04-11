import { DBSchema } from '@ngrx/db';

export const schema: DBSchema = {
  version: 1,
  name: 'uc_talks',
  stores: {
    topics: {
      autoIncrement: true,
      primaryKey: '_id',
    },
    users: {
      autoIncrement: true,
      primaryKey: '_id',
    },
  },
};
