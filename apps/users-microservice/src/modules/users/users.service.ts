import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { omit } from "ramda";
import { throwError } from "rxjs";

import {
  DATABASE_CONNECTION,
  EmailAlreadyExistsException,
} from "@app/api-core";
import { usersTable } from "@app/db";
import { CreateUserDTO, UserRow } from "@app/validators";

import { usersMicroserviceSchema } from "../../schema";

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION.USERS_DATABASE_CONNECTION)
    private readonly db: PostgresJsDatabase<typeof usersMicroserviceSchema>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserRow> {
    const { email, password } = createUserDTO;
    const userObject = await this.getUserByEmail(email);
    if (userObject) {
      throw new EmailAlreadyExistsException();
    }
    const [createdUser] = await this.db
      .insert(usersTable)
      .values({ email, passwordHash: password })
      .returning();

    return omit(["passwordHash"], createdUser);
  }

  getUserByEmail(email: string): Promise<UserRow | undefined> {
    return this.db.query.usersTable.findFirst({
      columns: { id: true, name: true, email: true },
      where: eq(usersTable.email, email),
    });
  }
}
