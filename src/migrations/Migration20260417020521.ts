import { Migration } from '@mikro-orm/migrations';

export class Migration20260417020521 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "post" ("id" serial primary key, "title" varchar(255) not null, "content" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
  }

}
