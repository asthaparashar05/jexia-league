export interface User {
  /**
   * User UUID
   * */
  id: string;
  /**
   * User's Email ID
   * */
  email: string;
  /**
   * User's Status
   * */
  active: boolean;
  /**
   * User Creation time
   * */
  created_at: Date;
  /**
   * User Update time
   * */
  updated_at: Date;

}