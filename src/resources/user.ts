import { Password, User as JsonApiUser } from '@ebryn/jsonapi-ts';

export default class User extends JsonApiUser {
  public static schema = {
    attributes: {
      email: String,
      password: Password,
      username: String,
    },
    relationships: {}
  }
}
