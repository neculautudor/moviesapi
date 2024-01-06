import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  username: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  is_private: boolean;

  constructor(
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    is_private: boolean
  ) {
    this.username = username;
    this.email = email;
    this.password_hash = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.is_private = is_private;
  }
}
